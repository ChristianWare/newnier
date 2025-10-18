import Events from "@/components/HomePage/Events/Events";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import AllServices from "@/components/ServicesPage/AllServices/AllServices";
import ServicePageIntro from "@/components/ServicesPage/ServicePageIntro/ServicePageIntro";
import ServicesPostHero from "@/components/ServicesPage/ServicesPostHero/ServicesPostHero";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";

export default function ServicesPage() {
  return (
    <main>
      <Nav />
      <ServicePageIntro />
      <ServicesPostHero />
      <AllServices />
      <Testimonials />
      <Events />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
