import AboutNumbers from "@/components/AboutPage/AboutNumbers/AboutNumbers";
import AboutPageIntro from "@/components/AboutPage/AboutPageIntro/AboutPageIntro";
import AboutServicesPreview from "@/components/AboutPage/AboutServicesPreview/AboutServicesPreview";
import Mission from "@/components/AboutPage/Mission/Mission";
import ServiceAreas from "@/components/AboutPage/ServiceAreas/ServiceAreas";
import Story from "@/components/AboutPage/Story/Story";
import Faq from "@/components/HomePage/Faq/Faq";
import { aboutQuestions } from "@/lib/data";

export default function AboutPage() {
  return (
    <main>
      <AboutPageIntro />
      <AboutNumbers />
      <Story />
      <AboutServicesPreview />
      <Mission />
      <ServiceAreas />
      <Faq items={aboutQuestions} />
    </main>
  );
}
