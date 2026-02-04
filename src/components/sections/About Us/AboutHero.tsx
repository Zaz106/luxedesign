import Link from "next/link";
import ColorBends from "../../ui/ColorBends";
import styles from "./AboutHero.module.css";

const AboutHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.background} aria-hidden>
        <ColorBends
          colors={["#2400b3", "#987ed2"]}
          rotation={0} // Slightly different from home
          speed={0.8}
          scale={0.9}
          mouseInfluence={0}
          noise={0}
          transparent
          autoRotate={0}
          frequency={1}
          warpStrength={1}
          parallax={0}
        />
      </div>
      <div className={styles.overlay} aria-hidden />
      
      <div className={styles.content}>
        <h1 className={styles.heading}>
          BUILT FOR GROWTH. DESIGNED FOR PEOPLE.
        </h1>
        <p className={styles.subHeading}>
          WE BUILD SECURE, SCALABLE SOFTWARE THAT HELPS BUSINESSES MOVE FASTER AND OPERATE SMARTER.
        </p>
        <Link href="#contact" className={styles.button}>
          Get In Touch
        </Link>
      </div>
    </section>
  );
};

export default AboutHero;
