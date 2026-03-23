"use client";

import React, { useState } from "react";
import BuilderHeader from "./BuilderHeader";
import BuilderSidebar from "./BuilderSidebar";
import BuilderCanvas from "./BuilderCanvas";
import { BuilderProvider } from "../context/BuilderContext";
import "./BuilderLayout.css";

const BuilderLayout = () => {
  const [activePage, setActivePage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BuilderProvider activePage={activePage}>
      <div className="builder-layout">
        <BuilderHeader
          onToggleSidebar={() => setSidebarOpen((p) => !p)}
        />
        <div className="builder-main">
          {/* Overlay backdrop for mobile/tablet */}
          {sidebarOpen && (
            <div
              className="sidebar-overlay"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
            <BuilderSidebar activePage={activePage} setActivePage={setActivePage} />
          </div>
          <BuilderCanvas />
        </div>
      </div>
    </BuilderProvider>
  );
};

export default BuilderLayout;
