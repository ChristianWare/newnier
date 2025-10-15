import Fleetii from "@/components/FleetPage/Fleetii/Fleetii";
import FleetPageIntro from "@/components/FleetPage/FleetPageIntro/FleetPageIntro";
import FleetPostHero from "@/components/FleetPage/FleetPostHero/FleetPostHero";
import Faq from "@/components/HomePage/Faq/Faq";
import { homeQuestions } from "@/lib/data";

export default function FleetPage() {
  return (
    <main>
      <FleetPageIntro />
      <FleetPostHero />
      <Fleetii />
      <Faq items={homeQuestions} />
    </main>
  );
}
