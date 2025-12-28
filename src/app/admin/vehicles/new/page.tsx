import { createVehicle } from "../../../../../actions/admin/vehicles";
import NewVehicleForm from "./NewVehicleForm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function NewVehiclePage() {
  async function action(formData: FormData) {
    "use server";
    return await createVehicle(formData);
  }

  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 760 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>New vehicle category</h1>
      <NewVehicleForm action={action} />
    </section>
  );
}
