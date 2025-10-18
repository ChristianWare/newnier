import AboutUsIntro from "@/components/HomePage/AboutUsIntro/AboutUsIntro";
import Events from "@/components/HomePage/Events/Events";
import Faq from "@/components/HomePage/Faq/Faq";
import Fleet from "@/components/HomePage/Fleet/Fleet";
import Hero from "@/components/HomePage/Hero/Hero";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import Pitch from "@/components/HomePage/Pitch/Pitch";
import ServiceAreas from "@/components/HomePage/ServiceAreas/ServiceAreas";
import ServicesPreview from "@/components/HomePage/ServicesPreview/ServicesPreview";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";
import { homeQuestions } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <AboutUsIntro />
      <ServicesPreview />
      <Pitch />
      <ServiceAreas />
      <Fleet />
      <HowItWorks />
      <Testimonials />
      <Events />
      <Faq items={homeQuestions} />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
