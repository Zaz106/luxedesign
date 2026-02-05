"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import styles from "./Services.module.css";

const servicesData = [
  {
    title: "Web Design",
    description: "High-performance websites and platforms built for speed, security, and scalability.",
    tag: "Web Design",
    header: "We craft clean user experiences",
    image: "/images/service-1.png",
  },
  {
    title: "App Development",
    description: "Intuitive, user-friendly mobile apps for iOS and Android.",
    tag: "App Development",
    header: "We build secure & scalable systems",
    image: "/images/service-2.png",
  },
  {
    title: "Hosting",
    description: "Robust backend systems and APIs that power modern applications.",
    tag: "Hosting",
    header: "We deploy and maintain",
    image: "/images/service-3.png",
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Drag to scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
      // Calculate the index based on scroll position + half width to center it
      // Assuming cards are distributed evenly. 
      // Since cards might be < 100%, we should be careful. 
      // Simplified: Find the child closer to the center of the viewport relative to container
      
      const center = scrollLeft + clientWidth / 2;
      const children = Array.from(container.children) as HTMLElement[];
      
      let closestIndex = 0;
      let minDiff = Infinity;

      children.forEach((child, index) => {
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const diff = Math.abs(center - childCenter);
        if (diff < minDiff) {
          minDiff = diff;
          closestIndex = index;
        }
      });
      
      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const child = container.children[index] as HTMLElement;
    if (child) {
        // Center the clicked slide
        const scrollLeft = child.offsetLeft - (container.clientWidth / 2) + (child.offsetWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  };

  return (
    <section id="services" className={styles.section}>
      <div className={styles.header}>
        <h2>Our Services</h2>
        <p>Custom digital solutions designed to scale with your business.</p>
      </div>
      <div 
        className={styles.grid} 
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {servicesData.map((service, index) => (
          <div key={index} className={styles.card}>
            <Image
              src={service.image}
              alt={service.title}
              width={600}
              height={800}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className={styles.cardOverlay}>
              <div className={styles.tag}>{service.tag}</div>
              <h3>{service.header}</h3>
              <div className={styles.cardBottom}>
                <p>{service.description}</p>
                <span className={styles.explore}>
                  Explore More{" "}
                  <span className={styles.arrow} style={{ fontFamily: "monospace" }}>
                    &#8599;&#xFE0E;
                  </span>
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.dots}>
        {servicesData.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
