"use client";

import React from "react";

// Nav Designs imports
import NavA from "./Nav Designs/NavA";
import NavB from "./Nav Designs/NavB";

// Hero Designs imports
import HeroA from "./Hero Designs/HeroA";
import HeroB from "./Hero Designs/HeroB";

// Feature Designs imports
import FeatureA from "./Feature Designs/FeatureA";
import FeatureB from "./Feature Designs/FeatureB";
import FeatureC from "./Feature Designs/FeatureC";
import FeatureD from "./Feature Designs/FeatureD";
import FeatureE from "./Feature Designs/FeatureE";

// Testimonials Designs imports
import TestimonialsA from "./Testimonials Designs/TestimonialsA";
import TestimonialsB from "./Testimonials Designs/TestimonialsB";
import TestimonialsC from "./Testimonials Designs/TestimonialsC";

// Gallery Designs imports
import GalleryA from "./Gallery Designs/GalleryA";
import GalleryB from "./Gallery Designs/GalleryB";

// Pricing Designs imports
import PricingA from "./Pricing Designs/PricingA";
import PricingB from "./Pricing Designs/PricingB";

// FAQ Designs imports
import FAQA from "./FAQ Designs/FAQA";
import FAQB from "./FAQ Designs/FAQB";

// CTA Designs imports
import CTAA from "./CTA Designs/CTAA";
import CTAB from "./CTA Designs/CTAB";

// Footer Designs imports
import FooterA from "./Footer Designs/FooterA";
import FooterB from "./Footer Designs/FooterB";
import MinimalFooter from "./Footer Designs/MinimalFooter";
import SpinnyFooter from "./Footer Designs/SpinnyFooter";
import BigNameFooter from "./Footer Designs/BigNameFooter";

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
    { id: "features-c", name: "Values Grid", component: FeatureC },
    { id: "features-d", name: "Service List", component: FeatureD },
    { id: "features-e", name: "Split Image", component: FeatureE },
  ],
  testimonials: [
    { id: "testimonials-a", name: "Three Column", component: TestimonialsA },
    { id: "testimonials-b", name: "Single Column", component: TestimonialsB },
    { id: "testimonials-c", name: "Carousel", component: TestimonialsC },
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
    { id: "footer-minimal", name: "Minimalist Grid", component: MinimalFooter },
    { id: "footer-spinny", name: "Scrolling Banner", component: SpinnyFooter },
    { id: "footer-bigname", name: "Fading Brand", component: BigNameFooter },
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
