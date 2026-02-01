import Image from "next/image";
import styles from "./Services.module.css";

const Services = () => {
  return (
    <section id="services" className={styles.section}>
      <div className={styles.header}>
        <h2>Our Services</h2>
        <p>Custom digital solutions designed to scale with your business.</p>
      </div>
      <div className={styles.grid}>
        <div className={styles.card}>
          <Image
            src="/images/service-1.png"
            alt="Web Design"
            width={600}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.cardOverlay}>
            <div className={styles.tag}>Web Design</div>
            <h3>We craft clean user experiences</h3>
            <div className={styles.cardBottom}>
              <p>
                High-performance websites and platforms built for speed,
                security, and scalability.
              </p>
              <span className={styles.explore}>Explore More {"\u2197\uFE0E"}</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/images/service-2.png"
            alt="App Development"
            width={600}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.cardOverlay}>
            <div className={styles.tag}>App Development</div>
            <h3>We build secure & scalable systems</h3>
            <div className={styles.cardBottom}>
              <p>Intuitive, user-friendly mobile apps for iOS and Android.</p>
              <span className={styles.explore}>Explore More {"\u2197\uFE0E"}</span>
            </div>
          </div>
        </div>
        <div className={styles.card}>
          <Image
            src="/images/service-3.png"
            alt="Hosting"
            width={600}
            height={800}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className={styles.cardOverlay}>
            <div className={styles.tag}>Hosting</div>
            <h3>We deploy and maintain</h3>
            <div className={styles.cardBottom}>
              <p>
                Robust backend systems and APIs that power modern applications.
              </p>
              <span className={styles.explore}>Explore More {"\u2197\uFE0E"}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
