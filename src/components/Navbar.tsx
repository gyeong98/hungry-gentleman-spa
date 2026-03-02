import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId, type SectionId } from "@/utils/scroll";
import { useScrollSpy } from "@/utils/useScrollSpy";

const NAV: { label: string; id: SectionId }[] = [
  { label: "HOME", id: "home" },
  { label: "MENU", id: "menu" },
  { label: "GALLERY", id: "gallery" },
  { label: "ABOUT", id: "about" },
  { label: "CONTACT", id: "contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useScrollSpy(NAV.map((n) => n.id), 140);

  /* Lock body scroll when menu is open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Show header background only after scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menu on resize (prevents stuck state) */
  useEffect(() => {
    const onResize = () => setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <>
      {/* HEADER */}
      <header className="fixed inset-x-0 top-0 z-[1100]">
        <div
          className={[
            "transition-all duration-200",
            scrolled
              ? "bg-black/25 backdrop-blur supports-[backdrop-filter]:bg-black/20 border-b border-white/10"
              : "bg-transparent border-b border-transparent",
          ].join(" ")}
        >
          <div className="w-full px-6 h-16 flex items-center justify-between">
            {/* Brand */}
            <button
              type="button"
              onClick={() => scrollToId("home")}
              className="
                brand-title
                text-[1.6rem] md:text-[1.9rem]
                text-[#f5efe6]
                tracking-[-0.02em]
                leading-none
                cursor-pointer
              "
            >
              The Hungry Gentleman
            </button>

            {/* Hamburger / X toggle */}
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[1110] w-10 h-10 cursor-pointer"
            >
              {/* Top line */}
              <motion.span
                className="absolute left-1/2 top-1/2 h-[2px] w-8 bg-white"
                initial={false}
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 0 : -6,
                  x: "-50%",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />

              {/* Bottom line */}
              <motion.span
                className="absolute left-1/2 top-1/2 h-[2px] w-8 bg-white"
                initial={false}
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? 0 : 6,
                  x: "-50%",
                }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1090] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="h-full flex items-center justify-center">
              <nav className="flex flex-col items-center gap-6 text-white text-xl tracking-[0.25em]">
                {NAV.map((n) => (
                  <button
                    key={n.id}
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      scrollToId(n.id);
                    }}
                    className={[
                      "cursor-pointer transition",
                      n.id === active
                        ? "text-white"
                        : "text-white/80 hover:text-white",
                    ].join(" ")}
                  >
                    {n.label}
                  </button>
                ))}

                {/* Instagram */}
                <a
                  href="https://www.instagram.com/thehungrygentleman/"
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer mt-6 hover:opacity-80 transition"
                  aria-label="Instagram"
                >
                  <img
                    src="/images/icons8-instagram-49.png"
                    alt="Instagram"
                    className="h-10 w-10"
                    draggable={false}
                  />
                </a>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}