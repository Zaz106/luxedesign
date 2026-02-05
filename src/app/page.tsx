import dynamic from "next/dynamic";
import Header from "../components/layout/Header";
import Hero from "../components/sections/Landing Page/Hero";
import styles from "./page.module.css";

// Lazy load heavy/below-the-fold components
const LogoCloud = dynamic(() => import("../components/sections/Landing Page/LogoCloud"), {
  loading: () => <div style={{ height: "200px" }} aria-hidden />,
});
const Intro = dynamic(() => import("../components/sections/Landing Page/Intro"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Solutions = dynamic(() => import("../components/sections/Landing Page/Solutions"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Services = dynamic(() => import("../components/sections/Landing Page/Services"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Feature = dynamic(() => import("../components/sections/Landing Page/Feature"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Work = dynamic(() => import("../components/sections/Landing Page/Work"), {
  loading: () => <div style={{ height: "600px" }} aria-hidden />,
});
const Pricing = dynamic(() => import("../components/sections/Landing Page/Pricing"), {
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
        <Intro />
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
