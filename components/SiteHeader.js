"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "@/components/SmartLink";
import { usePathname } from "next/navigation";
import { images } from "@/lib/site";
import styles from "./SiteHeader.module.css";

const NAV = [
  { href: "/#experience", label: "The retreat" },
  { href: "/#week", label: "The week" },
  { href: "/#villa", label: "The villa" },
  { href: "/about", label: "About Mitch" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);

  // Close the menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 960px)");
    const onResize = () => mq.matches && setOpen(false);

    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onResize);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onResize);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => !href.includes("#") && pathname === href;

  return (
    <header className={`${styles.header} on-navy`}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.logo} aria-label="Holistic Retreat Bali, home">
          <Image
            src={images.logo.src}
            width={images.logo.width}
            height={images.logo.height}
            alt="Holistic Retreat Bali"
            priority
          />
        </Link>

        <nav className={styles.desktopNav} aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/contact" className="btn btn-primary" aria-current={pathname === "/contact" ? "page" : undefined}>
            Enquire
          </Link>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
          <span className={styles.burger} data-open={open} aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      <div
        id="mobile-menu"
        ref={panelRef}
        className={styles.panel}
        data-open={open}
        hidden={!open}
      >
        <nav className="container" aria-label="Main mobile">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" onClick={() => setOpen(false)} aria-current={pathname === "/contact" ? "page" : undefined}>
                Contact
              </Link>
            </li>
          </ul>
          <Link href="/contact" className="btn btn-primary" onClick={() => setOpen(false)}>
            Enquire about a retreat
          </Link>
        </nav>
      </div>
    </header>
  );
}
