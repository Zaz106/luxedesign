"use client";
import React, { useState } from "react";
import styles from "./AboutFAQ.module.css";

const faqs = [
  {
    question: "What services does Luxe offer?",
    answer: "Luxe specialize in building custom web applications, mobile apps, and robust backend systems tailored to scale with your business."
  },
  {
    question: "How long does a typical project take?",
    answer: "Project timelines vary depending on complexity. A standard website might take 4-6 weeks, while complex applications can take 3-6 months. We prioritize quality and clear communication throughout."
  },
  {
    question: "What is your typical tech stack?",
    answer: "We primarily work with Next.js, TypeScript, and Node.js for scalability, though we choose the best tools for each specific project's requirements."
  },
  {
    question: "Do you offer ongoing maintenance and support?",
    answer: "Yes, we provide flexible support and hosting plans to ensure your digital products stay secure, up-to-date, and high-performing after launch."
  },
  {
    question: "Can you help with app store submissions?",
    answer: "Absolutely. We handle the entire deployment process, including Apple App Store and Google Play Store submissions and approvals."
  },
  {
    question: "How do you handle project security?",
    answer: "Security is built into our architecture from day one. We follow industry best practices for data encryption, secure authentication, and infrastructure protection."
  }
];

const AboutFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about working with Luxe.</p>
        </div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`${styles.faqItem} ${activeIndex === index ? styles.faqActive : ""}`}
            >
              <button 
                className={styles.faqQuestion} 
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>
                <span className={styles.faqPlusIcon}>+</span>
              </button>
              <div className={styles.faqAnswer}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutFAQ;
