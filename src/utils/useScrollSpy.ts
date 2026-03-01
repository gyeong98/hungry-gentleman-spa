import { useEffect, useState } from "react";
import type { SectionId } from "./scroll";

export function useScrollSpy(sectionIds: SectionId[], offsetPx = 120) {
  const [active, setActive] = useState<SectionId>(sectionIds[0] ?? "home");

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY + offsetPx;
      let current: SectionId = sectionIds[0] ?? "home";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= y) current = id;
      }
      setActive(current);
    };

    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [sectionIds, offsetPx]);

  return active;
}
