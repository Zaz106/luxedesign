"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronRight, Search, SquarePen, Plus, Sun, Moon } from "lucide-react";
import BuilderSecondarySidebar from "./BuilderSecondarySidebar";
import { useBuilder } from "../context/BuilderContext";
import StartSection from "../sidebar/panels/StartSection";
import SectionsSection from "../sidebar/panels/SectionsSection";
import GlobalStylesSection from "../sidebar/panels/GlobalStylesSection";
import ContentSection from "../sidebar/panels/ContentSection";
import { SectionItem, ToolSection } from "../sidebar/types";
import { getDesignsForSection } from "../sections/_shared";
import { invertForTheme } from "../sidebar/widgets/colorUtils";
import "./BuilderSidebar.css";

// --- Shared Helpers ---
const sanitizeInput = (str: string) =>
  str.replace(/[^a-zA-Z0-9\s-_]/g, "").trim();

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
}) => (
  <div className="accordion-item">
    <div className="accordion-header" onClick={() => onToggle(id)}>
      <div className="accordion-title-wrapper">
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
      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
    >
      <div className="accordion-content-inner">
        <div className="accordion-content" style={{ opacity: isOpen ? 1 : 0 }}>
          {children}
        </div>
      </div>
    </div>
  </div>
);

// --- Main Component ---
interface BuilderSidebarProps {
  activePage: number;
  setActivePage: (page: number) => void;
  forceExpandSection?: ToolSection | null;
}

