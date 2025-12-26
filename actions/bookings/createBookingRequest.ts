"use server";

import { auth } from "../../auth";
import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

type LatLng = { lat: number; lng: number };

export type CreateBookingRequestInput = {
  serviceTypeId: string;
  pickupAtISO: string; // ISO string from client
  passengers: number;
  luggage: number;

  pickupAddress: string;
  pickupPlaceId?: string | null;
  pickupLocation: LatLng;

  dropoffAddress: string;
  dropoffPlaceId?: string | null;
  dropoffLocation: LatLng;

  distanceMiles?: number | null;
  durationMinutes?: number | null;

  vehicleId: string;

  specialRequests?: string | null;
};

export async function createBookingRequest(input: CreateBookingRequestInput) {
  const session = await auth();
  if (!session?.user?.userId) {
    return { error: "You must be signed in to book." };
  }

  const pickupAt = new Date(input.pickupAtISO);
  if (isNaN(pickupAt.getTime())) return { error: "Invalid pickup date/time." };

  // Basic validation
  if (!input.pickupAddress || !input.dropoffAddress) {
    return { error: "Pickup and dropoff are required." };
  }

  // Capacity check (server-truth)
  const vehicle = await db.vehicle.findUnique({
    where: { id: input.vehicleId },
  });
  if (!vehicle || !vehicle.active) return { error: "Vehicle not available." };

  if (input.passengers > vehicle.capacity) {
    return { error: "Selected vehicle does not support that many passengers." };
  }
  if (input.luggage > vehicle.luggageCapacity) {
    return { error: "Selected vehicle does not support that much luggage." };
  }

  const booking = await db.booking.create({
    data: {
      userId: session.user.userId,
      serviceTypeId: input.serviceTypeId,
      vehicleId: input.vehicleId,

      status: "PENDING_REVIEW",

      pickupAt,
      passengers: input.passengers,
      luggage: input.luggage,

      pickupAddress: input.pickupAddress,
      pickupPlaceId: input.pickupPlaceId ?? null,
      pickupLat: new Prisma.Decimal(input.pickupLocation.lat),
      pickupLng: new Prisma.Decimal(input.pickupLocation.lng),

      dropoffAddress: input.dropoffAddress,
      dropoffPlaceId: input.dropoffPlaceId ?? null,
      dropoffLat: new Prisma.Decimal(input.dropoffLocation.lat),
      dropoffLng: new Prisma.Decimal(input.dropoffLocation.lng),

      distanceMiles:
        typeof input.distanceMiles === "number"
          ? new Prisma.Decimal(input.distanceMiles)
          : null,
      durationMinutes:
        typeof input.durationMinutes === "number"
          ? input.durationMinutes
          : null,

      specialRequests: input.specialRequests ?? null,

      // totals are dispatcher-set in Phase 1
      subtotalCents: 0,
      feesCents: 0,
      taxesCents: 0,
      totalCents: 0,
    },
    select: { id: true },
  });

  return { success: true, bookingId: booking.id };
}
