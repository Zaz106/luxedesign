"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, PanInfo, AnimatePresence } from "motion/react";
import styles from "./Testimonials.module.css";
import ShinyText from "@/components/ui/ShinyText"; // Added import

const testimonials = [
  { 
    id: 1, 
    rating: 5,
    text: "“With the right coaching, I was able to push past my limits. I couldn't have reached my goals without the guidance and support of an experienced coach.”",
    name: "Emily Johnson",
    role: "Yoga Instructor",
    image: "/images/angie.jpg" 
  },
  { 
    id: 2, 
    rating: 5,
    text: "“I cannot thank Six Foot Design Co. enough for the incredible work they did on my website. They captured the exact eco-chic look I envisioned.”",
    name: "Angie",
    role: "CEO of Angi Cleans",
    image: "/images/angie.jpg"
  },
  { 
    id: 3, 
    rating: 5,
    text: "“With the right coaching, I was able to push past my limits. I couldn't have reached my goals without the guidance and support of an experienced coach.”",
    name: "Michael Chen",
    role: "Founder, TechStart",
    image: "/images/angie.jpg"
  },
  { 
    id: 4, 
    rating: 5,
    text: "“With the right coaching, I was able to push past my limits. I couldn't have reached my goals without the guidance and support of an experienced coach.”",
    name: "Sarah Williams",
    role: "Director of Marketing",
    image: "/images/angie.jpg"
  },
];

const Testamonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  return (
    <section id="solutions" className={styles.section}>
      <div className={styles.content}>

        <div 
          className={styles.reviewContainer}
          onMouseEnter={() => setIsPaused(true)} 
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className={styles.quoteWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={handleDragEnd}
                className={styles.quoteContent}
              >
                {/* Stars */}
                <div className={styles.stars}>
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="#FFB400" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </svg>
                  ))}
                </div>

                <h3 className={styles.quoteText}>
                  <ShinyText 
                    text={testimonials[activeIndex].text} 
                    disabled={false} 
                    speed={3} 
                    className={styles.shinyText} 
                  />
                </h3>
                <div className={styles.meta}>
                  <p>{testimonials[activeIndex].name}, <span className={styles.roleText}>{testimonials[activeIndex].role}</span></p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Avatars */}
          <div className={styles.avatarRow}>
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                className={`${styles.avatarBtn} ${index === activeIndex ? styles.activeAvatar : ''}`}
                aria-label={`View testimonial from ${testimonial.name}`}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className={styles.avatarImg}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testamonials;

