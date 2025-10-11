import AboutUsIntro from "@/components/HomePage/AboutUsIntro/AboutUsIntro";
import Fleet from "@/components/HomePage/Fleet/Fleet";
import Hero from "@/components/HomePage/Hero/Hero";
import Pitch from "@/components/HomePage/Pitch/Pitch";
import ServiceAreas from "@/components/HomePage/ServiceAreas/ServiceAreas";
import ServicesPreview from "@/components/HomePage/ServicesPreview/ServicesPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUsIntro />
      <ServicesPreview />
      <Pitch />
      <ServiceAreas />
      <Fleet />
    </main>
  );
}
