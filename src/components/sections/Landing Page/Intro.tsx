import React from "react";
import styles from "./Intro.module.css";

const Intro = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>
            Building the Future <br />
            of Digital Experiences
          </h2>
          <p className={styles.description}>
            At Luxe, we don't just write code; we cultivate digital ecosystems. 
            Our comprehensive approach combines cutting-edge technology with intuitive design 
            to transform your vision into a scalable, high-performance reality.
            Discover how our tailored software solutions can elevate your business 
            in an ever-evolving digital landscape.
          </p>
        </div>
        <div className={styles.videoColumn}>
          <div className={styles.videoContainer} aria-label="Introduction Video">
            <iframe
              className={styles.iframe}
              src="https://www.youtube.com/embed/xnOwOBYaA3w?si=19ziG3ZhKuMOba9s"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
