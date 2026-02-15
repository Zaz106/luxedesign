"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Edit2,
  GripVertical,
  Lock,
  Plus,
  Trash2,
} from "lucide-react";
import BuilderSecondarySidebar from "./BuilderSecondarySidebar";
import "./BuilderSidebar.css";

// --- Types ---
export type SectionItem = {
  id: string;
  title: string;
  isVisible: boolean;
  isLocked?: boolean;
};

type ToolSection = "start" | "sections" | "global" | "content";

// --- Mock Data ---
const initialSections: SectionItem[] = [
  { id: "nav", title: "Navigation", isVisible: true, isLocked: true },
  { id: "hero", title: "Hero Section", isVisible: true, isLocked: true },
  { id: "features", title: "Feature Section 1", isVisible: true },
  { id: "testimonials", title: "Testimonials", isVisible: true },
  { id: "gallery", title: "Gallery", isVisible: true },
  { id: "pricing", title: "Pricing", isVisible: true },
  { id: "faq", title: "FAQ", isVisible: true },
  { id: "cta", title: "CTA", isVisible: true },
  { id: "footer", title: "Footer", isVisible: true, isLocked: true },
];

// --- Helper Components ---

const SearchBar = ({
  value,
  onChange,
  onBlurRef,
}: {
  value: string;
  onChange: (val: string) => void;
  onBlurRef?: React.RefObject<HTMLInputElement | null>;
}) => (
  <div className="search-container">
    <div className="search-wrapper">
      <Search size={14} color="#666" />
      <input
        ref={onBlurRef}
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input"
      />
    </div>
  </div>
);

