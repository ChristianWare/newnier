import AboutNumbers from "@/components/AboutPage/AboutNumbers/AboutNumbers";
import BlogSection from "@/components/BlogPage/BlogSection/BlogSection";
import Fleetii from "@/components/FleetPage/Fleetii/Fleetii";
import FleetPageIntro from "@/components/FleetPage/FleetPageIntro/FleetPageIntro";
import FleetPostHero from "@/components/FleetPage/FleetPostHero/FleetPostHero";
import Faq from "@/components/HomePage/Faq/Faq";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import { homeQuestions } from "@/lib/data";

export default function FleetPage() {
  return (
    <main>
      <FleetPageIntro />
      <FleetPostHero />
      <Fleetii />
      <Faq items={homeQuestions} />
      <AboutNumbers />
      <BlogSection />
      <FinalCTA2 />
      
    </main>
  );
}
