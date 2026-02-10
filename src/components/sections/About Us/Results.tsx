import Image from "next/image";
import styles from "./Results.module.css";
import CountUp from "@/components/ui/CountUp";

const Results = () => {
  return (
    <section className={styles.section}>
      <Image
        src="/images/cover-image.webp"
        alt="Skyscrapers looking up"
        fill
        className={styles.backgroundImage}
        sizes="100vw"
      />
      <div className={styles.overlay} aria-hidden />

      <div className={styles.content}>
        <h2 className={styles.title}>Real Results We’re Proud to Share</h2>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.statNumber}>
              <CountUp
                from={950}
                to={1000}
                separator=","
                direction="up"
                duration={0.5}
                className={styles.countUp}
              />
              +
            </div>
            <div className={styles.statLabel}>Hours In Projects</div>
            <p className={styles.statDesc}>
              UI idea: horizontal, glass cards with year, short headline,
              one-line impact metric (e.g., “2023 — First 1M requests/month
              handled”).
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.statNumber}>
              <CountUp
                from={95.9}
                to={99.9}
                separator=","
                direction="up"
                duration={0.5}
                className={styles.countUp}
              />
              %
            </div>
            <div className={styles.statLabel}>Uptime</div>
            <p className={styles.statDesc}>
              UI idea: horizontal, glass cards with year, short headline,
              one-line impact metric (e.g., “2023 — First 1M requests/month
              handled”).
            </p>
          </div>
          <div className={styles.card}>
            <div className={styles.statNumber}>
              <CountUp
                from={0}
                to={50}
                separator=","
                direction="up"
                duration={0.5}
                className={styles.countUp}
              />
              %
            </div>
            <div className={styles.statLabel}>Avg. Bounce Rates</div>
            <p className={styles.statDesc}>
              UI idea: horizontal, glass cards with year, short headline,
              one-line impact metric (e.g., “2023 — First 1M requests/month
              handled”).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
