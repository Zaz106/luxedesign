"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, PanInfo } from "motion/react";
import styles from "./Solutions.module.css";

const solutionsData = [
  { id: 1, image: "/images/solution-1.svg", title: "Solution 1" },
  { id: 2, image: "/images/solution-2.svg", title: "Solution 2" },
  { id: 3, image: "/images/solution-3.svg", title: "Solution 3" },
  { id: 4, image: "/images/solution-4.svg", title: "Solution 4" },
  { id: 5, image: "/images/solution-5.svg", title: "Solution 5" },
];

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionsData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + solutionsData.length) % solutionsData.length);
    } else if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % solutionsData.length);
    }
  };

  const getCircularDistance = (index: number, active: number, length: number) => {
    let diff = (index - active) % length;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  return (
    <section id="solutions" className={styles.section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h2>Powerful Solutions Built for Growth</h2>
          <p>
            We partner with startups and businesses to create reliable,
            high-performance software tailored to real-world needs.
          </p>
        </div>

        {/* 
          Carousel Container 
          Refactored: Removed individual card dragging. 
          Now using a container-level Pan gesture to trigger slide changes.
          This prevents the "fighting" between drag physics and position animations.
        */}
        <motion.div 
          className={styles.carouselContainer}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onPanEnd={(e, info) => {
            const threshold = 50; 
            // Pan Left (velocity negative or negative offset) -> Next
            if (info.offset.x < -threshold) {
              setActiveIndex((prev) => (prev + 1) % solutionsData.length);
            } 
            // Pan Right -> Prev
            else if (info.offset.x > threshold) {
              setActiveIndex((prev) => (prev - 1 + solutionsData.length) % solutionsData.length);
            }
          }}
          style={{ touchAction: "pan-y" }} // Allow vertical scroll, capture horizontal
        >
          {solutionsData.map((item, index) => {
            const diff = getCircularDistance(index, activeIndex, solutionsData.length);
            
            // Calculate styles based on position (diff)
            let x = "0%";
            let scale = 1;
            let zIndex = 0;
            let overlayOpacity = 0;

            if (diff === 0) {
              x = "0%";
              scale = 1;
              zIndex = 10;
              overlayOpacity = 0;
            } else if (Math.abs(diff) === 1) {
              x = diff === -1 ? "-75%" : "75%";
              scale = 0.85;
              zIndex = 5;
              overlayOpacity = 0.4;
            } else if (Math.abs(diff) === 2) {
              x = diff === -2 ? "-140%" : "140%";
              scale = 0.7;
              zIndex = 1;
              overlayOpacity = 0.7;
            } else {
              x = "0%"; 
              scale = 0;
              zIndex = 0;
            }

            const isVisible = Math.abs(diff) <= 2;

            return (
              <motion.div
                key={item.id}
                className={styles.card}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x,
                  scale,
                  zIndex,
                  opacity: isVisible ? 1 : 0
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut"
                }}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  transformStyle: 'preserve-3d',
                }}
              >
                  <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '0.75rem', overflow: 'hidden', transform: "translateZ(0)" }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      priority={diff === 0}
                      sizes="(max-width: 768px) 80vw, 450px"
                      style={{ 
                        objectFit: 'cover',
                        userSelect: 'none',
                        pointerEvents: 'none',
                      }}
                      draggable={false}
                    />
                    {/* Darkening Overlay */}
                    <motion.div 
                      initial={false}
                      animate={{ opacity: overlayOpacity }}
                      transition={{ duration: 0.4 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundColor: '#000',
                        pointerEvents: 'none',
                      }}
                    />
                  </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className={styles.action}>
          <Link href="#contact" className={styles.primaryButton}>
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
};


export default Solutions;

