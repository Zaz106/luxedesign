"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./PricingApps.module.css";
import {
  FigmaIcon,
  NextJsIcon,
  // TypescriptIcon, // Not used in this updated list
  ReactIcon, // Not used in this updated list for these sets? Wait, let me check request.
  // "Mobile cards: 1. figma, photoshop, adobe illustrator, electron, nextjs. 2&3. figma, photoshop, adobe illustrator, electron, nextjs, stripe"
  ElectronIcon,
  StripeIcon,
  PhotoshopIcon,
  AdobeIllustratorIcon,
  ZAFlag,
  USFlag,
  AUFlag,
  EUFlag,
  GBFlag,
  CAFlag,
} from "../../../ui/Icons";

const simpleIcons = [
  <FigmaIcon key="figma" />,
  <PhotoshopIcon key="ps" />,
  <AdobeIllustratorIcon key="ai" />,
  <ElectronIcon key="electron" />,
  <NextJsIcon key="next" />,
];

const standardIcons = [
  <FigmaIcon key="figma" />,
  <PhotoshopIcon key="ps" />,
  <AdobeIllustratorIcon key="ai" />,
  <ElectronIcon key="electron" />,
  <NextJsIcon key="next" />,
  <StripeIcon key="stripe" />,
];

const enterpriseIcons = [
  <FigmaIcon key="figma" />,
  <PhotoshopIcon key="ps" />,
  <AdobeIllustratorIcon key="ai" />,
  <ElectronIcon key="electron" />,
  <NextJsIcon key="next" />,
  <StripeIcon key="stripe" />,
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

// Currency Logic
type Currency = "ZAR" | "USD" | "AUD" | "EUR" | "GBP" | "CAD";

const currencies: Record<
  Currency,
  {
    label: string;
    symbol: string;
    flag: React.ReactNode;
    rates: { simple: string; standard: string; enterprise: string };
  }
> = {
  ZAR: {
    label: "ZAR",
    symbol: "R",
    rates: { simple: "24,999", standard: "59,999", enterprise: "99,999+" },
    flag: <ZAFlag />,
  },
  USD: {
    label: "USD",
    symbol: "$",
    rates: { simple: "1,499.99", standard: "2,999.99", enterprise: "5,999+" },
    flag: <USFlag />,
  },
  AUD: {
    label: "AUD",
    symbol: "$",
    rates: { simple: "2,499", standard: "4,499", enterprise: "8,999+" },
    flag: <AUFlag />,
  },
  EUR: {
    label: "EUR",
    symbol: "€",
    rates: { simple: "1,299", standard: "2,499", enterprise: "4,999+" },
    flag: <EUFlag />,
  },
  GBP: {
    label: "GBP",
    symbol: "£",
    rates: { simple: "1,199", standard: "2,199", enterprise: "4,499+" },
    flag: <GBFlag />,
  },
  CAD: {
    label: "CAD",
    symbol: "$",
    rates: { simple: "1,999", standard: "3,499", enterprise: "7,499+" },
    flag: <CAFlag />,
  },
};

const PricingApps = () => {
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
        <h2>App Development</h2>
        <div className={styles.subtextWrapper}>
          <p>Native and cross-platform mobile solutions.</p>
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
        {/* Card 1: Simple App */}
        <div className={`${styles.card} ${styles.darkCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={simpleIcons} />
          </div>
          <h3>Simple App</h3>
          <div className={styles.priceValue}>
            <span className={styles.currencySymbol}>
              {selectedCurrency.symbol}
            </span>
            {selectedCurrency.rates.simple}{" "}
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
            Essential for utilities, tools & simple workflows
          </p>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Single-purpose app
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              No authentication or payments
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Minimal backend
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              App store submission
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Timeline: ~1–2 months
            </li>
          </ul>
          <Link href="/contact" className={styles.whiteButton}>
            Contact Us
          </Link>
        </div>

        {/* Card 2: Standard App */}
        <div className={`${styles.card} ${styles.darkCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={standardIcons} />
          </div>
          <h3>Standard App</h3>
          <div className={styles.priceValue}>
            <span className={styles.currencySymbol}>
              {selectedCurrency.symbol}
            </span>
            {selectedCurrency.rates.standard}{" "}
            <span
              style={{
                fontSize: 16,
                marginLeft: 4,
                color: "rgba(255, 255, 255, 0.6)",
              }}
            >
              / estimated
            </span>
          </div>
          <p className={styles.desc}>
            Ideal for small SaaS, client portals & authenticated apps
          </p>
          <div className={styles.divider}></div>
          <ul className={styles.features}>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              User authentication
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Database setup
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              3–5 screens/views
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              API & Payment integrations
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Admin/basic management tools
            </li>
            <li>
              <span className={styles.check}>
                <CheckIcon />
              </span>{" "}
              Timeline: 3–4 months
            </li>
          </ul>
          <Link href="/contact" className={styles.whiteButton}>
            Contact Us
          </Link>
        </div>

        {/* Card 3: Enterprise App */}
        <div className={`${styles.card} ${styles.lightCard}`}>
          <div className={styles.techIcons}>
            <TechStackGroup icons={enterpriseIcons} />
          </div>
          <h3 style={{ color: "#000" }}>Enterprise App</h3>
          <div className={styles.priceHighlight} style={{ color: "#987ed2" }}>
            {selectedCurrency.symbol}
            {selectedCurrency.rates.enterprise}{" "}
            <span
              style={{
                fontSize: 16,
                marginLeft: 4,
                color: "#666",
              }}
            >
              / starting
            </span>
          </div>
          <p className={styles.desc} style={{ color: "rgba(0,0,0,0.7)" }}>
            Perfect for SaaS platforms, multi-role systems, enterprise tools
          </p>
          <div
            className={styles.divider}
            style={{ backgroundColor: "rgba(0,0,0,0.15)" }}
          ></div>
          <ul className={styles.features} style={{ color: "#000" }}>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Advanced backend architecture
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Role-based access
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Analytics & integrations
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Security & scalability planning
            </li>
            <li>
              <span className={styles.checkDark}>
                <CheckIcon />
              </span>{" "}
              Timeline: 4–8 months+
            </li>
          </ul>
          <Link href="/contact" className={styles.blackButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PricingApps;
