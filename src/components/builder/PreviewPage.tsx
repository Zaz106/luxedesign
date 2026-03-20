"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Monitor, Tablet, Smartphone, ArrowLeft, RotateCcw } from "lucide-react";
import { BuilderProvider, type GlobalStyles } from "./BuilderContext";
import { getComponentForSectionVariant } from "./components";
import { GOOGLE_FONTS_URL } from "./components/contentSchemas";
import type { SectionItem } from "./sidebar/types";
import type { SectionContent } from "./BuilderContext";
import "./PreviewIsland.css";

type DeviceMode = "desktop" | "tablet" | "mobile";

interface PreviewSnapshot {
  globalStyles: GlobalStyles;
  sections: SectionItem[];
  sectionContent: SectionContent;
}

/** Inner renderer — runs inside BuilderProvider so components can useBuilder() */
const PreviewRenderer: React.FC<{
  sections: SectionItem[];
  globalStyles: GlobalStyles;
}> = ({ sections, globalStyles }) => {
  const themeBg = globalStyles.theme === "dark" ? "#0a0a0a" : "#fff";

  return (
    <div style={{ background: themeBg, minHeight: "100vh" }}>
      {sections
        .filter((s) => s.isVisible)
        .map((section) => {
          const Component = getComponentForSectionVariant(
            section.id,
            section.designVariant,
          );
          if (!Component) return null;
          return <Component key={section.id} sectionId={section.id} />;
        })}
    </div>
  );
};

const PreviewPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<PreviewSnapshot | null>(null);
  const [device, setDevice] = useState<DeviceMode>("desktop");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("luxe-preview");
      if (raw) setSnapshot(JSON.parse(raw));
    } catch {
      /* ignore parse errors */
    }
  }, []);

  // Inject Google Fonts
  useEffect(() => {
    const id = "preview-google-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS_URL;
      document.head.appendChild(link);
    }
  }, []);

  const handleBack = () => {
    window.close();
    // Fallback if window.close() is blocked
    window.location.href = "/web-builder";
  };

  const handleRefresh = () => {
    try {
      const raw = sessionStorage.getItem("luxe-preview");
      if (raw) setSnapshot(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  };

  const isFramed = device !== "desktop";

  const content = useMemo(() => {
    if (!snapshot) return null;
    return (
      <BuilderProvider activePage={1} initialState={snapshot}>
        <PreviewRenderer
          sections={snapshot.sections}
          globalStyles={snapshot.globalStyles}
        />
      </BuilderProvider>
    );
  }, [snapshot]);

  if (!snapshot) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
          color: "#666",
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: 14,
        }}
      >
        No preview data found. Open preview from the builder.
      </div>
    );
  }

  return (
    <div className={`preview-wrapper${isFramed ? " framed" : ""}`}>
      <div className={`preview-frame ${device}`}>
        {content}
      </div>

      {/* Floating Island Toolbar */}
      <div className="preview-island">
        <button
          className={`island-btn${device === "desktop" ? " active" : ""}`}
          onClick={() => setDevice("desktop")}
          aria-label="Desktop view"
        >
          <Monitor size={15} />
        </button>
        <button
          className={`island-btn${device === "tablet" ? " active" : ""}`}
          onClick={() => setDevice("tablet")}
          aria-label="Tablet view"
        >
          <Tablet size={15} />
        </button>
        <button
          className={`island-btn${device === "mobile" ? " active" : ""}`}
          onClick={() => setDevice("mobile")}
          aria-label="Mobile view"
        >
          <Smartphone size={15} />
        </button>

        <div className="island-divider" />

        <button className="island-btn" onClick={handleRefresh} aria-label="Refresh preview">
          <RotateCcw size={14} />
        </button>

        <div className="island-divider" />

        <button className="island-btn-back" onClick={handleBack}>
          <ArrowLeft size={14} />
          Back to Editor
        </button>
      </div>
    </div>
  );
};

export default PreviewPage;
