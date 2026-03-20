"use client";

import React from "react";
import { Shuffle, Sparkles } from "lucide-react";
import { useBuilder, GlobalStyles } from "../BuilderContext";
import "./StartSection.css";

/* ── Palette: colors that adapt to the active theme ─────────────── */
type PaletteColors = {
  primary: string;    // heading text
  secondary: string;
  paragraph: string;
  accent: string;
};

type StylePreset = {
  name: string;
  light: PaletteColors;
  dark: PaletteColors;
  fonts: [string, string]; // heading, body
  borderRadius: GlobalStyles["borderRadius"];
};

const PRESETS: StylePreset[] = [
  {
    name: "Minimal",
    light: { primary: "#111111", secondary: "#aaaaaa", paragraph: "#666666", accent: "#000000" },
    dark:  { primary: "#f1f1f1", secondary: "#777777", paragraph: "#999999", accent: "#ffffff" },
    fonts: ["Inter", "Inter"],
    borderRadius: "sharp",
  },
  {
    name: "Elegant",
    light: { primary: "#3a2e24", secondary: "#c4b5a0", paragraph: "#7a6e62", accent: "#c9a87c" },
    dark:  { primary: "#ede4d8", secondary: "#8a7a68", paragraph: "#a89a8e", accent: "#c9a87c" },
    fonts: ["Playfair Display", "Lora"],
    borderRadius: "soft",
  },
  {
    name: "Bold",
    light: { primary: "#1a1a2e", secondary: "#6060a0", paragraph: "#555570", accent: "#6c5ce7" },
    dark:  { primary: "#e8e8ff", secondary: "#8888bb", paragraph: "#9999b0", accent: "#6c5ce7" },
    fonts: ["Space Grotesk", "Inter"],
    borderRadius: "rounded",
  },
  {
    name: "Clean",
    light: { primary: "#1a1a2e", secondary: "#6666a0", paragraph: "#555580", accent: "#e94560" },
    dark:  { primary: "#eeeeff", secondary: "#8888aa", paragraph: "#9999b0", accent: "#e94560" },
    fonts: ["Raleway", "Open Sans"],
    borderRadius: "soft",
  },
  {
    name: "Warm",
    light: { primary: "#3a2510", secondary: "#a0784e", paragraph: "#806040", accent: "#ff6b35" },
    dark:  { primary: "#f5e6d4", secondary: "#c9a96e", paragraph: "#b08a60", accent: "#ff6b35" },
    fonts: ["Merriweather", "Open Sans"],
    borderRadius: "rounded",
  },
  {
    name: "Tech",
    light: { primary: "#111111", secondary: "#607d8b", paragraph: "#546e7a", accent: "#00bcd4" },
    dark:  { primary: "#e8f4f8", secondary: "#90a4ae", paragraph: "#78909c", accent: "#00bcd4" },
    fonts: ["Space Grotesk", "Inter"],
    borderRadius: "sharp",
  },
];

type StartSectionProps = {
  onRandomize?: () => void;
};

const StartSection: React.FC<StartSectionProps> = ({ onRandomize }) => {
  const { globalStyles, setGlobalStyles } = useBuilder();

  const applyPreset = (preset: StylePreset) => {
    const palette = globalStyles.theme === "dark" ? preset.dark : preset.light;
    setGlobalStyles((prev) => ({
      ...prev,
      colors: { ...palette },
      fonts: { heading: preset.fonts[0], body: preset.fonts[1] },
      borderRadius: preset.borderRadius,
    }));
  };

  return (
    <div className="start-section">
      <div className="start-label">Style Presets</div>
      <div className="presets-grid">
        {PRESETS.map((preset) => {
          const palette = globalStyles.theme === "dark" ? preset.dark : preset.light;
          return (
            <div
              key={preset.name}
              className="preset-card"
              onClick={() => applyPreset(preset)}
            >
              <div className="preset-colors">
                {[palette.primary, palette.secondary, palette.paragraph, palette.accent].map((c, i) => (
                  <div
                    key={i}
                    className="preset-dot"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <span className="preset-name">{preset.name}</span>
            </div>
          );
        })}
      </div>

      <div className="start-label" style={{ marginTop: 16 }}>Quick Actions</div>
      <div className="start-actions">
        <button className="start-action-button" onClick={onRandomize}>
          <Shuffle size={14} />
          Randomize Layout
        </button>
        <button
          className="start-action-button"
          onClick={() => {
            const preset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
            applyPreset(preset);
          }}
        >
          <Sparkles size={14} />
          Random Style
        </button>
      </div>
    </div>
  );
};

export default StartSection;
