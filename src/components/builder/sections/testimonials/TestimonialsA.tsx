"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../context/BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

const TestimonialsSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "What people are saying";
  const testimonials = [
    { name: ct.author1 ?? "Alex Chen", role: ct.role1 ?? "Founder, Pixel Co", quote: ct.quote1 ?? "This builder completely transformed how we approach our web presence." },
    { name: ct.author2 ?? "Sarah Kim", role: ct.role2 ?? "Designer, Studio M", quote: ct.quote2 ?? "The attention to detail is remarkable. Best tool I've used in years." },
    { name: ct.author3 ?? "James Okoro", role: ct.role3 ?? "CTO, Launchpad", quote: ct.quote3 ?? "Saved our team weeks of development time. Absolutely worth it." },
  ];

  const bg = theme === "dark" ? "#111" : "#f5f5f5";
  const cardBg = theme === "dark" ? "#181818" : "#fff";
  const heading = colors.primary;
  const text = colors.paragraph;
  const border = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <h2
        style={{
          fontSize: 32,
          fontWeight: 600,
          color: heading,
          textAlign: "center",
          margin: "0 0 48px",
          fontFamily: hFont,
        }}
      >
        {title}
      </h2>
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{
              flex: "1 1 240px",
              minWidth: 0,
              padding: 28,
              background: cardBg,
              borderRadius: radiusMap[borderRadius],
              border: `1px solid ${border}`,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: text,
                lineHeight: 1.7,
                margin: 0,
                fontStyle: "italic",
                fontFamily: bFont,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: heading, fontFamily: hFont }}>
                {t.name}
              </div>
              <div style={{ fontSize: 12, color: colors.secondary, marginTop: 2, fontFamily: bFont }}>
                {t.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
