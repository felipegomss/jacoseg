import Header from "@/components/landing/header";
import Hero from "@/components/landing/hero";
import Services from "@/components/landing/services";
import About from "@/components/landing/about";
import Brands from "@/components/landing/brands";
import CtaBanner from "@/components/landing/cta-banner";
import Contact from "@/components/landing/contact";
import Footer from "@/components/landing/footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Brands />
        <Services />
        <About />
        <CtaBanner />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
