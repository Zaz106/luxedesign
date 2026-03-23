"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../context/BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Masonry-style 2-column gallery with overlaid labels */
const GallerySection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Selected Work";
  const projects = [
    { title: ct.item1Title ?? "Brand Refresh", category: ct.item1Cat ?? "Branding" },
    { title: ct.item2Title ?? "Mobile App", category: ct.item2Cat ?? "Development" },
    { title: ct.item3Title ?? "E-Commerce", category: ct.item3Cat ?? "Web Design" },
    { title: ct.item4Title ?? "Dashboard", category: ct.item4Cat ?? "UI/UX" },
  ];

  const bg = theme === "dark" ? "#111" : "#f5f5f5";
  const heading = colors.primary;
  const text = colors.paragraph;

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: heading,
          margin: "0 0 48px",
          fontFamily: hFont,
        }}
      >
        {title}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: 20,
        }}
      >
        {projects.map((p, i) => (
          <div
            key={p.title}
            style={{
              position: "relative",
              aspectRatio: i % 3 === 0 ? "16/10" : "4/3",
              background:
                theme === "dark"
                  ? "linear-gradient(135deg, #1a1a1a, #222)"
                  : "linear-gradient(135deg, #e8e8e8, #ddd)",
              borderRadius: radiusMap[borderRadius],
              overflow: "hidden",
              display: "flex",
              alignItems: "flex-end",
              padding: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  color: colors.accent,
                  marginBottom: 4,
                  fontWeight: 500,
                  fontFamily: bFont,
                }}
              >
                {p.category}
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: heading, fontFamily: hFont }}>
                {p.title}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
