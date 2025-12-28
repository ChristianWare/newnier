import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import styles from './AdminLayout.module.css'
import AdminSideNav from "@/components/admin/AdminSideNav/AdminSideNav";

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
      <AdminSideNav />

      <main style={{ padding: "1.25rem" }}>{children}</main>
    </div>
  );
}
