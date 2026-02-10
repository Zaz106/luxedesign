"use client";
import React, { useState } from "react";
import styles from "./PricingFAQ.module.css";
// Reusing ContactFAQ styles for now. We can duplicate if customization is needed.

const faqs = [
  {
    question: "Do you offer custom payment plans?",
    answer:
      "Yes, for larger projects or enterprise needs, we can structure payments in milestones or monthly retainers.",
  },
  {
    question: "What is included in the website maintenance?",
    answer:
      "Our maintenance packages include security updates, content changes, server monitoring, and performance optimizations.",
  },
  {
    question: "Can I upgrade my hosting plan later?",
    answer:
      "Absolutely. Our hosting is serverless and scalable. You can start small and we will adjust your limits as your traffic grows.",
  },
  {
    question: "What happens if I exceed my bandwidth limits?",
    answer:
      "We will notify you when you approach your limits. Overage is billed per GB, or we can upgrade you to the next tier to save costs.",
  },
  {
    question: "Do I handle the App Store submission?",
    answer:
      "No, we handle the entire submission process for both Apple App Store and Google Play Store as part of our service.",
  },
];

const PricingFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection} id="faq">
      <div className={styles.faqContainer}>
        <div className={styles.faqHeader}>
          <h2>Frequently Asked Questions</h2>
          <p>Common questions about our pricing and services.</p>
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

export default PricingFAQ;
