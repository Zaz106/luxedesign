"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import styles from "./Work.module.css";

const projects = [
  {
    id: 1,
    title: "City on a Hill",
    description: "We design, develop, and deploy scalable digital solutions that help companies grow faster.",
    image: "/images/work-1.png",
    tags: ["#2025", "Web Design", "Poster"],
    link: "#project1",
  },
  {
    id: 2,
    title: "Angi's Cleaning",
    description: "A comprehensive branding and web presence overhaul for a premium cleaning service.",
    image: "/images/work-2.png",
    tags: ["#2024", "Branding", "Dev"],
    link: "#project2",
  },
  {
    id: 3,
    title: "Fuji Bowls",
    description: "Modern e-commerce platform ensuring a seamless ordering experience for customers.",
    image: "/images/work-3.png",
    tags: ["#2023", "E-commerce", "App"],
    link: "#project3",
  },
];

const Work = () => {
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
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth } = container;
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
    <section id="work" className={styles.section}>
      <div className={styles.header}>
        <h2>Some of Our Work</h2>
        <p>
          A selection of projects showcasing our approach to design,
          performance, and usability.
        </p>
      </div>
      <div 
        className={styles.grid}
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project) => (
          <div key={project.id} className={styles.card}>
            <Image
              src={project.image}
              alt={project.title}
              width={800}
              height={800}
              className={styles.image}
              sizes="(max-width: 900px) 100vw, 33vw"
            />
            {/* Overlay handled in CSS */}
            
              <div className={styles.tags}>
                {project.tags.map((tag, i) => (
                  <span key={i} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={styles.cardOverlay}>
                <div className={styles.cardContent}>
                  <h3>{project.title}</h3>
                  <p className={styles.description}>{project.description}</p>
                  <Link href={project.link} className={styles.projectButton}>
                    <span>View the Project</span>
                    <span className={styles.arrowIcon}>→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      
      <div className={styles.dots}>
        {projects.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ""}`}
            onClick={() => scrollToSlide(index)}
          />
        ))}
      </div>
    </section>
  );
};



export default Work;
