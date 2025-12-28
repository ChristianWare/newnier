import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import {
  updateVehicle,
  deleteVehicle,
} from "../../../../../actions/admin/vehicles";
import EditVehicleForm from "./EditVehicleForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const vehicle = await db.vehicle.findUnique({ where: { id } });
  if (!vehicle) notFound();

  async function updateAction(formData: FormData) {
    "use server";
    return await updateVehicle(id, formData);
  }

  async function deleteAction() {
    "use server";
    return await deleteVehicle(id);
  }

  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 760 }}>
      <header style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ margin: 0, fontSize: 22 }}>Edit vehicle category</h1>
        <Link href='/admin/vehicles'>Back</Link>
      </header>

      <EditVehicleForm
        vehicle={vehicle}
        onUpdate={updateAction}
        onDelete={deleteAction}
      />
    </section>
  );
}
