import { motion } from "framer-motion";

type Course = { title: string; desc: string };

const firstCourses: Course[] = [
  {
    title: "Orange Fennel Salad",
    desc: "Baby Kale | Chorizo | Avocado | Parmesan | Black olives | Sourdough crostini | Citrus vinaigrette",
  },
  {
    title: "Cured Hamachi Crudo",
    desc: "Wasabi cream | Soy & sesame onion dressing | Pickled cucumbers | Puffed rice | Ramp oil | Finger limes",
  },
];

const secondCourse: Course[] = [
  {
    title: "Fresh Corn & Stracciatella Cappelletti",
    desc: "Seared Scallops | Fresh corn puree | Chanterelles | Charred corn | Parmesan emulsion | Popcorn | Black Truffle",
  },
];

const thirdCourse: Course[] = [
  {
    title: "Caramelized Beef Tenderloin",
    desc: "Honey nut puree | Summer market vegetables | Roquefort emulsion | Balsamic cipollini | Marionberry & pepper beef jus",
  },
];

const dessert: Course[] = [
  {
    title: "Dessert Duo",
    desc: "Earl grey chocolate chip carrot cake | S'Mores Tart",
  },
];

function CourseBlock({ title, items }: { title: string; items: Course[] }) {
  return (
    <div className="mt-10">
      <div className="text-xs tracking-[0.35em] uppercase text-white/60">{title}</div>
      <div className="mt-5 space-y-6">
        {items.map((c) => (
          <div key={c.title} className="border-b border-white/10 pb-6">
            <div className="font-serif text-xl text-white">{c.title}</div>
            <div className="mt-2 text-white/70 leading-relaxed">{c.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenuSection() {
  return (
    <section id="menu" className="scroll-mt-24 bg-black py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xs tracking-[0.35em] uppercase text-white/60">Sample Menu</div>
          <h2 className="mt-4 font-brand text-4xl md:text-5xl">Chef Kevin Thai</h2>
          <div className="mt-6 h-px w-full bg-white/10" />

          <CourseBlock title="First Courses" items={firstCourses} />
          <CourseBlock title="Second Course" items={secondCourse} />
          <CourseBlock title="Third Course" items={thirdCourse} />
          <CourseBlock title="Dessert" items={dessert} />

          <div className="mt-10 text-sm text-white/60">
            Menu items may change based on seasonal availability.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
