"use client";

import React from "react";
import { Plus } from "lucide-react";
import { getDesignsForSection } from "./components";
import { useBuilder } from "./BuilderContext";
import {
  GOOGLE_FONTS,
  variantContentSchemas,
  ContentField,
} from "./components/contentSchemas";
import "./BuilderSecondarySidebar.css";

type BuilderSecondarySidebarProps = {
  activeConfigId: string | null;
  setActiveConfigId: (id: string | null) => void;
};

/* ── Shared CMS input field ─────────────────────────────────────── */
const CmsField: React.FC<{
  field: ContentField;
  value: string;
  onChange: (v: string) => void;
}> = ({ field, value, onChange }) => {
  const base: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 6,
    color: "#fff",
    fontSize: 13,
    padding: "8px 10px",
    outline: "none",
    resize: "none",
    fontFamily: "inherit",
  };

  return (
    <div style={{ marginBottom: 14 }}>
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: "rgba(255,255,255,0.35)",
          marginBottom: 5,
          textTransform: "uppercase",
          letterSpacing: 0.5,
          fontWeight: 500,
        }}
      >
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          rows={3}
          style={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          style={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.type === "list" ? "Comma separated" : undefined}
        />
      )}
    </div>
  );
};

/* ── Font item ──────────────────────────────────────────────────── */
const FontItem: React.FC<{
  fontName: string;
  category: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ fontName, category, isActive, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: "10px 12px",
      borderRadius: 6,
      border: isActive
        ? "1px solid rgba(255,255,255,0.25)"
        : "1px solid rgba(255,255,255,0.06)",
      cursor: "pointer",
      background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
      transition: "border-color 0.15s, background 0.15s",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    <div>
      <div
        style={{
          fontFamily: `"${fontName}", ${category}`,
          fontSize: 16,
          fontWeight: 500,
          color: isActive ? "#fff" : "rgba(255,255,255,0.6)",
          lineHeight: 1.3,
        }}
      >
        {fontName}
      </div>
      <div
        style={{
          fontFamily: `"${fontName}", ${category}`,
          fontSize: 12,
          color: "rgba(255,255,255,0.25)",
          marginTop: 2,
        }}
      >
        Aa Bb Cc Dd Ee
      </div>
    </div>
    {isActive && (
      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontWeight: 500 }}>
        Active
      </span>
    )}
  </div>
);