const Accordion = ({
  id,
  label,
  isOpen,
  onToggle,
  children,
  extraAction,
}: {
  id: ToolSection;
  label: string;
  isOpen: boolean;
  onToggle: (id: ToolSection) => void;
  children: React.ReactNode;
  extraAction?: React.ReactNode;
}) => {
  return (
    <div className="accordion-item">
      <div className="accordion-header" onClick={() => onToggle(id)}>
        <div className="accordion-title-wrapper">
          {/* Merged Header: Large when closed, small when open */}
          <span
            className="accordion-title"
            style={{
              color: isOpen ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7)",
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {extraAction && (
            <div onClick={(e) => e.stopPropagation()}>{extraAction}</div>
          )}
          {!isOpen && <ChevronRight size={14} color="#666" />}
        </div>
      </div>

      <div
        className="accordion-content-wrapper"
        style={{
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="accordion-content-inner">
          <div
            className="accordion-content"
            style={{
              opacity: isOpen ? 1 : 0,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const sanitizeInput = (str: string) => {
  return str.replace(/[^a-zA-Z0-9\s-_]/g, "").trim();
};

const BuilderSidebar = () => {
  // --- State ---
  const [projectTitle, setProjectTitle] = useState("Title");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Page State
  const [pages, setPages] = useState([1]);
  const [activePage, setActivePage] = useState(1);
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);

  const [activeConfigId, setActiveConfigId] = useState<string | null>(null);

  const [expandedSections, setExpandedSections] = useState<ToolSection[]>([]); // Initial collapsed

  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddSectionDropdownOpen, setIsAddSectionDropdownOpen] =
    useState(false);

  // Drag State
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(
    null,
  );
  const [originalSections, setOriginalSections] = useState<
    SectionItem[] | null
  >(null);

  const sidebarRef = useRef<HTMLElement>(null);
  // Ref for secondary sidebar is now likely inside the child component,
  // but we need to detect clicks outside of it.
  // We can wrap the secondary sidebar in a div that we ref here, or pass a ref.
  const secondarySidebarWrapperRef = useRef<HTMLDivElement>(null);
  const addSectionDropdownRef = useRef<HTMLDivElement>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Click Outside Handler ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Check if target is still in the DOM (fixes issue where clicking a toggle that unmounts itself triggers close)
      if (!target.isConnected) return;

      // Check if click comes from a trigger element that handles its own toggling
      const isTrigger = target.closest("[data-prevent-outside-close]");

      // Check Header
      if (headerRef.current && !headerRef.current.contains(target as Node)) {
        setIsEditingTitle(false);
        setIsPageDropdownOpen(false);
      }
      // Check Search
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(target as Node)
      ) {
        searchInputRef.current.blur();
      }

      // Check Add Section Dropdown
      // Close if click is outside the dropdown AND not on the toggle button
      if (
        isAddSectionDropdownOpen &&
        addSectionDropdownRef.current &&
        !addSectionDropdownRef.current.contains(target as Node) &&
        !isTrigger
      ) {
        setIsAddSectionDropdownOpen(false);
      }

      // Check Secondary Sidebar
      // Close if click is outside secondary sidebar AND not on a list item (trigger)
      if (
        activeConfigId &&
        secondarySidebarWrapperRef.current &&
        !secondarySidebarWrapperRef.current.contains(target as Node) &&
        !isTrigger
      ) {
        setActiveConfigId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [activeConfigId, isAddSectionDropdownOpen]);

  // --- Handlers ---
  const toggleSection = (section: ToolSection) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const handleTitleDoubleClick = () => {
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.focus(), 0);
  };

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProjectTitle(e.target.value);
  };

  const onTitleBlur = () => {
    setProjectTitle((prev) => sanitizeInput(prev) || "Untitled");
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      setProjectTitle((prev) => sanitizeInput(prev) || "Untitled");
      setIsEditingTitle(false);
    }
  };

  const handleAddPage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (pages.length >= 5) return;
    const newPage = pages.length + 1;
    setPages([...pages, newPage]);
    setActivePage(newPage);
    setIsPageDropdownOpen(false);
  };

  const handleAddSection = (sectionIdOrType: string) => {
    console.log("handleAddSection called with:", sectionIdOrType);
    console.log("Current sections:", sections);

    // 1. Try to find existing hidden section by ID (Restore)
    const existingHidden = sections.find(
      (s) => s.id === sectionIdOrType && !s.isVisible,
    );
    console.log("Found existing hidden section:", existingHidden);

    if (existingHidden) {
      console.log("Restoring hidden section:", existingHidden.id);
      setSections((prev) =>
        prev.map((s) =>
          s.id === existingHidden.id ? { ...s, isVisible: true } : s,
        ),
      );
      setIsAddSectionDropdownOpen(false);
      return;
    }

    // 2. Logic for New Feature Section
    if (sectionIdOrType.startsWith("Feature Section")) {
      console.log("Adding new feature section");
      let targetNum = 0;

      const featureSections = sections.filter((s) =>
        s.title.startsWith("Feature Section"),
      );
      const usedNumbers = featureSections.map((s) => {
        const match = s.title.match(/Feature Section (\d+)/);
        return match ? parseInt(match[1]) : 0;
      });

      const match = sectionIdOrType.match(/Feature Section (\d+)/);
      if (match) {
        targetNum = parseInt(match[1]);
      }

      if (targetNum === 0 || usedNumbers.includes(targetNum)) {
        let nextNum = 1;
        while (usedNumbers.includes(nextNum)) nextNum++;
        targetNum = nextNum;
      }

      const newTitle = `Feature Section ${targetNum}`;
      const newSection: SectionItem = {
        id: `features-${Date.now()}`,
        title: newTitle,
        isVisible: true,
      };

      // Insert after last visible feature, or after Hero
      let insertIndex = -1;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].isVisible && sections[i].id.startsWith("features")) {
          insertIndex = i + 1;
          break;
        }
      }

      if (insertIndex === -1) {
        const heroIndex = sections.findIndex((s) => s.id === "hero");
        insertIndex = heroIndex !== -1 ? heroIndex + 1 : sections.length - 1;
      }

      console.log("Inserting new section at index:", insertIndex);
      const newSections = [...sections];
      newSections.splice(insertIndex, 0, newSection);
      setSections(newSections);
      setIsAddSectionDropdownOpen(false);
    } else {
      console.log("No matching condition for:", sectionIdOrType);
    }
  };

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id && !s.isLocked ? { ...s, isVisible: !s.isVisible } : s,
      ),
    );
  };

  const handleSectionClick = (e: React.MouseEvent, section: SectionItem) => {
    e.stopPropagation();
    if (!section.isVisible) return;
    setActiveConfigId((prev) => (prev === section.id ? null : section.id));
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, id: string) => {
    const section = sections.find((s) => s.id === id);
    if (!section || section.isLocked) {
      e.preventDefault();
      return;
    }
    setDraggedItemId(id);
    setOriginalSections([...sections]); // Backup state

    // Create a custom drag image or styling if needed, but standard is fine
    e.dataTransfer.effectAllowed = "move";

    // Hack: delay adding 'dragging' class slightly so the drag image isn't invisible
    // if we were hiding the original element. But here we just ghost it.
  };

  // Centralized Drag Over handler - Drop Indicator Approach
  const handleContainerDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move"; // Always allow move

    if (!draggedItemId) return;

    const container = e.currentTarget as HTMLDivElement;

    // Use all items (including ghost) for geometric calculation to ensure stability
    // The ghost is scale(0.95) but still occupies space, which is good for targeting.
    let finalIndex = 0;
    const allItems = Array.from(container.children).filter(
      (child) =>
        child instanceof HTMLElement && child.hasAttribute("data-drag-id"),
    ) as HTMLElement[];

    for (let i = 0; i < allItems.length; i++) {
      const child = allItems[i];
      const rect = child.getBoundingClientRect();
      const midY = rect.top + rect.height / 2;
      if (e.clientY < midY) {
        finalIndex = i;
        break;
      }
      if (i === allItems.length - 1) {
        finalIndex = i + 1;
      }
    }

    // Now apply constraints on `finalIndex` relative to `visibleSections` (which aligns with `allItems`).
    const visibleList = sections.filter((s) => s.isVisible);

    // Correct for the fact that we are moving the item *from* somewhere.
    // But `finalIndex` is the visual drop target.
    // If I drop at index `i`, I basically want to be "between i-1 and i".

    const prev = finalIndex > 0 ? visibleList[finalIndex - 1] : null;
    const next =
      finalIndex < visibleList.length ? visibleList[finalIndex] : null;

    // We can't put it *between* two locked items.

    // Note: If `prev` OR `next` is the item acting as "dragged"?
    // If we are dragging valid item X. X overlaps itself.
    // But we are finding the drop index.
    // If we drop at index X, we are putting X back at X.

    // We need to check if the DESTINATION is blocked.
    // The previous implementation used `effectivePrev` to skip the dragged item if it was the neighbor.

    const effectivePrev =
      prev && prev.id === draggedItemId
        ? finalIndex > 1
          ? visibleList[finalIndex - 2]
          : null
        : prev;
    const effectiveNext =
      next && next.id === draggedItemId
        ? finalIndex < visibleList.length - 1
          ? visibleList[finalIndex + 1]
          : null
        : next;

    // Constraint: Don't separate two locked items.
    if (effectivePrev?.isLocked && effectiveNext?.isLocked) {
      setDropIndicatorIndex(null);
      return;
    }
    // Constraint: Don't go before first locked item (header preservation)
    if (!effectivePrev && effectiveNext?.isLocked) {
      setDropIndicatorIndex(null);
      return;
    }
    // Constraint: Don't go after last locked item (footer preservation)
    if (effectivePrev?.isLocked && !effectiveNext) {
      setDropIndicatorIndex(null);
      return;
    }

    setDropIndicatorIndex(finalIndex);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    if (!draggedItemId || dropIndicatorIndex === null) {
      setDraggedItemId(null);
      setDropIndicatorIndex(null);
      return;
    }

    // Get visible sections only (drag only affects visible)
    const visibleSections = sections.filter((s) => s.isVisible);

    // Remove dragged item from current position
    const currentIndex = visibleSections.findIndex(
      (s) => s.id === draggedItemId,
    );
    const newVisibleSections = [...visibleSections];
    const [movedItem] = newVisibleSections.splice(currentIndex, 1);

    // Calculate adjusted insert index
    // If we dropped *after* the original position, the index shifts by 1 because we removed the item.
    let adjustedInsertIndex = dropIndicatorIndex;
    if (currentIndex < dropIndicatorIndex) {
      adjustedInsertIndex--;
    }

    // Insert at new position
    newVisibleSections.splice(adjustedInsertIndex, 0, movedItem);

    // Merge back with hidden sections
    // Reconstruct the full list preserving the relative order of visible items
    // and keeping hidden items where they were approx?
    // Actually, simple merge:
    // iterate original `sections`. If visible, take from `newVisibleSections`. If hidden, keep.

    // Better strategy for stability:
    // Filter out all visible from original.
    // Re-inject them at appropriate places? No, that's hard.

    // Current strategy implemented previously:
    // const hiddenSections = sections.filter((s) => !s.isVisible);
    // const finalSections = [...newVisibleSections, ...hiddenSections];
    // This moves all visible items to the top and hidden to bottom. That might be annoying.

    // Improved Merge:
    // Create a map/list.
    // Construct the new list.
    // Using `newVisibleSections` order.
    // Append hidden ones at end? Or try to keep them?
    // For this Builder, hidden items are in the "Add" menu. They don't have a position in the rendered list.
    // So appending them at the end of the data array is fine, or keeping them separate.
    // Appending `...hiddenSections` is acceptable behavior.

    const hiddenSections = sections.filter((s) => !s.isVisible);
    const finalSections = [...newVisibleSections, ...hiddenSections];

    setSections(finalSections);
    setOriginalSections(null);
    setDraggedItemId(null);
    setDropIndicatorIndex(null);
  };

  const handleDragEnd = () => {
    // Restore original order if drag was cancelled
    if (originalSections) {
      setSections(originalSections);
    }
    setDraggedItemId(null);
    setDropIndicatorIndex(null);
    setOriginalSections(null);
  };

  return (
    <>
      <div style={{ display: "flex", height: "100%", position: "relative" }}>
        <aside ref={sidebarRef} className="builder-sidebar">
          {/* Header */}
          <div ref={headerRef} className="sidebar-header">
            <div className="sidebar-header-content">
              {/* Editable Title */}
              <div className="title-container">
                {isEditingTitle ? (
                  <input
                    ref={titleInputRef}
                    value={projectTitle}
                    onChange={onTitleChange}
                    onBlur={onTitleBlur}
                    onKeyDown={handleTitleKeyDown}
                    className="title-input"
                  />
                ) : (
                  <div
                    onClick={handleTitleDoubleClick}
                    className="title-display"
                    title="Click to edit"
                  >
                    {projectTitle}
                    <Edit2
                      size={10}
                      color="#666"
                      style={{ cursor: "pointer", flexShrink: 0 }}
                    />
                  </div>
                )}
              </div>

              {/* Page Selector */}
              <div className="page-selector">
                <div
                  onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                  className="page-selector-button"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.08)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.05)")
                  }
                >
                  Page {activePage}
                  <ChevronDown
                    size={12}
                    style={{
                      transform: isPageDropdownOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease",
                    }}
                  />
                </div>

                {isPageDropdownOpen && (
                  <div className="page-selector-dropdown">
                    {pages.map((page) => (
                      <div
                        key={page}
                        onClick={() => {
                          setActivePage(page);
                          setIsPageDropdownOpen(false);
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "rgba(255,255,255,0.08)";
                          e.currentTarget.style.color = "white";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            page === activePage
                              ? "rgba(255,255,255,0.05)"
                              : "transparent";
                          e.currentTarget.style.color =
                            page === activePage ? "white" : "#888";
                        }}
                        className="page-item"
                        style={{
                          background:
                            page === activePage
                              ? "rgba(255,255,255,0.05)"
                              : "transparent",
                          color: page === activePage ? "white" : "#888",
                        }}
                      >
                        Page {page}
                        {page === activePage && (
                          <div
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: "50%",
                              background: "#987ed2",
                            }}
                          />
                        )}
                      </div>
                    ))}
                    {pages.length < 5 && (
                      <div
                        onClick={handleAddPage}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(255,255,255,0.08)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                        className="add-page-button"
                      >
                        <Plus size={12} /> Add Page
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onBlurRef={searchInputRef}
          />

          {/* 1. Start */}
          <Accordion
            id="start"
            label="1. Start"
            isOpen={expandedSections.includes("start")}
            onToggle={toggleSection}
          >
            <div style={{ padding: "0 4px" }}>
              <button
                className="randomize-button"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "white";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                }}
              >
                Randomize Layout
              </button>
            </div>
          </Accordion>

          {/* 2. Sections */}
          <Accordion
            id="sections"
            label="2. Sections"
            isOpen={expandedSections.includes("sections")}
            onToggle={toggleSection}
            extraAction={
              expandedSections.includes("sections") ? (
                <div style={{ position: "relative" }}>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsAddSectionDropdownOpen(!isAddSectionDropdownOpen);
                    }}
                    data-prevent-outside-close="true" // prevent outside click handler from closing immediately
                    style={{
                      cursor: "pointer",
                      borderRadius: "4px",
                      opacity: 0.7,
                      transition: "all 0.2s ease",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <Plus size={18} color="#aaa" />
                  </div>

                  {isAddSectionDropdownOpen && (
                    <div
                      ref={addSectionDropdownRef}
                      className="add-section-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="add-section-header">ADD SECTION</div>

                      {/* Hidden Sections (Restore) */}
                      {sections
                        .filter((s) => !s.isVisible)
                        .map((s) => (
                          <div
                            key={s.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddSection(s.id);
                            }}
                            className="add-section-item"
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background =
                                "rgba(255,255,255,0.05)";
                              e.currentTarget.style.color = "white";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "transparent";
                              e.currentTarget.style.color = "#ccc";
                            }}
                          >
                            <Plus size={12} /> {s.title}
                          </div>
                        ))}

                      {/* Feature Sections */}
                      {[1, 2, 3].map((num) => {
                        const title = `Feature Section ${num}`;
                        const exists = sections.some((s) => s.title === title);
                        if (!exists) {
                          return (
                            <div
                              key={title}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleAddSection(title);
                              }}
                              className="add-section-item"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(255,255,255,0.05)";
                                e.currentTarget.style.color = "white";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "transparent";
                                e.currentTarget.style.color = "#ccc";
                              }}
                            >
                              <Plus size={12} /> {title}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  )}
                </div>
              ) : null
            }
          >
            <div
              className={`section-list ${draggedItemId ? "dragging" : ""}`}
              onDragOver={handleContainerDragOver} // Use new container handler
              onDrop={handleDrop}
            >
              {sections
                .filter((s) => s.isVisible) // Only show visible
                .map((section, index) => (
                  <React.Fragment key={section.id}>
                    {/* Drop indicator line */}
                    {dropIndicatorIndex === index && draggedItemId && (
                      <div
                        style={{
                          height: "2px",
                          background:
                            "linear-gradient(90deg, transparent, #987ed2, transparent)",
                          marginBottom: "8px",
                          boxShadow: "0 0 8px rgba(152, 126, 210, 0.6)",
                          borderRadius: "2px",
                        }}
                      />
                    )}
                    <div
                      data-id={section.id}
                      data-drag-id={section.id} // Add explicit drag ID for container handler
                      draggable={!section.isLocked}
                      onDragStart={(e) => handleDragStart(e, section.id)}
                      onDragEnd={handleDragEnd}
                      onClick={(e) => handleSectionClick(e, section)}
                      data-prevent-outside-close="true" // Prevent secondary sidebar flickering/closing when clicking items
                      className="section-item"
                      style={{
                        background:
                          activeConfigId === section.id
                            ? "rgba(152, 126, 210, 0.1)"
                            : "#222",
                        opacity:
                          draggedItemId === section.id
                            ? 0
                            : section.isVisible
                              ? 1
                              : 0.5, // Ghost effect
                        border:
                          activeConfigId === section.id
                            ? "1px solid rgba(152, 126, 210, 0.3)"
                            : "1px solid rgba(255,255,255,0.03)",
                        cursor: !section.isVisible
                          ? "not-allowed"
                          : section.isLocked
                            ? "default"
                            : "default", // Row is default, handle is grab
                        transform:
                          draggedItemId === section.id
                            ? "scale(0.95)"
                            : "scale(1)",
                      }}
                    >
                      {section.isLocked ? (
                        <Lock
                          size={12}
                          color="#444"
                          style={{ marginRight: "12px" }}
                        />
                      ) : (
                        <GripVertical
                          size={12}
                          color="#555"
                          style={{ marginRight: "12px", cursor: "grab" }}
                        />
                      )}

                      <span
                        style={{
                          fontSize: "13px",
                          color: "white",
                          flex: 1,
                          fontWeight: 400,
                        }}
                      >
                        {section.title}
                      </span>

                      {!section.isLocked && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleVisibility(section.id);
                          }}
                          style={{
                            cursor: "pointer",
                            padding: "4px",
                            display: "flex",
                          }}
                        >
                          <Trash2 size={14} color="#666" />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ))}

              {/* Drop indicator at the end */}
              {dropIndicatorIndex ===
                sections.filter((s) => s.isVisible).length &&
                draggedItemId && (
                  <div
                    style={{
                      height: "2px",
                      background:
                        "linear-gradient(90deg, transparent, #987ed2, transparent)",
                      marginTop: "-2px",
                      boxShadow: "0 0 8px rgba(152, 126, 210, 0.6)",
                      borderRadius: "2px",
                    }}
                  />
                )}
            </div>
          </Accordion>

          {/* 3. Global Style */}
          <Accordion
            id="global"
            label="3. Global Style"
            isOpen={expandedSections.includes("global")}
            onToggle={toggleSection}
          >
            <div className="global-style-container">
              {/* Color Palette */}
              <div className="style-section">
                <div className="global-style-label">Color Palette</div>
                <div className="palette-row">
                  <span className="palette-label">Primary</span>
                  <div
                    className="palette-swatch"
                    style={{ background: "#FFFFFF" }}
                  />
                </div>
                <div className="palette-row">
                  <span className="palette-label">Secondary</span>
                  <div
                    className="palette-swatch"
                    style={{ background: "#555555" }}
                  />
                </div>
                <div className="palette-row">
                  <span className="palette-label">Accent</span>
                  <div
                    className="palette-swatch"
                    style={{ background: "#00FFFF" }}
                  />
                </div>
              </div>

              {/* Font Pairings */}
              <div className="style-section">
                <div className="global-style-label">Font Pairings</div>
                {/* Placeholder for Font Pairing UI as seen in image (implied dropdown/selection) */}
                <div className="font-pairing-preview">
                  <span className="font-primary">Nueue Montreal</span>
                  <span className="font-divider">/</span>
                  <span className="font-secondary">Garamond</span>
                </div>
              </div>

              {/* Border Radius */}
              <div className="style-section">
                <div className="global-style-label">Border Radius</div>
                <div className="checkbox-list">
                  <div className="checkbox-row">
                    <span>Sharp</span>
                    <div className="custom-checkbox" />
                  </div>
                  <div className="checkbox-row">
                    <span>Soft</span>
                    <div className="custom-checkbox" />
                  </div>
                  <div className="checkbox-row">
                    <span>Rounded</span>
                    <div className="custom-checkbox checked">
                      <div className="checkbox-inner" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Button Style */}
              <div className="style-section">
                <div className="global-style-label">Button Style</div>
                <div className="segmented-control">
                  <div className="segment-option">Filled</div>
                  <div className="segment-option active">Outlined</div>
                </div>
              </div>

              {/* Theme */}
              <div className="style-section">
                <div className="global-style-label">Theme</div>
                <div className="segmented-control">
                  <div className="segment-option">Light</div>
                  <div className="segment-option active">Dark</div>
                </div>
              </div>
            </div>
          </Accordion>

          {/* 4. Content */}
          <Accordion
            id="content"
            label="4. Content"
            isOpen={expandedSections.includes("content")}
            onToggle={toggleSection}
            extraAction={
              <Edit2 size={12} color="#666" style={{ cursor: "pointer" }} />
            }
          >
            <div className="content-list">
              {sections
                .filter((s) => s.isVisible)
                .map((section) => (
                  <div key={section.id} className="content-item">
                    {section.title}
                  </div>
                ))}
            </div>
          </Accordion>
        </aside>

        {/* Secondary Configuration Sidebar (Always Rendered, Animated) */}
        <div ref={secondarySidebarWrapperRef}>
          <BuilderSecondarySidebar
            activeConfigId={activeConfigId}
            setActiveConfigId={setActiveConfigId}
            sections={sections}
          />
        </div>
      </div>
    </>
  );
};

export default BuilderSidebar;
