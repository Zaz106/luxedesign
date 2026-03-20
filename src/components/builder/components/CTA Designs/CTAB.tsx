"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";
import { contrastText, getLuminance } from "../../sidebar/colorUtils";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Split CTA — bold text left, action right with accent background */
const CTASection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, buttonStyle, theme } = globalStyles;
  const r = radiusMap[borderRadius];
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const headingText = ct.heading ?? "Ready to elevate your brand?";
  const subheading = ct.subheading ?? "Join hundreds of businesses already growing with us. Start your free trial today.";
  const primaryBtn = ct.primaryBtn ?? "Get Started";
  const secondaryBtn = ct.secondaryBtn ?? "Learn More";

  const accent = colors.accent;
  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const onAccent = contrastText(accent);
  const onAccentMuted = getLuminance(accent) > 0.35 ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.7)";
  const onAccentBorder = getLuminance(accent) > 0.35 ? "rgba(0,0,0,0.3)" : "rgba(255,255,255,0.4)";

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          background: accent,
          borderRadius: r,
          padding: "56px 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        <div style={{ maxWidth: 480 }}>
          <h2 style={{ fontSize: 30, fontWeight: 700, color: onAccent, margin: 0, fontFamily: hFont }}>
            {headingText}
          </h2>
          <p style={{ fontSize: 14, color: onAccentMuted, marginTop: 12, lineHeight: 1.6, fontFamily: bFont }}>
            {subheading}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
          <button
            style={{
              padding: "12px 28px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: r,
              border: `2px solid ${onAccent}`,
              background: onAccent,
              color: accent,
              cursor: "pointer",
              fontFamily: bFont,
            }}
          >
            {primaryBtn}
          </button>
          <button
            style={{
              padding: "12px 28px",
              fontSize: 13,
              fontWeight: 600,
              borderRadius: r,
              border: `2px solid ${onAccentBorder}`,
              background: "transparent",
              color: onAccent,
              cursor: "pointer",
              fontFamily: bFont,
            }}
          >
            {secondaryBtn}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
