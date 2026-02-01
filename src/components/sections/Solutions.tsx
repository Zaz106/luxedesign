"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
        transform: "translateX(0) scale(1)",
        zIndex: 10,
        opacity: 1,
        filter: "grayscale(0%)",
      };
    } else if (diff === -1) {
      // Immediate Left
      return {
        transform: "translateX(-75%) scale(0.85)",
        zIndex: 5,
        opacity: 0.8,
        filter: "grayscale(20%)",
      };
    } else if (diff === 1) {
       // Immediate Right
      return {
        transform: "translateX(75%) scale(0.85)",
        zIndex: 5,
        opacity: 0.8,
        filter: "grayscale(20%)",
      };
    } else if (diff === -2) {
      // Far Left
      return {
        transform: "translateX(-140%) scale(0.7)",
        zIndex: 1,
        opacity: 0.5,
        filter: "grayscale(100%) brightness(60%)",
      };
    } else if (diff === 2) {
      // Far Right
      return {
        transform: "translateX(140%) scale(0.7)",
        zIndex: 1,
        opacity: 0.5,
        filter: "grayscale(100%) brightness(60%)",
      };
    } else {
      // Default hidden
       return {
         transform: `scale(0)`, // Hide smoothly
         opacity: 0,
         zIndex: 0,
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
          onMouseLeave={handleDragCancel}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          {solutionsData.map((item, index) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => handleCardClick(index)}
              style={getCardStyle(index)}
            >
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={800}
                priority={index === 2}
                sizes="(max-width: 768px) 80vw, 400px"
              />
            </div>
          ))}
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
