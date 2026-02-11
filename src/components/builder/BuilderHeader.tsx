"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const BuilderHeader = () => {
  const router = useRouter();

  return (
    <header
      style={{
        height: "60px",
        backgroundColor: "#161616ff",
        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        justifyContent: "space-between",
        zIndex: 20,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <button
          onClick={() => router.back()}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255, 255, 255, 0.5)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
            fontFamily: "var(--font-body)",
          }}
          aria-label="Go back"
        >
          <ArrowLeft size={18} />
          Return
        </button>
        <div
          style={{
            width: "1px",
            height: "24px",
            backgroundColor: "var(--border)",
          }}
        ></div>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: 300,
            margin: 0,
            fontFamily: "var(--font-heading)",
          }}
        >
          Web Builder Tool
        </h1>
      </div>

      {/* Placeholder for future header actions */}
      <div></div>
    </header>
  );
};

export default BuilderHeader;
