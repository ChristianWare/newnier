"use client";

import { servicesData } from "@/lib/services";
import ServiceSlugPageIntro from "../ServiceSlugPageIntro/ServiceSlugPageIntro";
import ServiceDetails from "../ServiceDetails/ServiceDetails";
import FinalCTA2 from "@/components/shared/FinalCTA2/FinalCTA2";
import Footer from "@/components/shared/Footer/Footer";
import Nav from "@/components/shared/Nav/Nav";

/** Exact, readonly type derived from your data */
type Service = (typeof servicesData)[number];

export default function ServiceDetailsClient({
  service,
}: {
  service: Service;
}) {
  return (
    <main>
      <ServiceSlugPageIntro service={service} />
      <ServiceDetails service={service} />
      <FinalCTA2 />
      <Footer />
    </main>
  );
}
