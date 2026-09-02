import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { BlogPost, formatDate, getPublishedPosts } from "@/lib/blog";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import BlogCover from "@/components/BlogCover";

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  usePageMetadata("Community journal | Abundance Kitchen", "Published stories and updates from Abundance Kitchen’s community work.");
  const load = useCallback(async () => {
    setState("loading");
    try { const { data, error } = await getPublishedPosts(); if (error) throw error; setPosts(data ?? []); setState("ready"); }
    catch { setState("error"); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  return <><Header /><main id="main-content" className="site-container site-section">
    <div className="journal-heading"><p className="eyebrow">From our community</p><h1>Small moments.<br />Meaningful change.</h1><p>Stories from the people behind Abundance Kitchen—and the communities at the heart of the work.</p></div>
    {state === "loading" && <p role="status">Loading stories…</p>}
    {state === "error" && <div className="empty-state" role="alert"><h2>We couldn’t load the journal.</h2><p>Please try again in a moment.</p><Button variant="outline" onClick={load}>Try again</Button></div>}
    {state === "ready" && posts.length === 0 && <div className="empty-state"><BookOpen className="mx-auto text-primary mb-5" size={30} aria-hidden="true" /><h2>The next chapter is on its way.</h2><p>No stories have been published here yet. In the meantime, get to know the work or contact the team.</p><Button asChild variant="outline"><Link to="/#what-we-do">Explore our work <ArrowUpRight /></Link></Button></div>}
    <div className="program-grid">{state === "ready" && posts.map(post => <article key={post.id} className="program-card">
      <BlogCover path={post.cover_image_path} />
      <div className="program-content"><p className="eyebrow">{formatDate(post.story_date || post.published_at)}</p><h2 className="text-2xl mb-4 break-words"><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2><p>{post.excerpt}</p><Link className="text-link mt-6 text-primary" to={`/blog/${post.slug}`}>Read the story <ArrowUpRight size={16} /></Link></div>
    </article>)}</div>
  </main><Footer /></>;
}
