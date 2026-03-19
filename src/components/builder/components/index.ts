"use client";

import React from "react";

// Design A imports
import NavA from "./Design A/NavSection";
import HeroA from "./Design A/HeroSection";
import FeatureA from "./Design A/FeatureSection";
import TestimonialsA from "./Design A/TestimonialsSection";
import GalleryA from "./Design A/GallerySection";
import PricingA from "./Design A/PricingSection";
import FAQA from "./Design A/FAQSection";
import CTAA from "./Design A/CTASection";
import FooterA from "./Design A/FooterSection";

// Design B imports
import NavB from "./Design B/NavSection";
import HeroB from "./Design B/HeroSection";
import FeatureB from "./Design B/FeatureSection";
import TestimonialsB from "./Design B/TestimonialsSection";
import GalleryB from "./Design B/GallerySection";
import PricingB from "./Design B/PricingSection";
import FAQB from "./Design B/FAQSection";
import CTAB from "./Design B/CTASection";
import FooterB from "./Design B/FooterSection";

export type SectionComponentProps = { sectionId: string };
export type SectionComponent = React.FC<SectionComponentProps>;

export type DesignVariant = {
  id: string;
  name: string;
  component: SectionComponent;
};

// All available design variants per section type
export const sectionDesigns: Record<string, DesignVariant[]> = {
  nav: [
    { id: "nav-a", name: "Horizontal Bar", component: NavA },
    { id: "nav-b", name: "Centered Stack", component: NavB },
  ],
  hero: [
    { id: "hero-a", name: "Centered Fullwidth", component: HeroA },
    { id: "hero-b", name: "Split Layout", component: HeroB },
  ],
  features: [
    { id: "features-a", name: "Card Grid", component: FeatureA },
    { id: "features-b", name: "Numbered List", component: FeatureB },
  ],
  testimonials: [
    { id: "testimonials-a", name: "Three Column", component: TestimonialsA },
    { id: "testimonials-b", name: "Single Column", component: TestimonialsB },
  ],
  gallery: [
    { id: "gallery-a", name: "Grid Layout", component: GalleryA },
    { id: "gallery-b", name: "Masonry", component: GalleryB },
  ],
  pricing: [
    { id: "pricing-a", name: "Simple Cards", component: PricingA },
    { id: "pricing-b", name: "Featured Card", component: PricingB },
  ],
  faq: [
    { id: "faq-a", name: "Stacked Cards", component: FAQA },
    { id: "faq-b", name: "Accordion", component: FAQB },
  ],
  cta: [
    { id: "cta-a", name: "Centered Block", component: CTAA },
    { id: "cta-b", name: "Banner Card", component: CTAB },
  ],
  footer: [
    { id: "footer-a", name: "Multi Column", component: FooterA },
    { id: "footer-b", name: "Centered Stack", component: FooterB },
  ],
};

/** Normalise section IDs like "features-12345" → "features" */
const normaliseSectionType = (sectionId: string): string => {
  if (sectionId.startsWith("features")) return "features";
  return sectionId;
};

/** Get the available designs for a section */
export const getDesignsForSection = (
  sectionId: string,
): DesignVariant[] | null => {
  return sectionDesigns[normaliseSectionType(sectionId)] ?? null;
};

/** Get a specific design component for a section given a variant ID */
export const getComponentForSectionVariant = (
  sectionId: string,
  variantId: string | undefined,
): SectionComponent | null => {
  const designs = getDesignsForSection(sectionId);
  if (!designs || designs.length === 0) return null;
  if (variantId) {
    const match = designs.find((d) => d.id === variantId);
    if (match) return match.component;
  }
  // Default to first design (Design A)
  return designs[0].component;
};

/** Get the default variant ID for a section (first available) */
export const getDefaultVariantId = (sectionId: string): string => {
  const designs = getDesignsForSection(sectionId);
  return designs?.[0]?.id ?? "";
};
