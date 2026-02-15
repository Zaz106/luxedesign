import React from "react";
import { Plus } from "lucide-react";
import "./BuilderSecondarySidebar.css";

// Re-use types if possible, or define here.
// Ideally types should be in a separate file, but for now I'll duplicate or import if they were exported.
// They were not exported in BuilderSidebar.tsx.
type SectionItem = {
  id: string;
  title: string;
  isVisible: boolean;
  isLocked?: boolean;
};

type BuilderSecondarySidebarProps = {
  activeConfigId: string | null;
  setActiveConfigId: (id: string | null) => void;
  sections: SectionItem[];
};

const BuilderSecondarySidebar: React.FC<BuilderSecondarySidebarProps> = ({
  activeConfigId,
  setActiveConfigId,
  sections,
}) => {
  const renderConfigContent = () => {
    if (!activeConfigId) return null;

    // Default message for all sections as requested
    return (
      <div className="empty-state">
        No configuration options available for this section.
      </div>
    );
  };

  return (
    <div
      className="builder-secondary-sidebar"
      style={{
        transform: activeConfigId ? "translateX(0)" : "translateX(-10px)",
        opacity: activeConfigId ? 1 : 0,
        pointerEvents: activeConfigId ? "auto" : "none",
        boxShadow: activeConfigId ? "5px 0 30px rgba(0,0,0,0.1)" : "none",
      }}
    >
      <div className="secondary-sidebar-header">
        <span className="secondary-sidebar-title">
          {sections.find((s) => s.id === activeConfigId)?.title}
        </span>
        <div onClick={() => setActiveConfigId(null)} className="close-button">
          <Plus size={18} color="#666" style={{ transform: "rotate(45deg)" }} />
        </div>
      </div>

      <div className="secondary-sidebar-content">{renderConfigContent()}</div>
    </div>
  );
};

export default BuilderSecondarySidebar;
