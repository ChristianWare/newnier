"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// ✅ update these paths to match your project
import RoutePicker, {
  RoutePickerValue,
} from "@/components/BookingPage/RoutePicker/RoutePicker";
import { createBookingRequest } from "../../../../actions/bookings/createBookingRequest";

type PricingStrategy = "POINT_TO_POINT" | "HOURLY" | "FLAT";

type ServiceTypeDTO = {
  id: string;
  name: string;
  slug: string;
  pricingStrategy: PricingStrategy;
  minFareCents: number;
  baseFeeCents: number;
  perMileCents: number;
  perMinuteCents: number;
  perHourCents: number;
  active: boolean;
  sortOrder: number;
};

type VehicleDTO = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  luggageCapacity: number;
  imageUrl: string | null;

  // ✅ min hours for HOURLY bookings
  minHours: number;

  baseFareCents: number;
  perMileCents: number;
  perMinuteCents: number;
  perHourCents: number;

  active: boolean;
  sortOrder: number;
};

function centsToUsd(cents: number) {
  return (cents / 100).toFixed(2);
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Client-side estimate (NOT the source of truth)
 * Server still enforces minHours in createBookingRequest via calcQuoteCents.
 */
function estimateTotalCents(args: {
  service: ServiceTypeDTO;
  vehicle: VehicleDTO | null;
  distanceMiles: number;
  durationMinutes: number;
  hoursRequested: number;
}) {
  const { service, vehicle, distanceMiles, durationMinutes, hoursRequested } =
    args;

  // Prefer vehicle rates if they’re set (>0), else fall back to service.
  const base =
    vehicle && vehicle.baseFareCents > 0
      ? vehicle.baseFareCents
      : service.baseFeeCents;

  const perMile =
    vehicle && vehicle.perMileCents > 0
      ? vehicle.perMileCents
      : service.perMileCents;

  const perMinute =
    vehicle && vehicle.perMinuteCents > 0
      ? vehicle.perMinuteCents
      : service.perMinuteCents;

  const perHour =
    vehicle && vehicle.perHourCents > 0
      ? vehicle.perHourCents
      : service.perHourCents;

  if (service.pricingStrategy === "HOURLY") {
    const minHours = vehicle?.minHours ?? 0;
    const billedHours = Math.max(
      Math.floor(hoursRequested || 0),
      Math.floor(minHours || 0)
    );
    const raw = base + billedHours * perHour;
    return Math.max(service.minFareCents, raw);
  }

  // POINT_TO_POINT or FLAT (treated similarly in phase 1)
  const raw =
    base +
    Math.round(distanceMiles * perMile) +
    Math.round(durationMinutes * perMinute);

  return Math.max(service.minFareCents, raw);
}

export default function BookingWizard({
  services,
  vehicles,
}: {
  services: ServiceTypeDTO[];
  vehicles: VehicleDTO[];
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 fields
  const [serviceTypeId, setServiceTypeId] = useState<string>(
    services?.[0]?.id ?? ""
  );
  const [pickupAtDate, setPickupAtDate] = useState<string>(""); // yyyy-mm-dd
  const [pickupAtTime, setPickupAtTime] = useState<string>(""); // HH:mm
  const [passengers, setPassengers] = useState<number>(1);
  const [luggage, setLuggage] = useState<number>(0);

  const [route, setRoute] = useState<RoutePickerValue | null>(null);

  // HOURLY
  const [hoursRequested, setHoursRequested] = useState<number>(2);

  // Step 2 fields
  const [vehicleId, setVehicleId] = useState<string>("");

  // Step 3 fields
  const [specialRequests, setSpecialRequests] = useState<string>("");

  const selectedService = useMemo(
    () => services.find((s) => s.id === serviceTypeId) ?? null,
    [services, serviceTypeId]
  );

  const selectedVehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId) ?? null,
    [vehicles, vehicleId]
  );

  // If HOURLY + vehicle chosen, auto-bump hoursRequested to minHours if needed
  const minHours =
    selectedService?.pricingStrategy === "HOURLY"
      ? (selectedVehicle?.minHours ?? 0)
      : 0;
  const billableHours =
    selectedService?.pricingStrategy === "HOURLY"
      ? Math.max(hoursRequested || 0, minHours || 0)
      : null;

  const distanceMiles = Number(route?.distanceMiles ?? 0);
  const durationMinutes = Number(route?.durationMinutes ?? 0);

  const estimateCents = useMemo(() => {
    if (!selectedService) return 0;
    return estimateTotalCents({
      service: selectedService,
      vehicle: selectedVehicle,
      distanceMiles,
      durationMinutes,
      hoursRequested,
    });
  }, [
    selectedService,
    selectedVehicle,
    distanceMiles,
    durationMinutes,
    hoursRequested,
  ]);

  function canGoStep2() {
    if (!selectedService) return false;
    if (!pickupAtDate || !pickupAtTime) return false;
    if (!route?.pickup || !route?.dropoff) return false;
    // also enforce min notice in phase 2; for now just basic required fields
    return true;
  }

  function canGoStep3() {
    if (!selectedService) return false;
    if (!vehicleId) return false;
    return true;
  }

  async function handleSubmit() {
    if (!selectedService) {
      toast.error("Please select a service.");
      return;
    }
    if (!route?.pickup || !route?.dropoff) {
      toast.error("Please select pickup and dropoff.");
      return;
    }
    if (!pickupAtDate || !pickupAtTime) {
      toast.error("Please choose date and time.");
      return;
    }
    if (!vehicleId) {
      toast.error("Please choose a vehicle category.");
      return;
    }

    const pickupAtIso = new Date(
      `${pickupAtDate}T${pickupAtTime}:00`
    ).toISOString();

    startTransition(async () => {
      // ✅ Guard: require both pickup + dropoff before submitting
      if (!route?.pickup || !route?.dropoff) {
        toast.error("Please select both pickup and dropoff locations.");
        return;
      }

      const pickup = route.pickup;
      const dropoff = route.dropoff;

      const res = await createBookingRequest({
        serviceTypeId,
        vehicleId,

        pickupAt: pickupAtIso,
        passengers,
        luggage,

        pickupAddress: pickup.address,
        pickupPlaceId: pickup.placeId ?? null,
        pickupLat: pickup.location?.lat ?? null,
        pickupLng: pickup.location?.lng ?? null,

        dropoffAddress: dropoff.address,
        dropoffPlaceId: dropoff.placeId ?? null,
        dropoffLat: dropoff.location?.lat ?? null,
        dropoffLng: dropoff.location?.lng ?? null,

        distanceMiles: route.distanceMiles ?? route.miles ?? null,
        durationMinutes: route.durationMinutes ?? route.minutes ?? null,

        // ✅ only send for hourly services
        hoursRequested:
          selectedService.pricingStrategy === "HOURLY" ? hoursRequested : null,

        specialRequests: specialRequests || null,
      });

      if ((res as any)?.error) {
        toast.error((res as any).error);
        return;
      }

      toast.success(
        "Request submitted. Dispatch will email your payment link."
      );
      router.push("/account");
      router.refresh();
    });

    return (
      <section
        style={{
          border: "1px solid rgba(0,0,0,0.12)",
          borderRadius: 16,
          padding: 16,
          display: "grid",
          gap: 16,
        }}
      >
        <Stepper step={step} />

        {step === 1 ? (
          <div style={{ display: "grid", gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Trip details</h2>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={labelStyle}>Service</label>
              <select
                value={serviceTypeId}
                onChange={(e) => {
                  const next = e.target.value;
                  setServiceTypeId(next);

                  // If switching to HOURLY, keep hours reasonable
                  const svc = services.find((s) => s.id === next);
                  if (svc?.pricingStrategy === "HOURLY") {
                    setHoursRequested((prev) =>
                      Math.max(prev || 2, selectedVehicle?.minHours ?? 0, 2)
                    );
                  }
                }}
                style={inputStyle}
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <Grid2>
              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelStyle}>Date</label>
                <input
                  type='date'
                  value={pickupAtDate}
                  onChange={(e) => setPickupAtDate(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelStyle}>Time</label>
                <input
                  type='time'
                  value={pickupAtTime}
                  onChange={(e) => setPickupAtTime(e.target.value)}
                  style={inputStyle}
                />
              </div>
            </Grid2>

            <Grid2>
              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelStyle}>Passengers</label>
                <input
                  type='number'
                  min={1}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelStyle}>Luggage</label>
                <input
                  type='number'
                  min={0}
                  value={luggage}
                  onChange={(e) => setLuggage(Number(e.target.value))}
                  style={inputStyle}
                />
              </div>
            </Grid2>

            {/* ✅ Hourly Hours input */}
            {selectedService?.pricingStrategy === "HOURLY" ? (
              <div style={{ display: "grid", gap: 8 }}>
                <label style={labelStyle}>Hours</label>
                <input
                  type='number'
                  min={1}
                  step={1}
                  value={hoursRequested}
                  onChange={(e) => setHoursRequested(Number(e.target.value))}
                  style={inputStyle}
                />
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Vehicle minimum applies after you choose a vehicle category.
                </div>
              </div>
            ) : null}

            {/* ✅ Route picker: shows map + distance/time (your component already does this) */}
            <div style={{ display: "grid", gap: 8 }}>
              <label style={labelStyle}>Route</label>
              <RoutePicker value={route} onChange={setRoute} />
              {route?.distanceMiles ? (
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  Est: {route.distanceMiles.toFixed?.(1) ?? route.distanceMiles}{" "}
                  mi • {route.durationMinutes ?? 0} min
                </div>
              ) : null}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <div />
              <button
                type='button'
                onClick={() => {
                  if (!canGoStep2()) {
                    toast.error(
                      "Please complete service, date/time, and route."
                    );
                    return;
                  }
                  setStep(2);
                }}
                style={btnStyle}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div style={{ display: "grid", gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Choose a vehicle</h2>

            <div style={{ display: "grid", gap: 10 }}>
              {vehicles.map((v) => {
                const isSelected = v.id === vehicleId;

                const rowEstimateCents = selectedService
                  ? estimateTotalCents({
                      service: selectedService,
                      vehicle: v,
                      distanceMiles,
                      durationMinutes,
                      hoursRequested,
                    })
                  : 0;

                const rowMinHours =
                  selectedService?.pricingStrategy === "HOURLY"
                    ? v.minHours
                    : null;
                const rowBillable =
                  selectedService?.pricingStrategy === "HOURLY"
                    ? Math.max(hoursRequested || 0, v.minHours || 0)
                    : null;

                return (
                  <button
                    key={v.id}
                    type='button'
                    onClick={() => {
                      setVehicleId(v.id);
                      // ✅ if hourly, bump requested hours to min if needed
                      if (selectedService?.pricingStrategy === "HOURLY") {
                        setHoursRequested((prev) =>
                          Math.max(prev || 1, v.minHours || 0)
                        );
                      }
                    }}
                    style={{
                      textAlign: "left",
                      padding: 14,
                      borderRadius: 14,
                      border: isSelected
                        ? "2px solid rgba(0,0,0,0.6)"
                        : "1px solid rgba(0,0,0,0.12)",
                      background: "white",
                      cursor: "pointer",
                      display: "grid",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 12,
                      }}
                    >
                      <div style={{ fontWeight: 700 }}>{v.name}</div>
                      <div style={{ fontWeight: 700 }}>
                        ${centsToUsd(rowEstimateCents)}
                      </div>
                    </div>

                    <div style={{ fontSize: 12, opacity: 0.75 }}>
                      Capacity: {v.capacity} • Luggage: {v.luggageCapacity}
                      {rowMinHours !== null
                        ? ` • Min hours: ${rowMinHours}`
                        : ""}
                      {rowBillable !== null
                        ? ` • Billable hours: ${rowBillable}`
                        : ""}
                    </div>

                    {v.description ? (
                      <div style={{ fontSize: 12, opacity: 0.75 }}>
                        {v.description}
                      </div>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <button
                type='button'
                onClick={() => setStep(1)}
                style={btnSecondaryStyle}
              >
                Back
              </button>

              <button
                type='button'
                onClick={() => {
                  if (!canGoStep3()) {
                    toast.error("Please choose a vehicle category.");
                    return;
                  }
                  setStep(3);
                }}
                style={btnStyle}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div style={{ display: "grid", gap: 14 }}>
            <h2 style={{ margin: 0, fontSize: 18 }}>Confirm</h2>

            <div style={summaryCardStyle}>
              <SummaryRow
                label='Service'
                value={selectedService?.name ?? "—"}
              />
              <SummaryRow
                label='Pickup time'
                value={
                  pickupAtDate && pickupAtTime
                    ? `${pickupAtDate} @ ${pickupAtTime}`
                    : "—"
                }
              />
              <SummaryRow label='Passengers' value={String(passengers)} />
              <SummaryRow label='Luggage' value={String(luggage)} />

              <SummaryRow
                label='Pickup'
                value={route?.pickup?.address ?? "—"}
              />
              <SummaryRow
                label='Dropoff'
                value={route?.dropoff?.address ?? "—"}
              />

              {selectedService?.pricingStrategy === "HOURLY" ? (
                <>
                  <SummaryRow
                    label='Hours requested'
                    value={String(hoursRequested)}
                  />
                  <SummaryRow
                    label='Billable hours (min applied)'
                    value={String(billableHours ?? hoursRequested)}
                  />
                </>
              ) : null}

              <SummaryRow
                label='Estimate'
                value={`$${centsToUsd(estimateCents)}`}
                strong
              />
              <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
                This is an estimate. Dispatch may adjust for special dates, late
                night, extra stops, etc.
              </div>
            </div>

            <div style={{ display: "grid", gap: 8 }}>
              <label style={labelStyle}>Special requests (optional)</label>
              <textarea
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                style={{ ...inputStyle, minHeight: 90 }}
                placeholder='Child seat, wheelchair needs, extra stops, meet & greet...'
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <button
                type='button'
                onClick={() => setStep(2)}
                style={btnSecondaryStyle}
              >
                Back
              </button>

              <button
                type='button'
                onClick={handleSubmit}
                style={btnStyle}
                disabled={isPending}
              >
                {isPending ? "Submitting..." : "Submit request"}
              </button>
            </div>
          </div>
        ) : null}
      </section>
    );
  }

  function Stepper({ step }: { step: 1 | 2 | 3 }) {
    const items = [
      { n: 1, label: "Trip" },
      { n: 2, label: "Vehicle" },
      { n: 3, label: "Confirm" },
    ] as const;

    return (
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {items.map((it) => (
          <div
            key={it.n}
            style={{
              display: "flex",
              gap: 8,
              alignItems: "center",
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.12)",
              background: step === it.n ? "rgba(0,0,0,0.06)" : "transparent",
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                display: "grid",
                placeItems: "center",
                fontSize: 12,
                fontWeight: 700,
                border: "1px solid rgba(0,0,0,0.18)",
                background: step === it.n ? "rgba(0,0,0,0.10)" : "white",
              }}
            >
              {it.n}
            </div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{it.label}</div>
          </div>
        ))}
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

  function SummaryRow({
    label,
    value,
    strong,
  }: {
    label: string;
    value: string;
    strong?: boolean;
  }) {
    return (
      <div
        style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
      >
        <div style={{ fontSize: 12, opacity: 0.75 }}>{label}</div>
        <div style={{ fontSize: 13, fontWeight: strong ? 800 : 500 }}>
          {value}
        </div>
      </div>
    );
  }

  const labelStyle: React.CSSProperties = { fontSize: 12, opacity: 0.8 };

  const inputStyle: React.CSSProperties = {
    padding: "0.75rem",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.15)",
    background: "white",
  };

  const btnStyle: React.CSSProperties = {
    padding: "0.85rem 1.05rem",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.22)",
    cursor: "pointer",
    background: "white",
  };

  const btnSecondaryStyle: React.CSSProperties = {
    ...btnStyle,
    opacity: 0.85,
  };

  const summaryCardStyle: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 14,
    padding: 14,
    display: "grid",
    gap: 8,
    background: "white",
  };
}
