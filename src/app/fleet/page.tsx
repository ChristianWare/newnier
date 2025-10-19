import AboutNumbers from "@/components/AboutPage/AboutNumbers/AboutNumbers";
import BlogSection from "@/components/BlogPage/BlogSection/BlogSection";
import Fleetii from "@/components/FleetPage/Fleetii/Fleetii";
import FleetPageIntro from "@/components/FleetPage/FleetPageIntro/FleetPageIntro";
import FleetPostHero from "@/components/FleetPage/FleetPostHero/FleetPostHero";
import Faq from "@/components/HomePage/Faq/Faq";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";
import { homeQuestions } from "@/lib/data";

export default function FleetPage() {
  return (
    <main>
      <Nav />
      <FleetPageIntro />
      <FleetPostHero />
      <Fleetii />
      <Faq items={homeQuestions} />
      <AboutNumbers />
      <BlogSection />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
