"use client";

import { services } from "@/lib/data";
import ServiceSlugPageIntro from "../ServiceSlugPageIntro/ServiceSlugPageIntro";
// import ReviewSection from "@/components/homepage/ReviewSection/ReviewSection";
import Faq from "@/components/HomePage/Faq/Faq";
import FinalCTA from "@/components/shared/FinalCTA/FinalCTA";
import ContactSection from "@/components/shared/ContactSection/ContactSection";
import Footer from "@/components/shared/Footer/Footer";

/** Exact, readonly type derived from your data */
type Service = (typeof services)[number];

export default function ServiceDetailsClient({
  service,
}: {
  service: Service;
}) {
  return (
    <main>
      <ServiceSlugPageIntro service={service} />
      {/* <ReviewSection /> */}
      <Faq />
      <FinalCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}
