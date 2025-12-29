"use server";

import { z } from "zod";
import { db } from "@/lib/db";
import { auth } from "../../auth";
import { revalidatePath } from "next/cache";

type ActionResult = { success?: string; error?: string };

async function requireAdmin() {
  const session = await auth();

  // Adjust these fields if your session shape differs
  if (!session?.user?.userId || session.user.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  return session;
}

function formDataToObject(formData: FormData) {
  return Object.fromEntries(formData.entries());
}

// Convert "" -> undefined, otherwise string
const optString = z.preprocess((v) => {
  if (v === "" || v == null) return undefined;
  return String(v);
}, z.string().optional());

// Convert ""/null/undefined -> undefined, else number
const optInt = (min?: number) =>
  z.preprocess(
    (v) => {
      if (v === "" || v == null) return undefined;

      const n = Number(v);
      if (Number.isNaN(n)) return undefined;
      return n;
    },
    min != null
      ? z.number().int().min(min).optional()
      : z.number().int().optional()
  );

// Convert checkbox values -> boolean
const boolFromCheckbox = z.preprocess((v) => {
  // FormData checkboxes: "on" if checked, null/undefined if unchecked
  if (v === "on") return true;
  if (v === true) return true;
  if (v === "true") return true;
  return false;
}, z.boolean());

const VehicleUnitBaseSchema = z.object({
  name: z.string().min(2, "Name is required"),
  categoryId: z.string().min(1, "Category is required"),

  // optional
  plate: optString.nullable().optional(),
  vin: optString.nullable().optional(),
  notes: optString.nullable().optional(),

  // optional overrides (blank => null)
  capacityOverride: optInt(1).optional(),
  luggageCapacityOverride: optInt(0).optional(),

  active: boolFromCheckbox,
});

const VehicleUnitCreateSchema = VehicleUnitBaseSchema;

const VehicleUnitUpdateSchema = VehicleUnitBaseSchema.extend({
  id: z.string().min(1),
});

export async function createVehicleUnit(
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = VehicleUnitCreateSchema.safeParse(
      formDataToObject(formData)
    );
    if (!parsed.success) return { error: "Invalid vehicle unit data." };

    const d = parsed.data;

    await db.vehicleUnit.create({
      data: {
        name: d.name,
        categoryId: d.categoryId,

        plate: d.plate ? d.plate : null,
        vin: d.vin ? d.vin : null,
        notes: d.notes ? d.notes : null,

        capacityOverride:
          typeof d.capacityOverride === "number" ? d.capacityOverride : null,
        luggageCapacityOverride:
          typeof d.luggageCapacityOverride === "number"
            ? d.luggageCapacityOverride
            : null,

        active: d.active,
      },
    });

    revalidatePath("/admin/vehicles");
    return { success: "vehicle added" };
  } catch (e: any) {
    return { error: e?.message ?? "Failed to create vehicle." };
  }
}

export async function updateVehicleUnit(
  formData: FormData
): Promise<ActionResult> {
  try {
    await requireAdmin();

    const parsed = VehicleUnitUpdateSchema.safeParse(
      formDataToObject(formData)
    );
    if (!parsed.success) return { error: "Invalid vehicle unit data." };

    const d = parsed.data;

    await db.vehicleUnit.update({
      where: { id: d.id },
      data: {
        name: d.name,
        categoryId: d.categoryId,

        plate: d.plate ? d.plate : null,
        vin: d.vin ? d.vin : null,
        notes: d.notes ? d.notes : null,

        capacityOverride:
          typeof d.capacityOverride === "number" ? d.capacityOverride : null,
        luggageCapacityOverride:
          typeof d.luggageCapacityOverride === "number"
            ? d.luggageCapacityOverride
            : null,

        active: d.active,
      },
    });

    revalidatePath("/admin/vehicles");
    revalidatePath(`/admin/vehicles/${d.id}`);
    return { success: "vehicle updated" };
  } catch (e: any) {
    return { error: e?.message ?? "Failed to update vehicle." };
  }
}

export async function toggleVehicleUnit(
  id: string,
  active: boolean
): Promise<ActionResult> {
  try {
    await requireAdmin();

    await db.vehicleUnit.update({ where: { id }, data: { active } });

    revalidatePath("/admin/vehicles");
    return { success: active ? "vehicle enabled" : "vehicle disabled" };
  } catch (e: any) {
    return { error: e?.message ?? "Failed to update vehicle." };
  }
}
