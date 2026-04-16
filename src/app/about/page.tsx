import type { Metadata } from "next";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import AboutHero from "../../components/sections/About Us/AboutHero";
import Team from "../../components/sections/About Us/Team";
import Quote from "../../components/sections/About Us/Quote";
import Results from "../../components/sections/About Us/Results";
import Process from "../../components/sections/About Us/Process";
import AboutFAQ from "@/components/sections/About Us/AboutFAQ";
import { buildPageMetadata } from "../seo";
import styles from "./page.module.css";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us",
  description:
    "Learn how Luxe Designs partners with businesses through a proven process to deliver polished, high-performing digital experiences.",
  path: "/about",
});

export default function About() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <AboutHero />
        <Team />
        <Quote />
        <Results />
        <Process />
        <AboutFAQ />
      </main>
      <Footer />
    </div>
  );
}
