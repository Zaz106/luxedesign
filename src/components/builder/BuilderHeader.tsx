"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import "./BuilderHeader.css";

const BuilderHeader = () => {
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
          Return
        </button>
        <div className="divider"></div>
        <h1 className="header-title">Web Builder Tool</h1>
      </div>

      {/* Placeholder for future header actions */}
      <div></div>
    </header>
  );
};

export default BuilderHeader;
