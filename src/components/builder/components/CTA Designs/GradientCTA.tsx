"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "999px",
};

/**
 * Gradient CTA — full-width atmospheric section with scenic warm gradient,
 * large centered heading, and a single dark pill button.
 * Inspired by the "Bring clarity, structure, and speed" reference.
 */
const GradientCTA: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, fonts } = globalStyles;
  const r = radiusMap[borderRadius];
  const ct = sectionContent[sectionId] ?? {};

  const heading = ct.heading ?? "Bring clarity, structure, and speed to your workflow";
  const btnText = ct.btnText ?? "Start your Workspace";

  // Scenic atmospheric gradient: accent tints blend with warm peach → lavender → white
  const gradient = [
    `radial-gradient(ellipse at 30% 20%, ${colors.accent}45 0%, transparent 55%)`,
    `linear-gradient(170deg, #f9e8d8 0%, #ecdff0 45%, #f0edf8 75%, #f7f5f9 100%)`,
  ].join(", ");

  return (
    <div
      style={{
        padding: "96px 48px 80px",
        background: gradient,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle hill silhouette at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 64,
          background:
            "radial-gradient(ellipse 120% 100% at 50% 100%, rgba(210,205,230,0.55) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <h2
        style={{
          fontSize: 38,
          fontWeight: 400,
          color: "#1a1010",
          maxWidth: 520,
          margin: "0 auto 36px",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          fontFamily: `"${fonts.heading}", sans-serif`,
          position: "relative",
        }}
      >
        {heading}
      </h2>

      <button
        style={{
          padding: "13px 30px",
          fontSize: 14,
          fontWeight: 500,
          borderRadius: r,
          border: "none",
          background: "#0f0f0f",
          color: "#ffffff",
          cursor: "pointer",
          letterSpacing: "-0.01em",
          fontFamily: `"${fonts.body}", sans-serif`,
          position: "relative",
        }}
      >
        {btnText}
      </button>
    </div>
  );
};

export default GradientCTA;
