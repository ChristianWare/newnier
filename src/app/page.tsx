import AboutUsIntro from "@/components/HomePage/AboutUsIntro/AboutUsIntro";
import Hero from "@/components/HomePage/Hero/Hero";
import ServicesPreview from "@/components/HomePage/ServicesPreview/ServicesPreview";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUsIntro />
      <ServicesPreview />
    </main>
  );
}
