"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Solutions.module.css";

const solutionsData = [
  { id: 1, image: "/images/solution-1.svg", title: "Solution 1" },
  { id: 2, image: "/images/solution-2.svg", title: "Solution 2" },
  { id: 3, image: "/images/solution-3.svg", title: "Solution 3" },
  { id: 4, image: "/images/solution-4.svg", title: "Solution 4" },
  { id: 5, image: "/images/solution-5.svg", title: "Solution 5" },
];

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(2); // Start with middle item (index 2 of 5)
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isDragging || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % solutionsData.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [isDragging, isPaused]);

  const handleCardClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    setDragStartX(clientX);
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || dragStartX === null) return;
    
    const clientX = 'changedTouches' in e ? e.changedTouches[0].clientX : (e as React.MouseEvent).clientX;
    const diff = clientX - dragStartX;
    
    // Threshold 50px
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe Right -> Go to Previous
        setActiveIndex((prev) => (prev - 1 + solutionsData.length) % solutionsData.length);
      } else {
        // Swipe Left -> Go to Next
        setActiveIndex((prev) => (prev + 1) % solutionsData.length);
      }
    }
    
    setIsDragging(false);
    setDragStartX(null);
  };

  const handleDragCancel = () => {
    setIsDragging(false);
    setDragStartX(null);
  };

  // Helper to get circular distance
  const getCircularDistance = (index: number, active: number, length: number) => {
    let diff = (index - active) % length;
    if (diff > length / 2) diff -= length;
    if (diff < -length / 2) diff += length;
    return diff;
  };

  const getCardStyle = (index: number) => {
    const total = solutionsData.length;
    const diff = getCircularDistance(index, activeIndex, total);
    
    // Relative positioning with increased spacing
    // Spread: 75% for neighbors (was 65%), 140% for far (was 120%)
    
    if (diff === 0) {
      // Center
      return {
        x: "0%",
        scale: 1,
        zIndex: 10,
        opacity: 1,
        filter: "grayscale(0%) brightness(100%)",
      };
    } else if (diff === -1) {
      // Immediate Left
      return {
        x: "-75%",
        scale: 0.85,
        zIndex: 5,
        opacity: 0.8,
        filter: "grayscale(20%) brightness(90%)",
      };
    } else if (diff === 1) {
       // Immediate Right
      return {
        x: "75%",
        scale: 0.85,
        zIndex: 5,
        opacity: 0.8,
        filter: "grayscale(20%) brightness(90%)",
      };
    } else if (diff === -2) {
      // Far Left
      return {
        x: "-140%",
        scale: 0.7,
        zIndex: 1,
        opacity: 0.5,
        filter: "grayscale(100%) brightness(60%)",
      };
    } else if (diff === 2) {
      // Far Right
      return {
        x: "140%",
        scale: 0.7,
        zIndex: 1,
        opacity: 0.5,
        filter: "grayscale(100%) brightness(60%)",
      };
    } else {
      // Default hidden fallback
       return {
         x: "0%",
         scale: 0, 
         opacity: 0,
         zIndex: 0,
         filter: "grayscale(100%)",
       };
    }
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

        <div 
          className={styles.carouselContainer}
          onMouseDown={handleDragStart}
          onMouseUp={handleDragEnd}
          onMouseLeave={() => {
            handleDragCancel();
            setIsPaused(false);
          }}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
          onMouseEnter={() => setIsPaused(true)}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {solutionsData.map((item, index) => (
              <motion.div
                key={item.id}
                className={styles.card}
                onClick={() => handleCardClick(index)}
                initial={false}
                animate={getCardStyle(index)}
                transition={{
                  duration: 0.7,
                  ease: [0.32, 0.72, 0, 1], // Smooth ease-out-quart
                }}
                style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  transformOrigin: 'center center',
                  touchAction: 'none' // Important for dragging
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={600}
                  height={800}
                  priority={index === activeIndex}
                  sizes="(max-width: 768px) 80vw, 400px"
                  style={{ borderRadius: '12px', userSelect: 'none' }}
                  draggable={false}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

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
