import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

// Downloads go through Storage RLS. Blob URLs stay in this browser and are revoked.
export default function BlogCover({ path, localUrl, className = "" }: { path?: string | null; localUrl?: string | null; className?: string }) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    let active = true;
    let objectUrl: string | undefined;
    setUrl(null); setFailed(false);
    if (path && !localUrl && supabase) {
      void supabase.storage.from("blog-images").download(path).then(({ data, error }) => {
        if (!active) return;
        if (error || !data) { setFailed(true); return; }
        objectUrl = URL.createObjectURL(data); setUrl(objectUrl);
      }).catch(() => { if (active) setFailed(true); });
    }
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [path, localUrl]);
  if (!path && !localUrl) return null;
  if (failed) return <p className="text-sm text-muted-foreground p-4">Photo unavailable. Please reload to try again.</p>;
  if (!localUrl && !url) return <div className="aspect-[1.4] bg-secondary animate-pulse" role="status" aria-label="Loading cover photo" />;
  return <img src={localUrl || url!} alt="" className={className} decoding="async" />;
}
