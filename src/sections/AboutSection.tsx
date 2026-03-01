import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 bg-black py-20 border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="text-xs tracking-[0.35em] uppercase text-white/60">About</div>
              <h2 className="mt-4 font-brand text-4xl md:text-5xl">Chef Kevin Thai</h2>

              <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
                <p>
                  Chef Kevin Thai found his culinary passion at a young age growing up in the New York City borough of
                  Manhattan. This led him to move to Paris, where he attended the renowned culinary academy,
                  L&apos;école Ferrandi Paris.
                </p>
                <p>
                  His talents led him into cooking at one of Paris’ best and most respected restaurants, the three
                  Michelin-star Restaurant Guy Savoy. There, his culinary talents were further cultivated. He was
                  encouraged to explore pastry arts which led him to work for top pastry chef Julian Alvarez at the
                  Peninsula Paris.
                </p>
                <p>
                  Adding pastry to his arsenal gave him a competitive edge and earned him a wonderful opportunity to
                  travel around the world to places such as Australia and Copenhagen, cooking at incredible
                  establishments like Two Michelin-star restaurant Kadeau, and Dominique Ansel Bakery.
                </p>
                <p>
                  Under the tutelage of these great chefs, he took on an executive chef position for a major New York
                  restaurant group, running and overseeing all culinary aspects of its two restaurants. Currently, Chef
                  Kevin spends his time consulting around the globe, performing select private chef engagements, and
                  catering choice events.
                </p>
              </div>
            </div>

            <div className="md:pt-10">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <img
                  src="/images/biography.jpg"
                  alt="Chef Kevin Thai"
                  className="w-full h-[520px] object-cover"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
