"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";
import { contrastText } from "../../sidebar/colorUtils";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "6px",
  rounded: "999px",
};

const CTASection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, buttonStyle, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const headingText = ct.heading ?? "Ready to get started?";
  const subheading = ct.subheading ?? "Join thousands of creators building stunning websites with ease.";
  const btnText = ct.btnText ?? "Start Free Trial";

  const bg = theme === "dark" ? "#111" : "#f5f5f5";
  const heading = colors.primary;
  const text = colors.paragraph;

  const btnBg = buttonStyle === "filled" ? colors.accent : "transparent";
  const btnColor = buttonStyle === "filled" ? contrastText(colors.accent) : colors.accent;
  const btnBorder = buttonStyle === "outlined" ? `1.5px solid ${colors.accent}` : "none";

  return (
    <div style={{ padding: "80px 40px", background: bg, textAlign: "center" }}>
      <h2
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: heading,
          margin: "0 0 12px",
          fontFamily: hFont,
        }}
      >
        {headingText}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: text,
          margin: "0 0 36px",
          maxWidth: 480,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.6,
          fontFamily: bFont,
        }}
      >
        {subheading}
      </p>
      <div
        style={{
          display: "inline-block",
          padding: "14px 36px",
          fontSize: 15,
          fontWeight: 500,
          borderRadius: radiusMap[borderRadius],
          background: btnBg,
          color: btnColor,
          border: btnBorder,
          cursor: "pointer",
        }}
      >
        {btnText}
      </div>
    </div>
  );
};

export default CTASection;
