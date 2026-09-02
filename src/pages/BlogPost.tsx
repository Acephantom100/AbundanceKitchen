import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BlogPost as Post, formatDate, getPublishedPost } from "@/lib/blog";
import { usePageMetadata } from "@/hooks/use-page-metadata";
import BlogCover from "@/components/BlogCover";
import StoryText from "@/components/StoryText";
export default function BlogPost() {
  const { slug = "" } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    let active = true; setState("loading"); setPost(null);
    getPublishedPost(slug).then(({data, error}) => { if (active) { if (error) setState("error"); else { setPost(data); setState("ready"); } } }).catch(() => { if (active) setState("error"); });
    return () => { active = false; };
  }, [slug]);
  usePageMetadata(post ? `${post.title} | Abundance Kitchen` : "Community story | Abundance Kitchen", post?.excerpt ?? "Read stories from Abundance Kitchen.", null);
  return <><Header /><main id="main-content" className="site-container reading-page">
    <Link to="/blog" className="text-link text-primary">← All stories</Link>
    {state === "loading" && <p role="status" className="mt-10">Loading story…</p>}
    {state === "error" && <div role="alert" className="mt-10"><h1>We couldn’t load this story.</h1><p>Please return to the journal and try again.</p></div>}
    {state === "ready" && !post && <div className="mt-10"><h1>Story not found.</h1><p>This story may not be published, or the address may have changed.</p></div>}
    {state === "ready" && post && <article className="mt-10"><p className="eyebrow">{formatDate(post.story_date || post.published_at)} · Abundance Kitchen</p><h1>{post.title}</h1>{post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed mb-8">{post.excerpt}</p>}<BlogCover path={post.cover_image_path} className="rounded-md w-full mb-10" /><div className="reading-copy"><StoryText content={post.content} /></div></article>}
  </main><Footer /></>;
}
