"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type ActionResult = { success?: string; error?: string };

export default function NewVehicleForm({
  action,
}: {
  action: (formData: FormData) => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
          const res = await action(formData);

          if (res?.error) {
            toast.error(res.error);
            return;
          }

          toast.success("vehicle added");
          router.push("/admin/vehicles");
          router.refresh();
        });
      }}
      style={{ display: "grid", gap: 10 }}
    >
      <Field label='Name'>
        <input name='name' style={inputStyle} disabled={isPending} />
      </Field>

      <Field label='Image URL (optional)'>
        <input name='imageUrl' style={inputStyle} disabled={isPending} />
      </Field>

      <Field label='Description (optional)'>
        <textarea
          name='description'
          style={textareaStyle}
          disabled={isPending}
        />
      </Field>

      <Grid2>
        <Field label='Capacity (pax)'>
          <input
            name='capacity'
            type='number'
            inputMode='numeric'
            defaultValue='7'
            style={inputStyle}
            disabled={isPending}
          />
        </Field>

        <Field label='Luggage capacity'>
          <input
            name='luggageCapacity'
            type='number'
            inputMode='numeric'
            defaultValue='6'
            style={inputStyle}
            disabled={isPending}
          />
        </Field>

        <Field
          label='Min hours (hourly bookings)'
          hint='SUV: 2 • Vans/Buses: 3 • Use 0 for non-hourly-only categories'
        >
          <input
            name='minHours'
            type='number'
            inputMode='numeric'
            defaultValue='2'
            style={inputStyle}
            disabled={isPending}
          />
        </Field>

        <Field label='Sort order' hint='Lower shows first (10, 20, 30...)'>
          <input
            name='sortOrder'
            type='number'
            inputMode='numeric'
            defaultValue='10'
            style={inputStyle}
            disabled={isPending}
          />
        </Field>
      </Grid2>

      <fieldset style={fieldsetStyle}>
        <legend style={legendStyle}>Pricing ($)</legend>

        <Grid2>
          <Field label='Base fare'>
            <input
              name='baseFare'
              type='number'
              step='0.01'
              inputMode='decimal'
              defaultValue='0.00'
              style={inputStyle}
              disabled={isPending}
            />
          </Field>
          <Field label='Per mile'>
            <input
              name='perMile'
              type='number'
              step='0.01'
              inputMode='decimal'
              defaultValue='2.75'
              style={inputStyle}
              disabled={isPending}
            />
          </Field>
          <Field label='Per minute'>
            <input
              name='perMinute'
              type='number'
              step='0.01'
              inputMode='decimal'
              defaultValue='0.00'
              style={inputStyle}
              disabled={isPending}
            />
          </Field>
          <Field label='Per hour'>
            <input
              name='perHour'
              type='number'
              step='0.01'
              inputMode='decimal'
              defaultValue='95.00'
              style={inputStyle}
              disabled={isPending}
            />
          </Field>
        </Grid2>
      </fieldset>

      <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <input
          type='checkbox'
          name='active'
          defaultChecked
          disabled={isPending}
        />
        Active
      </label>

      <button type='submit' style={submitBtnStyle} disabled={isPending}>
        {isPending ? "Creating..." : "Create"}
      </button>
    </form>
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
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      {children}
      {hint ? <div style={{ fontSize: 12, opacity: 0.6 }}>{hint}</div> : null}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "0.75rem",
  borderRadius: 10,
  border: "1px solid rgba(0,0,0,0.15)",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 90,
};

const submitBtnStyle: React.CSSProperties = {
  padding: "0.8rem 1rem",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.2)",
  cursor: "pointer",
  justifySelf: "start",
};

const fieldsetStyle: React.CSSProperties = {
  border: "1px solid rgba(0,0,0,0.12)",
  borderRadius: 14,
  padding: 12,
};

const legendStyle: React.CSSProperties = {
  fontSize: 12,
  opacity: 0.7,
  padding: "0 6px",
};
