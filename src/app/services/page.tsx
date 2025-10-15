import Events from "@/components/HomePage/Events/Events";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import AllServices from "@/components/ServicesPage/AllServices/AllServices";
import ServicePageIntro from "@/components/ServicesPage/ServicePageIntro/ServicePageIntro";
import ServicesPostHero from "@/components/ServicesPage/ServicesPostHero/ServicesPostHero";

export default function ServicesPage() {
  return (
    <main>
      <ServicePageIntro />
      <ServicesPostHero />
      <AllServices />
      <Testimonials />
      <Events />
    </main>
  );
}
