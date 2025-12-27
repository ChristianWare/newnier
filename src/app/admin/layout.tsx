import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from './AdminLayout.module.css'

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const role = session?.user?.role;

  if (!session) redirect("/login?next=/admin");
  if (role !== "ADMIN") redirect("/");

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        minHeight: "100vh",
      }}
      className={styles.container}
    >
      <aside
        style={{
          borderRight: "1px solid rgba(0,0,0,0.1)",
          padding: "1rem",
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 16 }}>Admin</div>

        <nav style={{ display: "grid", gap: 10, fontSize: 14 }}>
          <Link href='/admin'>Dashboard</Link>

          <div style={{ marginTop: 10, fontWeight: 600, opacity: 0.8 }}>
            Bookings
          </div>
          <Link href='/admin/bookings'>All bookings</Link>

          <div style={{ marginTop: 10, fontWeight: 600, opacity: 0.8 }}>
            Catalog
          </div>
          <Link href='/admin/services'>Services</Link>
          <Link href='/admin/vehicle-categories'>Vehicle categories</Link>
          <Link href='/admin/vehicles'>Vehicles (units)</Link>

          <div style={{ marginTop: 10, fontWeight: 600, opacity: 0.8 }}>
            People
          </div>
          <Link href='/admin/users'>Users</Link>
          <Link href='/admin/drivers'>Drivers</Link>
        </nav>
      </aside>

      <main style={{ padding: "1.25rem" }}>{children}</main>
    </div>
  );
}
