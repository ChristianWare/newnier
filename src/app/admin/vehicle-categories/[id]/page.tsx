import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateVehicleCategory } from "../../../../../actions/admin/vehicleCategories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditVehicleCategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const category = await db.vehicle.findUnique({ where: { id } });
  if (!category) return notFound();

  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 820 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>Edit vehicle category</h1>

      <form
        action={async (fd) => {
          "use server";
          fd.set("id", id);
          await updateVehicleCategory(fd);
        }}
        style={{ display: "grid", gap: 10 }}
      >
        <Grid2>
          <Field label='Name' name='name' defaultValue={category.name} />
          <Field
            label='Image URL (optional)'
            name='imageUrl'
            defaultValue={category.imageUrl ?? ""}
          />
        </Grid2>

        <Field
          label='Description (optional)'
          name='description'
          defaultValue={category.description ?? ""}
        />

        <Grid3>
          <Field
            label='Capacity (pax)'
            name='capacity'
            defaultValue={String(category.capacity)}
          />
          <Field
            label='Luggage capacity'
            name='luggageCapacity'
            defaultValue={String(category.luggageCapacity)}
          />
          <Field
            label='Sort order'
            name='sortOrder'
            defaultValue={String(category.sortOrder)}
          />
        </Grid3>

        <h3 style={{ margin: "10px 0 0", fontSize: 14, opacity: 0.85 }}>
          Pricing (cents)
        </h3>
        <Grid2>
          <Field
            label='Base fare'
            name='baseFareCents'
            defaultValue={String(category.baseFareCents)}
          />
          <Field
            label='Per mile'
            name='perMileCents'
            defaultValue={String(category.perMileCents)}
          />
          <Field
            label='Per minute'
            name='perMinuteCents'
            defaultValue={String(category.perMinuteCents)}
          />
          <Field
            label='Per hour'
            name='perHourCents'
            defaultValue={String(category.perHourCents)}
          />
        </Grid2>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type='checkbox'
            name='active'
            defaultChecked={category.active}
          />
          Active
        </label>

        <button type='submit' style={btnStyle}>
          Save
        </button>
      </form>
    </section>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "0.8rem 1rem",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.2)",
  cursor: "pointer",
  justifySelf: "start",
};

function Grid2({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
      {children}
    </div>
  );
}
function Grid3({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  name,
  defaultValue,
}: {
  label: string;
  name: string;
  defaultValue: string;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      <input
        name={name}
        defaultValue={defaultValue}
        style={{
          padding: "0.75rem",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      />
    </div>
  );
}
