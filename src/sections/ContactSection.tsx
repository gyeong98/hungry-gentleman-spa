import { motion } from "framer-motion";
import { useMemo, useState } from "react";

type Fields = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export default function ContactSection() {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [touched, setTouched] = useState<Record<keyof Fields, boolean>>({
    name: false,
    email: false,
    phone: false,
    subject: false,
    message: false,
  });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const errors = useMemo(() => {
    const e: Partial<Record<keyof Fields, string>> = {};
    if (!fields.name.trim()) e.name = "Please enter your name.";
    if (!fields.email.trim()) e.email = "Please enter your email.";
    else if (!isEmail(fields.email.trim())) e.email = "Please enter a valid email.";
    if (!fields.phone.trim()) e.phone = "Please enter your phone number.";
    if (!fields.subject.trim()) e.subject = "Please enter a subject.";
    if (!fields.message.trim()) e.message = "Please enter a message.";
    return e;
  }, [fields]);

  const canSubmit = Object.keys(errors).length === 0;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true, subject: true, message: true });
    if (!canSubmit) return;

    // Safe, no exposed tokens: open user's email client
    const to = "geonyeongkim98@gmail.com";
    const subject = encodeURIComponent(fields.subject);
    const body = encodeURIComponent(
      `Name: ${fields.name}\nEmail: ${fields.email}\nPhone: ${fields.phone}\n\n${fields.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;

    setStatus("sent");
  };

  const inputBase =
    "w-full rounded-2xl bg-white/[0.03] border border-white/10 px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-white/30";

  return (
    <section id="contact" className="scroll-mt-24 bg-black py-20 border-t border-white/10">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.4 }}
        >
          <div className="text-xs tracking-[0.35em] uppercase text-white/60">Contact</div>
          <h2 className="mt-4 font-brand text-4xl md:text-5xl">Let’s plan your dinner</h2>
          <p className="mt-4 text-white/70">
            Send an inquiry and we’ll get back to you with availability and next steps.
          </p>

          <form
            className="mt-10 space-y-6"
            onSubmit={onSubmit}
            name="contact"
            method="POST"
            data-netlify="true"
          >
            {/* Netlify Forms hidden field */}
            <input type="hidden" name="form-name" value="contact" />

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  className={inputBase + (touched.name && errors.name ? " border-red-400/60" : "")}
                  placeholder="Enter your name"
                  value={fields.name}
                  onChange={(ev) => setFields((p) => ({ ...p, name: ev.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, name: true }))}
                />
                {touched.name && errors.name && <p className="mt-2 text-sm text-red-300">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className={inputBase + (touched.email && errors.email ? " border-red-400/60" : "")}
                  placeholder="Enter your email"
                  value={fields.email}
                  onChange={(ev) => setFields((p) => ({ ...p, email: ev.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, email: true }))}
                />
                {touched.email && errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="phone">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  className={inputBase + (touched.phone && errors.phone ? " border-red-400/60" : "")}
                  placeholder="Enter your phone number"
                  value={fields.phone}
                  onChange={(ev) => setFields((p) => ({ ...p, phone: ev.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, phone: true }))}
                />
                {touched.phone && errors.phone && <p className="mt-2 text-sm text-red-300">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-sm text-white/70 mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  className={inputBase + (touched.subject && errors.subject ? " border-red-400/60" : "")}
                  placeholder="Type the subject"
                  value={fields.subject}
                  onChange={(ev) => setFields((p) => ({ ...p, subject: ev.target.value }))}
                  onBlur={() => setTouched((p) => ({ ...p, subject: true }))}
                />
                {touched.subject && errors.subject && (
                  <p className="mt-2 text-sm text-red-300">{errors.subject}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/70 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                className={
                  inputBase +
                  " min-h-[160px]" +
                  (touched.message && errors.message ? " border-red-400/60" : "")
                }
                placeholder="Type your message here..."
                value={fields.message}
                onChange={(ev) => setFields((p) => ({ ...p, message: ev.target.value }))}
                onBlur={() => setTouched((p) => ({ ...p, message: true }))}
              />
              {touched.message && errors.message && <p className="mt-2 text-sm text-red-300">{errors.message}</p>}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className={
                  "rounded-full px-7 py-3 text-sm font-medium transition " +
                  (canSubmit ? "bg-white text-black hover:opacity-90" : "bg-white/20 text-white/60")
                }
              >
                Submit
              </button>
              {status === "sent" && (
                <span className="text-sm text-white/70">Email client opened — thanks!</span>
              )}
            </div>

            <div className="text-sm text-white/60">
              Or DM on{" "}
              <a
                className="text-white underline underline-offset-4 hover:opacity-90"
                href="https://www.instagram.com/thehungrygentleman/"
                target="_blank"
                rel="noreferrer"
              >
                Instagram
              </a>
              .
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
