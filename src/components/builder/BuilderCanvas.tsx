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
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const sectionClickedRef = useRef(false);
  const { pageSections, activePage, activeConfigId, setActiveConfigId } = useBuilder();

  // Touch tracking refs
  const touchesRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const lastPinchDistRef = useRef<number | null>(null);
  const lastPinchCenterRef = useRef<{ x: number; y: number } | null>(null);

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

  // ---- Touch handlers for pinch-to-zoom and faster panning ----
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getTouchDist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
      Math.hypot(a.x - b.x, a.y - b.y);

    const getTouchCenter = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2,
    });

    const onTouchStart = (e: TouchEvent) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        touchesRef.current.set(t.identifier, { x: t.clientX, y: t.clientY });
      }
      if (touchesRef.current.size === 1) {
        const [first] = touchesRef.current.values();
        startPosRef.current = { x: first.x, y: first.y };
        lastPosRef.current = { x: first.x, y: first.y };
      }
      if (touchesRef.current.size === 2) {
        const pts = [...touchesRef.current.values()];
        lastPinchDistRef.current = getTouchDist(pts[0], pts[1]);
        lastPinchCenterRef.current = getTouchCenter(pts[0], pts[1]);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault(); // prevent browser scroll/zoom
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        touchesRef.current.set(t.identifier, { x: t.clientX, y: t.clientY });
      }

      if (touchesRef.current.size === 2) {
        // Pinch zoom
        const pts = [...touchesRef.current.values()];
        const dist = getTouchDist(pts[0], pts[1]);
        const center = getTouchCenter(pts[0], pts[1]);

        if (lastPinchDistRef.current !== null && lastPinchCenterRef.current !== null) {
          const scaleFactor = dist / lastPinchDistRef.current;
          const { x, y, scale } = viewStateRef.current;
          const rect = container.getBoundingClientRect();
          const cx = center.x - rect.left;
          const cy = center.y - rect.top;

          const newScale = Math.min(Math.max(scale * scaleFactor, minZoom), maxZoom);
          const newX = cx - (cx - x) * (newScale / scale) + (center.x - lastPinchCenterRef.current.x);
          const newY = cy - (cy - y) * (newScale / scale) + (center.y - lastPinchCenterRef.current.y);

          setViewState({ x: newX, y: newY, scale: newScale });
        }
        lastPinchDistRef.current = dist;
        lastPinchCenterRef.current = center;
      } else if (touchesRef.current.size === 1 && lastPosRef.current) {
        // Single finger pan
        const [current] = touchesRef.current.values();
        const dx = current.x - lastPosRef.current.x;
        const dy = current.y - lastPosRef.current.y;
        lastPosRef.current = { x: current.x, y: current.y };
        setViewState((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }));
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      // Check for tap on section before removing touches
      if (touchesRef.current.size === 1 && startPosRef.current) {
        const [endPos] = touchesRef.current.values();
        const dx = endPos.x - startPosRef.current.x;
        const dy = endPos.y - startPosRef.current.y;
        if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
          // This was a tap — find the section under the finger
          const el = document.elementFromPoint(endPos.x, endPos.y);
          const sectionWrapper = el?.closest("[data-canvas-section-id]");
          if (sectionWrapper) {
            const sectionId = sectionWrapper.getAttribute("data-canvas-section-id");
            if (sectionId) {
              sectionClickedRef.current = true;
              const current = viewStateRef.current; // use ref for latest
              setActiveConfigId(activeConfigId === sectionId ? null : sectionId);
            }
          }
        }
      }

      for (let i = 0; i < e.changedTouches.length; i++) {
        touchesRef.current.delete(e.changedTouches[i].identifier);
      }
      if (touchesRef.current.size < 2) {
        lastPinchDistRef.current = null;
        lastPinchCenterRef.current = null;
      }
      if (touchesRef.current.size === 1) {
        const [remaining] = touchesRef.current.values();
        lastPosRef.current = { x: remaining.x, y: remaining.y };
      }
      if (touchesRef.current.size === 0) {
        startPosRef.current = null;
        lastPosRef.current = null;
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: false });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    container.addEventListener("touchcancel", onTouchEnd);

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [activeConfigId]);

  const handlePointerDown = (e: React.PointerEvent) => {
    // Skip touch events — handled by touch listeners above
    if (e.pointerType === "touch") return;
    if (e.button === 1 || e.button === 0) {
      e.preventDefault();
      startPosRef.current = { x: e.clientX, y: e.clientY };
      lastPosRef.current = { x: e.clientX, y: e.clientY };
      setIsPanning(true);
      if (containerRef.current) {
        containerRef.current.setPointerCapture(e.pointerId);
      }
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
    if (!isPanning || !lastPosRef.current) return;

    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    lastPosRef.current = { x: e.clientX, y: e.clientY };

    setViewState((prev) => ({
      ...prev,
      x: prev.x + dx,
      y: prev.y + dy,
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return;
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
    lastPosRef.current = null;
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