/* ── Main component ─────────────────────────────────────────────── */
const BuilderSecondarySidebar: React.FC<BuilderSecondarySidebarProps> = ({
  activeConfigId,
  setActiveConfigId,
}) => {
  const {
    globalStyles,
    setGlobalStyles,
    pageSections,
    setPageSections,
    sectionContent,
    setSectionContent,
    activePage,
  } = useBuilder();

  const sections = pageSections[activePage] ?? [];
  const isContentMode = activeConfigId?.startsWith("content:") ?? false;
  const contentSectionId = isContentMode ? activeConfigId!.slice(8) : null;

  /* ── Helpers ───────────────────────────────────────────────── */
  const setFont = (target: "heading" | "body", fontName: string) => {
    setGlobalStyles((prev) => ({
      ...prev,
      fonts: { ...prev.fonts, [target]: fontName },
    }));
  };

  const handleSelectDesign = (sectionId: string, variantId: string) => {
    setPageSections((prev) => ({
      ...prev,
      [activePage]: (prev[activePage] ?? []).map((s) =>
        s.id === sectionId ? { ...s, designVariant: variantId } : s,
      ),
    }));
  };

  const handleContentChange = (sectionId: string, key: string, value: string) => {
    setSectionContent((prev) => ({
      ...prev,
      [sectionId]: { ...(prev[sectionId] ?? {}), [key]: value },
    }));
  };

  /* ── Sidebar title resolver ────────────────────────────────── */
  const getTitle = () => {
    if (activeConfigId === "font-pairing") return "Font Pairings";
    if (isContentMode) {
      const s = sections.find((s) => s.id === contentSectionId);
      return s?.title ?? "Content";
    }
    return sections.find((s) => s.id === activeConfigId)?.title ?? "";
  };

  /* ── Font pairing view ─────────────────────────────────────── */
  const renderFontPairing = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Heading font */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: 500,
            marginBottom: 10,
          }}
        >
          Heading Font
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {GOOGLE_FONTS.map((f) => (
            <FontItem
              key={f.name}
              fontName={f.name}
              category={f.category}
              isActive={globalStyles.fonts.heading === f.name}
              onClick={() => setFont("heading", f.name)}
            />
          ))}
        </div>
      </div>

      {/* Body font */}
      <div>
        <div
          style={{
            fontSize: 11,
            color: "rgba(255,255,255,0.35)",
            textTransform: "uppercase",
            letterSpacing: 0.5,
            fontWeight: 500,
            marginBottom: 10,
          }}
        >
          Text Font
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {GOOGLE_FONTS.map((f) => (
            <FontItem
              key={f.name}
              fontName={f.name}
              category={f.category}
              isActive={globalStyles.fonts.body === f.name}
              onClick={() => setFont("body", f.name)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  /* ── Content CMS view ──────────────────────────────────────── */
  const renderContentEditor = () => {
    if (!contentSectionId) return null;
    const section = sections.find((s) => s.id === contentSectionId);
    if (!section) return null;

    const variant = section.designVariant;
    const designs = getDesignsForSection(contentSectionId);
    const schema = variant ? variantContentSchemas[variant] ?? null : null;
    const content = sectionContent[contentSectionId] ?? {};

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Compact design picker */}
        {designs && designs.length > 1 && (
          <div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Design
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {designs.map((d) => {
                const isActive = variant === d.id;
                return (
                  <div
                    key={d.id}
                    onClick={() => handleSelectDesign(contentSectionId, d.id)}
                    style={{
                      flex: 1,
                      padding: "10px 8px",
                      borderRadius: 6,
                      border: isActive
                        ? "1px solid rgba(255,255,255,0.25)"
                        : "1px solid rgba(255,255,255,0.06)",
                      cursor: "pointer",
                      background: isActive
                        ? "rgba(255,255,255,0.05)"
                        : "transparent",
                      textAlign: "center",
                      transition: "border-color 0.15s",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: 48,
                        borderRadius: 4,
                        background: isActive
                          ? "rgba(255,255,255,0.06)"
                          : "rgba(255,255,255,0.02)",
                        marginBottom: 6,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="rgba(255,255,255,0.12)"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 500,
                        color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {d.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CMS fields */}
        {schema && schema.length > 0 && (
          <div>
            <div
              style={{
                fontSize: 11,
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                letterSpacing: 0.5,
                fontWeight: 500,
                marginBottom: 12,
              }}
            >
              Content
            </div>
            {schema.map((field) => (
              <CmsField
                key={field.key}
                field={field}
                value={content[field.key] ?? field.defaultValue}
                onChange={(v) =>
                  handleContentChange(contentSectionId, field.key, v)
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  /* ── Design picker view (from sections accordion) ──────────── */
  const renderDesignPicker = () => {
    if (!activeConfigId) return null;
    const designs = getDesignsForSection(activeConfigId);
    const currentSection = sections.find((s) => s.id === activeConfigId);
    const currentVariant = currentSection?.designVariant;

    if (designs && designs.length > 0) {
      return (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {designs.map((design) => {
            const isActive = currentVariant === design.id;
            return (
              <div
                key={design.id}
                onClick={() =>
                  handleSelectDesign(activeConfigId!, design.id)
                }
                style={{
                  cursor: "pointer",
                  borderRadius: 8,
                  border: isActive
                    ? "2px solid rgba(255,255,255,0.3)"
                    : "1px solid rgba(255,255,255,0.06)",
                  overflow: "hidden",
                  transition: "border-color 0.15s ease",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    background: isActive
                      ? "rgba(255,255,255,0.06)"
                      : "rgba(255,255,255,0.02)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                </div>
                <div
                  style={{
                    padding: "10px 12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {design.name}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(255,255,255,0.3)",
                        fontWeight: 500,
                      }}
                    >
                      Active
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="empty-state">
        No configuration options available for this section.
      </div>
    );
  };

  /* ── Render ─────────────────────────────────────────────────── */
  const renderContent = () => {
    if (!activeConfigId) return null;
    if (activeConfigId === "font-pairing") return renderFontPairing();
    if (isContentMode) return renderContentEditor();
    return renderDesignPicker();
  };

  return (
    <div
      className={`builder-secondary-sidebar${isContentMode ? " content-mode" : ""}`}
      style={{
        transform: activeConfigId ? "translateX(0)" : "translateX(-10px)",
        opacity: activeConfigId ? 1 : 0,
        pointerEvents: activeConfigId ? "auto" : "none",
        boxShadow: activeConfigId ? "5px 0 30px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="secondary-sidebar-header">
        <span className="secondary-sidebar-title">{getTitle()}</span>
        <div onClick={() => setActiveConfigId(null)} className="close-button">
          <Plus size={18} color="#666" style={{ transform: "rotate(45deg)" }} />
        </div>
      </div>

      <div className="secondary-sidebar-content">{renderContent()}</div>
    </div>
  );
};

export default BuilderSecondarySidebar;
