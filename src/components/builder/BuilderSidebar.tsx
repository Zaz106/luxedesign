"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Search,
  Edit2,
  Eye,
  EyeOff,
  GripVertical,
  Lock,
  Plus,
} from "lucide-react";

// --- Types ---
type SectionItem = {
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
  { id: "features", title: "Features", isVisible: true },
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
  <div style={{ padding: "15px 20px" }}>
    <div
      style={{
        background: "#222",
        display: "flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: "6px",
        gap: "8px",
      }}
    >
      <Search size={14} color="#666" />
      <input
        ref={onBlurRef}
        placeholder="Search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "13px",
          width: "100%",
          outline: "none",
        }}
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
    <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div
        style={{
          padding: "16px 20px",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        onClick={() => onToggle(id)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease",
          }}
        >
          {/* Merged Header: Large when closed, small when open */}
          <span
            style={{
              fontSize: "14px", // Fixed size
              fontWeight: 400,
              color: isOpen ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.7", // Only color changes
              letterSpacing: "0.5px", // Fixed spacing
              transition: "color 0.2s ease", // Only color transition
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
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease-out",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "0 20px 20px 20px",
              opacity: isOpen ? 1 : 0,
              transition: "opacity 0.2s ease-in-out 0.1s",
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

  const [expandedSections, setExpandedSections] = useState<ToolSection[]>([]); // Initial collapsed

  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  const [searchQuery, setSearchQuery] = useState("");

  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const titleInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Click Outside Handler ---
  useEffect(() => {
    // Use pointerdown to ensure we catch events even if other elements preventDefault on mousedown
    const handleClickOutside = (event: PointerEvent) => {
      // Check Header
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setIsEditingTitle(false);
        setIsPageDropdownOpen(false);
      }
      // Check Search
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target as Node)
      ) {
        searchInputRef.current.blur();
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, []);

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

  const toggleVisibility = (id: string) => {
    setSections((prev) =>
      prev.map((s) =>
        s.id === id && !s.isLocked ? { ...s, isVisible: !s.isVisible } : s,
      ),
    );
  };

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItemIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    const targetSection = sections[index];
    if (targetSection.isLocked) return;
    setDragOverIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();

    if (draggedItemIndex === null || draggedItemIndex === index) {
      setDraggedItemIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newSections = [...sections];
    const draggedItem = newSections[draggedItemIndex];
    newSections.splice(draggedItemIndex, 1);
    newSections.splice(index, 0, draggedItem);

    setSections(newSections);
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  return (
    <>
      <style>{`
        .builder-sidebar::-webkit-scrollbar {
          width: 1px;
        }
        .builder-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .builder-sidebar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }
        .builder-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.4);
        }
      `}</style>
      <aside
        className="builder-sidebar"
        style={{
          width: "280px",
          backgroundColor: "#161616",
          borderRight: "1px solid rgba(255, 255, 255, 0.05)",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          zIndex: 10,
          overflowY: "auto",
          userSelect: "none",
        }}
      >
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            padding: "20px 20px 10px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
            }}
          >
            {/* Editable Title */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                flex: 1,
                maxWidth: "150px",
                height: "24px",
              }}
            >
              {isEditingTitle ? (
                <input
                  ref={titleInputRef}
                  value={projectTitle}
                  onChange={onTitleChange}
                  onBlur={onTitleBlur}
                  onKeyDown={handleTitleKeyDown}
                  style={{
                    background: "transparent",
                    border: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: 500,
                    width: "100%",
                    padding: "0",
                    margin: "0",
                    outline: "none",
                    fontFamily: "inherit",
                  }}
                />
              ) : (
                <div
                  onDoubleClick={handleTitleDoubleClick}
                  style={{
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: "100%",
                    width: "100%",
                  }}
                  title="Double click to edit"
                >
                  {projectTitle}
                  <Edit2
                    size={10}
                    color="#666"
                    style={{ cursor: "pointer", flexShrink: 0 }}
                    onClick={() => setIsEditingTitle(true)}
                  />
                </div>
              )}
            </div>

            {/* Page Selector */}
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setIsPageDropdownOpen(!isPageDropdownOpen)}
                style={{
                  fontSize: "12px",
                  color: "#888",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  marginTop: "2px", // Alignment tweak for visual center with title
                }}
              >
                <ChevronDown size={10} />
                Page {activePage}
              </div>

              {isPageDropdownOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    background: "#222",
                    border: "1px solid #333",
                    borderRadius: "4px",
                    padding: "4px 0",
                    zIndex: 100,
                    width: "100px",
                  }}
                >
                  {pages.map((page) => (
                    <div
                      key={page}
                      onClick={() => {
                        setActivePage(page);
                        setIsPageDropdownOpen(false);
                      }}
                      style={{
                        padding: "6px 12px",
                        fontSize: "12px",
                        color: page === activePage ? "white" : "#888",
                        cursor: "pointer",
                        background:
                          page === activePage
                            ? "rgba(255,255,255,0.05)"
                            : "transparent",
                      }}
                    >
                      Page {page}
                    </div>
                  ))}
                  {pages.length < 5 && (
                    <div
                      onClick={handleAddPage}
                      style={{
                        padding: "6px 12px",
                        fontSize: "11px",
                        color: "#987ed2",
                        borderTop: "1px solid #333",
                        marginTop: "4px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Plus size={10} /> Add Page
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
          <button
            style={{
              width: "100%",
              padding: "10px",
              background: "transparent",
              border: "1px solid #333",
              color: "#888",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "13px",
            }}
          >
            Randomize
          </button>
        </Accordion>

        {/* 2. Sections */}
        <Accordion
          id="sections"
          label="2. Sections"
          isOpen={expandedSections.includes("sections")}
          onToggle={toggleSection}
          extraAction={
            <Edit2 size={12} color="#666" style={{ cursor: "pointer" }} />
          }
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {sections.map((section, index) => (
              <div
                key={section.id}
                draggable={!section.isLocked}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px",
                  background: "#222",
                  borderRadius: "4px",
                  opacity: section.isVisible ? 1 : 0.5,
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderTop:
                    dragOverIndex === index && !section.isLocked
                      ? "2px solid #987ed2"
                      : "1px solid rgba(255,255,255,0.05)",
                  cursor: section.isLocked ? "default" : "grab",
                }}
              >
                {section.isLocked ? (
                  <Lock size={12} color="#444" style={{ marginRight: "8px" }} />
                ) : (
                  <GripVertical
                    size={12}
                    color="#555"
                    style={{ marginRight: "8px", cursor: "grab" }}
                  />
                )}

                <span style={{ fontSize: "13px", color: "white", flex: 1 }}>
                  {section.title}
                </span>

                {!section.isLocked && (
                  <div
                    onClick={() => toggleVisibility(section.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {section.isVisible ? (
                      <Eye size={12} color="#666" />
                    ) : (
                      <EyeOff size={12} color="#444" />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Accordion>

        {/* 3. Global Style */}
        <Accordion
          id="global"
          label="3. Global Style"
          isOpen={expandedSections.includes("global")}
          onToggle={toggleSection}
        >
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            {/* Color Palette */}
            <div>
              <div
                style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}
              >
                Color Palette
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                {["#FFFFFF", "#987ed2", "#222222", "#FF5555"].map((c) => (
                  <div
                    key={c}
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: c,
                      border: "1px solid rgba(255,255,255,0.1)",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Font Pairings */}
            <div>
              <div
                style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}
              >
                Font Pairings
              </div>
              <select
                style={{
                  width: "100%",
                  background: "#222",
                  border: "1px solid #333",
                  color: "white",
                  padding: "6px",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
              >
                <option>Inter / Roboto</option>
                <option>Satoshi / Instrument</option>
              </select>
            </div>

            {/* Border Radius */}
            <div>
              <div
                style={{ fontSize: "12px", color: "#888", marginBottom: "8px" }}
              >
                Border Radius
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  background: "#222",
                  padding: "4px",
                  borderRadius: "4px",
                }}
              >
                {["Sharp", "Soft", "Rounded"].map((r) => (
                  <div
                    key={r}
                    style={{
                      fontSize: "11px",
                      color: r === "Rounded" ? "white" : "#666",
                      padding: "4px 8px",
                      cursor: "pointer",
                      background: r === "Rounded" ? "#333" : "transparent",
                      borderRadius: "2px",
                    }}
                  >
                    {r}
                  </div>
                ))}
              </div>
            </div>

            {/* Theme */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ fontSize: "12px", color: "#888" }}>Dark Mode</div>
              <div
                style={{
                  width: "32px",
                  height: "18px",
                  background: "#987ed2",
                  borderRadius: "10px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "14px",
                    height: "14px",
                    background: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                  }}
                />
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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {sections
              .filter((s) => s.isVisible)
              .map((section) => (
                <div
                  key={section.id}
                  style={{
                    fontSize: "13px",
                    color: "#aaa",
                    paddingLeft: "10px",
                    borderLeft: "2px solid #333",
                  }}
                >
                  {section.title}
                </div>
              ))}
          </div>
        </Accordion>
      </aside>
    </>
  );
};

export default BuilderSidebar;
