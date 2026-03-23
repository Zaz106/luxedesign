"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Monitor,
  Tablet,
  Smartphone,
  ArrowLeft,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
} from "lucide-react";
import { BuilderProvider, type GlobalStyles } from "../context/BuilderContext";
import { getComponentForSectionVariant } from "../sections/_shared";
import { GOOGLE_FONTS_URL } from "../sections/_shared/contentSchemas";
import type { SectionItem } from "../sidebar/types";
import type { SectionContent } from "../context/BuilderContext";
import "./PreviewIsland.css";

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Types & constants â”€â”€ */

type DeviceMode = "desktop" | "tablet" | "mobile";

interface PreviewSnapshot {
  globalStyles: GlobalStyles;
  sections: SectionItem[];
  sectionContent: SectionContent;
}

const DEVICE_WIDTHS: Record<
  Exclude<DeviceMode, "desktop">,
  { portrait: number; landscape: number }
> = {
  tablet: { portrait: 768, landscape: 1024 },
  mobile: { portrait: 375, landscape: 667 },
};

/** Matching viewport heights for each device â€” makes 100vh work correctly inside iframe */
const DEVICE_HEIGHTS: Record<
  Exclude<DeviceMode, "desktop">,
  { portrait: number; landscape: number }
> = {
  tablet: { portrait: 1024, landscape: 768 },
  mobile: { portrait: 667, landscape: 375 },
};

const ZOOM_STEPS = [50, 75, 100, 125, 150];

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Section renderer â”€â”€ */

