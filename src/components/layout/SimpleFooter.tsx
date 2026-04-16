"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, TikTokIcon, LinkedInIcon, GitHubIcon } from "../ui/Icons";
import styles from "./SimpleFooter.module.css";
import {
  footerAboutLinks,
  footerExploreLinks,
  footerSupportLinks,
} from "./footerLinks";

const SimpleFooter = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contentWrapper}>
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
                Building scalable digital solutions for modern businesses, crafted
                with precision.
              </p>
            </div>
            <div className={styles.columns}>
              <div>
                <h4>Explore</h4>
                {footerExploreLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div>
                <h4>About</h4>
                {footerAboutLinks.map((link) => (
                  <Link key={link.label} href={link.href}>
                    {link.label}
                  </Link>
                ))}
              </div>
              <div>
                <h4>Support</h4>
                <div className={styles.linkGroup}>
                  {footerSupportLinks.map((link) => (
                    <Link key={link.label} href={link.href}>
                      {link.label}
                    </Link>
                  ))}
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
                <a href="#" aria-label="Instagram"><InstagramIcon /></a>
                <a href="#" aria-label="TikTok"><TikTokIcon /></a>
                <a href="#" aria-label="LinkedIn"><LinkedInIcon /></a>
                <a href="#" aria-label="GitHub"><GitHubIcon /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;
