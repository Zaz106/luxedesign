import React from "react";
import type { Metadata } from "next";
import ContactHero from "@/components/sections/Contact/ContactHero";
import ContactForm from "@/components/sections/Contact/ContactForm";
import ContactFAQ from "@/components/sections/Contact/ContactFAQ";
import SimpleFooter from "@/components/layout/SimpleFooter";
import Header from "@/components/layout/Header";
import { buildPageMetadata } from "../seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact Us",
  description:
    "Contact Luxe Designs to discuss your project goals, timelines, and technical requirements with our team.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <main>
      <Header />
      <ContactHero />
      <ContactForm />
      <ContactFAQ />
      <SimpleFooter />
    </main>
  );
}
