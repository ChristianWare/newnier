"use client";

import { servicesData } from "@/lib/services";
import ServiceSlugPageIntro from "../ServiceSlugPageIntro/ServiceSlugPageIntro";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

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
    </main>
  );
}
