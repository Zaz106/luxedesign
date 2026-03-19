"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

const PricingSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, buttonStyle, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Pricing";
  const btnText = ct.btnText ?? "Get Started";
  const plans = [
    { name: ct.plan1Name ?? "Starter", price: ct.plan1Price ?? "$19", desc: ct.plan1Desc ?? "Perfect for personal projects", items: (ct.plan1Features ?? "1 Website, Basic Analytics, Email Support").split(", ") },
    { name: ct.plan2Name ?? "Pro", price: ct.plan2Price ?? "$49", desc: ct.plan2Desc ?? "For growing businesses", items: (ct.plan2Features ?? "5 Websites, Advanced Analytics, Priority Support, Custom Domain").split(", "), featured: true },
    { name: ct.plan3Name ?? "Enterprise", price: ct.plan3Price ?? "$99", desc: ct.plan3Desc ?? "For teams at scale", items: (ct.plan3Features ?? "Unlimited Websites, Full Analytics, Dedicated Manager, SLA Guarantee").split(", ") },
  ];

  const bg = theme === "dark" ? "#111" : "#f5f5f5";
  const cardBg = theme === "dark" ? "#161616" : "#fff";
  const heading = theme === "dark" ? colors.primary : "#111";
  const text = colors.paragraph;
  const border = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: heading,
          textAlign: "center",
          margin: "0 0 48px",
          fontFamily: hFont,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {plans.map((plan) => {
          const isFeatured = plan.featured;
          const btnBg = buttonStyle === "filled" ? colors.accent : "transparent";
          const btnColor = buttonStyle === "filled" ? "#000" : colors.accent;
          const btnBorder = buttonStyle === "outlined" ? `1.5px solid ${colors.accent}` : "none";

          return (
            <div
              key={plan.name}
              style={{
                flex: "1 1 240px",
                minWidth: 0,
                padding: 28,
                background: cardBg,
                borderRadius: radiusMap[borderRadius],
                border: isFeatured
                  ? `1.5px solid ${colors.accent}`
                  : `1px solid ${border}`,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 600, color: heading, marginBottom: 4, fontFamily: hFont }}>
                {plan.name}
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: heading, marginBottom: 4, fontFamily: hFont }}>
                {plan.price}
                <span style={{ fontSize: 14, fontWeight: 400, color: text }}>/mo</span>
              </div>
              <div style={{ fontSize: 13, color: text, marginBottom: 24, fontFamily: bFont }}>{plan.desc}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28, flex: 1 }}>
                {plan.items.map((item) => (
                  <div key={item} style={{ fontSize: 13, color: text, display: "flex", alignItems: "center", gap: 8, fontFamily: bFont }}>
                    <span style={{ color: colors.accent, fontSize: 14 }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "10px 0",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: radiusMap[borderRadius],
                  background: isFeatured ? colors.accent : btnBg,
                  color: isFeatured ? "#000" : btnColor,
                  border: isFeatured ? "none" : btnBorder,
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {btnText}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingSection;
