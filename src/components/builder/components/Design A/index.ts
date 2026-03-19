"use client";

import React from "react";
import type { SectionComponent } from "../index";
import NavSection from "./NavSection";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import TestimonialsSection from "./TestimonialsSection";
import GallerySection from "./GallerySection";
import PricingSection from "./PricingSection";
import FAQSection from "./FAQSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";

// Maps section IDs from the sidebar to their canvas component
export const sectionComponentMap: Record<string, SectionComponent> = {
  nav: NavSection,
  hero: HeroSection,
  features: FeatureSection,
  testimonials: TestimonialsSection,
  gallery: GallerySection,
  pricing: PricingSection,
  faq: FAQSection,
  cta: CTASection,
  footer: FooterSection,
};

// Feature sections use a dynamic ID pattern (features-<timestamp>)
export const getComponentForSection = (sectionId: string): SectionComponent | null => {
  if (sectionComponentMap[sectionId]) return sectionComponentMap[sectionId];
  if (sectionId.startsWith("features")) return FeatureSection;
  return null;
};
