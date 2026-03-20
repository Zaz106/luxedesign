"use client";

import React from "react";
import { useBuilder } from "../../BuilderContext";

const FooterA: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const logo = ct.logo ?? "Logo";
  const tagline = ct.tagline ?? "Building the future of web creation, one pixel at a time.";
  const copyright = ct.copyright ?? "\u00a9 2026 Company. All rights reserved.";
  const columns = [
    { title: ct.col1Title ?? "Product", links: (typeof ct.col1Links === 'string' ? ct.col1Links : "Features, Pricing, Changelog").split(", ") },
    { title: ct.col2Title ?? "Company", links: (typeof ct.col2Links === 'string' ? ct.col2Links : "About, Blog, Careers").split(", ") },
    { title: ct.col3Title ?? "Support", links: (typeof ct.col3Links === 'string' ? ct.col3Links : "Help Centre, Contact, Status").split(", ") },
  ];

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const heading = colors.primary;
  const text = colors.paragraph;
  const border = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ padding: "60px 40px 32px", background: bg }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 40, flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 600, color: heading, marginBottom: 8, fontFamily: hFont }}>
            {logo}
          </div>
          <div style={{ fontSize: 13, color: text, maxWidth: 240, lineHeight: 1.6, fontFamily: bFont }}>
            {tagline}
          </div>
        </div>
        <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
          {columns.map((col) => (
            <div key={col.title}>
              <div style={{ fontSize: 13, fontWeight: 600, color: heading, marginBottom: 12, fontFamily: hFont }}>
                {col.title}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.links.map((link) => (
                  <span key={link} style={{ fontSize: 13, color: text, cursor: "pointer", fontFamily: bFont }}>
                    {link}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        style={{
          borderTop: `1px solid ${border}`,
          paddingTop: 20,
          fontSize: 12,
          color: text,
          textAlign: "center",
          fontFamily: bFont,
        }}
      >
        {copyright}
      </div>
    </div>
  );
};

export default FooterA;