const BuilderSidebar: React.FC<BuilderSidebarProps> = ({ activePage, setActivePage, forceExpandSection }) => {
  const { pageSections, setPageSections, activeConfigId, setActiveConfigId: setActiveConfigIdCtx, globalStyles, setGlobalStyles } = useBuilder();
  const sections = pageSections[activePage] ?? [];
  const setSections = (updater: SectionItem[] | ((prev: SectionItem[]) => SectionItem[])) => {
    setPageSections((prev) => ({
      ...prev,
      [activePage]:
        typeof updater === "function" ? updater(prev[activePage] ?? []) : updater,
    }));
  };

  const [projectTitle, setProjectTitle] = useState("Title");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [pages, setPages] = useState([1]);
  const [isPageDropdownOpen, setIsPageDropdownOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<ToolSection[]>(["start"]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddSectionDropdownOpen, setIsAddSectionDropdownOpen] = useState(false);

  // Auto-expand the section selected from the bottom bar
  useEffect(() => {
    if (forceExpandSection) {
      setExpandedSections([forceExpandSection]);
    }
  }, [forceExpandSection]);

  // Auto-expand Sections accordion when a section is clicked on canvas
  useEffect(() => {
    if (activeConfigId && !expandedSections.includes("sections")) {
      setExpandedSections((prev) => [...prev, "sections"]);
    }
  }, [activeConfigId]);

  const setActiveConfigId = (id: string | null) => {
    setActiveConfigIdCtx(id);
    if (id !== null) {
      setIsPageDropdownOpen(false);
      setIsAddSectionDropdownOpen(false);
    }
  };

  const sidebarRef = useRef<HTMLElement>(null);
  const secondarySidebarWrapperRef = useRef<HTMLDivElement>(null);
  const addSectionDropdownRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.isConnected) return;
      const isTrigger = target.closest("[data-prevent-outside-close]");

      if (headerRef.current && !headerRef.current.contains(target)) {
        setIsEditingTitle(false);
        setIsPageDropdownOpen(false);
      }
      if (searchInputRef.current && !searchInputRef.current.contains(target)) {
        searchInputRef.current.blur();
      }
      if (
        isAddSectionDropdownOpen &&
        addSectionDropdownRef.current &&
        !addSectionDropdownRef.current.contains(target) &&
        !isTrigger
      ) {
        setIsAddSectionDropdownOpen(false);
      }
      if (
        activeConfigId &&
        secondarySidebarWrapperRef.current &&
        !secondarySidebarWrapperRef.current.contains(target) &&
        !isTrigger
      ) {
        setActiveConfigId(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeConfigId, isAddSectionDropdownOpen]);

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
    // Initialize new page with default sections
    setPageSections((prev) => ({
      ...prev,
      [newPage]: [
        { id: "nav", title: "Navigation", isVisible: true, isLocked: true },
        { id: "hero", title: "Hero Section", isVisible: true, isLocked: true },
        { id: "features", title: "Feature Section 1", isVisible: true },
        { id: "footer", title: "Footer", isVisible: true, isLocked: true },
      ],
    }));
    setActivePage(newPage);
    setIsPageDropdownOpen(false);
  };

  const handleAddSection = (sectionIdOrType: string) => {
    const existingHidden = sections.find(
      (s) => s.id === sectionIdOrType && !s.isVisible,
    );
    if (existingHidden) {
      setSections((prev) =>
        prev.map((s) =>
          s.id === existingHidden.id ? { ...s, isVisible: true } : s,
        ),
      );
      setIsAddSectionDropdownOpen(false);
      return;
    }
    if (sectionIdOrType.startsWith("Feature Section")) {
      const featureSections = sections.filter((s) =>
        s.title.startsWith("Feature Section"),
      );
      const usedNumbers = featureSections.map((s) => {
        const match = s.title.match(/Feature Section (\d+)/);
        return match ? parseInt(match[1]) : 0;
      });
      const matchNum = sectionIdOrType.match(/Feature Section (\d+)/);
      let targetNum = matchNum ? parseInt(matchNum[1]) : 0;
      if (targetNum === 0 || usedNumbers.includes(targetNum)) {
        let nextNum = 1;
        while (usedNumbers.includes(nextNum)) nextNum++;
        targetNum = nextNum;
      }
      const newSection: SectionItem = {
        id: `features-${Date.now()}`,
        title: `Feature Section ${targetNum}`,
        isVisible: true,
      };
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
      const newSections = [...sections];
      newSections.splice(insertIndex, 0, newSection);
      setSections(newSections);
      setIsAddSectionDropdownOpen(false);
    }
  };

  return (
    <>
      <div style={{ display: "flex", height: "100%", minHeight: 0, position: "relative" }}>
        <aside ref={sidebarRef} className="builder-sidebar">
          <div ref={headerRef} className="sidebar-header">
            <div className="sidebar-header-content">
              <div className="title-container">
                {isEditingTitle ? (
                  <input
                    ref={titleInputRef}
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
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
                    <SquarePen
                      size={13}
                      color="#666"
                      style={{ cursor: "pointer", flexShrink: 0 }}
                    />
                  </div>
                )}
              </div>

              <div className="page-selector">
                <div
                  onClick={() => {
                    setIsPageDropdownOpen(!isPageDropdownOpen);
                    setIsAddSectionDropdownOpen(false);
                  }}
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

          <Accordion
            id="start"
            label="1. Start"
            isOpen={expandedSections.includes("start")}
            onToggle={toggleSection}
            extraAction={
              expandedSections.includes("start") ? (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setGlobalStyles((prev) => {
                      const newTheme = prev.theme === "dark" ? "light" : "dark";
                      return {
                        ...prev,
                        theme: newTheme,
                        colors: {
                          primary: invertForTheme(prev.colors.primary),
                          secondary: invertForTheme(prev.colors.secondary),
                          paragraph: invertForTheme(prev.colors.paragraph),
                          accent: prev.colors.accent, // accent stays the same
                        },
                      };
                    });
                  }}
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
                    (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  title={globalStyles.theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {globalStyles.theme === "dark" ? (
                    <Moon size={15} color="#aaa" />
                  ) : (
                    <Sun size={15} color="#aaa" />
                  )}
                </div>
              ) : null
            }
          >
            <StartSection
              onRandomize={() => {
                setSections((prev) =>
                  prev.map((s) => {
                    const designs = getDesignsForSection(s.id);
                    if (!designs || designs.length <= 1) return s;
                    const randomVariant =
                      designs[Math.floor(Math.random() * designs.length)].id;
                    return { ...s, designVariant: randomVariant };
                  }),
                );
              }}
            />
          </Accordion>

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
                      setIsPageDropdownOpen(false);
                    }}
                    data-prevent-outside-close="true"
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
                      (e.currentTarget.style.background = "rgba(255,255,255,0.05)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <Plus size={16} color="#aaa" />
                  </div>

                  {isAddSectionDropdownOpen && (
                    <div
                      ref={addSectionDropdownRef}
                      className="add-section-dropdown"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="add-section-header">Add Section</div>

                      {sections
                        .filter((s) => !s.isVisible)
                        .map((s) => (
                          <div
                            key={s.id}
                            onClick={(e) => { e.stopPropagation(); handleAddSection(s.id); }}
                            className="add-section-item"
                          >
                            <Plus size={12} /> {s.title}
                          </div>
                        ))}

                      {[1, 2, 3].map((num) => {
                        const title = `Feature Section ${num}`;
                        const exists = sections.some((s) => s.title === title);
                        if (!exists) {
                          return (
                            <div
                              key={title}
                              onClick={(e) => { e.stopPropagation(); handleAddSection(title); }}
                              className="add-section-item"
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
            <SectionsSection
              sections={sections}
              setSections={setSections}
              activeConfigId={activeConfigId}
              setActiveConfigId={setActiveConfigId}
            />
          </Accordion>

          <Accordion
            id="global"
            label="3. Global Style"
            isOpen={expandedSections.includes("global")}
            onToggle={toggleSection}
          >
            <GlobalStylesSection
              activeConfigId={activeConfigId}
              setActiveConfigId={setActiveConfigId}
            />
          </Accordion>

          <Accordion
            id="content"
            label="4. Content"
            isOpen={expandedSections.includes("content")}
            onToggle={toggleSection}
          >
            <ContentSection
              sections={sections}
              activeConfigId={activeConfigId}
              setActiveConfigId={setActiveConfigId}
            />
          </Accordion>
          <div style={{ height: 80, flexShrink: 0 }} />
        </aside>

        <div ref={secondarySidebarWrapperRef}>
          <BuilderSecondarySidebar
            activeConfigId={activeConfigId}
            setActiveConfigId={setActiveConfigId}
          />
        </div>
      </div>
    </>
  );
};

export default BuilderSidebar;