const PreviewRenderer: React.FC<{
  sections: SectionItem[];
  globalStyles: GlobalStyles;
}> = ({ sections, globalStyles }) => {
  const themeBg = globalStyles.theme === "dark" ? "#0a0a0a" : "#fff";

  return (
    <div style={{ background: themeBg }}>
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

/* â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ Preview page â”€â”€ */

const PreviewPage: React.FC = () => {
  const [snapshot, setSnapshot] = useState<PreviewSnapshot | null>(null);
  const [device, setDevice] = useState<DeviceMode>("desktop");
  const [zoom, setZoom] = useState(100);
  const [landscape, setLandscape] = useState(false);
  const [isRaw, setIsRaw] = useState(false);
  /** Controlled iframe height â€” initialised to device viewport height so 100vh works inside */
  const [iframeHeight, setIframeHeight] = useState<number | string>("100vh");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* â”€â”€ Bootstrap â”€â”€ */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsRaw(params.get("raw") === "true");
    try {
      const raw = sessionStorage.getItem("luxe-preview");
      if (raw) setSnapshot(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  /* â”€â”€ Google Fonts â”€â”€ */
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

  /* â”€â”€ Raw mode body setup â”€â”€ */
  useEffect(() => {
    if (!isRaw || !snapshot) return;
    const bg = snapshot.globalStyles.theme === "dark" ? "#0a0a0a" : "#fff";
    document.documentElement.style.background = bg;
    document.body.style.background = bg;
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    // Capture viewport height BEFORE iframe can grow  prevents 100vh-based
    // content (e.g. hero sections) from causing an infinite resize loop.
    document.documentElement.style.setProperty("--preview-vh", window.innerHeight + "px");
  }, [isRaw, snapshot]);

  /* â”€â”€ Raw mode: report content height to parent via postMessage â”€â”€ */
  useEffect(() => {
    if (!isRaw) return;

    const sendHeight = () => {
      // measure the actual rendered content height, bypassing overflow clipping
      const h = document.body.scrollHeight || document.documentElement.scrollHeight;
      if (h > 0) window.parent.postMessage({ type: "luxe-preview-height", height: h }, "*");
    };

    // After first paint
    requestAnimationFrame(sendHeight);

    const ro = new ResizeObserver(sendHeight);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, [isRaw, snapshot]);

  /* â”€â”€ Seed iframe height to device viewport size on every device / orientation change â”€â”€ */
  useEffect(() => {
    if (isRaw) return;
    if (device === "desktop") {
      setIframeHeight("100vh");
    } else {
      const h = landscape
        ? DEVICE_HEIGHTS[device as "tablet" | "mobile"].landscape
        : DEVICE_HEIGHTS[device as "tablet" | "mobile"].portrait;
      setIframeHeight(h);
    }
  }, [device, landscape, isRaw]);

  /* â”€â”€ Parent mode: receive height messages from iframe â”€â”€ */
  useEffect(() => {
    if (isRaw) return;
    const handle = (e: MessageEvent) => {
      if (e.data?.type === "luxe-preview-height") {
        setIframeHeight(e.data.height as number);
      }
    };
    window.addEventListener("message", handle);
    return () => window.removeEventListener("message", handle);
  }, [isRaw]);

  /* â”€â”€ Actions â”€â”€ */
  const handleBack = () => {
    window.close();
    window.location.href = "/web-builder";
  };

  const handleRefresh = useCallback(() => {
    try {
      const raw = sessionStorage.getItem("luxe-preview");
      if (raw) setSnapshot(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    if (iframeRef.current) {
      // Force reload by temporarily clearing src
      const src = iframeRef.current.src;
      iframeRef.current.src = "";
      requestAnimationFrame(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      });
    }
  }, []);

  const cycleZoom = (dir: 1 | -1) => {
    setZoom((prev) => {
      const idx = ZOOM_STEPS.indexOf(prev);
      const next = idx + dir;
      if (next < 0 || next >= ZOOM_STEPS.length) return prev;
      return ZOOM_STEPS[next];
    });
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• RAW MODE (rendered inside iframe) â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

  if (isRaw) {
    if (!snapshot) return null;
    return (
      <BuilderProvider activePage={1} initialState={snapshot}>
        <PreviewRenderer
          sections={snapshot.sections}
          globalStyles={snapshot.globalStyles}
        />
      </BuilderProvider>
    );
  }

  /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• NORMAL MODE â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

  if (!snapshot) {
    return (
      <div className="preview-empty">
        No preview data found. Open preview from the builder.
      </div>
    );
  }

  const isFramed = device !== "desktop";
  const frameW = isFramed
    ? landscape
      ? DEVICE_WIDTHS[device as "tablet" | "mobile"].landscape
      : DEVICE_WIDTHS[device as "tablet" | "mobile"].portrait
    : 0;
  const themeBg = snapshot.globalStyles.theme === "dark" ? "#0a0a0a" : "#fff";

  return (
    <div className={`preview-wrapper${isFramed ? " framed" : ""}`}>
      {/* Viewport dimension pill */}
      {isFramed && <div className="preview-dim-badge">{frameW}px</div>}

      {/*
        The iframe is ALWAYS mounted and visible for all device modes.
        Width is controlled via CSS/inline style â€” never display:none.
        This means the browser always lays out iframe content at the correct
        width, so height syncs (via postMessage) are always accurate and
        transitions between device sizes are seamless CSS animations.
      */}
      <div
        className={`preview-frame ${device}`}
        style={{
          ...(isFramed ? { width: frameW } : {}),
          ...(zoom !== 100
            ? { transform: `scale(${zoom / 100})`, transformOrigin: "top center" }
            : {}),
        }}
      >
        <iframe
          ref={iframeRef}
          src="/web-builder/preview?raw=true"
          style={{
            width: "100%",
            border: "none",
            display: "block",
            background: themeBg,
            height: typeof iframeHeight === "number" ? `${iframeHeight}px` : iframeHeight,
          }}
          title="Preview"
        />
      </div>

      {/* â”€â”€â”€ Floating Island â”€â”€â”€ */}
      <div className="preview-island">
        <button
          className={`island-btn${device === "desktop" ? " active" : ""}`}
          onClick={() => {
            setDevice("desktop");
            setLandscape(false);
          }}
          aria-label="Desktop view"
          data-tooltip="Desktop"
        >
          <Monitor size={15} />
        </button>
        <button
          className={`island-btn${device === "tablet" ? " active" : ""}`}
          onClick={() => setDevice("tablet")}
          aria-label="Tablet view"
          data-tooltip="Tablet"
        >
          <Tablet size={15} />
        </button>
        <button
          className={`island-btn${device === "mobile" ? " active" : ""}`}
          onClick={() => setDevice("mobile")}
          aria-label="Mobile view"
          data-tooltip="Mobile"
        >
          <Smartphone size={15} />
        </button>

        <div className="island-divider" />

        {/* Zoom controls */}
        <button
          className="island-btn"
          onClick={() => cycleZoom(-1)}
          disabled={zoom <= ZOOM_STEPS[0]}
          aria-label="Zoom out"
          data-tooltip="Zoom out"
        >
          <ZoomOut size={14} />
        </button>
        <span className="island-zoom-label">{zoom}%</span>
        <button
          className="island-btn"
          onClick={() => cycleZoom(1)}
          disabled={zoom >= ZOOM_STEPS[ZOOM_STEPS.length - 1]}
          aria-label="Zoom in"
          data-tooltip="Zoom in"
        >
          <ZoomIn size={14} />
        </button>

        <div className="island-divider" />

        {/* Orientation toggle (tablet / mobile only) */}
        {isFramed && (
          <>
            <button
              className={`island-btn${landscape ? " active" : ""}`}
              onClick={() => setLandscape((v) => !v)}
              aria-label={landscape ? "Switch to portrait" : "Switch to landscape"}
              data-tooltip={landscape ? "Portrait" : "Landscape"}
            >
              {device === "mobile" ? (
                <Smartphone
                  size={14}
                  className={`orient-icon${landscape ? " is-landscape" : ""}`}
                />
              ) : (
                <Tablet
                  size={14}
                  className={`orient-icon${landscape ? " is-landscape" : ""}`}
                />
              )}
            </button>
            <div className="island-divider" />
          </>
        )}

        {/* Utilities */}
        <button
          className="island-btn"
          onClick={handleRefresh}
          aria-label="Refresh"
          data-tooltip="Refresh"
        >
          <RotateCcw size={14} />
        </button>
        <button
          className="island-btn"
          onClick={toggleFullscreen}
          aria-label="Fullscreen"
          data-tooltip="Fullscreen"
        >
          <Maximize2 size={14} />
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

