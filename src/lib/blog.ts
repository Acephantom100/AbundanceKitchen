import { supabase } from "./supabase";
export { slugify, safeImageUrl } from "./blog-validation";
export type BlogPost = {
  id: string; title: string; slug: string; excerpt: string | null; content: string;
  cover_image_url: string | null; cover_image_path: string | null; story_date: string | null; status: "draft" | "published";
  published_at: string | null; created_at: string; updated_at: string;
};
export const formatDate = (value: string | null) => {
  if (!value || Number.isNaN(Date.parse(value))) return "Draft";
  const date = /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(value + "T12:00:00") : new Date(value);
  return new Intl.DateTimeFormat("en", { dateStyle: "long" }).format(date);
};
export async function getPublishedPosts() {
  if (!supabase) return { data: [] as BlogPost[], error: null };
  return supabase.from("blog_posts").select("*").eq("status", "published").order("story_date", { ascending: false, nullsFirst: false }).order("published_at", { ascending: false }).limit(100);
}
export async function getPublishedPost(slug: string) {
  if (!supabase) return { data: null as BlogPost | null, error: null };
  return supabase.from("blog_posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
}
export async function getAdminPosts() {
  if (!supabase) throw new Error("The editor is not connected yet.");
  const { data, error } = await supabase.from("blog_posts").select("*").order("updated_at", { ascending: false });
  if (error) throw error;
  return data as BlogPost[];
}
export async function prepareCover(file: File) {
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("Choose a JPG, PNG, or WebP photo.");
  if (file.size > 5 * 1024 * 1024) throw new Error("Choose a photo smaller than 5 MB.");
  // Decode and re-encode: reject non-images, strip metadata, and avoid publishing SVG/HTML.
  const bitmap = await createImageBitmap(file);
  try {
    if (!bitmap.width || !bitmap.height || bitmap.width * bitmap.height > 40000000) throw new Error("Please resize this photo before uploading.");
    const scale = Math.min(1, 2000 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Your browser could not prepare the photo.");
    context.fillStyle = "#fff"; context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("Could not prepare this photo.")), "image/jpeg", .85));
    return blob;
  } finally { bitmap.close(); }
}

export async function removeUnusedCover(path: string) {
  if (!supabase) throw new Error("The editor is not connected yet.");
  const { data, error } = await supabase.storage.from("blog-images").remove([path]);
  if (error || !data?.length) throw new Error("The story was saved, but its old photo could not be deleted. Ask the site owner to remove the unused file from storage.");
}

export async function uploadCover(blob: Blob) {
  if (!supabase) throw new Error("The editor is not connected yet.");
  const path = `${crypto.randomUUID()}.jpg`;
  const { error } = await supabase.storage.from("blog-images").upload(path, blob, { contentType: "image/jpeg", cacheControl: "0", upsert: false });
  if (error) throw error;
  return path;
}
