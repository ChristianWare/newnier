"use client";

import { useMemo, useState } from "react";
import RoutePicker, { RoutePickerValue } from "../RoutePicker/RoutePicker";
import { createBookingRequest } from "../../../../actions/bookings/createBookingRequest";
import { useRouter } from "next/navigation";

type ServiceTypeDTO = {
  id: string;
  name: string;
  slug: string;
  pricingStrategy: "POINT_TO_POINT" | "HOURLY" | "FLAT";
  minFareCents: number;
  baseFeeCents: number;
  perMileCents: number;
  perMinuteCents: number;
  perHourCents: number;
};

type VehicleDTO = {
  id: string;
  name: string;
  description: string | null;
  capacity: number;
  luggageCapacity: number;
  imageUrl: string | null;
  baseFareCents: number;
  perMileCents: number;
  perMinuteCents: number;
  perHourCents: number;
};

function centsToUsd(cents: number) {
  return (cents / 100).toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
}

// Simple estimate (admin can override later)
function estimateCents(args: {
  service: ServiceTypeDTO;
  vehicle: VehicleDTO;
  miles: number | null;
  minutes: number | null;
}) {
  const { service, vehicle, miles, minutes } = args;

  const base = (service.baseFeeCents ?? 0) + (vehicle.baseFareCents ?? 0);

  // If we don't have route yet, just show base/min
  if (!miles || !minutes) {
    return Math.max(service.minFareCents ?? 0, base);
  }

  if (service.pricingStrategy === "HOURLY") {
    const hours = Math.max(1, minutes / 60);
    const quarterHours = Math.ceil(hours * 4) / 4; // 15-min increments
    const perHour = (service.perHourCents ?? 0) + (vehicle.perHourCents ?? 0);
    const total = base + Math.round(quarterHours * perHour);
    return Math.max(service.minFareCents ?? 0, total);
  }

  // POINT_TO_POINT default
  const perMile = (service.perMileCents ?? 0) + (vehicle.perMileCents ?? 0);
  const perMinute =
    (service.perMinuteCents ?? 0) + (vehicle.perMinuteCents ?? 0);

  const total =
    base + Math.round(miles * perMile) + Math.round(minutes * perMinute);

  return Math.max(service.minFareCents ?? 0, total);
}

