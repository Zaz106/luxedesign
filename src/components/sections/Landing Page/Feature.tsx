import Image from "next/image";
import Link from "next/link";
import styles from "./Feature.module.css";
import { ArrowUpRight } from "../../ui/Icons";

const Feature = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h2>What Makes Us Different</h2>
          <p>
            We focus on clean design, scalable architecture, and reliable
            performance — delivering solutions that last and grow with your
            business.
          </p>
          <div className={styles.action}>
            <Link href="#about" className={styles.primaryButton}>
              Learn More <ArrowUpRight />
            </Link>
          </div>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src="/images/feature.png"
            alt="Foggy forest landscape"
            fill
            className={styles.image}
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};


export default Feature;
