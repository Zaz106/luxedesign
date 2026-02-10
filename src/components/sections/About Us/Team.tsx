import React from "react";
import styles from "./Team.module.css";
// import Image from "next/image"; // Activate when real images are ready

const Team = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <h2 className={styles.heading}>Passionate Minds Behind the Canvas</h2>
          <p className={styles.description}>
            We are a duo of dedicated developers and designers obsessed with
            details. We believe that great software is born from the harmony of
            robust engineering and elegant aesthetics. Together, we bring your
            digital aspirations to life.
          </p>
        </div>

        <div className={styles.teamRow}>
          {/* Partner 1 */}
          <div className={styles.memberCard}>
            {/* Replace with <Image> when ready */}
            <div
              className={styles.imagePlaceholder}
              aria-label="Team Member 1 Photo"
            >
              PHOTO
            </div>
            <div className={styles.info}>
              <span className={styles.name}>Cianan Donald</span>
              <span className={styles.role}>Co-Founder | Directional Lead</span>
            </div>
          </div>

          {/* Partner 2 */}
          <div className={styles.memberCard}>
            <div
              className={styles.imagePlaceholder}
              aria-label="Team Member 2 Photo"
            >
              PHOTO
            </div>
            <div className={styles.info}>
              <span className={styles.name}>Joshua Huisman</span>
              <span className={styles.role}>Co-Founder | Lead Engineer</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
