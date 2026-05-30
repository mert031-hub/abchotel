import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import ApartmentTypes from "@/components/ApartmentTypes";
import Gallery from "@/components/Gallery";
import Attractions from "@/components/Attractions";
import Reviews from "@/components/Reviews";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pb-16 lg:pb-0">
        <Hero />
        <About />
        <Features />
        <ApartmentTypes />
        <Gallery />
        <Attractions />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
