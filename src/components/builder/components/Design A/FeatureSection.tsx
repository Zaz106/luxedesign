"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

const FeatureSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Features";
  const subtitle = ct.subtitle ?? "Everything you need to build a standout website.";
  const features = [
    { title: ct.card1Title ?? "Lightning Fast", desc: ct.card1Desc ?? "Optimised performance out of the box with near-instant load times." },
    { title: ct.card2Title ?? "Pixel Perfect", desc: ct.card2Desc ?? "Every element is crafted to be crisp and precise on any screen size." },
    { title: ct.card3Title ?? "Fully Responsive", desc: ct.card3Desc ?? "Layouts that automatically adapt to any device or viewport." },
  ];

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const cardBg = theme === "dark" ? "#151515" : "#f7f7f7";
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
          margin: "0 0 12px",
          fontFamily: hFont,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: text,
          textAlign: "center",
          margin: "0 0 48px",
          fontFamily: bFont,
        }}
      >
        {subtitle}
      </p>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {features.map((f) => (
          <div
            key={f.title}
            style={{
              flex: "1 1 240px",
              minWidth: 0,
              padding: 28,
              background: cardBg,
              borderRadius: radiusMap[borderRadius],
              border: `1px solid ${border}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: radiusMap[borderRadius],
                background: colors.accent,
                opacity: 0.15,
                marginBottom: 16,
              }}
            />
            <h3
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: heading,
                margin: "0 0 8px",
                fontFamily: hFont,
              }}
            >
              {f.title}
            </h3>
            <p style={{ fontSize: 13, color: text, lineHeight: 1.6, margin: 0, fontFamily: bFont }}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
