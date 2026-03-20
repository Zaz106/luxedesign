"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PanelLeft, Download, Eye } from "lucide-react";
import { useBuilder } from "./BuilderContext";
import "./BuilderHeader.css";

interface BuilderHeaderProps {
  onToggleSidebar: () => void;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const { globalStyles, pageSections, sectionContent, activePage } = useBuilder();

  const handlePreview = () => {
    const snapshot = {
      globalStyles,
      sections: pageSections[activePage] ?? [],
      sectionContent,
    };
    sessionStorage.setItem("luxe-preview", JSON.stringify(snapshot));
    window.open("/web-builder/preview", "_blank");
  };

  return (
    <header className="builder-header">
      <div className="header-left">
        <button
          onClick={() => router.back()}
          className="back-button"
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
          <span className="back-button-label">Return</span>
        </button>
        <div className="divider"></div>
        <h1 className="header-title">Web Builder Tool</h1>
      </div>

      <div className="header-right">
        <button className="header-action-button" aria-label="Download code">
          <Download size={16} />
          <span className="header-action-label">Export</span>
        </button>
        <button className="header-action-button primary" onClick={handlePreview} aria-label="Preview site">
          <Eye size={16} />
          <span className="header-action-label">Preview</span>
        </button>
        <button
          onClick={onToggleSidebar}
          className="sidebar-toggle-button"
          aria-label="Toggle sidebar"
        >
          <PanelLeft size={20} />
        </button>
      </div>
    </header>
  );
};

export default BuilderHeader;
