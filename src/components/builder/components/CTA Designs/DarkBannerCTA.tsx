"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "999px",
};

/**
 * Dark Banner CTA — deep dark background with accent glow at the bottom,
 * large bold centered heading, subtitle, two buttons.
 * Inspired by the Evervault "Enhance customer experience" reference.
 */
const DarkBannerCTA: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, fonts } = globalStyles;
  const r = radiusMap[borderRadius];
  const ct = sectionContent[sectionId] ?? {};

  const heading    = ct.heading    ?? "Enhance customer experience and maximize revenue with your payments.";
  const subheading = ct.subheading ?? "Use our flexible building blocks to build secure and compliant workflows.";
  const primaryBtn = ct.primaryBtn ?? "Book a demo";
  const secondaryBtn = ct.secondaryBtn ?? "Try for free";

  // Accent glow blended into the dark bottom
  const glow = `radial-gradient(ellipse 80% 50% at 50% 100%, ${colors.accent}70 0%, transparent 65%)`;

  return (
    <div
      style={{
        padding: "96px 48px 80px",
        background: `${glow}, #000000`,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <h2
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "rgba(255,255,255,0.92)",
          maxWidth: 620,
          margin: "0 auto 16px",
          lineHeight: 1.25,
          letterSpacing: "-0.02em",
          fontFamily: `"${fonts.heading}", sans-serif`,
        }}
      >
        {heading}
      </h2>

      <p
        style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.45)",
          maxWidth: 380,
          margin: "0 auto 36px",
          lineHeight: 1.65,
          fontFamily: `"${fonts.body}", sans-serif`,
        }}
      >
        {subheading}
      </p>

      <div style={{ display: "flex", gap: 16, justifyContent: "center", alignItems: "center", flexWrap: "wrap" }}>
        <button
          style={{
            padding: "12px 26px",
            fontSize: 13,
            fontWeight: 500,
            borderRadius: r,
            border: "1.5px solid rgba(255,255,255,0.35)",
            background: "transparent",
            color: "rgba(255,255,255,0.9)",
            cursor: "pointer",
            fontFamily: `"${fonts.body}", sans-serif`,
            letterSpacing: "-0.01em",
          }}
        >
          {primaryBtn}
        </button>

        <button
          style={{
            padding: "12px 20px",
            fontSize: 13,
            fontWeight: 400,
            borderRadius: r,
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,0.5)",
            cursor: "pointer",
            fontFamily: `"${fonts.body}", sans-serif`,
          }}
        >
          {secondaryBtn}
        </button>
      </div>
    </div>
  );
};

export default DarkBannerCTA;
