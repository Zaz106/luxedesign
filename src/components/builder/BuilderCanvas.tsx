"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";

const BuilderCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);

  // Limits for zoom
  const minZoom = 0.5;
  const maxZoom = 3;

  // Use a ref to access current state inside the non-passive event listener
  const viewStateRef = useRef(viewState);
  // Update ref whenever state changes
  React.useEffect(() => {
    viewStateRef.current = viewState;
  }, [viewState]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();

      const { deltaX, deltaY, clientX, clientY } = e;
      const { x, y, scale } = viewStateRef.current;

      if (e.ctrlKey) {
        // Zoom Logic (Ctrl + Scroll)
        const zoomSensitivity = 0.001;
        const delta = -deltaY * zoomSensitivity;
        const newScale = Math.min(
          Math.max(scale + delta * scale, minZoom),
          maxZoom,
        );

        const rect = container.getBoundingClientRect();
        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const newX = mouseX - (mouseX - x) * (newScale / scale);
        const newY = mouseY - (mouseY - y) * (newScale / scale);

        setViewState({ x: newX, y: newY, scale: newScale });
      } else {
        // Pan Logic (Normal Scroll)
        // Check for Shift key to enable horizontal scrolling if browser didn't automatically swap deltas
        // Most browsers swap deltaY to deltaX when shift is held, but we prevented default.
        // If deltaX is 0 and shift is held, use deltaY as deltaX.
        let effectiveDeltaX = deltaX;
        let effectiveDeltaY = deltaY;

        if (e.shiftKey && deltaX === 0) {
          effectiveDeltaX = deltaY;
          effectiveDeltaY = 0;
        }

        setViewState((prev) => ({
          ...prev,
          x: prev.x - effectiveDeltaX,
          y: prev.y - effectiveDeltaY,
        }));
      }
    };

    // Add non-passive event listener to prevent browser zoom
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", onWheel);
    };
  }, []); // Empty dependency array, state accessed via ref

  const handlePointerDown = (e: React.PointerEvent) => {
    // Middle mouse (button 1) only, or Space+Left (not implemented yet).
    // User requested Middle Mouse drag. Left Mouse drag also requested previously.
    if (e.button === 1 || e.button === 0) {
      e.preventDefault();
      setIsPanning(true);
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPanning) return;

    setViewState((prev) => ({
      ...prev,
      x: prev.x + e.movementX,
      y: prev.y + e.movementY,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsPanning(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const resetView = () => {
    setViewState({ x: 0, y: 0, scale: 1 });
  };

  const handleZoomIn = () => {
    // Zoom in 5% increments, rounded
    const currentScale = viewState.scale;
    let newScale = (Math.floor(currentScale * 20) + 1) / 20;

    // If the calculated step is barely larger or same (floating point noise), jump 1 more
    if (newScale <= currentScale + 0.001) {
      newScale += 0.05;
    }

    newScale = Math.min(newScale, maxZoom);
    setViewState((s) => ({ ...s, scale: newScale }));
  };

  const handleZoomOut = () => {
    const currentScale = viewState.scale;
    let newScale = (Math.ceil(currentScale * 20) - 1) / 20;

    if (newScale >= currentScale - 0.001) {
      newScale -= 0.05;
    }

    newScale = Math.max(newScale, minZoom);
    setViewState((s) => ({ ...s, scale: newScale }));
  };

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        overflow: "hidden",
        position: "relative",
        backgroundColor: "#1F1F1F",
        cursor: isPanning ? "grabbing" : "grab",
        touchAction: "none", // Prevent browser scrolling
        userSelect: "none", // Prevent selection during interaction
      }}
      // onWheel removed, handled by useEffect for non-passive
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Visual Grid Background - Fixed relative to container, usually we want it to move? 
            Actually, grid usually moves with canvas. Let's move it.
        */}
      <div
        style={{
          transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
          transformOrigin: "0 0",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
        }}
      >
        {/* Infinite Grid effect is hard with simple transform. 
               Alternative: Just apply background position. 
           */}
      </div>

      {/* Moving wrapper for grid and content */}
      <div
        style={{
          transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
          transformOrigin: "0 0",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          display: "flex",
          alignItems: "center", // Initial centering only works if x/y are set to center.
          // With manual transform, we start at 0,0. Let's center initially.
        }}
      >
        {/* We need to recenter the content initially. 
              Let's accept 0,0 is top-left of container, so content starts there.
              To center, we can add a large margin or just initialize x/y.
          */}

        {/* Infinite Grid Background inside the transformed world */}
        <div
          style={{
            position: "absolute",
            top: "-10000px",
            left: "-10000px",
            right: "-10000px",
            bottom: "-10000px",
            backgroundImage:
              "radial-gradient(circle, #444 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.3,
            pointerEvents: "none",
          }}
        />

        {/* Content Container - The "Page" being built */}
        {/* Positioned basically at some offset so it's not at 0,0 of the world */}
        <div
          style={{
            width: "1200px",
            minHeight: "100vh", // Full height
            height: "max-content",
            backgroundColor: "white",
            boxShadow: "0 0 40px rgba(0,0,0,0.5)",
            position: "absolute",
            left: "50%",
            top: "100px", // Start with some margin from top
            // transform: "translateX(-50%)" // This might conflict with the parent transform if not careful, but flex parent?
            // Parent is absolute 100%.
            marginLeft: "-600px", // Center manually since left 50%
          }}
        >
          {/* Content will go here */}
          <div
            style={{
              padding: "40px",
              color: "#333",
              fontFamily: "var(--font-body)",
            }}
          >
            <div
              style={{
                border: "1px dashed #ccc",
                padding: "20px",
                textAlign: "center",
              }}
            >
              Header Section Placeholder
            </div>
            <div
              style={{ marginTop: "20px", textAlign: "center", color: "#999" }}
            >
              Canvas Content Area
            </div>
          </div>
        </div>
      </div>

      {/* Recenter View Button */}
      <button
        onClick={resetView}
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          background: "#222",
          color: "white",
          border: "1px solid var(--border)",
          padding: "12px 18px",
          borderRadius: "8px",
          cursor: "pointer",
          fontFamily: "var(--font-body)",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          zIndex: 100,
        }}
      >
        {/* Simple Icon */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
        Reset View
      </button>

      {/* Zoom Controls Overlay */}
      <div
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          display: "flex",
          gap: "10px",
          background: "#222",
          padding: "5px",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          zIndex: 100, // Ensure above canvas
        }}
      >
        <button
          onClick={handleZoomOut}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            width: "30px",
            height: "30px",
          }}
        >
          -
        </button>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "12px",
            minWidth: "40px",
            justifyContent: "center",
            color: "white",
            fontFamily: "var(--font-body)",
          }}
        >
          {Math.round(viewState.scale * 100)}%
        </span>
        <button
          onClick={handleZoomIn}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            cursor: "pointer",
            width: "30px",
            height: "30px",
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default BuilderCanvas;
