import { FormEvent, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Check, ImagePlus, LogOut, Plus, Save, Eye, ArrowLeft } from "lucide-react";
import { BlogPost, formatDate, getAdminPosts, slugify, uploadCover, prepareCover, removeUnusedCover } from "@/lib/blog";
import { prepareStory, StoryInput } from "@/lib/blog-validation";
import { supabase, supabaseSetupMessage } from "@/lib/supabase";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import BlogCover from "@/components/BlogCover";
import StoryText from "@/components/StoryText";

type Editor = StoryInput & { id?: string; status: "draft" | "published"; updated_at?: string; cover_image_path?: string | null; story_date?: string | null };
const empty: Editor = { title: "", slug: "", excerpt: "", content: "", cover_image_url: "", status: "draft" };
type Access = "loading" | "login" | "denied" | "ready" | "error";
const failure = (error: unknown) => error instanceof Error ? error.message : "Something went wrong. Please try again.";
export default function BlogAdmin() {
  const [access, setAccess] = useState<Access>("loading");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingPhoto, setPendingPhoto] = useState<Blob | null>(null);
  const [localPhotoUrl, setLocalPhotoUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!pendingPhoto) { setLocalPhotoUrl(null); return; }
    const url = URL.createObjectURL(pendingPhoto); setLocalPhotoUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [pendingPhoto]);
  const [message, setMessage] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editor, setEditor] = useState<Editor>(empty);
  const [busy, setBusy] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [preview, setPreview] = useState(false);
  const [customSlug, setCustomSlug] = useState(false);
  usePageMetadata("Editor | Abundance Kitchen", "Private publishing workspace for approved Abundance Kitchen editors.", null);

  const refreshPosts = useCallback(async () => { setPosts(await getAdminPosts()); }, []);
  useEffect(() => {
    if (!supabase) return;
    const client = supabase;
    let active = true; let generation = 0;
    async function check() {
      const request = ++generation;
      try {
        const { data: { user }, error } = await client.auth.getUser();
        if (!active || request !== generation) return;
        if (!user) { setPosts([]); setEditor(empty); setPendingPhoto(null); setDirty(false); setAccess("login"); return; }
        if (error) throw error;
        const role = await client.from("blog_admins").select("user_id").eq("user_id", user.id).maybeSingle();
        if (!active || request !== generation) return;
        if (role.error) throw role.error;
        if (!role.data) { setAccess("denied"); setPosts([]); return; }
        const stories = await getAdminPosts();
        if (active && request === generation) { setPosts(stories); setAccess("ready"); }
      } catch { if (active && request === generation) setAccess("error"); }
    }
    void check();
    // Run outside the auth callback to avoid waiting on Supabase's auth lock.
    const { data: { subscription } } = client.auth.onAuthStateChange(() => { setTimeout(() => { if (active) void check(); }, 0); });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => { if (dirty) { event.preventDefault(); event.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update<K extends keyof Editor>(key: K, value: Editor[K]) {
    setEditor(current => ({ ...current, [key]: value, ...(key === "title" && !customSlug ? { slug: slugify(String(value)) } : {}) }));
    setDirty(true);
  }
  function select(post?: BlogPost) {
    if (dirty && !window.confirm("Discard your unsaved changes?")) return;
    setEditor(post ? { ...post, excerpt: post.excerpt ?? "", cover_image_url: post.cover_image_url ?? "" } : empty);
    setPendingPhoto(null); setCustomSlug(Boolean(post)); setDirty(false); setPreview(false); setMessage("");
  }
  async function signIn(event: FormEvent) {
    event.preventDefault(); if (!supabase || busy) return; setBusy(true); setMessage("");
    try {
      const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
      if (error) setMessage("Sign-in failed. Check your email and password, or ask the site owner for help.");
      else { setPassword(""); setMessage(""); }
    } catch { setMessage("Sign-in is unavailable right now. Please try again."); }
    finally { setBusy(false); }
  }
  async function signOut() {
    if (!supabase || (dirty && !window.confirm("Sign out and discard unsaved changes?"))) return;
    const { error } = await supabase.auth.signOut();
    if (error) setMessage("We couldn’t sign you out. Please try again.");
  }
  async function save(status: "draft" | "published") {
    if (!supabase || busy) return;
    let record: ReturnType<typeof prepareStory>;
    try { record = prepareStory({ ...editor, cover_image_url: "" }, status); } catch (error) { setMessage(failure(error)); return; }
    if (status === "published" && !window.confirm("Publish this story? It will be visible to everyone.")) return;
    if (status === "draft" && editor.status === "published" && !window.confirm("Unpublish this story? It will be removed from the public journal.")) return;
    setBusy(true); setMessage("");
    let uploadedPath: string | null = null;
    let committed = false;
    const previousPath = posts.find(post => post.id === editor.id)?.cover_image_path;
    try {
      if (pendingPhoto) uploadedPath = await uploadCover(pendingPhoto);
      const payload = { ...record, cover_image_url: null, cover_image_path: uploadedPath || editor.cover_image_path || null, story_date: editor.story_date || new Date().toLocaleDateString("en-CA") };
      // Timestamp matching prevents silently overwriting edits from another open editor.
      const query = editor.id
        ? supabase.from("blog_posts").update(payload).eq("id", editor.id).eq("updated_at", editor.updated_at)
        : supabase.from("blog_posts").insert(payload);
      const { data, error } = await query.select("*").maybeSingle();
      if (error) {
        if (error.code === "23505") throw new Error("That story address is already in use. Please choose another.");
        throw new Error("Couldn’t save. Your changes are still here; check your connection and editor access.");
      }
      if (!data) throw new Error("This story changed in another session. Copy your work before reloading.");
      committed = true;
      const saved = data as BlogPost;
      setPendingPhoto(null);
      setEditor({ ...saved, excerpt: saved.excerpt ?? "", cover_image_url: saved.cover_image_url ?? "" });
      setCustomSlug(true); setDirty(false); setMessage(status === "published" ? "Your story is published." : "Draft saved. Only approved editors can read it.");
      if (previousPath && previousPath !== saved.cover_image_path) {
        try { await removeUnusedCover(previousPath); } catch (error) { setMessage(failure(error)); }
      }
      try { await refreshPosts(); } catch { setMessage("Story saved. Reload to refresh the story list."); }
    } catch (error) {
      let note = failure(error);
      if (uploadedPath && !committed) {
        // A connection failure can be ambiguous: the delete policy refuses any referenced image.
        try { await removeUnusedCover(uploadedPath); } catch { note += " An uploaded photo may remain in private storage; ask the site owner to check unused files."; }
      }
      setMessage(note);
    }
    finally { setBusy(false); }
  }
  async function addPhoto(file?: File) {
    if (!file) return; setBusy(true); setMessage("");
    try { setPendingPhoto(await prepareCover(file)); setDirty(true); setMessage("Photo prepared on this device. It uploads only when you save or publish."); }
    catch (error) { setMessage(failure(error)); }
    finally { setBusy(false); }
  }

  function removePhoto() {
    if (!window.confirm("Remove this photo when you save? Its stored file will be permanently deleted if no other story uses it.")) return;
    setPendingPhoto(null); update("cover_image_path", null);
    setMessage("Photo marked for removal. Save or publish to apply it.");
  }

  const home = <Link className="text-link text-primary" to="/">← Back to website</Link>;
  if (!supabase) return <main className="site-container reading-page">{home}<div className="empty-state mt-8"><h1 className="text-3xl">Your editor is almost ready.</h1><p>{supabaseSetupMessage}</p><p>No stories will be lost or published from this screen.</p></div></main>;
  if (access !== "ready") return <main className="editor-login"><div className="w-full max-w-md">{home}<section className="editor-panel mt-8">
    <p className="eyebrow">Abundance Kitchen</p><h1 className="text-3xl mb-4">A place for your stories.</h1>
    {access === "loading" ? <p role="status">Checking editor access…</p> : access === "error" ? <><p>We couldn’t check your access. Please try again.</p><Button className="mt-5" onClick={() => window.location.reload()}>Try again</Button></> : access === "denied" ? <><p>You’re signed in, but this account is not an approved editor. Ask the site owner to add your email.</p><Button className="mt-5" variant="outline" onClick={signOut}>Sign out</Button></> :
    <form onSubmit={signIn} className="space-y-5"><p className="text-muted-foreground">Sign in with the email and password provided by the site owner.</p><label className="editor-label" htmlFor="editor-email">Your editor email<Input id="editor-email" autoComplete="email" type="email" required value={email} onChange={event => setEmail(event.target.value)} /></label><label className="editor-label" htmlFor="editor-password">Password<Input id="editor-password" autoComplete="current-password" type="password" required value={password} onChange={event => setPassword(event.target.value)} /></label><Button disabled={busy} className="w-full">{busy ? "Signing in…" : "Sign in"}</Button><p className="editor-help">Forgot your password? Contact the site owner for a private reset. Email resets are not enabled.</p></form>}
    {message && <p className="editor-message" role="status">{message}</p>}
  </section></div></main>;
  return <main className="site-container editor-page">
    <div className="editor-toolbar"><div><p className="eyebrow">Abundance Kitchen · Editor</p><h1 className="text-4xl">Your community journal.</h1><p className="text-muted-foreground mt-3">Write, preview, then publish. You’re in control.</p></div><div className="flex flex-wrap gap-3">{home}<Button variant="outline" disabled={busy} onClick={signOut}><LogOut /> Sign out</Button></div></div>
    <div className="editor-layout"><aside className="editor-sidebar"><Button className="w-full mb-5" disabled={busy} onClick={() => select()}><Plus /> New story</Button><h2 className="text-lg mb-4">Your stories</h2><div className="space-y-3">{posts.map(post => <button disabled={busy} type="button" key={post.id} onClick={() => select(post)} className={`story-select ${editor.id === post.id ? "selected" : ""}`}><strong>{post.title}</strong><span>{post.status === "published" ? "Published" : "Draft"} · {formatDate(post.updated_at)}</span></button>)}</div>{!posts.length && <p className="text-muted-foreground text-base">Your first story starts here.</p>}</aside>
    <section className="editor-panel">
      <div className="flex items-center justify-between gap-4 mb-6"><h2 className="text-2xl">{preview ? "Story preview" : editor.id ? "Edit story" : "New story"}</h2><Button variant="outline" type="button" onClick={() => setPreview(!preview)}>{preview ? <ArrowLeft /> : <Eye />}{preview ? "Keep editing" : "Preview"}</Button></div>
      {preview ? <article className="reading-copy"><h1 className="text-4xl">{editor.title || "Your story title"}</h1><p className="text-muted-foreground">{editor.excerpt}</p><BlogCover path={editor.cover_image_path} localUrl={localPhotoUrl} className="w-full rounded mb-6" /><StoryText content={editor.content} /></article> :
      <form onSubmit={event => { event.preventDefault(); void save("draft"); }}>
        <fieldset disabled={busy} className="space-y-6">
          <label className="editor-label" htmlFor="story-title">Title<Input id="story-title" required maxLength={180} value={editor.title} onChange={event => update("title", event.target.value)} placeholder="Give your story a clear title" /></label>
          <label className="editor-label" htmlFor="story-summary">Short introduction<Textarea id="story-summary" rows={3} maxLength={400} value={editor.excerpt} onChange={event => update("excerpt", event.target.value)} placeholder="A sentence or two to invite readers in." /><span className="editor-help">{editor.excerpt.length}/400 characters</span></label>
          <div><label className="editor-label" htmlFor="cover-upload"><span className="flex items-center gap-2"><ImagePlus size={18} /> Cover photo</span><Input id="cover-upload" type="file" accept="image/jpeg,image/png,image/webp" onChange={event => { void addPhoto(event.target.files?.[0]); event.target.value = ""; }} /></label><p className="editor-help mt-2">JPG, PNG, or WebP, up to 5 MB. Use photos you have permission to publish. Draft photos stay private; visitors can view photos only while their story is published.</p>{(editor.cover_image_path || pendingPhoto) && <div className="mt-3"><BlogCover path={editor.cover_image_path} localUrl={localPhotoUrl} className="h-44 w-full object-cover rounded" /><Button variant="ghost" type="button" onClick={removePhoto}>Remove photo on save</Button></div>}</div>
          <label className="editor-label" htmlFor="story-content">Your story<Textarea id="story-content" required rows={14} maxLength={100000} value={editor.content} onChange={event => update("content", event.target.value)} placeholder="Tell readers what happened, who was involved, and why it matters. Leave a blank line between paragraphs." /></label>
          <label className="editor-label" htmlFor="story-date">Date of the update<Input id="story-date" type="date" value={editor.story_date ?? ""} onChange={event => update("story_date", event.target.value)} /><span className="editor-help">Optional event date. Otherwise the publication date is shown.</span></label><details><summary className="cursor-pointer text-base font-medium">Story address</summary><div className="space-y-4 mt-4"><label className="editor-label" htmlFor="story-slug">Story address<Input id="story-slug" value={editor.slug} maxLength={120} onChange={event => { setCustomSlug(true); update("slug", event.target.value); }} /><span className="editor-help">/blog/{editor.slug || "your-story"} — changing a published address breaks old links.</span></label></div></details>
        </fieldset>
      </form>}
      <div className="editor-actions"><div className="flex flex-wrap gap-3"><Button variant="outline" disabled={busy} onClick={() => save("draft")}><Save /> {editor.status === "published" ? "Unpublish to draft" : "Save draft"}</Button><Button disabled={busy} onClick={() => save("published")}><Check /> {editor.status === "published" ? "Publish changes" : "Publish story"}</Button></div><span className="editor-help">{busy ? "Working…" : dirty ? "Unsaved changes" : editor.id ? "All changes saved" : "Start a new story"}</span></div>
      {message && <p className="editor-message" role="status">{message}</p>}
    </section></div>
  </main>;
}
