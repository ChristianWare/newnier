import { db } from "@/lib/db";
import { createVehicleUnit } from "../../../../../actions/admin/vehicleUnits";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function NewVehicleUnitPage() {
  const categories = await db.vehicle.findMany({
    where: { active: true },
    orderBy: [{ sortOrder: "asc" }, { name: "asc" }],
  });

  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 820 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>New vehicle (unit)</h1>

      <form
        action={async (fd) => {
          "use server";
          await createVehicleUnit(fd);
        }}
        style={{ display: "grid", gap: 10 }}
      >
        <Grid2>
          <Field label='Name' name='name' defaultValue='' />
          <Select
            label='Category'
            name='categoryId'
            options={categories.map((c) => ({ value: c.id, label: c.name }))}
          />
        </Grid2>

        <Grid2>
          <Field label='Plate (optional)' name='plate' defaultValue='' />
          <Field label='VIN (optional)' name='vin' defaultValue='' />
        </Grid2>

        <Grid2>
          <Field
            label='Capacity override (optional)'
            name='capacityOverride'
            defaultValue=''
          />
          <Field
            label='Luggage override (optional)'
            name='luggageCapacityOverride'
            defaultValue=''
          />
        </Grid2>

        <Field label='Notes (optional)' name='notes' defaultValue='' />

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type='checkbox' name='active' defaultChecked />
          Active
        </label>

        <button type='submit' style={btnStyle}>
          Create
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
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      <select
        name={name}
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
