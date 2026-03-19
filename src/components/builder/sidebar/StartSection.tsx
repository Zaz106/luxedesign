"use client";

import React from "react";
import { Shuffle, Sparkles } from "lucide-react";
import { useBuilder, GlobalStyles } from "../BuilderContext";
import "./StartSection.css";

type StylePreset = {
  name: string;
  colors: [string, string, string, string]; // primary, secondary, paragraph, accent
  fonts: [string, string]; // heading, body
  borderRadius: GlobalStyles["borderRadius"];
  theme: GlobalStyles["theme"];
};

const PRESETS: StylePreset[] = [
  {
    name: "Minimal",
    colors: ["#ffffff", "#aaaaaa", "#888888", "#000000"],
    fonts: ["Inter", "Inter"],
    borderRadius: "sharp",
    theme: "dark",
  },
  {
    name: "Elegant",
    colors: ["#f5f0eb", "#c4b5a0", "#9a8e82", "#c9a87c"],
    fonts: ["Playfair Display", "Lora"],
    borderRadius: "soft",
    theme: "dark",
  },
  {
    name: "Bold",
    colors: ["#ffffff", "#b0b0b0", "#808080", "#6c5ce7"],
    fonts: ["Space Grotesk", "Inter"],
    borderRadius: "rounded",
    theme: "dark",
  },
  {
    name: "Clean",
    colors: ["#1a1a2e", "#8888aa", "#666680", "#e94560"],
    fonts: ["Raleway", "Open Sans"],
    borderRadius: "soft",
    theme: "dark",
  },
  {
    name: "Warm",
    colors: ["#faf3e0", "#c9a96e", "#a08050", "#ff6b35"],
    fonts: ["Merriweather", "Open Sans"],
    borderRadius: "rounded",
    theme: "dark",
  },
  {
    name: "Tech",
    colors: ["#e0e0e0", "#90a4ae", "#78909c", "#00e5ff"],
    fonts: ["Space Grotesk", "Inter"],
    borderRadius: "sharp",
    theme: "dark",
  },
];

type StartSectionProps = {
  onRandomize?: () => void;
};

const StartSection: React.FC<StartSectionProps> = ({ onRandomize }) => {
  const { setGlobalStyles } = useBuilder();

  const applyPreset = (preset: StylePreset) => {
    setGlobalStyles((prev) => ({
      ...prev,
      colors: {
        primary: preset.colors[0],
        secondary: preset.colors[1],
        paragraph: preset.colors[2],
        accent: preset.colors[3],
      },
      fonts: { heading: preset.fonts[0], body: preset.fonts[1] },
      borderRadius: preset.borderRadius,
      theme: preset.theme,
    }));
  };

  return (
    <div className="start-section">
      <div className="start-label">Style Presets</div>
      <div className="presets-grid">
        {PRESETS.map((preset) => (
          <div
            key={preset.name}
            className="preset-card"
            onClick={() => applyPreset(preset)}
          >
            <div className="preset-colors">
              {preset.colors.map((c, i) => (
                <div
                  key={i}
                  className="preset-dot"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span className="preset-name">{preset.name}</span>
          </div>
        ))}
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
