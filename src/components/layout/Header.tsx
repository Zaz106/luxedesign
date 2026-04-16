"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";

interface HeaderProps {
  disableAutoHide?: boolean;
}

const Header = ({ disableAutoHide = false }: HeaderProps) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine if hidden (scrolling down & not at top)
      // If disableAutoHide is true, never hide
      if (
        !disableAutoHide &&
        currentScrollY > lastScrollY &&
        currentScrollY > 50
      ) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      // Determine if scrolled (for background style)
      if (currentScrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      // Get scrollbar width
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      // Add padding to body to prevent layout shift
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  // Force header visible when menu is open
  const headerClass = `${styles.header} ${isHidden && !isMobileMenuOpen ? styles.hidden : ""} ${isScrolled ? styles.scrolled : ""}`;

  return (
    <>
      <header className={headerClass}>
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <Link href="/" onClick={closeMobileMenu}>
                <Image
                  src="/images/Luxe Logo.png"
                  alt="Luxe Logo"
                  width={150}
                  height={45}
                  style={{ width: "auto", height: "auto", maxHeight: "1.9rem" }}
                  priority
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              <Link href="/">Home</Link>
              <Link href="/about">About Us</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/contact">Contact Us</Link>
            </nav>

            {/* Desktop Action */}
            <div className={styles.desktopAction}>
              <Link href="/contact" className={styles.contactButton}>
                Contact Us
              </Link>
            </div>

            {/* Mobile Toggle */}
            <div
              className={`${styles.hamburger} ${styles.burgerWrapper} ${isMobileMenuOpen ? styles.active : ""}`}
              onClick={toggleMobileMenu}
              style={{ opacity: isMobileMenuOpen ? 0 : 1 }}
            >
              <div className={styles.burgerLabel}>
                <div className={`${styles.bar} ${styles.barTop}`}></div>
                <div className={`${styles.bar} ${styles.barMiddle}`}></div>
                <div className={`${styles.bar} ${styles.barBottom}`}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay - Move INSIDE Header to share stacking context */}
        {mounted &&
          createPortal(
            <div
              className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ""}`}
            >
              <div
                className={styles.mobileMenuBackdrop}
                onClick={closeMobileMenu}
              />

              {/* Proxy Burger for High Z-Index Visibility */}
              <div
                className={`${styles.hamburger} ${styles.burgerWrapper} ${styles.proxyBurger} ${isMobileMenuOpen ? styles.active : ""} ${isScrolled ? styles.scrolled : ""}`}
                onClick={toggleMobileMenu}
              >
                <div className={styles.burgerLabel}>
                  <div className={`${styles.bar} ${styles.barTop}`}></div>
                  <div className={`${styles.bar} ${styles.barMiddle}`}></div>
                  <div className={`${styles.bar} ${styles.barBottom}`}></div>
                </div>
              </div>

              <div className={styles.mobileMenuPanel}>
                <div className={styles.mobileMenuContent}>
                  <nav className={styles.mobileNav}>
                    <Link href="/" onClick={closeMobileMenu}>
                      Home
                    </Link>
                    <Link href="/about" onClick={closeMobileMenu}>
                      About Us
                    </Link>
                    <Link href="/pricing" onClick={closeMobileMenu}>
                      Pricing
                    </Link>
                    <Link href="/contact" onClick={closeMobileMenu}>
                      Contact Us
                    </Link>
                  </nav>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </header>
    </>
  );
};

export default Header;
