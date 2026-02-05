import styles from "./Quote.module.css";
import ShinyText from "@/components/ui/ShinyText";

const Quote = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.quote}>
          <ShinyText
            text="“We partner with product teams and founders to design, build, and scale
          software that delivers measurable outcomes — faster time to market, reliable performance, clear ownership.”"
            disabled={false}
            speed={5}
          />
        </p>
      </div>
    </section>
  );
};

export default Quote;
