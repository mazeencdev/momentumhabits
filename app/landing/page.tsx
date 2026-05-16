import About from "./components/about";
import Features from "./components/features";
import Footer from "./components/footer";
import Hero from "./components/hero";
import Navbar from "./components/navbar";
import CTA from "./components/showcase";

export default function LandingPage() {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
