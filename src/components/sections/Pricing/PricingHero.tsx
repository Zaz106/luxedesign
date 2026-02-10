"use client";
import React from "react";
import ColorBends from "../../ui/ColorBends";
import styles from "./PricingHero.module.css";
// Updated to use local module which now duplicates/extends AboutHero styles + Selector styles.

export type PricingCategory = "websites" | "apps" | "hosting";

interface PricingHeroProps {
  activeCategory: PricingCategory;
  onSelectCategory: (category: PricingCategory) => void;
}

const PricingHero: React.FC<PricingHeroProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden>
        <ColorBends
          colors={["#2400b3", "#987ed2"]}
          rotation={0}
          speed={0.8}
          scale={0.9}
          mouseInfluence={0}
          noise={0}
          transparent
          autoRotate={0}
          frequency={1}
          warpStrength={1}
          parallax={0}
        />
      </div>
      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <h1 className={styles.heading}>SIMPLE, TRANSPARENT PRICING.</h1>
        <p className={styles.subHeading}>
          CHOOSE THE PLAN THAT FITS YOUR NEEDS. FROM STARTUPS TO ENTERPRISE, WE
          HAVE YOU COVERED.
        </p>

        {/* Category Selector Built-in */}
        <div className={styles.selectorContainer}>
          <div className={styles.slider}>
            {/* Background Pill */}
            <div
              className={styles.activePill}
              style={{
                transform: `translateX(${
                  activeCategory === "websites"
                    ? "0%"
                    : activeCategory === "apps"
                      ? "100%"
                      : "200%"
                })`,
              }}
            />

            <button
              className={`${styles.button} ${activeCategory === "websites" ? styles.active : ""}`}
              onClick={() => onSelectCategory("websites")}
            >
              Websites
            </button>
            <button
              className={`${styles.button} ${activeCategory === "apps" ? styles.active : ""}`}
              onClick={() => onSelectCategory("apps")}
            >
              Mobile Apps
            </button>
            <button
              className={`${styles.button} ${activeCategory === "hosting" ? styles.active : ""}`}
              onClick={() => onSelectCategory("hosting")}
            >
              Hosting
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
