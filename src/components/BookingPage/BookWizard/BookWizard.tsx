"use client";

import styles from "./BookingWizard.module.css";
import { useMemo, useState } from "react";
import RoutePicker, { RoutePickerValue } from "../RoutePicker/RoutePicker";
import { createBookingRequest } from "../../../../actions/bookings/createBookingRequest";
import { useRouter } from "next/navigation";
import LayoutWrapper from "@/components/shared/LayoutWrapper";

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
    <section className={styles.container}>
      <LayoutWrapper>
        <div className={styles.content}>
          <div className={styles.stepIndicator}>
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className={`${styles.stepPill} ${
                  step === n ? styles.stepPillActive : styles.stepPillInactive
                }`}
              >
                Step {n}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className={styles.stepWrap}>
              <h2 className={styles.h2}>Trip details</h2>

              <div className={styles.grid4}>
                <div className={styles.field}>
                  <label className={styles.label}>Service</label>
                  <select
                    value={serviceTypeId}
                    onChange={(e) => setServiceTypeId(e.target.value)}
                    className={styles.control}
                  >
                    {serviceTypes.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Pickup date</label>
                  <input
                    type='date'
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className={styles.control}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Pickup time</label>
                  <input
                    type='time'
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className={styles.control}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Passengers / Luggage</label>
                  <div className={styles.grid2}>
                    <input
                      type='number'
                      min={1}
                      value={passengers}
                      onChange={(e) => setPassengers(Number(e.target.value))}
                      className={styles.control}
                    />
                    <input
                      type='number'
                      min={0}
                      value={luggage}
                      onChange={(e) => setLuggage(Number(e.target.value))}
                      className={styles.control}
                    />
                  </div>
                </div>
              </div>

              <RoutePicker value={route} onChange={setRoute} />

              <div className={styles.actionsEnd}>
                <button
                  disabled={!step1Ready}
                  onClick={() => setStep(2)}
                  className={`${styles.button} ${
                    step1Ready ? styles.buttonEnabled : styles.buttonDisabled
                  }`}
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.stepWrap}>
              <h2 className={styles.h2}>Choose vehicle</h2>

              <div className={styles.stack}>
                {eligibleVehicles.length === 0 && (
                  <div className={styles.emptyBox}>
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
                      className={`${styles.vehicleCard} ${
                        isSelected ? styles.vehicleCardSelected : ""
                      }`}
                      type='button'
                    >
                      <div className={styles.vehicleRow}>
                        <div className={styles.vehicleName}>{v.name}</div>
                        <div className={styles.vehiclePrice}>
                          {est == null ? "—" : `${centsToUsd(est)} (est.)`}
                        </div>
                      </div>
                      <div className={styles.vehicleMeta}>
                        Capacity: {v.capacity} • Luggage: {v.luggageCapacity}
                        {v.description ? ` • ${v.description}` : ""}
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className={styles.actionsBetween}>
                <button
                  onClick={() => setStep(1)}
                  className={styles.button}
                  type='button'
                >
                  Back
                </button>

                <button
                  disabled={!step2Ready}
                  onClick={() => setStep(3)}
                  className={`${styles.button} ${
                    step2Ready ? styles.buttonEnabled : styles.buttonDisabled
                  }`}
                  type='button'
                >
                  Continue
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.stepWrap}>
              <h2 className={styles.h2}>Confirm request</h2>

              <div className={styles.summaryCard}>
                <div className={styles.summaryTitle}>{service?.name}</div>
                <div className={styles.summaryLine}>
                  {route?.pickup?.address} → {route?.dropoff?.address}
                </div>
                <div className={styles.summaryLine}>
                  {route?.miles ?? "—"} mi • {route?.minutes ?? "—"} min •{" "}
                  {passengers} passengers • {luggage} luggage
                </div>
                <div className={styles.summaryLine}>
                  Vehicle: {selectedVehicle?.name ?? "—"} •{" "}
                  {estimatedPrice == null
                    ? "—"
                    : `${centsToUsd(estimatedPrice)} (est.)`}
                </div>
                <div className={styles.summaryNote}>
                  Dispatcher approval required. You’ll receive a payment link
                  once approved.
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  Special requests (child seat, wheelchair, extra stops, etc.)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  rows={5}
                  className={styles.textarea}
                />
              </div>

              <div className={styles.actionsBetween}>
                <button
                  onClick={() => setStep(2)}
                  className={styles.button}
                  type='button'
                >
                  Back
                </button>

                <button
                  onClick={submitBooking}
                  className={styles.button}
                  type='button'
                >
                  Submit request
                </button>
              </div>
            </div>
          )}
        </div>
      </LayoutWrapper>
    </section>
  );
}
