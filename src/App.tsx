import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HomeSection from "@/sections/HomeSection";
import MenuSection from "@/sections/MenuSection";
import GallerySection from "@/sections/GallerySection";
import AboutSection from "@/sections/AboutSection";
import ContactSection from "@/sections/ContactSection";
import type { SectionId } from "@/utils/scroll";

export default function App() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SectionId;
    if (!hash) return;
    const el = document.getElementById(hash);
    if (!el) return;
    // let layout paint first
    setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HomeSection />
        <MenuSection />
        <GallerySection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
