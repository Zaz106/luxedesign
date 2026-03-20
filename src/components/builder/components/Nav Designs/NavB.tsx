"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "6px",
  rounded: "999px",
};

/** Design B: Centered logo nav with links below */
const NavSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const logo = ct.logo ?? "LOGO";
  const links = (ct.links ?? "Home, About, Services, Work, Contact").split(", ").filter(Boolean);

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const text = colors.primary;
  const sub = colors.paragraph;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 40px 16px",
        background: bg,
        gap: 10,
      }}
    >
      <div style={{ fontSize: 20, fontWeight: 700, color: text, letterSpacing: 2, fontFamily: hFont }}>
        {logo}
      </div>
      <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        {links.map((item) => (
          <span
            key={item}
            style={{
              fontSize: 12,
              color: sub,
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: 1.5,
              fontWeight: 500,
              fontFamily: bFont,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

export default NavSection;
