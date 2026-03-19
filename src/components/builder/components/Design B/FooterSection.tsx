"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Centered single-column footer with stacked links and social icons */
const FooterSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const r = radiusMap[borderRadius];
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const logo = ct.logo ?? "Brand";
  const links = (ct.links ?? "Home, About, Services, Work, Blog, Contact").split(", ").filter(Boolean);
  const copyright = ct.copyright ?? "\u00a9 2025 Brand. All rights reserved.";

  const bg = theme === "dark" ? "#0a0a0a" : "#fafafa";
  const heading = theme === "dark" ? "#fff" : "#111";
  const text = theme === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  const border = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  const socials = ["Tw", "Ig", "Li", "Gh"];

  return (
    <div style={{ padding: "60px 40px 40px", background: bg }}>
      <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
        {/* Logo */}
        <div style={{ fontSize: 22, fontWeight: 700, color: heading, letterSpacing: -0.5, fontFamily: hFont }}>
          {logo}
        </div>

        {/* Links row */}
        <div style={{ display: "flex", justifyContent: "center", gap: 28, marginTop: 28, flexWrap: "wrap" }}>
          {links.map((link) => (
            <span
              key={link}
              style={{ fontSize: 13, color: text, cursor: "pointer", fontFamily: bFont }}
            >
              {link}
            </span>
          ))}
        </div>

        {/* Social circles */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 28 }}>
          {socials.map((s) => (
            <div
              key={s}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: `1px solid ${border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 600,
                color: text,
                cursor: "pointer",
                fontFamily: bFont,
              }}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Divider + copyright */}
        <div style={{ borderTop: `1px solid ${border}`, marginTop: 40, paddingTop: 24 }}>
          <p style={{ fontSize: 12, color: text, margin: 0, fontFamily: bFont }}>
            {copyright}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterSection;
