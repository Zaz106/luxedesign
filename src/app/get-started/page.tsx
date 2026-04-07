import React from "react";
import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import GetStartedHero from "@/components/sections/GetStarted/GetStartedHero";
import GetStartedForm from "@/components/sections/GetStarted/GetStartedForm";

export const metadata: Metadata = {
  title: "Get Started | Company Designs",
  description: "Tell us about your project. Fill out our smart project brief and we'll create the perfect digital solution for your business.",
};

export default function GetStartedPage() {
  return (
    <main>
      <Header />
      <GetStartedHero />
      <GetStartedForm />
    </main>
  );
}
