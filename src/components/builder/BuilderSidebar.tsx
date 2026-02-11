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

  const [activeConfigId, setActiveConfigId] = useState<string | null>(null);

  const [expandedSections, setExpandedSections] = useState<ToolSection[]>([]); // Initial collapsed

  const [sections, setSections] = useState<SectionItem[]>(initialSections);
  const [searchQuery, setSearchQuery] = useState("");

  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const sidebarRef = useRef<HTMLElement>(null);
  const secondarySidebarRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // --- Click Outside Handler ---
  useEffect(() => {
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

      // Check Secondary Sidebar
      if (
        activeConfigId &&
        secondarySidebarRef.current &&
        !secondarySidebarRef.current.contains(event.target as Node)
      ) {
        setActiveConfigId(null);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [activeConfigId]);

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

  const handleAddFeatureSection = (e: React.MouseEvent) => {
    e.stopPropagation();
    const featureCount = sections.filter((s) =>
      s.id.startsWith("features"),
    ).length;
    if (featureCount >= 3) return; // Limit to 3

    const newSection: SectionItem = {
      id: `features-${Date.now()}`,
      title: `Feature ${featureCount + 1}`,
      isVisible: true,
    };

    const footerIndex = sections.findIndex((s) => s.id === "footer");
    const insertIndex = footerIndex !== -1 ? footerIndex : sections.length;

    const newSections = [...sections];
    newSections.splice(insertIndex, 0, newSection);
    setSections(newSections);
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
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (sections[index].isLocked) {
      e.preventDefault();
      return;
    }
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

    const targetSection = sections[index];
    if (targetSection.isLocked) {
      setDraggedItemIndex(null);
      setDragOverIndex(null);
      return;
    }

    if (draggedItemIndex === null || draggedItemIndex === index) {
      setDraggedItemIndex(null);
      setDragOverIndex(null);
      return;
    }

    const newSections = [...sections];
    const draggedItem = newSections[draggedItemIndex];

    // Remove from old
    newSections.splice(draggedItemIndex, 1);

    // Manual reorder logic
    const item = sections[draggedItemIndex];
    const remaining = sections.filter((_, i) => i !== draggedItemIndex);
    const targetId = sections[index].id;
    const newTargetIndex = remaining.findIndex((s) => s.id === targetId);

    remaining.splice(newTargetIndex, 0, item);
    setSections(remaining);

    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItemIndex(null);
    setDragOverIndex(null);
  };

  // --- Secondary Sidebar Content ---
  const renderConfigContent = () => {
    if (!activeConfigId) return null;

    const section = sections.find((s) => s.id === activeConfigId);
    if (!section) return null;

    const configItemStyle = {
      marginBottom: "20px",
    };

    const labelStyle = {
      display: "block",
      marginBottom: "8px",
      color: "#ccc",
      fontSize: "12px",
    };

    const inputStyle = {
      width: "100%",
      background: "#1a1a1a",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "white",
      padding: "8px 12px",
      borderRadius: "6px",
      fontSize: "13px",
      outline: "none",
    };

    if (activeConfigId === "hero") {
      return (
        <>
          <div style={configItemStyle}>
            <label style={labelStyle}>Headline</label>
            <input style={inputStyle} defaultValue="Welcome to Luxe" />
          </div>
          <div style={configItemStyle}>
            <label style={labelStyle}>Subheadline</label>
            <textarea
              style={{ ...inputStyle, height: "80px", resize: "none" }}
              defaultValue="Premium design for modern web applications. Built for speed and flexibility."
            />
          </div>
          <div style={configItemStyle}>
            <label style={labelStyle}>Button Text</label>
            <input style={inputStyle} defaultValue="Get Started" />
          </div>
          <div style={configItemStyle}>
            <label style={labelStyle}>Background</label>
            <select style={inputStyle}>
              <option>Gradient Mesh</option>
              <option>Solid Color</option>
              <option>Image</option>
            </select>
          </div>
        </>
      );
    }

    if (activeConfigId.startsWith("features")) {
      return (
        <>
          <div style={configItemStyle}>
            <label style={labelStyle}>Card Layout</label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "40px",
                    height: "24px",
                    background: i === 2 ? "#987ed2" : "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                    cursor: "pointer",
                    border:
                      i === 2 ? "none" : "1px solid rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>
            <div style={{ fontSize: "11px", color: "#666", marginTop: "6px" }}>
              Grid (3 cols)
            </div>
          </div>
          <div style={configItemStyle}>
            <label style={labelStyle}>Items</label>
            <input type="number" style={inputStyle} defaultValue="3" />
          </div>
        </>
      );
    }

    if (activeConfigId === "nav") {
      return (
        <>
          <div style={configItemStyle}>
            <label style={labelStyle}>Logo Text</label>
            <input style={inputStyle} defaultValue="Luxe." />
          </div>
          <div style={configItemStyle}>
            <label style={labelStyle}>Links</label>
            <div
              style={{
                background: "#1a1a1a",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {["Home", "Features", "Pricing"].map((l) => (
                <div
                  key={l}
                  style={{
                    padding: "4px 0",
                    fontSize: "13px",
                    color: "#aaa",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  {l}
                </div>
              ))}
              <div
                style={{
                  color: "#987ed2",
                  fontSize: "12px",
                  marginTop: "8px",
                  cursor: "pointer",
                }}
              >
                + Add Link
              </div>
            </div>
          </div>
        </>
      );
    }

    // Default
    return (
      <div style={{ color: "#666", textAlign: "center", marginTop: "40px" }}>
        No configuration options available for this section.
      </div>
    );
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
          background: rgba(255, 255, 255, 0);
          border-radius: 4px;
        }
        .builder-sidebar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
      <div style={{ display: "flex", height: "100%", position: "relative" }}>
        <aside
          ref={sidebarRef}
          className="builder-sidebar"
          style={{
            width: "300px",
            backgroundColor: "#161616",
            borderRight: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            zIndex: 10,
            overflowY: "auto",
            userSelect: "none",
            position: "relative",
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
                  maxWidth: "140px",
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
                      height: "24px",
                      padding: "0",
                      margin: "0",
                      outline: "none",
                      fontFamily: "inherit",
                      lineHeight: "24px",
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
                      height: "24px",
                      width: "100%",
                      borderBottom: "1px solid transparent",
                      lineHeight: "24px",
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
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    marginTop: "1px",
                    background: "rgba(255, 255, 255, 0.05)",
                    padding: "6px 11px",
                    borderRadius: "8px",
                    border: "1px solid rgba(255,255,255,0.05)",
                    transition: "all 0.2s ease",
                  }}
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
                  <div
                    style={{
                      position: "absolute",
                      top: "125%",
                      right: 0,
                      background: "#1a1a1a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      padding: "6px",
                      zIndex: 100,
                      width: "140px",
                      boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
                      display: "flex",
                      flexDirection: "column",
                      gap: "2px",
                      transformOrigin: "top right",
                      animation: "fadeIn 0.2s ease",
                    }}
                  >
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
                        style={{
                          padding: "8px 12px",
                          fontSize: "13px",
                          color: page === activePage ? "white" : "#888",
                          cursor: "pointer",
                          background:
                            page === activePage
                              ? "rgba(255,255,255,0.05)"
                              : "transparent",
                          borderRadius: "6px",
                          transition: "all 0.1s ease",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
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
                        style={{
                          padding: "8px 12px",
                          fontSize: "12px",
                          color: "#987ed2",
                          borderTop: "1px solid rgba(255,255,255,0.05)",
                          marginTop: "4px",
                          paddingTop: "8px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          borderRadius: "6px",
                          transition: "background 0.1s ease",
                        }}
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
            <button
              style={{
                width: "100%",
                padding: "10px 12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.5)",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                transition: "all 0.2s ease",
              }}
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
          </Accordion>

          {/* 2. Sections */}
          <Accordion
            id="sections"
            label="2. Sections"
            isOpen={expandedSections.includes("sections")}
            onToggle={toggleSection}
            extraAction={
              <Plus
                size={16}
                color="#666"
                style={{ cursor: "pointer", opacity: 0.8 }}
                onClick={handleAddFeatureSection}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.8")}
              />
            }
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {sections.map((section, index) => (
                <React.Fragment key={section.id}>
                  {/* Drop Indicator */}
                  {dragOverIndex === index && !section.isLocked && (
                    <div
                      style={{
                        height: "2px",
                        background: "#987ed2",
                        borderRadius: "1px",
                        margin: "2px 0",
                        width: "100%",
                      }}
                    />
                  )}

                  <div
                    draggable={!section.isLocked}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => handleSectionClick(e, section)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 12px",
                      background:
                        activeConfigId === section.id
                          ? "rgba(152, 126, 210, 0.1)"
                          : "#222",
                      borderRadius: "8px",
                      opacity: section.isVisible ? 1 : 0.5,
                      border:
                        activeConfigId === section.id
                          ? "1px solid rgba(152, 126, 210, 0.3)"
                          : "1px solid rgba(255,255,255,0.03)",
                      cursor: !section.isVisible
                        ? "not-allowed"
                        : section.isLocked
                          ? "default"
                          : "grab",
                      transition: "all 0.2s cubic-bezier(0.2, 0, 0, 1)",
                      height: "36px",
                      boxSizing: "border-box",
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
                        {section.isVisible ? (
                          <Eye size={14} color="#666" />
                        ) : (
                          <EyeOff size={14} color="#444" />
                        )}
                      </div>
                    )}
                  </div>
                </React.Fragment>
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
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "8px",
                  }}
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
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "8px",
                  }}
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
                  style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "8px",
                  }}
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

        {/* Secondary Configuration Sidebar (Always Rendered, Animated) */}
        <div
          ref={secondarySidebarRef}
          style={{
            position: "absolute",
            left: "300px",
            top: 0,
            bottom: 0,
            width: "280px",
            backgroundColor: "#161616",
            borderRight: "1px solid rgba(255, 255, 255, 0.05)",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            transform: activeConfigId ? "translateX(0)" : "translateX(-10px)",
            opacity: activeConfigId ? 1 : 0,
            pointerEvents: activeConfigId ? "auto" : "none",
            transition:
              "transform 0.3s cubic-bezier(0.2, 0, 0, 1), opacity 0.2s ease",
            boxShadow: activeConfigId ? "5px 0 30px rgba(0,0,0,0.3)" : "none",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ color: "white", fontWeight: 500 }}>
              {sections.find((s) => s.id === activeConfigId)?.title}
            </span>
            <div
              onClick={() => setActiveConfigId(null)}
              style={{ cursor: "pointer", padding: "4px" }}
            >
              <Plus
                size={18}
                color="#666"
                style={{ transform: "rotate(45deg)" }}
              />
            </div>
          </div>

          <div style={{ padding: "20px", color: "#888", fontSize: "13px" }}>
            {renderConfigContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BuilderSidebar;
