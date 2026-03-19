"use client";

import React from "react";
import "./StartSection.css";

type StartSectionProps = {
  onRandomize?: () => void;
};

const StartSection: React.FC<StartSectionProps> = ({ onRandomize }) => {
  return (
    <div style={{ padding: "0 4px" }}>
      <button
        className="randomize-button"
        onClick={onRandomize}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
          e.currentTarget.style.color = "white";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.03)";
          e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
        }}
      >
        Randomize Layout
      </button>
    </div>
  );
};

export default StartSection;
