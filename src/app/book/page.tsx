import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import BookWizard from "@/components/BookingPage/BookWizard/BookWizard";
import Nav from "@/components/shared/Nav/Nav";
import Hero from "@/components/HomePage/Hero/Hero";
import BookingPageIntro from "@/components/BookingPage/BookingPageIntro/BookingPageIntro";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function BookPage() {
  const session = await auth();
  if (!session) redirect("/login?next=/book");

  const serviceTypes = await db.serviceType.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      slug: true,
      pricingStrategy: true,
      minFareCents: true,
      baseFeeCents: true,
      perMileCents: true,
      perMinuteCents: true,
      perHourCents: true,
    },
  });

  const vehicles = await db.vehicle.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    select: {
      id: true,
      name: true,
      description: true,
      capacity: true,
      luggageCapacity: true,
      imageUrl: true,
      baseFareCents: true,
      perMileCents: true,
      perMinuteCents: true,
      perHourCents: true,
    },
  });

  return (
    <main>
      <Nav />
      <BookingPageIntro />
      <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>Book a Ride</h1>
      <p style={{ opacity: 0.75, marginBottom: "1.5rem" }}>
        Request a ride. A dispatcher will confirm and send a payment link.
      </p>

      <BookWizard serviceTypes={serviceTypes} vehicles={vehicles} />
    </main>
  );
}
