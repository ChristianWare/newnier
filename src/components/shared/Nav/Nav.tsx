"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
// import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import { useEffect, useState, MouseEvent, useRef } from "react";
import { createPortal } from "react-dom"; // ← add this
import Image from "next/image";
import Img1 from "../../../../public/images/road.jpg";
// import SectionIntroii from "../SectionIntroii/SectionIntroii";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";

export default function Nav({
  color = "",
  hamburgerColor = "",
}: {
  color?: string;
  hamburgerColor?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const navRef = useRef<HTMLElement | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;
    body.style.overflow =
      window.innerWidth <= 1068 && isOpen ? "hidden" : "auto";
    const handleResize = () => setIsOpen(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((s) => !s);
  const closeMenu = () => setIsOpen(false);

  const handleHamburgerClick = (e: MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    toggleMenu();
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const setProgress = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (navRef.current)
        navRef.current.style.setProperty("--progress", `${p}%`);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isOpen && currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNav(false);
      } else if (currentScrollY < lastScrollY) {
        setShowNav(true);
      }
      lastScrollY = currentScrollY;
      setProgress();
    };

    const optimizedHandleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    setProgress();
    window.addEventListener("scroll", optimizedHandleScroll);
    window.addEventListener("resize", optimizedHandleScroll);
    return () => {
      window.removeEventListener("scroll", optimizedHandleScroll);
      window.removeEventListener("resize", optimizedHandleScroll);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const items = [
    { text: "Home", href: "/" },
    { text: "Reservations", href: "/reservations" },
    { text: "Services", href: "/services" },
    { text: "Events", href: "/events" },
    { text: "About", href: "/about" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`${styles.header} ${
        showNav || isOpen ? styles.show : styles.hide
      } ${isOpen ? styles.open : ""}`}
      ref={navRef}
    >
      <nav className={styles.navbar}>
        <Link href='/' className={styles.logoContainer}>
          <Logo className={styles.logo} />
          <span className={styles.logoText}>Nier Transportation</span>
        </Link>

        <div
          className={
            isOpen ? `${styles.navItems} ${styles.active}` : styles.navItems
          }
        >
          {items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${styles[color]} ${
                  active ? styles.navItemActive : ""
                }`}
                onClick={closeMenu}
                aria-current={active ? "page" : undefined}
              >
                {item.text}
              </Link>
            );
          })}

          <div className={styles.menuImage}>
            <Image src={Img1} alt='Menu image' fill className={styles.img} />
            <div className={styles.menuImageOverlay}>
              <Logo className={styles.logoii} />
            </div>
          </div>

          <div className={styles.btnContainerii}>
            <Button
              href='/'
              text='Book your Ride'
              btnType='navYellowBlackOutline'
              arrow
              onClick={closeMenu}
            />
          </div>
        </div>

        {isOpen &&
          createPortal(
            <div className={styles.overlay} onClick={closeMenu} />,
            document.body
          )}

        <div className={styles.btnContainer}>
          <Button
            href='/'
            text='Book your Ride'
            btnType='navYellowBlackOutline'
            arrow
          />
        </div>

        <span
          className={
            isOpen ? `${styles.hamburger} ${styles.active}` : styles.hamburger
          }
          onClick={handleHamburgerClick}
          aria-expanded={isOpen}
          role='button'
        >
          <span
            className={`${styles.whiteBar} ${styles[hamburgerColor]}`}
          ></span>
          <span
            className={`${styles.whiteBar} ${styles[hamburgerColor]}`}
          ></span>
          <span
            className={`${styles.whiteBar} ${styles[hamburgerColor]}`}
          ></span>
        </span>
      </nav>
    </header>
  );
}
