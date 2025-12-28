"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import toast from "react-hot-toast";

type ActionResult = { success?: string; error?: string };

type VehicleDTO = {
  id: string;
  name: string;
  imageUrl: string | null;
  description: string | null;
  capacity: number;
  luggageCapacity: number;
  minHours: number;
  sortOrder: number;
  baseFareCents: number;
  perMileCents: number;
  perMinuteCents: number;
  perHourCents: number;
  active: boolean;
};

function centsToDollarsInput(cents: number) {
  return (cents / 100).toFixed(2);
}

export default function EditVehicleForm({
  vehicle,
  onUpdate,
  onDelete,
}: {
  vehicle: VehicleDTO;
  onUpdate: (formData: FormData) => Promise<ActionResult>;
  onDelete: () => Promise<ActionResult>;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);

          startTransition(async () => {
            const res = await onUpdate(formData);

            if (res?.error) {
              toast.error(res.error);
              return;
            }

            toast.success("vehicle updated");
            router.refresh();
          });
        }}
        style={{ display: "grid", gap: 10 }}
      >
        <Field label='Name'>
          <input
            name='name'
            defaultValue={vehicle.name}
            style={inputStyle}
            disabled={isPending}
          />
        </Field>

        <Field label='Image URL (optional)'>
          <input
            name='imageUrl'
            defaultValue={vehicle.imageUrl ?? ""}
            style={inputStyle}
            disabled={isPending}
          />
        </Field>

        <Field label='Description (optional)'>
          <textarea
            name='description'
            defaultValue={vehicle.description ?? ""}
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
              defaultValue={String(vehicle.capacity)}
              style={inputStyle}
              disabled={isPending}
            />
          </Field>

          <Field label='Luggage capacity'>
            <input
              name='luggageCapacity'
              type='number'
              inputMode='numeric'
              defaultValue={String(vehicle.luggageCapacity)}
              style={inputStyle}
              disabled={isPending}
            />
          </Field>

          <Field label='Min hours (hourly bookings)'>
            <input
              name='minHours'
              type='number'
              inputMode='numeric'
              defaultValue={String(vehicle.minHours ?? 0)}
              style={inputStyle}
              disabled={isPending}
            />
          </Field>

          <Field label='Sort order'>
            <input
              name='sortOrder'
              type='number'
              inputMode='numeric'
              defaultValue={String(vehicle.sortOrder ?? 0)}
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
                defaultValue={centsToDollarsInput(vehicle.baseFareCents)}
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
                defaultValue={centsToDollarsInput(vehicle.perMileCents)}
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
                defaultValue={centsToDollarsInput(vehicle.perMinuteCents)}
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
                defaultValue={centsToDollarsInput(vehicle.perHourCents)}
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
            defaultChecked={vehicle.active}
            disabled={isPending}
          />
          Active
        </label>

        <button type='submit' style={submitBtnStyle} disabled={isPending}>
          {isPending ? "Saving..." : "Save changes"}
        </button>
      </form>

      <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 14 }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (
              !confirm("Delete this vehicle category? This cannot be undone.")
            )
              return;

            startTransition(async () => {
              const res = await onDelete();

              if (res?.error) {
                toast.error(res.error);
                return;
              }

              toast.success("vehicle deleted");
              router.push("/admin/vehicles");
              router.refresh();
            });
          }}
        >
          <button
            type='submit'
            style={{
              padding: "0.75rem 1rem",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.2)",
              cursor: "pointer",
              background: "transparent",
            }}
            disabled={isPending}
          >
            Delete vehicle category
          </button>
        </form>
      </div>
    </div>
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
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "grid", gap: 6 }}>
      <label style={{ fontSize: 12, opacity: 0.8 }}>{label}</label>
      {children}
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
