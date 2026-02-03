"use client";

import styles from "./Process.module.css";
import { motion } from "motion/react";

const steps = [
  {
    number: "Q1",
    title: "Discover",
    desc: "A clear, repeatable process that reduces risk and accelerates delivery.",
  },
  {
    number: "Q2",
    title: "Design",
    desc: "A clear, repeatable process that reduces risk and accelerates delivery.",
  },
  {
    number: "Q3",
    title: "Build",
    desc: "A clear, repeatable process that reduces risk and accelerates delivery.",
  },
  {
    number: "Q4",
    title: "Host",
    desc: "A clear, repeatable process that reduces risk and accelerates delivery.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
} as const;

const Process = () => {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Our Process</h2>
        <p className={styles.subtitle}>
          A clear, repeatable process that reduces risk and accelerates delivery.
        </p>
      </div>

      <motion.div 
        className={styles.grid}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {steps.map((step, index) => (
          <motion.div key={index} className={styles.step} variants={itemVariants}>
            <div className={styles.dot} />
            <div className={styles.content}>
               <div className={styles.stepNumber}>{step.number}</div>
               <h3 className={styles.stepTitle}>{step.title}</h3>
               <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Process;
