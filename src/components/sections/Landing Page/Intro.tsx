"use client";
import React, { Suspense } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import styles from "./Intro.module.css";

const Intro = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textColumn}>
          <h2 className={styles.heading}>
            Building the Future of Digital Experiences
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
            <Suspense fallback={<div className={styles.videoSkeleton} />}>
              <LiteYouTubeEmbed 
                id="xnOwOBYaA3w" 
                title="Building the Future of Digital Experiences"
                params="controls=1&theme=light&color=white" 
              /> 
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
