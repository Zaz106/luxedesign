"use client";

import React, { useState } from "react";
import { useBuilder, BorderRadius } from "../../BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

/** Design B: Expandable accordion FAQ with +/- toggles */
const FAQSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Questions?\nWe've got answers.";
  const faqs = [
    { q: ct.q1 ?? "What is included in the free trial?", a: ct.a1 ?? "Full access to all features for 14 days. No credit card required." },
    { q: ct.q2 ?? "Can I cancel at any time?", a: ct.a2 ?? "Absolutely. There are no long-term contracts and you can cancel with one click." },
    { q: ct.q3 ?? "Do you offer custom plans?", a: ct.a3 ?? "Yes — for teams of 10+ we can create a bespoke package tailored to your needs." },
    { q: ct.q4 ?? "How do I migrate my existing site?", a: ct.a4 ?? "Our onboarding team will handle the full migration at no extra cost." },
    { q: ct.q5 ?? "Is there a setup fee?", a: ct.a5 ?? "No setup fees on any plan. You only pay the monthly or annual subscription." },
  ];

  const bg = theme === "dark" ? "#111" : "#f5f5f5";
  const heading = theme === "dark" ? colors.primary : "#111";
  const text = colors.paragraph;
  const border = theme === "dark" ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ padding: "80px 40px", background: bg }}>
      <div style={{ display: "flex", gap: 64, maxWidth: 960, margin: "0 auto", flexWrap: "wrap" }}>
        <div style={{ flex: "0 1 280px", minWidth: 200 }}>
          <h2 style={{ fontSize: 32, fontWeight: 600, color: heading, margin: 0, fontFamily: hFont, whiteSpace: "pre-line" }}>
            {title}
          </h2>
        </div>
        <div style={{ flex: 1 }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={faq.q}
                style={{
                  borderBottom: `1px solid ${border}`,
                }}
              >
                <div
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "20px 0",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ fontSize: 15, fontWeight: 500, color: heading, fontFamily: bFont }}>
                    {faq.q}
                  </span>
                  <span
                    style={{
                      fontSize: 20,
                      color: text,
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      flexShrink: 0,
                      marginLeft: 16,
                    }}
                  >
                    +
                  </span>
                </div>
                <div
                  style={{
                    overflow: "hidden",
                    maxHeight: isOpen ? 200 : 0,
                    transition: "max-height 0.3s ease",
                  }}
                >
                  <p style={{ fontSize: 13, color: text, lineHeight: 1.7, margin: "0 0 20px", paddingRight: 40, fontFamily: bFont }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
