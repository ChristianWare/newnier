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

const VehicleUnitSchema = z.object({
  id: z.string().optional(),

  name: z.string().min(2),

  // optional
  plate: z.string().optional().nullable(),
  vin: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),

  categoryId: z.string().min(1),

  capacityOverride: z
    .union([z.coerce.number().int().min(1), z.literal(""), z.undefined()])
    .optional(),
  luggageCapacityOverride: z
    .union([z.coerce.number().int().min(0), z.literal(""), z.undefined()])
    .optional(),

  active: z.coerce.boolean(),
});

export async function createVehicleUnit(formData: FormData) {
  await requireAdmin();
  const parsed = VehicleUnitSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid vehicle unit data." };

  const d = parsed.data;
  await db.vehicleUnit.create({
    data: {
      name: d.name,
      plate: d.plate || null,
      vin: d.vin || null,
      notes: d.notes || null,
      categoryId: d.categoryId,
      capacityOverride:
        typeof d.capacityOverride === "number" ? d.capacityOverride : null,
      luggageCapacityOverride:
        typeof d.luggageCapacityOverride === "number"
          ? d.luggageCapacityOverride
          : null,
      active: d.active,
    },
  });

  return { success: true };
}

export async function updateVehicleUnit(formData: FormData) {
  await requireAdmin();
  const parsed = VehicleUnitSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success || !parsed.data.id)
    return { error: "Invalid vehicle unit data." };

  const d = parsed.data;
  await db.vehicleUnit.update({
    where: { id: d.id },
    data: {
      name: d.name,
      plate: d.plate || null,
      vin: d.vin || null,
      notes: d.notes || null,
      categoryId: d.categoryId,
      capacityOverride:
        typeof d.capacityOverride === "number" ? d.capacityOverride : null,
      luggageCapacityOverride:
        typeof d.luggageCapacityOverride === "number"
          ? d.luggageCapacityOverride
          : null,
      active: d.active,
    },
  });

  return { success: true };
}

export async function toggleVehicleUnit(id: string, active: boolean) {
  await requireAdmin();
  await db.vehicleUnit.update({ where: { id }, data: { active } });
  return { success: true };
}
