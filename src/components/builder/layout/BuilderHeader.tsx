"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PanelLeft, Download, Eye, Loader2 } from "lucide-react";
import { useBuilder } from "../context/BuilderContext";
import { exportProject } from "../export/exportProject";
import "./BuilderHeader.css";

interface BuilderHeaderProps {
  onToggleSidebar: () => void;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ onToggleSidebar }) => {
  const router = useRouter();
  const { globalStyles, pageSections, sectionContent, activePage } = useBuilder();
  const [isExporting, setIsExporting] = useState(false);

  const handlePreview = () => {
    const snapshot = {
      globalStyles,
      sections: pageSections[activePage] ?? [],
      sectionContent,
    };
    sessionStorage.setItem("luxe-preview", JSON.stringify(snapshot));
    window.open("/web-builder/preview", "_blank");
  };

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportProject(
        globalStyles,
        pageSections[activePage] ?? [],
        sectionContent,
      );
    } catch (err) {
      console.error("Export failed:", err);
    } finally {
      setIsExporting(false);
    }
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
        <button
          className="header-action-button"
          aria-label="Download code"
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? <Loader2 size={16} className="spin-icon" /> : <Download size={16} />}
          <span className="header-action-label">{isExporting ? "Exporting…" : "Export"}</span>
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
