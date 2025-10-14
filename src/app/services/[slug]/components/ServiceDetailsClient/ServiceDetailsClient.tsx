"use client";

import { services } from "@/lib/data";
import ServiceSlugPageIntro from "../ServiceSlugPageIntro/ServiceSlugPageIntro";
import ServiceDetails from "../ServiceDetails/ServiceDetails";

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
      <ServiceDetails service={service} />
    </main>
  );
}
