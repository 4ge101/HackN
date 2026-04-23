import DOMPurify from "dompurify";

export function sanitizeHtml(html) {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "a", "b", "i", "em", "strong", "pre", "code", "br"],
    ALLOWED_ATTR: ["href", "target", "rel"],
  });
}
