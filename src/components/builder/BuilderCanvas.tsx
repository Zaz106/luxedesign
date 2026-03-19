"use client";

import React, { useRef, useState } from "react";
import { useBuilder } from "./BuilderContext";
import { getComponentForSectionVariant } from "./components";
import "./BuilderCanvas.css";

const BuilderCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewState, setViewState] = useState({ x: 0, y: 0, scale: 1 });
  const [isPanning, setIsPanning] = useState(false);
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const sectionClickedRef = useRef(false);
  const { pageSections, activePage, activeConfigId, setActiveConfigId } = useBuilder();

  const sections = pageSections[activePage] ?? [];

  // Limits for zoom
  const minZoom = 0.25;
  const maxZoom = 3;

  // Use a ref to access current state inside the non-passive event listener
  const viewStateRef = useRef(viewState);
  // Update ref whenever state changes
  React.useEffect(() => {
    viewStateRef.current = viewState;
  }, [viewState]);

  // Intercept the click event that fires after pointerUp.
  // If pointerUp handled a section click, stop propagation so the
  // outside-click handler doesn't immediately clear activeConfigId.
  // Otherwise let it propagate (clicking canvas background closes sidebar).
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onClick = (e: MouseEvent) => {
      if (sectionClickedRef.current) {
        sectionClickedRef.current = false;
        e.stopPropagation();
      }
    };
    container.addEventListener("click", onClick);
    return () => container.removeEventListener("click", onClick);
  }, []);

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
      startPosRef.current = { x: e.clientX, y: e.clientY };
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
    // Detect click (minimal movement) on a canvas section
    if (startPosRef.current && e.button === 0) {
      const dx = e.clientX - startPosRef.current.x;
      const dy = e.clientY - startPosRef.current.y;
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const sectionWrapper = el?.closest("[data-canvas-section-id]");
        if (sectionWrapper) {
          const sectionId = sectionWrapper.getAttribute("data-canvas-section-id");
          if (sectionId) {
            sectionClickedRef.current = true;
            setActiveConfigId(activeConfigId === sectionId ? null : sectionId);
          }
        }
      }
    }
    startPosRef.current = null;
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
          {sections
            .filter((s) => s.isVisible)
            .map((section) => {
              const Component = getComponentForSectionVariant(
                section.id,
                section.designVariant,
              );
              if (!Component) return null;
              return (
                <div key={section.id + (section.designVariant ?? "")} data-canvas-section-id={section.id}>
                  <Component sectionId={section.id} />
                </div>
              );
            })}
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
