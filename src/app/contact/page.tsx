import BlogSection from "@/components/BlogPage/BlogSection/BlogSection";
import ContactPageIntro from "@/components/ContactPage/ContactPageIntro/ContactPageIntro";
import HowItWorks from "@/components/HomePage/HowItWorks/HowItWorks";
import Testimonials from "@/components/HomePage/Testimonials/Testimonials";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";

export default function ContactPage() {
  return (
    <main>
      <ContactPageIntro />
      <HowItWorks />
      <Testimonials />
      <BlogSection />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
