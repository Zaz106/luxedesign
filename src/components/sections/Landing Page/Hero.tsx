"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import styles from "./Hero.module.css";

const ColorBends = dynamic(() => import("../../ui/ColorBends"), {
  ssr: false,
  loading: () => <div style={{ width: "100%", height: "100%", background: "#111111" }} />,
});

const Hero = () => {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.background} aria-hidden>
        <ColorBends
          colors={["#2400b3", "#987ed2"]}
          rotation={0}
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
      
      {/* 
        Custom content wrapper to ensure exact alignment with the heading 
        independent of the global container max-width.
      */}
      <div className={styles.contentWrapper}>
        <div className={styles.contentInner}>
          <h1 className={styles.heading}>
            <span className={styles.word}>SOFTWARE</span>
            <span className={styles.separator}>—</span>
            <span className={styles.word}>SOLUTIONS</span>
          </h1>
          
          <div className={styles.gridFooter}>
            <p className={styles.description}>
              We design, develop, and deploy scalable digital products that help
              companies grow faster and operate smarter.
            </p>
            <div className={styles.actions}>
              <a href="#about" className={styles.exploreButton}>
                Explore More
                <Image
                  src="/images/Arrow down.svg"
                  alt=""
                  width={20}
                  height={20}
                  className={styles.arrowIcon}
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
