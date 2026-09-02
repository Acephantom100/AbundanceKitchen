import { safeImageUrl } from "@/lib/blog-validation";

// A standalone HTTPS link is clickable. All other content remains escaped plain text.
export default function StoryText({ content }: { content: string }) {
  return <>{content.split(/\n\s*\n/).map((paragraph, index) => {
    const link = /^https:\/\/\S+$/.test(paragraph.trim()) ? safeImageUrl(paragraph) : null;
    return <p className="whitespace-pre-wrap" key={index}>{link ? <a href={link} target="_blank" rel="noopener noreferrer">{new URL(link).hostname === "www.fox5atlanta.com" ? "Watch the original report on FOX 5 Atlanta" : link}<span className="sr-only"> (opens in a new tab)</span></a> : paragraph}</p>;
  })}</>;
}
