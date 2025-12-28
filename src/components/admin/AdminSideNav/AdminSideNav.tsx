"use client";

import styles from "./AdminSideNav.module.css";
import Link from "next/link";
import Calendar from "@/components/icons/Calendar/Calendar";
import House from "@/components/icons/House/House";
import Employee from "@/components/icons/Employee/Employee";
import Cog from "@/components/icons/Cog/Cog";
import Users from "@/components/icons/Users/Users";
import Report from "@/components/icons/Report/Report";
import Listing from "@/components/icons/Listing/Listing";
// import UserButton from "@/components/dashboard/UserButton/UserButton";
import Button from "@/components/shared/Button/Button";
import { useState } from "react";
import FalseButton from "@/components/shared/FalseButton/FalseButton";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { title: "Dashboard", href: "/admin", icon: <House /> },
  { title: "Bookings", href: "/admin/bookings", icon: <Calendar /> },
  { title: "Services", href: "/admin/services", icon: <Listing /> },
  {
    title: "Vehicle categories",
    href: "/admin/vehicle-categories",
    icon: <Listing />,
  },
  { title: "Vehicles", href: "/admin/vehicles", icon: <Listing /> },
  { title: "Users", href: "/admin/users", icon: <Users /> },
  { title: "Drivers", href: "/admin/drivers", icon: <Users /> },
  //   { title: "Groomers", href: "/admin/groomers", icon: <Employee /> },
  //   { title: "Reports", href: "/admin/reports", icon: <Report /> },
  //   { title: "Settings", href: "/admin/settings", icon: <Cog /> },
];

export default function AdminSideNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <aside className={styles.container}>
      <nav className={styles.nav}>
        <ul
          className={
            isOpen ? `${styles.navLinks} ${styles.open}` : styles.navLinks
          }
        >
          <div className={styles.closeWrapper}>
            <FalseButton
              text='Close'
              btnType='blue'
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className={styles.linksWrapper}>
            {NAV_ITEMS.map(({ title, href, icon }) => {
              const isDashboard = href === "/admin";
              const active = isDashboard
                ? pathname === "/admin"
                : pathname === href || pathname.startsWith(href + "/");
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`${styles.navLink} ${
                      active ? styles.navLinkActive : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {icon}
                    {title}
                  </Link>
                </li>
              );
            })}
          </div>

          <div className={styles.btnContainerii}>
            {/* <UserButton /> */}
            <Button btnType='brownBorder' text='Go Home' href='/' />
            <Button
              btnType='brownBorder'
              text='User Dashboard'
              href='/dashboard'
            />
          </div>
        </ul>

        <div className={styles.btnContainer}>
          {/* <UserButton /> */}
          <Button btnType='tan' text='Go Home' href='/' />
          <Button btnType='brown' text='User Dashboard' href='/dashboard' />
        </div>
      </nav>
    </aside>
  );
}
