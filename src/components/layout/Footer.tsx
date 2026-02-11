"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  InstagramIcon,
  TikTokIcon,
  LinkedInIcon,
  GitHubIcon,
} from "../ui/Icons";
import styles from "./Footer.module.css";

// Lazy load Prism with no SSR
const Prism = dynamic(() => import("../ui/Prism"), {
  ssr: false,
  loading: () => <div style={{ height: "30rem" }} />, // Optional placeholder
});

const Footer = () => {
  const router = useRouter();
  const [prismScale, setPrismScale] = useState(1.2);
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/contact?email=${encodeURIComponent(email)}#contact-form`);
  };

  useEffect(() => {
    const handleResize = () => {
      // Scale down prism based on screen width
      // Desktop base is 1.2
      if (window.innerWidth < 768) {
        setPrismScale(0.7); // Mobile
      } else if (window.innerWidth < 1024) {
        setPrismScale(0.9); // Tablet
      } else {
        setPrismScale(1.2); // Desktop
      }
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.background} aria-hidden>
        <Prism
          animationType="rotate"
          timeScale={0.3}
          height={4}
          baseWidth={6}
          scale={prismScale}
          hueShift={0}
          colorFrequency={1}
          noise={0}
          glow={1}
          suspendWhenOffscreen={true}
        />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.contactSection}>
          <h2>Get in Touch</h2>
          <p>
            Have a project in mind? Let's talk about how we can bring it to
            life.
          </p>

          <form className={styles.form} onSubmit={handleSubscribe}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter Your Email"
                className={styles.input}
                aria-label="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </div>
            <p className={styles.helper}>Describe your project</p>
          </form>
        </div>

        <div className={styles.footerBlock}>
          <div className={styles.top}>
            <div className={styles.brand}>
              <div className={styles.logo}>
                <Image
                  src="/images/Luxe Logo.png"
                  alt="Luxe Logo"
                  width={120}
                  height={40}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p>
                Building scalable digital solutions for modern businesses,
                crafted with precision.
              </p>
            </div>
            <div className={styles.columns}>
              <div>
                <h4>Explore</h4>
                <Link href="/">Home</Link>
                <Link href="/about">About Us</Link>
                <Link href="/web-builder">Web Builder</Link>
                <Link href="/pricing">Pricing</Link>
                <Link href="/contact">Contact Us</Link>
              </div>
              <div>
                <h4>About</h4>
                <a href="/#services">Services</a>
                <a href="/#work">Our Work</a>
                <Link href="/pricing">Pricing</Link>
                <Link href="/pricing">Our Team</Link>
              </div>
              <div>
                <h4>Support</h4>
                <div className={styles.linkGroup}>
                  <a href="/contact">Contact Us</a>
                  <a href="/contact">Community</a>
                  <a href="/contact">Support</a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.bottom}>
            <span>Produced by @Luxe Designs</span>
            <div className={styles.socials}>
              <span>Our Story Continues:</span>
              <div className={styles.icons}>
                <a href="#" aria-label="Instagram">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="TikTok">
                  <TikTokIcon />
                </a>
                <a href="#" aria-label="LinkedIn">
                  <LinkedInIcon />
                </a>
                <a href="#" aria-label="GitHub">
                  <GitHubIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// Force re-compile to fix hydration mismatch

// Force re-compile to fix hydration mismatch
