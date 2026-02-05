import styles from "./LogoCloud.module.css";

const logos = [
  "NEXT.JS",
  "REACT",
  "FIGMA",
  "STRIPE",
  "VERCEL",
  "AFFINITY",
];

const LogoCloud = () => {
  return (
    <section className={styles.section}>
      <div className={styles.scroller}>
        <div className={styles.scrollerInner}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <span className={styles.logo}>{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoCloud;
