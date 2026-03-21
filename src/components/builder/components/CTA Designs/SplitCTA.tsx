"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";
import { contrastText } from "../../sidebar/colorUtils";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "12px",
  rounded: "999px",
};

const cardRadiusMap: Record<BorderRadius, string> = {
  sharp: "4px",
  soft: "16px",
  rounded: "24px",
};

/** Split CTA — image/visual left, content right. Inspired by Nuvra. */
const SplitCTA: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme, fonts } = globalStyles;
  const r = radiusMap[borderRadius];
  const cardR = cardRadiusMap[borderRadius];
  const ct = sectionContent[sectionId] ?? {};

  const eyebrow     = ct.eyebrow     ?? "Why Choose Us?";
  const heading     = ct.heading     ?? "Designed for Modern Living";
  const f1Title     = ct.feature1Title ?? "Convenience";
  const f1Desc      = ct.feature1Desc  ?? "Access our services on your terms, with minimal disruptions to your day.";
  const f2Title     = ct.feature2Title ?? "Personalization";
  const f2Desc      = ct.feature2Desc  ?? "We focus on you, not just your challenges.";
  const primaryBtn  = ct.primaryBtn  ?? "Get Started";
  const secondaryBtn = ct.secondaryBtn ?? "Learn More";
  const imageUrl    = ct.imageUrl    ?? "";

  const bg           = theme === "dark" ? "#0a0a0a" : "#f9f8f6";
  const headingColor = colors.primary;
  const textColor    = colors.paragraph;
  const eyebrowColor = theme === "dark" ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.4)";
  const dividerColor = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const btnPrimaryBg    = colors.accent;
  const btnPrimaryText  = contrastText(colors.accent);
  const btnSecondaryText   = colors.primary;
  const btnSecondaryBorder = theme === "dark" ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.2)";

  return (
    <div style={{ background: bg, padding: "72px 48px" }}>
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          display: "flex",
          gap: 52,
          alignItems: "center",
        }}
      >
        {/* Left: visual block */}
        <div
          style={{
            flex: "0 0 42%",
            borderRadius: cardR,
            overflow: "hidden",
            aspectRatio: "4 / 3",
            background: imageUrl
              ? `url(${imageUrl}) center / cover no-repeat`
              : `linear-gradient(135deg, ${colors.accent}55 0%, ${colors.accent}18 100%)`,
            minHeight: 260,
          }}
        />

        {/* Right: content */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.1em",
              color: eyebrowColor,
              margin: "0 0 10px",
              fontFamily: `"${fonts.body}", sans-serif`,
            }}
          >
            {eyebrow}
          </p>

          <h2
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: headingColor,
              margin: "0 0 24px",
              lineHeight: 1.25,
              fontFamily: `"${fonts.heading}", sans-serif`,
            }}
          >
            {heading}
          </h2>

          {/* Feature list */}
          <div style={{ marginBottom: 30 }}>
            {[
              { title: f1Title, desc: f1Desc },
              { title: f2Title, desc: f2Desc },
            ].map(({ title, desc }, i) => (
              <div key={i}>
                {i > 0 && (
                  <div
                    style={{
                      borderTop: `1px solid ${dividerColor}`,
                      margin: "14px 0",
                    }}
                  />
                )}
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: headingColor,
                    margin: "0 0 3px",
                    fontFamily: `"${fonts.body}", sans-serif`,
                  }}
                >
                  {title}
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: textColor,
                    margin: 0,
                    lineHeight: 1.6,
                    fontFamily: `"${fonts.body}", sans-serif`,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              style={{
                padding: "11px 26px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: r,
                border: "none",
                background: btnPrimaryBg,
                color: btnPrimaryText,
                cursor: "pointer",
                fontFamily: `"${fonts.body}", sans-serif`,
              }}
            >
              {primaryBtn}
            </button>
            <button
              style={{
                padding: "11px 26px",
                fontSize: 13,
                fontWeight: 500,
                borderRadius: r,
                border: `1.5px solid ${btnSecondaryBorder}`,
                background: "transparent",
                color: btnSecondaryText,
                cursor: "pointer",
                fontFamily: `"${fonts.body}", sans-serif`,
              }}
            >
              {secondaryBtn}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitCTA;
