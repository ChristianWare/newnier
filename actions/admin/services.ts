"use server";

import { db } from "@/lib/db";
import { auth } from "../../auth";
import { z } from "zod";

const ServiceSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(2),
  slug: z.string().min(2),
  pricingStrategy: z.enum(["POINT_TO_POINT", "HOURLY", "FLAT"]),
  minFareCents: z.coerce.number().int().min(0),
  baseFeeCents: z.coerce.number().int().min(0),
  perMileCents: z.coerce.number().int().min(0),
  perMinuteCents: z.coerce.number().int().min(0),
  perHourCents: z.coerce.number().int().min(0),
  sortOrder: z.coerce.number().int().min(0),
  active: z.coerce.boolean(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.userId || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

export async function createService(formData: FormData) {
  await requireAdmin();

  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid service data." };

  const data = parsed.data;
  await db.serviceType.create({
    data: {
      name: data.name,
      slug: data.slug,
      pricingStrategy: data.pricingStrategy,
      minFareCents: data.minFareCents,
      baseFeeCents: data.baseFeeCents,
      perMileCents: data.perMileCents,
      perMinuteCents: data.perMinuteCents,
      perHourCents: data.perHourCents,
      sortOrder: data.sortOrder,
      active: data.active,
    },
  });

  return { success: true };
}

export async function updateService(formData: FormData) {
  await requireAdmin();

  const parsed = ServiceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || !parsed.data.id)
    return { error: "Invalid service data." };

  const data = parsed.data;
  await db.serviceType.update({
    where: { id: data.id },
    data: {
      name: data.name,
      slug: data.slug,
      pricingStrategy: data.pricingStrategy,
      minFareCents: data.minFareCents,
      baseFeeCents: data.baseFeeCents,
      perMileCents: data.perMileCents,
      perMinuteCents: data.perMinuteCents,
      perHourCents: data.perHourCents,
      sortOrder: data.sortOrder,
      active: data.active,
    },
  });

  return { success: true };
}

export async function toggleService(id: string, active: boolean) {
  await requireAdmin();
  await db.serviceType.update({ where: { id }, data: { active } });
  return { success: true };
}
