"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Split hero — text left, image placeholder right */
const HeroSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, buttonStyle, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const label = ct.label ?? "Welcome";
  const headingText = ct.heading ?? "We craft digital\nexperiences that matter";
  const subheading = ct.subheading ?? "Strategy, design and technology — fused into seamless products people love to use.";
  const primaryBtn = ct.primaryBtn ?? "View Our Work";

  const bg = theme === "dark" ? "#0a0a0a" : "#fafafa";
  const heading = theme === "dark" ? colors.primary : "#111";
  const sub = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";

  const btnBg = buttonStyle === "filled" ? colors.accent : "transparent";
  const btnColor = buttonStyle === "filled" ? "#000" : colors.accent;
  const btnBorder = buttonStyle === "outlined" ? `1.5px solid ${colors.accent}` : "none";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "80px 40px",
        background: bg,
        gap: 60,
      }}
    >
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: colors.accent,
            marginBottom: 16,
            fontWeight: 600,
            fontFamily: bFont,
          }}
        >
          {label}
        </div>
        <h1
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: heading,
            lineHeight: 1.2,
            margin: "0 0 20px",
            fontFamily: hFont,
            whiteSpace: "pre-line",
          }}
        >
          {headingText}
        </h1>
        <p
          style={{
            fontSize: 15,
            color: sub,
            lineHeight: 1.7,
            margin: "0 0 32px",
            maxWidth: 440,
            fontFamily: bFont,
          }}
        >
          {subheading}
        </p>
        <div
          style={{
            display: "inline-block",
            padding: "14px 32px",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: radiusMap[borderRadius],
            background: btnBg,
            color: btnColor,
            border: btnBorder,
            cursor: "pointer",
            fontFamily: bFont,
          }}
        >
          {primaryBtn}
        </div>
      </div>
      <div
        style={{
          flex: 1,
          aspectRatio: "4/3",
          background:
            theme === "dark"
              ? "linear-gradient(135deg, #151515, #1e1e1e)"
              : "linear-gradient(135deg, #eee, #e0e0e0)",
          borderRadius: radiusMap[borderRadius],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: sub,
        }}
      >
        Image Placeholder
      </div>
    </div>
  );
};

export default HeroSection;
