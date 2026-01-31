import dynamic from "next/dynamic";
import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import styles from "./page.module.css";

// Lazy load heavy/below-the-fold components
const LogoCloud = dynamic(() => import("../components/sections/LogoCloud"), {
  loading: () => <div style={{ height: "200px" }} aria-hidden />,
});
const Solutions = dynamic(() => import("../components/sections/Solutions"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Services = dynamic(() => import("../components/sections/Services"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Feature = dynamic(() => import("../components/sections/Feature"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Work = dynamic(() => import("../components/sections/Work"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Pricing = dynamic(() => import("../components/sections/Pricing"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Footer = dynamic(() => import("../components/layout/Footer"), {
  loading: () => <div style={{ height: "400px" }} aria-hidden />,
});

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <Hero />
        <LogoCloud />
        <Solutions />
        <Services />
        <Feature />
        <Work />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
