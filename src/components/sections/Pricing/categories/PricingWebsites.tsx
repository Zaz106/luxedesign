"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./PricingWebsites.module.css";
import {
  ZAFlag,
  USFlag,
  AUFlag,
  EUFlag,
  GBFlag,
  CAFlag,
  FigmaIcon,
  ReactIcon, // Not requested but in import, removing from usage
  NextJsIcon,
  TypescriptIcon,
  AdobeIllustratorIcon,
  PhotoshopIcon,
} from "../../../ui/Icons";

// Updated Icons per request: figma, photoshop, adobe illustrator, nextjs, typescript. (for both cards)
const websiteIcons = [
  <FigmaIcon key="figma" />,
  <PhotoshopIcon key="ps" />,
  <AdobeIllustratorIcon key="ai" />,
  <NextJsIcon key="next" />,
  <TypescriptIcon key="ts" />,
];

const TechStackGroup = ({ icons }: { icons: React.ReactNode[] }) => (
  <div className={styles.techStackGroup}>
    {icons.map((icon, index) => (
      <div
        key={index}
        className={styles.techStackItem}
        style={{ zIndex: icons.length - index }}
      >
        {icon}
      </div>
    ))}
  </div>
);

const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    width="16"
    height="16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4 12.6111L8.92308 17.5L20 6.5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

// Currency Logic Configuration
type Currency = "ZAR" | "USD" | "AUD" | "EUR" | "GBP" | "CAD";

const currencies: Record<
  Currency,
  {
    label: string;
    symbol: string;
    flag: React.ReactNode;
    rates: { single: string; custom: string };
  }
> = {
  ZAR: {
    label: "ZAR",
    symbol: "R",
    rates: { single: "4,999", custom: "8,999" },
    flag: <ZAFlag />,
  },
  USD: {
    label: "USD",
    symbol: "$",
    rates: { single: "349.99", custom: "599.99" },
    flag: <USFlag />,
  },
  AUD: {
    label: "AUD",
    symbol: "$",
    rates: { single: "499.99", custom: "899.99" },
    flag: <AUFlag />,
  },
  EUR: {
    label: "EUR",
    symbol: "€",
    rates: { single: "299.99", custom: "549.99" },
    flag: <EUFlag />,
  },
  GBP: {
    label: "GBP",
    symbol: "£",
    rates: { single: "249.99", custom: "449.99" },
    flag: <GBFlag />,
  },
  CAD: {
    label: "CAD",
    symbol: "$",
    rates: { single: "459.99", custom: "849.99" },
    flag: <CAFlag />,
  },
};

const PricingWebsites = () => {
  const [currency, setCurrency] = useState<Currency>("ZAR");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const cached = localStorage.getItem("user_currency");
        if (cached && cached in currencies) {
          setCurrency(cached as Currency);
          return;
        }
        const res = await fetch("https://ipapi.co/currency/");
        if (!res.ok) throw new Error("Currency fetch failed");
        const data = await res.text();
        const curr = data.trim();
        const validCurrency = curr in currencies ? (curr as Currency) : "USD";
        setCurrency(validCurrency);
        localStorage.setItem("user_currency", validCurrency);
      } catch (err) {}
    };
    getCurrency();
  }, []);

  const selectedCurrency = currencies[currency];
  const handleCurrencySelect = (curr: Currency) => {
    setCurrency(curr);
    setIsOpen(false);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2>Website Development</h2>
        <div className={styles.subtextWrapper}>
          <p>Flexible pricing tailored to your project requirements.</p>
          <div className={styles.currencyWrapper}>
            <button
              className={styles.currencyToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Select Currency"
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {selectedCurrency.flag}
              </span>
              <span className={styles.currencyCode}>
                {selectedCurrency.label}
              </span>
              <span
                className={`${styles.chevron} ${isOpen ? styles.open : ""}`}
              >
                <svg viewBox="4 6 16 12" width="12" height="10" fill="none">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
            </button>

            {isOpen && (
              <div className={styles.dropdown}>
                {(Object.keys(currencies) as Currency[]).map((key) => (
                  <button
                    key={key}
                    className={styles.dropdownItem}
                    onClick={() => handleCurrencySelect(key)}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {currencies[key].flag}
                    </span>
                    <span>{currencies[key].label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {/* Card 1: Single-Page Website */}
        <div className={`${styles.card} ${styles.darkCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={websiteIcons} />
          </div>
          <h3>Single-Page Website</h3>
          <div className={styles.priceValue}>
            <span className={styles.currencySymbol}>
              {selectedCurrency.symbol}
            </span>
            {selectedCurrency.rates.single}
            <span
              style={{
                fontSize: 16,
                marginLeft: 4,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              / starting
            </span>
          </div>
          <p className={styles.desc}>
            Perfect for startups, small businesses & landing pages
          </p>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              1 fully responsive page
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Built using pre-made component library
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Choice of 5 flexible wireframes
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              SEO-ready structure
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Custom domain availability + SSL
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Basic analytics setup
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              2 design revisions & 2 build rounds
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Additional Pages: {selectedCurrency.symbol}
              {currency === "ZAR" ? "2,999.99" : "200"}/page
            </li>
          </ul>
          <Link href="/contact" className={styles.whiteButton}>
            Contact Us
          </Link>
        </div>

        {/* Card 2: Custom Landing Page */}
        <div className={`${styles.card} ${styles.darkCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={websiteIcons} />
          </div>
          <h3>Custom Landing Page</h3>
          <div className={styles.priceValue}>
            <span className={styles.currencySymbol}>
              {selectedCurrency.symbol}
            </span>
            {selectedCurrency.rates.custom}{" "}
            <span
              style={{
                fontSize: 16,
                marginLeft: 4,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              / starting
            </span>
          </div>
          <p className={styles.desc}>
            Ideal for portfolios, dashboards & SaaS marketing sites
          </p>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Fully custom UI & layout
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Bespoke components
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Advanced interactions & animations
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              2 design revision rounds
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Production-ready front-end build
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Additional Pages: {selectedCurrency.symbol}
              {currency === "ZAR" ? "4,999.99" : "350"}/page
            </li>
          </ul>
          <Link href="/contact" className={styles.whiteButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingWebsites;
