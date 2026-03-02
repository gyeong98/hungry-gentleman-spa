import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "@/utils/scroll";

type HomeSectionProps = {
  instagramUrl?: string;
};

export default function HomeSection({
  instagramUrl = "https://www.instagram.com/thehungrygentleman/",
}: HomeSectionProps) {
  const images = useMemo(
    () => [
      "/images/minified/background5.jpg",
      "/images/minified/background4.jpg",
      "/images/minified/background3.jpg",
      "/images/minified/background2.jpg",
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate carousel
  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden scroll-mt-24"
    >
      {/* Background carousel */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[activeIndex]}
            src={images[activeIndex]}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>

        {/* IMPORTANT: no dark overlay (removed) */}
        {/* If you ever want only a tiny top fade for navbar readability, use:
            <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/25 to-transparent" />
        */}
        <div className="absolute inset-0 bg-black/55" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" /> */}
        
        
      </div>

{/* Center hero text */}
<div className="relative z-10 min-h-screen flex items-center justify-center px-6 text-center">
  <div className="flex flex-col items-center">
    {/* Title */}
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="
        font-serif
        text-[2.4rem] sm:text-[3rem] md:text-[3.6rem] lg:text-[4rem]
        leading-tight
        text-[#f5efe6]
        tracking-wide
      "
    >
      The Hungry Gentleman.
    </motion.h1>

    {/* Divider */}
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="
        my-6
        h-px
        w-24
        bg-[#c9a45c]
        origin-center
      "
    />

    {/* Subtitle */}
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="
        text-xs
        tracking-[0.35em]
        text-[#c9a45c]
      "
    >
      CHEF KEVIN THAI
    </motion.p>
  </div>
</div>

      {/* Bottom controls: dots + arrow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 pb-6">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center gap-5">
          {/* Dots (bottom middle) */}
          <div className="pointer-events-auto flex items-center gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActiveIndex(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  i === activeIndex
                    ? "bg-white"
                    : "bg-white/40 hover:bg-white/75",
                ].join(" ")}
              />
            ))}
          </div>

          {/* Down arrow (bottom center) */}
          <button
            type="button"
            aria-label="Scroll down"
            onClick={() => scrollToId("menu")}
            className="pointer-events-auto group flex flex-col items-center gap-2"
          >
            <span className="text-xs tracking-[0.25em] text-white/70 group-hover:text-white transition">
              SCROLL
            </span>
            <motion.div
              initial={{ y: 0 }}
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
              className="h-9 w-9 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 transition"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white/80 group-hover:text-white transition"
              >
                <path
                  d="M12 5v12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M7 13l5 5 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </button>
        </div>
      </div>

      {/* Optional: if you want Instagram icon on home only (you already have it in Navbar) */}
      {/* <a href={instagramUrl} ... /> */}
    </section>
  );
}