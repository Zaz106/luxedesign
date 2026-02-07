import React from "react";
import ContactHero from "@/components/sections/Contact/ContactHero";
import ContactForm from "@/components/sections/Contact/ContactForm";
import ContactFAQ from "@/components/sections/Contact/ContactFAQ";
import SimpleFooter from "@/components/layout/SimpleFooter";
import Header from "@/components/layout/Header";

export const metadata = {
  title: "Contact Us | Luxe Designs",
  description: "Get in touch with Luxe Designs to discuss your next project. We build secure, scalable, and high-performance digital solutions.",
};

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
