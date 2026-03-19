"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { SectionItem } from "./sidebar/types";
import { GOOGLE_FONTS_URL } from "./components/contentSchemas";

// --- Global Styles ---
export type PaletteColors = {
  primary: string;
  secondary: string;
  paragraph: string;
  accent: string;
};

export type BorderRadius = "sharp" | "soft" | "rounded";
export type ButtonStyle = "filled" | "outlined";
export type GlobalTheme = "light" | "dark";

export type FontConfig = {
  heading: string;
  body: string;
};

export type GlobalStyles = {
  colors: PaletteColors;
  borderRadius: BorderRadius;
  buttonStyle: ButtonStyle;
  theme: GlobalTheme;
  fonts: FontConfig;
};

// --- Per-page section mapping ---
export type PageSections = Record<number, SectionItem[]>;

// --- Section content ---
export type SectionContent = Record<string, Record<string, string>>;

// --- Context value ---
type BuilderContextValue = {
  globalStyles: GlobalStyles;
  setGlobalStyles: React.Dispatch<React.SetStateAction<GlobalStyles>>;
  pageSections: PageSections;
  setPageSections: React.Dispatch<React.SetStateAction<PageSections>>;
  sectionContent: SectionContent;
  setSectionContent: React.Dispatch<React.SetStateAction<SectionContent>>;
  activePage: number;
  activeConfigId: string | null;
  setActiveConfigId: (id: string | null) => void;
};

const BuilderContext = createContext<BuilderContextValue | null>(null);

export const useBuilder = () => {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
  return ctx;
};

// --- Default sections per page ---
const defaultSections: SectionItem[] = [
  { id: "nav", title: "Navigation", isVisible: true, isLocked: true, designVariant: "nav-a" },
  { id: "hero", title: "Hero Section", isVisible: true, isLocked: true, designVariant: "hero-a" },
  { id: "features", title: "Feature Section 1", isVisible: true, designVariant: "features-a" },
  { id: "testimonials", title: "Testimonials", isVisible: true, designVariant: "testimonials-a" },
  { id: "gallery", title: "Gallery", isVisible: true, designVariant: "gallery-a" },
  { id: "pricing", title: "Pricing", isVisible: true, designVariant: "pricing-a" },
  { id: "faq", title: "FAQ", isVisible: true, designVariant: "faq-a" },
  { id: "cta", title: "CTA", isVisible: true, designVariant: "cta-a" },
  { id: "footer", title: "Footer", isVisible: true, isLocked: true, designVariant: "footer-a" },
];

export const BuilderProvider: React.FC<{
  activePage: number;
  children: React.ReactNode;
}> = ({ activePage, children }) => {
  const [globalStyles, setGlobalStyles] = useState<GlobalStyles>({
    colors: { primary: "#FFFFFF", secondary: "#555555", paragraph: "#888888", accent: "#00FFFF" },
    borderRadius: "rounded",
    buttonStyle: "outlined",
    theme: "dark",
    fonts: { heading: "Inter", body: "Inter" },
  });

  const [pageSections, setPageSections] = useState<PageSections>({
    1: defaultSections,
  });

  const [sectionContent, setSectionContent] = useState<SectionContent>({});
  const [activeConfigId, setActiveConfigId] = useState<string | null>(null);

  // Load Google Fonts for the builder font picker
  useEffect(() => {
    const linkId = "builder-google-fonts";
    if (!document.getElementById(linkId)) {
      const link = document.createElement("link");
      link.id = linkId;
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS_URL;
      document.head.appendChild(link);
    }
  }, []);

  return (
    <BuilderContext.Provider
      value={{
        globalStyles,
        setGlobalStyles,
        pageSections,
        setPageSections,
        sectionContent,
        setSectionContent,
        activePage,
        activeConfigId,
        setActiveConfigId,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
};
