"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, PanInfo } from "motion/react";
import styles from "./Solutions.module.css";

const testimonials = [
  { 
    id: 1, 
    text: "I cannot thank Six Foot Design Co. enough for the incredible work they did on my website. Jason and Josh went above and beyond to create a site that perfectly reflects my eco-friendly cleaning business. They captured the exact eco-chic look I envisioned while also making it simple and inviting for potential clients to use. Their creativity, attention to detail, and hard work truly exceeded my expectations. I am so grateful for their dedication and would highly recommend Six Foot Design Co. to anyone looking for a team that genuinely cares about bringing your vision to life.",
    name: "Angie",
    role: "CEO of Angi Cleans",
    initials: "AC",
    image: "/images/angie.jpg" // Placeholder for user 
  },
  { 
    id: 2, 
    text: "Luxe transformed our digital presence. Their team understood our vision perfectly and delivered a platform that exceeded our expectations.",
    name: "Sarah Jenkins",
    role: "CEO, TechFlow",
    initials: "SJ"
  },
  { 
    id: 3, 
    text: "The scalability of the solution provided by Luxe has allowed us to grow our user base by 300% without a hitch. Truly world-class engineering.",
    name: "David Chen",
    role: "CTO, InnovateX",
    initials: "DC"
  },
  { 
    id: 4, 
    text: "Working with Luxe was a game-changer. They didn't just build software; they built a competitive advantage for our business.",
    name: "Elena Rodriguez",
    role: "Founder, GreenSpace",
    initials: "ER"
  },
  { 
    id: 5, 
    text: "Their attention to detail and user experience design is unmatched. Our customers love the new interface.",
    name: "Michael Ross",
    role: "Product Lead, Aether",
    initials: "MR"
  },
];

const Solutions = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.x > threshold) {
      setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    } else if (info.offset.x < -threshold) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
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
          <h2>Transformative Client Results</h2>
          <p>
            Don&apos;t just take our word for it. See how we&apos;ve helped innovative companies 
            achieve their digital goals.
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
              setActiveIndex((prev) => (prev + 1) % testimonials.length);
            } 
            // Pan Right -> Prev
            else if (info.offset.x > threshold) {
              setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            }
          }}
          style={{ touchAction: "pan-y" }} // Allow vertical scroll, capture horizontal
        >
          {testimonials.map((item, index) => {
            const diff = getCircularDistance(index, activeIndex, testimonials.length);
            
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
                  // transformStyle: 'preserve-3d', // Removed to prevent z-index/clipping issues
                  backfaceVisibility: 'hidden', // Optimize performance
                }}
              >
                  <div className={styles.cardContent}>
                    <div className={styles.avatarWrapper} aria-hidden="true">
                      {item.image && item.id === 1 ? (
                         // eslint-disable-next-line @next/next/no-img-element
                         <img 
                           src={item.image} 
                           alt={item.name}
                           className={styles.avatarImage}
                           onError={(e) => {
                             e.currentTarget.style.display = 'none';
                             e.currentTarget.nextElementSibling?.classList.remove(styles.hidden);
                           }} 
                          />
                      ) : null}
                      <span className={`${styles.avatarPlaceholder} ${item.image && item.id === 1 ? styles.hidden : ''}`}>{item.initials}</span>
                    </div>
                    
                    <p className={styles.testimonialText}>
                      &ldquo;{item.text}&rdquo;
                    </p>
                    
                    <div className={styles.authorInfo}>
                      <span className={styles.signature}>{item.name}</span>
                      <span className={styles.role}>{item.role}</span>
                    </div>
                  </div>

                  {/* Darkening Overlay for inactive cards */}
                  <motion.div 
                    initial={false}
                    animate={{ opacity: overlayOpacity }}
                    transition={{ duration: 0.4 }}
                    style={{
                      position: 'absolute',
                      inset: -2, // Extend beyond borders to ensure full coverage
                      backgroundColor: '#000',
                      pointerEvents: 'none',
                      zIndex: 20,
                    }}
                  />
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

