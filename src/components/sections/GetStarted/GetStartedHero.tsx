import ColorBends from "../../ui/ColorBends";
import styles from "./GetStartedHero.module.css";

const GetStartedHero = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroBackground} aria-hidden>
        <ColorBends
          colors={["#2400b3", "#987ed2"]}
          rotation={10}
          speed={0.6}
          scale={0.85}
          mouseInfluence={0}
          noise={0}
          transparent
          autoRotate={0}
          frequency={1}
          warpStrength={1}
          parallax={0}
        />
      </div>
      <div className={styles.heroOverlay} aria-hidden />
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>LET&apos;S GET STARTED</h1>
        <p className={styles.heroSubheading}>
          TELL US ABOUT YOUR PROJECT AND WE&apos;LL CREATE THE PERFECT SOLUTION FOR YOUR BUSINESS.
        </p>
      </div>
    </section>
  );
};

export default GetStartedHero;
