import AboutNumbers from "@/components/AboutPage/AboutNumbers/AboutNumbers";
import AboutPageIntro from "@/components/AboutPage/AboutPageIntro/AboutPageIntro";
import AboutServicesPreview from "@/components/AboutPage/AboutServicesPreview/AboutServicesPreview";
import Story from "@/components/AboutPage/Story/Story";

export default function AboutPage() {
  return (
    <main>
      <AboutPageIntro />
      <AboutNumbers />
      <Story />
      <AboutServicesPreview />  
    </main>
  );
}
