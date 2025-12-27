"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "../../auth";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.userId || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }
  return session;
}

const VehicleCategorySchema = z.object({
  id: z.string().optional(),

  name: z.string().min(2),
  description: z.string().optional().nullable(),
  capacity: z.coerce.number().int().min(1),
  luggageCapacity: z.coerce.number().int().min(0),
  imageUrl: z.string().optional().nullable(),

  baseFareCents: z.coerce.number().int().min(0),
  perMileCents: z.coerce.number().int().min(0),
  perMinuteCents: z.coerce.number().int().min(0),
  perHourCents: z.coerce.number().int().min(0),

  sortOrder: z.coerce.number().int().min(0),
  active: z.coerce.boolean(),
});

export async function createVehicleCategory(formData: FormData) {
  await requireAdmin();
  const parsed = VehicleCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid vehicle category data." };

  const d = parsed.data;
  await db.vehicle.create({
    data: {
      name: d.name,
      description: d.description ?? null,
      capacity: d.capacity,
      luggageCapacity: d.luggageCapacity,
      imageUrl: d.imageUrl ?? null,

      baseFareCents: d.baseFareCents,
      perMileCents: d.perMileCents,
      perMinuteCents: d.perMinuteCents,
      perHourCents: d.perHourCents,

      sortOrder: d.sortOrder,
      active: d.active,
    },
  });

  return { success: true };
}

export async function updateVehicleCategory(formData: FormData) {
  await requireAdmin();
  const parsed = VehicleCategorySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || !parsed.data.id)
    return { error: "Invalid vehicle category data." };

  const d = parsed.data;
  await db.vehicle.update({
    where: { id: d.id },
    data: {
      name: d.name,
      description: d.description ?? null,
      capacity: d.capacity,
      luggageCapacity: d.luggageCapacity,
      imageUrl: d.imageUrl ?? null,

      baseFareCents: d.baseFareCents,
      perMileCents: d.perMileCents,
      perMinuteCents: d.perMinuteCents,
      perHourCents: d.perHourCents,

      sortOrder: d.sortOrder,
      active: d.active,
    },
  });

  return { success: true };
}

export async function toggleVehicleCategory(id: string, active: boolean) {
  await requireAdmin();
  await db.vehicle.update({ where: { id }, data: { active } });
  return { success: true };
}
