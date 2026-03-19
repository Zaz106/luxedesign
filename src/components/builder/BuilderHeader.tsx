"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, PanelLeft } from "lucide-react";
import "./BuilderHeader.css";

interface BuilderHeaderProps {
  onToggleSidebar: () => void;
}

const BuilderHeader: React.FC<BuilderHeaderProps> = ({ onToggleSidebar }) => {
  const router = useRouter();

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
