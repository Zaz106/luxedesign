"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Horizontal toggle pricing — featured card elevated */
const PricingSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, buttonStyle, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Simple, transparent pricing";
  const subtitle = ct.subtitle ?? "No hidden fees. Cancel anytime.";
  const btnText = ct.btnText ?? "Get Started";
  const plans = [
    { name: ct.plan1Name ?? "Basic", price: ct.plan1Price ?? "$29", features: (ct.plan1Features ?? "Up to 3 pages, Mobile responsive, Basic SEO, Email support").split(", ").filter(Boolean) },
    { name: ct.plan2Name ?? "Growth", price: ct.plan2Price ?? "$79", features: (ct.plan2Features ?? "Up to 15 pages, Advanced SEO, Analytics dashboard, Priority support, Custom integrations").split(", ").filter(Boolean), featured: true },
    { name: ct.plan3Name ?? "Scale", price: ct.plan3Price ?? "$149", features: (ct.plan3Features ?? "Unlimited pages, Dedicated account manager, Custom API access, White-label option, SLA guarantee, 24/7 phone support").split(", ").filter(Boolean) },
  ];

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const cardBg = theme === "dark" ? "#111" : "#f9f9f9";
  const heading = theme === "dark" ? colors.primary : "#111";
  const text = colors.paragraph;
  const border = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <h2 style={{ fontSize: 32, fontWeight: 600, color: heading, margin: "0 0 8px", fontFamily: hFont }}>
          {title}
        </h2>
        <p style={{ fontSize: 15, color: text, margin: 0, fontFamily: bFont }}>{subtitle}</p>
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
        {plans.map((plan) => {
          const isFeatured = !!plan.featured;
          const btnBg = buttonStyle === "filled" || isFeatured ? colors.accent : "transparent";
          const btnColor = buttonStyle === "filled" || isFeatured ? "#000" : colors.accent;
          const btnBorder = !isFeatured && buttonStyle === "outlined" ? `1.5px solid ${colors.accent}` : "none";

          return (
            <div
              key={plan.name}
              style={{
                flex: "1 1 240px",
                minWidth: 0,
                padding: isFeatured ? "36px 28px" : "28px",
                background: isFeatured
                  ? (theme === "dark" ? "#151515" : "#fff")
                  : cardBg,
                borderRadius: radiusMap[borderRadius],
                border: isFeatured ? `1.5px solid ${colors.accent}` : `1px solid ${border}`,
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {isFeatured && (
                <div
                  style={{
                    position: "absolute",
                    top: -12,
                    left: "50%",
                    transform: "translateX(-50%)",
                    background: colors.accent,
                    color: "#000",
                    fontSize: 11,
                    fontWeight: 600,
                    padding: "4px 14px",
                    borderRadius: radiusMap[borderRadius],
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    fontFamily: bFont,
                  }}
                >
                  Popular
                </div>
              )}
              <div style={{ fontSize: 14, fontWeight: 500, color: text, marginBottom: 8, fontFamily: bFont }}>
                {plan.name}
              </div>
              <div style={{ fontSize: 40, fontWeight: 700, color: heading, marginBottom: 4, fontFamily: hFont }}>
                {plan.price}
                <span style={{ fontSize: 14, fontWeight: 400, color: text }}> /mo</span>
              </div>
              <div style={{ height: 1, background: border, margin: "16px 0" }} />
              <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 24 }}>
                {plan.features.map((f) => (
                  <div key={f} style={{ fontSize: 13, color: text, display: "flex", gap: 8, alignItems: "center", fontFamily: bFont }}>
                    <span style={{ color: colors.accent }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <div
                style={{
                  padding: "12px 0",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: radiusMap[borderRadius],
                  background: btnBg,
                  color: btnColor,
                  border: btnBorder,
                  textAlign: "center",
                  cursor: "pointer",
                  fontFamily: bFont,
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
