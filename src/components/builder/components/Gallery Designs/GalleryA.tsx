"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

const GallerySection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Our Work";
  const subtitle = ct.subtitle ?? "A selection of projects we're proud of.";

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const heading = colors.primary;
  const text = colors.paragraph;

  const placeholders = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: heading,
          textAlign: "center",
          margin: "0 0 12px",
          fontFamily: hFont,
        }}
      >
        {title}
      </h2>
      <p
        style={{
          fontSize: 15,
          color: text,
          textAlign: "center",
          margin: "0 0 48px",
          fontFamily: bFont,
        }}
      >
        {subtitle}
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 16,
        }}
      >
        {placeholders.map((i) => (
          <div
            key={i}
            style={{
              aspectRatio: "4/3",
              background:
                theme === "dark"
                  ? `linear-gradient(135deg, #151515, #1a1a1a)`
                  : `linear-gradient(135deg, #eee, #e0e0e0)`,
              borderRadius: radiusMap[borderRadius],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: text,
            }}
          >
            Project {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GallerySection;
