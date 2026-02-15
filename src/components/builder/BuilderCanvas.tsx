"use client";

import React, { useRef, useState } from "react";
// import { motion, useMotionValue, useTransform } from "motion/react"; // Unused imports
import "./BuilderCanvas.css";

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
      className="builder-canvas-container"
      style={{
        cursor: isPanning ? "grabbing" : "grab",
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {/* Visual Grid Background */}
      <div
        className="canvas-grid-layer"
        style={{
          transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
        }}
      >
        {/* Infinite Grid effect can go here if needed, but using inner wrapper instead */}
      </div>

      {/* Moving wrapper for grid and content */}
      <div
        className="canvas-content-wrapper"
        style={{
          transform: `translate(${viewState.x}px, ${viewState.y}px) scale(${viewState.scale})`,
        }}
      >
        <div className="infinite-grid-background" />

        {/* Content Container - The "Page" being built */}
        <div className="canvas-page">
          {/* Content will go here */}
          <div className="page-content">
            <div className="header-placeholder">Header Section Placeholder</div>
            <div className="content-placeholder">Canvas Content Area</div>
          </div>
        </div>
      </div>

      {/* Recenter View Button */}
      <button
        onClick={resetView}
        onPointerDown={(e) => e.stopPropagation()}
        className="reset-view-button"
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
      <div onPointerDown={(e) => e.stopPropagation()} className="zoom-controls">
        <button onClick={handleZoomOut} className="zoom-button">
          -
        </button>
        <span className="zoom-display">
          {Math.round(viewState.scale * 100)}%
        </span>
        <button onClick={handleZoomIn} className="zoom-button">
          +
        </button>
      </div>
    </div>
  );
};

export default BuilderCanvas;
