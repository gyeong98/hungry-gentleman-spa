export type SectionId = "home" | "menu" | "gallery" | "about" | "contact";

export function scrollToId(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  // Update hash without jump
  history.replaceState(null, "", `#${id}`);
}
