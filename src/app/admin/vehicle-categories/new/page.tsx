import { createVehicleCategory } from "../../../../../actions/admin/vehicleCategories";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function NewVehicleCategoryPage() {
  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 820 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>New vehicle category</h1>

      <form
        action={async (fd) => {
          "use server";
          await createVehicleCategory(fd);
        }}
        style={{ display: "grid", gap: 10 }}
      >
        <Grid2>
          <Field label='Name' name='name' defaultValue='' />
          <Field label='Image URL (optional)' name='imageUrl' defaultValue='' />
        </Grid2>

        <Field
          label='Description (optional)'
          name='description'
          defaultValue=''
        />

        <Grid3>
          <Field label='Capacity (pax)' name='capacity' defaultValue='7' />
          <Field
            label='Luggage capacity'
            name='luggageCapacity'
            defaultValue='6'
          />
          <Field label='Sort order' name='sortOrder' defaultValue='0' />
        </Grid3>

        <h3 style={{ margin: "10px 0 0", fontSize: 14, opacity: 0.85 }}>
          Pricing (cents)
        </h3>
        <Grid2>
          <Field label='Base fare' name='baseFareCents' defaultValue='0' />
          <Field label='Per mile' name='perMileCents' defaultValue='0' />
          <Field label='Per minute' name='perMinuteCents' defaultValue='0' />
          <Field label='Per hour' name='perHourCents' defaultValue='0' />
        </Grid2>

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
