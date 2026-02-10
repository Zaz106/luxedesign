"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./PricingHosting.module.css";
import {
  VercelIcon,
  StripeIcon,
  // NextJsIcon, // Not requested for hosting, removing
  ZAFlag,
  USFlag,
  AUFlag,
  EUFlag,
  GBFlag,
  CAFlag,
} from "../../../ui/Icons";

// Updated Icons: Vercel, Stripe for all
const hostingIcons = [<VercelIcon key="v" />, <StripeIcon key="s" />];

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
    rates: { starter: string; scale: string; enterprise: string };
  }
> = {
  ZAR: {
    label: "ZAR",
    symbol: "R",
    rates: { starter: "299.99", scale: "499.99", enterprise: "999.99" },
    flag: <ZAFlag />,
  },
  USD: {
    label: "USD",
    symbol: "$",
    rates: { starter: "19.99", scale: "34.99", enterprise: "69.99" },
    flag: <USFlag />,
  },
  AUD: {
    label: "AUD",
    symbol: "$",
    rates: { starter: "29.99", scale: "49.99", enterprise: "99.99" },
    flag: <AUFlag />,
  },
  EUR: {
    label: "EUR",
    symbol: "€",
    rates: { starter: "15.99", scale: "29.99", enterprise: "59.99" },
    flag: <EUFlag />,
  },
  GBP: {
    label: "GBP",
    symbol: "£",
    rates: { starter: "12.99", scale: "24.99", enterprise: "49.99" },
    flag: <GBFlag />,
  },
  CAD: {
    label: "CAD",
    symbol: "$",
    rates: { starter: "27.99", scale: "45.99", enterprise: "89.99" },
    flag: <CAFlag />,
  },
};

const PricingHosting = () => {
  // Mobile sticky header logic and Currency
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
    <>
      <section className={styles.section}>
        <div className={styles.header}>
          <h2>Hosting Plans</h2>
          <div className={styles.subtextWrapper}>
            <p>Secure, high-performance hosting for your digital assets.</p>
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
          {/* Card 1: Starter */}
          <div className={`${styles.card} ${styles.darkCard}`}>
            <div className={styles.techIcons}>
              <TechStackGroup icons={hostingIcons} />
            </div>
            <h3>Starter</h3>
            <div className={styles.priceValue}>
              <span className={styles.currencySymbol}>
                {selectedCurrency.symbol}
              </span>
              {selectedCurrency.rates.starter}
              <span
                className={styles.period}
                style={{
                  fontSize: 16,
                  marginLeft: 4,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                /month
              </span>
            </div>
            <p className={styles.desc}>
              Reliable foundation for personal brands & early-stage projects.
            </p>
            <div className={styles.divider}></div>
            <ul className={styles.features}>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                ~100GB bandwidth / month
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                ~300 build minutes
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Basic serverless functions
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                CDN & image optimization
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Custom domain & SSL
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Daily backups
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Email support (48–72h response)
              </li>
            </ul>
            <Link href="/contact" className={styles.whiteButton}>
              Contact Us
            </Link>
          </div>

          {/* Card 2: Scale */}
          <div
            className={`${styles.card} ${styles.darkCard}`}
            style={{ border: "1px solid #997ed267" }}
          >
            <div className={styles.techIcons}>
              <TechStackGroup icons={hostingIcons} />
            </div>
            <h3>Scale (Recommended)</h3>
            <div className={styles.priceValue}>
              <span className={styles.currencySymbol}>
                {selectedCurrency.symbol}
              </span>
              {selectedCurrency.rates.scale}
              <span
                className={styles.period}
                style={{
                  fontSize: 16,
                  marginLeft: 4,
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                /month
              </span>
            </div>
            <p className={styles.desc}>
              High-performance infrastructure for expanding businesses.
            </p>
            <div className={styles.divider}></div>
            <ul className={styles.features}>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                ~1TB bandwidth / month
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                ~1,000 build minutes
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Higher serverless limits
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Faster deployments
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Priority email support (24–48h)
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Preview environments
              </li>
              <li>
                <span className={styles.check}>
                  <CheckIcon />
                </span>{" "}
                Free onboarding & migration
              </li>
            </ul>
            <Link href="/contact" className={styles.whiteButton}>
              Contact Us
            </Link>
          </div>

          {/* Card 3: Enterprise */}
          <div className={`${styles.card} ${styles.lightCard}`}>
            <div className={styles.techIcons}>
              <TechStackGroup icons={hostingIcons} />
            </div>
            <h3 style={{ color: "#000" }}>Enterprise</h3>
            <div className={styles.priceHighlight} style={{ color: "#987ed2" }}>
              {selectedCurrency.rates.enterprise}
              <span
                className={styles.period}
                style={{ fontSize: 16, marginLeft: 4 }}
              >
                /month
              </span>
            </div>
            <p className={styles.desc} style={{ color: "rgba(0,0,0,0.7)" }}>
              Uncompromising speed & security for global scale.
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
                ~5TB bandwidth (or custom)
              </li>
              <li>
                <span className={styles.checkDark}>
                  <CheckIcon />
                </span>{" "}
                Advanced serverless limits
              </li>
              <li>
                <span className={styles.checkDark}>
                  <CheckIcon />
                </span>{" "}
                Multiple team members
              </li>
              <li>
                <span className={styles.checkDark}>
                  <CheckIcon />
                </span>{" "}
                Enhanced security options
              </li>
              <li>
                <span className={styles.checkDark}>
                  <CheckIcon />
                </span>{" "}
                Priority support & SLAs
              </li>
              <li>
                <span className={styles.checkDark}>
                  <CheckIcon />
                </span>{" "}
                Custom infrastructure options
              </li>
            </ul>
            <Link href="/contact" className={styles.blackButton}>
              Contact Us
            </Link>
          </div>
        </div>

        {/* Overage Section */}
        <div
          style={{
            marginTop: "4rem",
            padding: "2rem",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "16px",
            background: "#111",
            maxWidth: "800px",
            margin: "4rem auto 0",
          }}
        >
          <h4
            style={{
              color: "#fff",
              fontSize: "1.2rem",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            Overage (only if limits are exceeded)
          </h4>
          <ul
            style={{
              color: "rgba(255,255,255,0.7)",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              paddingLeft: "1.2rem",
            }}
          >
            <li>Bandwidth overages billed per GB</li>
            <li>Build minutes & function usage billed per unit</li>
            <li>Usage alerts provided to avoid surprises</li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default PricingHosting;
