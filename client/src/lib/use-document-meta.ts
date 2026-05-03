import { useEffect } from "react";

const DESCRIPTION_ATTR = "name";

export function useDocumentMeta(options: { title: string; description: string }) {
  const { title, description } = options;

  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    let meta = document.querySelector(
      `meta[${DESCRIPTION_ATTR}="description"]`,
    ) as HTMLMetaElement | null;

    const created = !meta;
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute(DESCRIPTION_ATTR, "description");
      document.head.appendChild(meta);
    }

    const previousContent = meta.getAttribute("content");
    meta.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (created) {
        meta?.remove();
      } else if (meta && previousContent !== null) {
        meta.setAttribute("content", previousContent);
      } else if (meta) {
        meta.removeAttribute("content");
      }
    };
  }, [title, description]);
}
