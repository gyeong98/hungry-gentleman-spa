import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";

export default function GallerySection() {
  const images = useMemo(
    () => [
      "/images/food8.jpg",
      "/images/food12.jpg",
      "/images/food9.jpg",
      "/images/background9.jpg",
      "/images/food10.jpg",
      "/images/food15.jpg",
      "/images/food16.jpg",
      "/images/food13.jpg",
      "/images/food145.jpg",
    ],
    []
  );

  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="gallery" className="scroll-mt-24 bg-black py-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xs tracking-[0.35em] uppercase text-white/60">Gallery</div>
          <h2 className="mt-4 font-brand text-4xl md:text-5xl">Food & Moments</h2>
          <p className="mt-4 text-white/70 max-w-2xl">
            A selection of recent plates and experiences.
          </p>

          <div className="mt-10 columns-2 md:columns-3 gap-4 [column-fill:_balance]">
            {images.map((src) => (
              <button
                key={src}
                type="button"
                onClick={() => setActive(src)}
                className="mb-4 w-full overflow-hidden rounded-2xl border border-white/10 break-inside-avoid"
              >
                <img
                  src={src}
                  alt=""
                  className="w-full hover:scale-[1.02] transition duration-300"
                  loading="lazy"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.img
              src={active}
              alt=""
              className="max-h-[85vh] max-w-[95vw] rounded-2xl border border-white/15"
              initial={{ scale: 0.97, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
