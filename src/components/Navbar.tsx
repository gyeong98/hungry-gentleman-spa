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
  const active = useScrollSpy(NAV.map((n) => n.id), 140);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-black/25 backdrop-blur supports-[backdrop-filter]:bg-black/20 border-b border-white/10">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollToId("home")}
            className="font-brand text-lg md:text-xl text-white tracking-wide"
          >
            The Hungry Gentleman.
          </button>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-[0.2em]">
            {NAV.map((n) => (
              <button
                key={n.id}
                type="button"
                onClick={() => scrollToId(n.id)}
                className={
                  n.id === active
                    ? "text-white"
                    : "text-white/70 hover:text-white transition"
                }
              >
                {n.label}
              </button>
            ))}
            <a
              href="https://www.instagram.com/thehungrygentleman/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Instagram"
            >
              <img
                src="/images/icons8-instagram-49.png"
                alt=""
                className="h-7 w-7"
                draggable={false}
              />
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="md:hidden p-2"
          >
            <span className="block h-[2px] w-8 bg-white" />
            <span className="mt-2 block h-[2px] w-8 bg-white" />
          </button>
        </div>
      </div>

      {/* Fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute right-6 top-5">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 px-4 py-2 text-white hover:bg-white/10 transition"
              >
                Close
              </button>
            </div>

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
                    className="hover:opacity-80 transition"
                  >
                    {n.label}
                  </button>
                ))}

                <a
                  href="https://www.instagram.com/thehungrygentleman/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 hover:opacity-80 transition"
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
    </header>
  );
}
