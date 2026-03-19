"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "6px",
  rounded: "999px",
};

const NavSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const c = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const logo = c.logo ?? "Logo";
  const links = (c.links ?? "Home, About, Work, Contact").split(", ").filter(Boolean);
  const ctaText = c.ctaText ?? "Get Started";

  const bg = theme === "dark" ? "#111" : "#fff";
  const text = theme === "dark" ? colors.primary : "#111";
  const border = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 40px",
        background: bg,
        borderBottom: `1px solid ${border}`,
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 600, color: text, fontFamily: hFont }}>{logo}</div>
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {links.map((item) => (
          <span
            key={item}
            style={{
              fontSize: 14,
              color: theme === "dark" ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.6)",
              cursor: "pointer",
              fontFamily: bFont,
            }}
          >
            {item}
          </span>
        ))}
      </div>
      <div
        style={{
          padding: "8px 20px",
          fontSize: 13,
          borderRadius: radiusMap[borderRadius],
          background: colors.accent,
          color: "#000",
          fontWeight: 500,
          cursor: "pointer",
          fontFamily: bFont,
        }}
      >
        {ctaText}
      </div>
    </div>
  );
};

export default NavSection;
