import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function HomeSection() {
  const images = useMemo(
    () => [
      "/images/minified/background5.jpg",
      "/images/minified/background4.jpg",
      "/images/minified/background3.jpg",
      "/images/minified/background2.jpg",
    ],
    []
  );

  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((p) => (p + 1) % images.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [images.length]);

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden scroll-mt-24">
      {/* background */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={images[active]}
            src={images[active]}
            alt=""
            draggable={false}
            className="h-full w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />
      </div>

      {/* content */}
      <div className="relative z-10 pt-20 md:pt-28">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <div className="text-xs tracking-[0.35em] uppercase text-white/70">Private Dining • Events</div>
            <h1 className="mt-6 font-brand text-4xl md:text-6xl leading-tight text-white">
              The Hungry Gentleman
            </h1>
            <p className="mt-5 text-white/75 leading-relaxed">
              Chef Kevin Thai crafts seasonal tasting menus with warm hospitality—at your home or venue.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-full bg-white text-black px-6 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Inquire
              </a>
              <a
                href="#gallery"
                className="rounded-full border border-white/25 px-6 py-3 text-sm text-white hover:bg-white/10 transition"
              >
                View Gallery
              </a>
            </div>
          </motion.div>

          {/* indicators */}
          <div className="mt-16 flex gap-3">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setActive(i)}
                className={
                  "h-2 w-2 rounded-full transition " +
                  (i === active ? "bg-white" : "bg-white/40 hover:bg-white/70")
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
