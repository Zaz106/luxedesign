"use client";

import React, { useState, useRef, useEffect } from "react";
import BuilderHeader from "./BuilderHeader";
import BuilderSidebar from "./BuilderSidebar";
import BuilderCanvas, { BuilderCanvasHandle } from "./BuilderCanvas";
import BuilderBottomBar from "./BuilderBottomBar";
import { BuilderProvider, useBuilder } from "../context/BuilderContext";
import { ToolSection } from "../sidebar/types";
import "./BuilderLayout.css";

/* Inner component that has access to BuilderContext */
const BuilderLayoutInner: React.FC<{
  activePage: number;
  setActivePage: (p: number) => void;
}> = ({ activePage, setActivePage }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeToolSection, setActiveToolSection] = useState<ToolSection | null>(null);
  const [canvasScale, setCanvasScale] = useState(1);
  const [devMode, setDevMode] = useState(false);
  const canvasRef = useRef<BuilderCanvasHandle>(null);
  const { activeConfigId } = useBuilder();

  // When a section is clicked on the canvas, open the sidebar drawer
  // with "sections" expanded so the secondary sidebar is visible
  const isMobileRef = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1024px)");
    isMobileRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => { isMobileRef.current = e.matches; };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (activeConfigId && isMobileRef.current) {
      setActiveToolSection("sections");
      setSidebarOpen(true);
    }
  }, [activeConfigId]);

  const handleSelectSection = (section: ToolSection) => {
    if (sidebarOpen && activeToolSection === section) {
      setSidebarOpen(false);
      setActiveToolSection(null);
    } else {
      setActiveToolSection(section);
      setSidebarOpen(true);
    }
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    setActiveToolSection(null);
  };

  return (
    <>
      <BuilderHeader devMode={devMode} onToggleDevMode={() => setDevMode((p) => !p)} />
      <div className="builder-main">
        {sidebarOpen && (
          <div
            className="sidebar-overlay"
            onClick={handleCloseSidebar}
          />
        )}
        <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
          <BuilderSidebar
            activePage={activePage}
            setActivePage={setActivePage}
            forceExpandSection={activeToolSection}
          />
        </div>
        <BuilderCanvas ref={canvasRef} onScaleChange={setCanvasScale} devMode={devMode} />
      </div>
      <BuilderBottomBar
        activeToolSection={sidebarOpen ? activeToolSection : null}
        onSelectSection={handleSelectSection}
        onResetView={() => canvasRef.current?.resetView()}
        onZoomIn={() => canvasRef.current?.zoomIn()}
        onZoomOut={() => canvasRef.current?.zoomOut()}
        zoomPercent={Math.round(canvasScale * 100)}
      />
    </>
  );
};

const BuilderLayout = () => {
  const [activePage, setActivePage] = useState(1);

  return (
    <BuilderProvider activePage={activePage}>
      <div className="builder-layout">
        <BuilderLayoutInner activePage={activePage} setActivePage={setActivePage} />
      </div>
    </BuilderProvider>
  );
};

export default BuilderLayout;
