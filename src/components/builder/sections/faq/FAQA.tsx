"use client";

import React from "react";
import { useBuilder, BorderRadius } from "../../context/BuilderContext";

const radiusMap: Record<BorderRadius, string> = {
  sharp: "0px",
  soft: "8px",
  rounded: "16px",
};

const FAQSection: React.FC<{ sectionId: string }> = ({ sectionId }) => {
  const { globalStyles, sectionContent } = useBuilder();
  const { colors, borderRadius, theme } = globalStyles;
  const ct = sectionContent[sectionId] ?? {};
  const hFont = globalStyles.fonts.heading;
  const bFont = globalStyles.fonts.body;

  const title = ct.title ?? "Frequently Asked Questions";
  const faqs = [
    { q: ct.q1 ?? "How do I get started?", a: ct.a1 ?? "Sign up for a free account and choose a template to begin building your website." },
    { q: ct.q2 ?? "Can I use my own domain?", a: ct.a2 ?? "Yes, all Pro and Enterprise plans include custom domain support." },
    { q: ct.q3 ?? "Is there a free trial?", a: ct.a3 ?? "We offer a 14-day free trial on all paid plans, no credit card required." },
    { q: ct.q4 ?? "Do you offer refunds?", a: ct.a4 ?? "Yes, we have a 30-day money-back guarantee on all plans." },
  ];

  const bg = theme === "dark" ? "#0a0a0a" : "#fff";
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
      <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 12 }}>
        {faqs.map((faq) => (
          <div
            key={faq.q}
            style={{
              padding: "20px 24px",
              background: theme === "dark" ? "#141414" : "#f9f9f9",
              borderRadius: radiusMap[borderRadius],
              border: `1px solid ${border}`,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 500, color: heading, marginBottom: 8, fontFamily: hFont }}>
              {faq.q}
            </div>
            <div style={{ fontSize: 13, color: text, lineHeight: 1.6, fontFamily: bFont }}>
              {faq.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
