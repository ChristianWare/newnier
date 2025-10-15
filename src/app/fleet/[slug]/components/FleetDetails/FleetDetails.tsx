"use client";

import { fleetData } from "@/lib/data"; 

type Vehicle = (typeof fleetData)[number];

export default function FleetDetails({ vehicle }: { vehicle: Vehicle }) {
  return (
    <section>
      {vehicle.longDesc && (
        <article>
          <h2>About this vehicle</h2>
          <p>{vehicle.longDesc}</p>
        </article>
      )}

      <article>
        <h3>Best for</h3>
        <p>{(vehicle.bestFor ?? []).join(" • ") || "General travel"}</p>
      </article>

      <article>
        <h3>Amenities</h3>
        <ul>
          {(vehicle.amenities ?? []).map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </article>

      <article>
        <h3>Safety & Driver Tech</h3>
        <ul>
          {(vehicle.safetyTech ?? []).map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      </article>

      <article>
        <h3>Specs</h3>
        <ul>
          {vehicle.specs?.drivetrain && (
            <li>Drivetrain: {vehicle.specs.drivetrain}</li>
          )}
          {vehicle.specs?.rideFeel && (
            <li>Ride feel: {vehicle.specs.rideFeel}</li>
          )}
          {vehicle.specs?.cabin && <li>Cabin: {vehicle.specs.cabin}</li>}
          {vehicle.cargoCuFt && <li>Cargo capacity: {vehicle.cargoCuFt}</li>}
        </ul>
      </article>

      {vehicle.features?.length ? (
        <article>
          <h3>Highlights</h3>
          <ul>
            {vehicle.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </article>
      ) : null}

      {vehicle.rateRules && (
        <article>
          <h3>Rates & Booking Rules</h3>
          <ul>
            {vehicle.rateRules.hourlyFromUSD && (
              <li>Hourly from ${vehicle.rateRules.hourlyFromUSD}/hr</li>
            )}
            {vehicle.rateRules.airportTransferFromUSD && (
              <li>
                Airport transfers from $
                {vehicle.rateRules.airportTransferFromUSD}
              </li>
            )}
            {vehicle.rateRules.minimumHours && (
              <li>Minimum {vehicle.rateRules.minimumHours} hours (hourly)</li>
            )}
            {vehicle.rateRules.meetAndGreetUSD && (
              <li>Meet & greet: ${vehicle.rateRules.meetAndGreetUSD}</li>
            )}
            {vehicle.rateRules.afterHoursSurchargePct && (
              <li>
                After-hours surcharge:{" "}
                {vehicle.rateRules.afterHoursSurchargePct}%
              </li>
            )}
            {vehicle.rateRules.waitTimeGraceMin && (
              <li>
                Grace period: {vehicle.rateRules.waitTimeGraceMin} minutes
              </li>
            )}
            {vehicle.rateRules.extraStopUSD && (
              <li>Extra stop: ${vehicle.rateRules.extraStopUSD}</li>
            )}
          </ul>
        </article>
      )}

      {vehicle.policy && (
        <article>
          <h3>Policies</h3>
          <p>{vehicle.policy.summary}</p>
          <ul>
            {(vehicle.policy.details ?? []).map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </article>
      )}

      {vehicle.faqs?.length ? (
        <article>
          <h3>FAQs</h3>
          <div>
            {vehicle.faqs.map((f, i) => (
              <details key={i}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
}
