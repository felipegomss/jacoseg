import About from "@/components/About";
import Brands from "@/components/Brands";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 relative">
      <Header />
      <Hero />
      <Brands />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}
