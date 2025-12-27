import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { updateVehicleUnit } from "../../../../../actions/admin/vehicleUnits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function EditVehicleUnitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [unit, categories] = await Promise.all([
    db.vehicleUnit.findUnique({ where: { id } }),
    db.vehicle.findMany({
      orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
    }),
  ]);

  if (!unit) return notFound();

  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 820 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>Edit vehicle (unit)</h1>

      <form
        action={async (fd) => {
          "use server";
          fd.set("id", id);
          await updateVehicleUnit(fd);
        }}
        style={{ display: "grid", gap: 10 }}
      >
        <Grid2>
          <Field label='Name' name='name' defaultValue={unit.name} />
          <Select
            label='Category'
            name='categoryId'
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
            defaultValue={unit.categoryId}
          />
        </Grid2>

        <Grid2>
          <Field
            label='Plate (optional)'
            name='plate'
            defaultValue={unit.plate ?? ""}
          />
          <Field
            label='VIN (optional)'
            name='vin'
            defaultValue={unit.vin ?? ""}
          />
        </Grid2>

        <Grid2>
          <Field
            label='Capacity override (optional)'
            name='capacityOverride'
            defaultValue={
              unit.capacityOverride ? String(unit.capacityOverride) : ""
            }
          />
          <Field
            label='Luggage override (optional)'
            name='luggageCapacityOverride'
            defaultValue={
              unit.luggageCapacityOverride
                ? String(unit.luggageCapacityOverride)
                : ""
            }
          />
        </Grid2>

        <Field
          label='Notes (optional)'
          name='notes'
          defaultValue={unit.notes ?? ""}
        />

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type='checkbox' name='active' defaultChecked={unit.active} />
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

function Select({
  label,
  name,
  options,
  defaultValue,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  defaultValue: string;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        style={{
          padding: "0.75rem",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
