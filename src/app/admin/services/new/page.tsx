import { createService } from "../../../../../actions/admin/services";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default function NewServicePage() {
  return (
    <section style={{ display: "grid", gap: 14, maxWidth: 720 }}>
      <h1 style={{ margin: 0, fontSize: 22 }}>New service</h1>

      <form
        action={async (formData: FormData) => {
          "use server";
          // swallow return value so TS sees Promise<void>
          await createService(formData);
        }}
        style={{ display: "grid", gap: 10 }}
      >
        <Field label='Name' name='name' defaultValue='' />
        <Field
          label='Slug'
          name='slug'
          defaultValue=''
          hint='e.g. airport-transfers'
        />

        <Select
          label='Pricing strategy'
          name='pricingStrategy'
          options={["POINT_TO_POINT", "HOURLY", "FLAT"]}
        />

        <Grid2>
          <Field
            label='Min fare (cents)'
            name='minFareCents'
            defaultValue='5500'
          />
          <Field
            label='Base fee (cents)'
            name='baseFeeCents'
            defaultValue='0'
          />
          <Field
            label='Per mile (cents)'
            name='perMileCents'
            defaultValue='0'
          />
          <Field
            label='Per minute (cents)'
            name='perMinuteCents'
            defaultValue='0'
          />
          <Field
            label='Per hour (cents)'
            name='perHourCents'
            defaultValue='0'
          />
          <Field label='Sort order' name='sortOrder' defaultValue='0' />
        </Grid2>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input type='checkbox' name='active' defaultChecked />
          Active
        </label>

        <button
          type='submit'
          style={{
            padding: "0.8rem 1rem",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.2)",
            cursor: "pointer",
            justifySelf: "start",
          }}
        >
          Create
        </button>
      </form>
    </section>
  );
}

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
  hint,
}: {
  label: string;
  name: string;
  defaultValue: string;
  hint?: string;
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
      {hint ? <div style={{ fontSize: 12, opacity: 0.6 }}>{hint}</div> : null}
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
  options: string[];
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      <select
        name={name}
        defaultValue={options[0]}
        style={{
          padding: "0.75rem",
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.15)",
        }}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
