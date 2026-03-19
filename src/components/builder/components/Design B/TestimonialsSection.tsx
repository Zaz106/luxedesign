"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Large single-column testimonial cards with star rating */
const TestimonialsSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Client Stories";
  const testimonials = [
    { name: ct.author1 ?? "Maria Reynolds", role: ct.role1 ?? "CEO, Vortex Labs", quote: ct.quote1 ?? "They delivered beyond our expectations. The attention to craft is unmatched.", rating: 5 },
    { name: ct.author2 ?? "Tom Bradley", role: ct.role2 ?? "Head of Product, Arc", quote: ct.quote2 ?? "Working with this team felt like having an in-house design department.", rating: 5 },
  ];

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
  const cardBg = theme === "dark" ? "#111" : "#f8f8f8";
  const heading = theme === "dark" ? colors.primary : "#111";
  const text = theme === "dark" ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 640,
          margin: "0 auto",
        }}
      >
        {testimonials.map((t) => (
          <div
            key={t.name}
            style={{
              padding: 32,
              background: cardBg,
              borderRadius: radiusMap[borderRadius],
              border: `1px solid ${border}`,
            }}
          >
            <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
              {Array.from({ length: t.rating }).map((_, i) => (
                <span key={i} style={{ color: colors.accent, fontSize: 16 }}>★</span>
              ))}
            </div>
            <p
              style={{
                fontSize: 16,
                color: heading,
                lineHeight: 1.7,
                margin: "0 0 20px",
                fontWeight: 400,
                fontFamily: bFont,
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: theme === "dark" ? "#222" : "#ddd",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: heading,
                }}
              >
                {t.name.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: heading, fontFamily: hFont }}>{t.name}</div>
                <div style={{ fontSize: 12, color: text, fontFamily: bFont }}>{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;
