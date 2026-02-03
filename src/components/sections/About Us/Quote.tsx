import styles from "./Quote.module.css";

const Quote = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.quote}>
          “We partner with product teams and founders to design, build, and scale
          software that delivers measurable outcomes{" "}
          <span className={styles.faded}>
            — faster time to market, reliable performance, clear ownership.”
          </span>
        </p>
      </div>
    </section>
  );
};

export default Quote;
