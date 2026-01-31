"use client";

import Image from "next/image";
import Prism from "../ui/Prism";
import { InstagramIcon, TikTokIcon, LinkedInIcon, GitHubIcon } from "../ui/SocialIcons";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.background} aria-hidden>
        <Prism
          animationType="rotate"
          timeScale={0.3}
          height={4}
          baseWidth={6}
          scale={1.2}
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

          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="Enter Your Email"
                className={styles.input}
                aria-label="Email address"
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
                Building scalable digital solutions for modern businesses, crafted
                with precision.
              </p>
            </div>
            <div className={styles.columns}>
              <div>
                <h4>Explore</h4>
                <a href="#home">Home</a>
                <a href="#about">About Us</a>
                <a href="#projects">Projects</a>
              </div>
              <div>
                <h4>About</h4>
                <a href="#services">Services</a>
                <a href="#work">Our Work</a>
                <a href="#pricing">Pricing</a>
              </div>
              <div>
                <h4>Support</h4>
                <div className={styles.linkGroup}>
                  <a href="#contact">Contact Us</a>
                  <a href="#contact">Community</a>
                  <a href="#contact">Support</a>
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

export default Footer;
