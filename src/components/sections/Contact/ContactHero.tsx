import Link from "next/link";
import ColorBends from "../../ui/ColorBends";
import styles from "./ContactHero.module.css";

const ContactHero = () => {
  return (
    <section className={styles.contact_hero_section}>
      <div className={styles.contact_hero_background} aria-hidden>
        <ColorBends
          colors={["#2400b3", "#987ed2"]}
          rotation={0} // Slightly different from home
          speed={0.6}
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
      <div className={styles.contact_hero_overlay} aria-hidden />
      
      <div className={styles.contact_hero_content}>
        <h1 className={styles.contact_hero_heading}>
          LET&apos;S BUILD THE FUTURE TOGETHER
        </h1>
        <p className={styles.contact_hero_subheading}>
          WE&apos;RE HERE TO HELP YOU BUILD SECURE, SCALABLE SOLUTIONS THAT GROW WITH YOUR BUSINESS.
        </p>
      </div>
    </section>
  );
};

export default ContactHero;