export default function BookWizard({
  serviceTypes,
  vehicles,
}: {
  serviceTypes: ServiceTypeDTO[];
  vehicles: VehicleDTO[];
}) {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1 fields
  const [serviceTypeId, setServiceTypeId] = useState<string>(
    serviceTypes?.[0]?.id ?? ""
  );
  const [pickupDate, setPickupDate] = useState<string>(""); // yyyy-mm-dd
  const [pickupTime, setPickupTime] = useState<string>(""); // HH:mm
  const [passengers, setPassengers] = useState<number>(1);
  const [luggage, setLuggage] = useState<number>(0);

  const [route, setRoute] = useState<RoutePickerValue | null>(null);

  // Step 2
  const [vehicleId, setVehicleId] = useState<string>("");

  // Step 3
  const [specialRequests, setSpecialRequests] = useState<string>("");

  const service = useMemo(
    () => serviceTypes.find((s) => s.id === serviceTypeId) ?? serviceTypes[0],
    [serviceTypeId, serviceTypes]
  );

  const eligibleVehicles = useMemo(() => {
    return vehicles.filter(
      (v) => v.capacity >= passengers && v.luggageCapacity >= luggage
    );
  }, [vehicles, passengers, luggage]);

  const selectedVehicle = useMemo(
    () => vehicles.find((v) => v.id === vehicleId) ?? null,
    [vehicles, vehicleId]
  );

  const estimatedPrice = useMemo(() => {
    if (!service || !selectedVehicle) return null;
    return estimateCents({
      service,
      vehicle: selectedVehicle,
      miles: route?.miles ?? null,
      minutes: route?.minutes ?? null,
    });
  }, [service, selectedVehicle, route]);

  const pickupAtISO = useMemo(() => {
    if (!pickupDate || !pickupTime) return null;
    // This creates a Date in local time
    const d = new Date(`${pickupDate}T${pickupTime}:00`);
    if (isNaN(d.getTime())) return null;
    return d.toISOString();
  }, [pickupDate, pickupTime]);

  const step1Ready =
    !!serviceTypeId &&
    !!pickupAtISO &&
    passengers >= 1 &&
    luggage >= 0 &&
    !!route?.pickup &&
    !!route?.dropoff &&
    typeof route.miles === "number" &&
    typeof route.minutes === "number";

  const step2Ready = step1Ready && !!vehicleId;

  async function submitBooking() {
    if (!step2Ready || !service || !selectedVehicle || !route || !pickupAtISO)
      return;

    // ✅ TS guard
    if (!route.pickup || !route.dropoff) return;

    const res = await createBookingRequest({
      serviceTypeId,
      pickupAtISO,
      passengers,
      luggage,
      pickupAddress: route.pickup.address,
      pickupPlaceId: route.pickup.placeId,
      pickupLocation: route.pickup.location,
      dropoffAddress: route.dropoff.address,
      dropoffPlaceId: route.dropoff.placeId,
      dropoffLocation: route.dropoff.location,
      distanceMiles: route.miles ?? null,
      durationMinutes: route.minutes ?? null,
      vehicleId,
      specialRequests: specialRequests || null,
    });

    if (res?.error) {
      alert(res.error);
      return;
    }

    router.push("/account");
  }


  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 16,
        padding: "1rem",
        maxWidth: 1100,
      }}
    >
      {/* Step indicator */}
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.15)",
              opacity: step === n ? 1 : 0.55,
              fontSize: 13,
            }}
          >
            Step {n}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div style={{ display: "grid", gap: 14 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Trip details</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr 1fr",
              gap: 12,
            }}
          >
            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.8 }}>Service</label>
              <select
                value={serviceTypeId}
                onChange={(e) => setServiceTypeId(e.target.value)}
                style={{
                  padding: "0.7rem",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.15)",
                }}
              >
                {serviceTypes.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.8 }}>Pickup date</label>
              <input
                type='date'
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                style={{
                  padding: "0.7rem",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.15)",
                }}
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.8 }}>Pickup time</label>
              <input
                type='time'
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                style={{
                  padding: "0.7rem",
                  borderRadius: 10,
                  border: "1px solid rgba(0,0,0,0.15)",
                }}
              />
            </div>

            <div style={{ display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.8 }}>
                Passengers / Luggage
              </label>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 8,
                }}
              >
                <input
                  type='number'
                  min={1}
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                  style={{
                    padding: "0.7rem",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.15)",
                  }}
                />
                <input
                  type='number'
                  min={0}
                  value={luggage}
                  onChange={(e) => setLuggage(Number(e.target.value))}
                  style={{
                    padding: "0.7rem",
                    borderRadius: 10,
                    border: "1px solid rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>
          </div>

          <RoutePicker value={route} onChange={setRoute} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <button
              disabled={!step1Ready}
              onClick={() => setStep(2)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: step1Ready ? "pointer" : "not-allowed",
                opacity: step1Ready ? 1 : 0.5,
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div style={{ display: "grid", gap: 14 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Choose vehicle</h2>

          <div style={{ display: "grid", gap: 10 }}>
            {eligibleVehicles.length === 0 && (
              <div
                style={{
                  padding: "0.75rem",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 12,
                }}
              >
                No vehicles match your passenger/luggage count.
              </div>
            )}

            {eligibleVehicles.map((v) => {
              const isSelected = v.id === vehicleId;
              const est =
                route && service
                  ? estimateCents({
                      service,
                      vehicle: v,
                      miles: route.miles ?? null,
                      minutes: route.minutes ?? null,
                    })
                  : null;

              return (
                <button
                  key={v.id}
                  onClick={() => setVehicleId(v.id)}
                  style={{
                    textAlign: "left",
                    padding: "0.9rem",
                    borderRadius: 14,
                    border: isSelected
                      ? "2px solid #111"
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
                    <div style={{ fontWeight: 600 }}>{v.name}</div>
                    <div style={{ fontWeight: 600, opacity: 0.9 }}>
                      {est == null ? "—" : `${centsToUsd(est)} (est.)`}
                    </div>
                  </div>
                  <div style={{ fontSize: 13, opacity: 0.75 }}>
                    Capacity: {v.capacity} • Luggage: {v.luggageCapacity}
                    {v.description ? ` • ${v.description}` : ""}
                  </div>
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
              onClick={() => setStep(1)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              Back
            </button>

            <button
              disabled={!step2Ready}
              onClick={() => setStep(3)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: step2Ready ? "pointer" : "not-allowed",
                opacity: step2Ready ? 1 : 0.5,
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div style={{ display: "grid", gap: 14 }}>
          <h2 style={{ fontSize: 18, margin: 0 }}>Confirm request</h2>

          <div
            style={{
              padding: "0.9rem",
              borderRadius: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              display: "grid",
              gap: 6,
            }}
          >
            <div style={{ fontWeight: 600 }}>{service?.name}</div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              {route?.pickup?.address} → {route?.dropoff?.address}
            </div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              {route?.miles ?? "—"} mi • {route?.minutes ?? "—"} min •{" "}
              {passengers} passengers • {luggage} luggage
            </div>
            <div style={{ fontSize: 13, opacity: 0.8 }}>
              Vehicle: {selectedVehicle?.name ?? "—"} •{" "}
              {estimatedPrice == null
                ? "—"
                : `${centsToUsd(estimatedPrice)} (est.)`}
            </div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Dispatcher approval required. You’ll receive a payment link once
              approved.
            </div>
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, opacity: 0.8 }}>
              Special requests (child seat, wheelchair, extra stops, etc.)
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={5}
              style={{
                padding: "0.8rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                resize: "vertical",
              }}
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
              onClick={() => setStep(2)}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              Back
            </button>

            <button
              onClick={submitBooking}
              style={{
                padding: "0.8rem 1rem",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.15)",
                cursor: "pointer",
              }}
            >
              Submit request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
