"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Numbered vertical list with accent line */
const FeatureSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "How we work";
  const items = [
    { num: "01", title: ct.item1Title ?? "Strategy", desc: ct.item1Desc ?? "We start with deep research to understand your goals and audience." },
    { num: "02", title: ct.item2Title ?? "Design", desc: ct.item2Desc ?? "Pixel-perfect interfaces built with your brand identity in mind." },
    { num: "03", title: ct.item3Title ?? "Development", desc: ct.item3Desc ?? "Clean, performant code that scales with your business." },
    { num: "04", title: ct.item4Title ?? "Launch", desc: ct.item4Desc ?? "We handle deployment, testing and post-launch support." },
  ];

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const heading = colors.primary;
  const text = colors.paragraph;
  const border = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: heading,
          margin: "0 0 48px",
          fontFamily: hFont,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {items.map((f, i) => (
          <div
            key={f.num}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 24,
              padding: "28px 0",
              borderTop: `1px solid ${border}`,
              borderBottom: i === items.length - 1 ? `1px solid ${border}` : "none",
            }}
          >
            <span
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: colors.accent,
                minWidth: 28,
                paddingTop: 2,
                fontFamily: bFont,
              }}
            >
              {f.num}
            </span>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: heading, margin: "0 0 6px", fontFamily: hFont }}>
                {f.title}
              </h3>
              <p style={{ fontSize: 13, color: text, lineHeight: 1.6, margin: 0, maxWidth: 480, fontFamily: bFont }}>
                {f.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureSection;
