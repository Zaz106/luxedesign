"use client";
import React, { useState } from "react";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import PricingHero, {
  PricingCategory,
} from "../../components/sections/Pricing/PricingHero";
import PricingWebsites from "../../components/sections/Pricing/categories/PricingWebsites";
import PricingApps from "../../components/sections/Pricing/categories/PricingApps";
import PricingHosting from "../../components/sections/Pricing/categories/PricingHosting";
import PricingFAQ from "../../components/sections/Pricing/PricingFAQ";
import styles from "./PricingPage.module.css";

export default function Pricing() {
  const [category, setCategory] = useState<PricingCategory>("websites");

  return (
    <div className={styles.page}>
      <Header disableAutoHide={true} />
      <main className={styles.main}>
        <PricingHero activeCategory={category} onSelectCategory={setCategory} />

        <div className={styles.pricingContent}>
          {category === "websites" && <PricingWebsites />}
          {category === "apps" && <PricingApps />}
          {category === "hosting" && <PricingHosting />}
        </div>

        <PricingFAQ />
      </main>
      <Footer />
    </div>
  );
}
