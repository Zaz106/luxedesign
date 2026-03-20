"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";
import { contrastText } from "../../sidebar/colorUtils";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "6px",
  rounded: "999px",
};

const HeroSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, buttonStyle, theme } = globalStyles;
  const c = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const heading = c.heading ?? "Build beautiful websites\nwithout the complexity";
  const subheading = c.subheading ?? "A modern, intuitive web builder that lets you bring your vision to life with zero friction.";
  const primaryBtn = c.primaryBtn ?? "Start Building";
  const secondaryBtn = c.secondaryBtn ?? "Learn More";

  const bg = theme === "dark" ? "#0a0a0a" : "#fafafa";
  const headingColor = colors.primary;
  const sub = colors.paragraph;

  const btnBg = buttonStyle === "filled" ? colors.accent : "transparent";
  const btnColor = buttonStyle === "filled" ? contrastText(colors.accent) : colors.accent;
  const btnBorder = buttonStyle === "outlined" ? `1.5px solid ${colors.accent}` : "none";

  return (
    <div style={{ padding: "100px 40px", textAlign: "center", background: bg }}>
      <h1
        style={{
          fontSize: 52,
          fontWeight: 700,
          color: headingColor,
          lineHeight: 1.15,
          margin: "0 0 16px",
          fontFamily: hFont,
          whiteSpace: "pre-line",
          maxWidth: "100%",
        }}
      >
        {heading}
      </h1>
      <p
        style={{
          fontSize: 17,
          color: sub,
          maxWidth: 520,
          margin: "0 auto 36px",
          lineHeight: 1.6,
          fontFamily: bFont,
        }}
      >
        {subheading}
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <div
          style={{
            padding: "12px 28px",
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
        <div
          style={{
            padding: "12px 28px",
            fontSize: 14,
            fontWeight: 500,
            borderRadius: radiusMap[borderRadius],
            background: "transparent",
            color: theme === "dark" ? "rgba(255,255,255,0.6)" : "#555",
            border: `1.5px solid ${theme === "dark" ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.12)"}`,
            cursor: "pointer",
            fontFamily: bFont,
          }}
        >
          {secondaryBtn}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
