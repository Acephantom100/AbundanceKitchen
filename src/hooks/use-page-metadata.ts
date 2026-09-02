import { useEffect } from "react";
// Vite SPA metadata helps browsers; server-rendered link previews require a separate prerendering step.
export function usePageMetadata(title: string, description: string, image?: string | null) {
  useEffect(() => {
    const oldTitle = document.title; document.title = title;
    const values: [string, string, string | null][] = [
      ["name", "description", description], ["property", "og:title", title],
      ["property", "og:description", description], ["name", "twitter:title", title],
      ["name", "twitter:description", description],
    ];
    if (image !== undefined) values.push(["property", "og:image", image], ["name", "twitter:image", image]);
    const restore = values.map(([attribute, name, value]) => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${name}"]`);
      const previous = element?.getAttribute("content") ?? null;
      const existed = Boolean(element);
      if (!element && value !== null) { element = document.createElement("meta"); element.setAttribute(attribute, name); document.head.appendChild(element); }
      if (element) { if (value === null) element.remove(); else element.content = value; }
      return () => { if (!existed) element?.remove(); else if (element) { element.content = previous ?? ""; if (!element.isConnected) document.head.appendChild(element); } };
    });
    return () => { document.title = oldTitle; restore.forEach(fn => fn()); };
  }, [title, description, image]);
}
