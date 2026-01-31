"use client";
import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine if hidden (scrolling down & not at top)
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header 
        className={`${styles.header} ${isHidden ? styles.hidden : ""} ${isScrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.container}>
          <div className={styles.inner}>
            <div className={styles.logo}>
              <Link href="/" onClick={closeMobileMenu}>
                <Image 
                  src="/images/Luxe Logo.png" 
                  alt="Luxe Logo" 
                  width={130} 
                  height={42} 
                  style={{ width: 'auto', height: 'auto', maxHeight: '1.75rem' }} 
                  priority
                />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <nav className={styles.desktopNav}>
              <a href="#home">Home</a>
              <a href="#about">About Us</a>
              <a href="#pricing">Pricing</a>
              <a href="#contact">Contact Us</a>
            </nav>
            
            {/* Desktop Action */}
            <div className={styles.desktopAction}>
              <Link href="#contact" className={styles.contactButton}>
                Contact Us
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button 
              className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenuOverlay} ${isMobileMenuOpen ? styles.open : ""}`}>
        <div className={styles.mobileMenuBackdrop} onClick={closeMobileMenu} />
        <div className={styles.mobileMenuPanel}>
          <div className={styles.mobileMenuContent}>
            <nav className={styles.mobileNav}>
              <a href="#home" onClick={closeMobileMenu}>Home</a>
              <a href="#about" onClick={closeMobileMenu}>About Us</a>
              <a href="#pricing" onClick={closeMobileMenu}>Pricing</a>
              <a href="#contact" onClick={closeMobileMenu}>Contact Us</a>
            </nav>
            <div className={styles.mobileAction}>
               <Link href="#contact" className={styles.contactButton} onClick={closeMobileMenu}>
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default Header;
