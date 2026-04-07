"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import GradualBlur from "../ui/GradualBlur";

export default function ScrollGradualBlur() {
  const [shouldShow, setShouldShow] = useState(false);
  const pathname = usePathname();
  const isExcluded = pathname === "/get-started";

  useEffect(() => {
    if (isExcluded) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Hide initially (on first screen)
      // Show immediately after first scroll down
      const isPastInitial = scrollY > 1; 

      // Hide at bottom (footer overlap)
      // Check if we are near the bottom
      const distFromBottom = documentHeight - (scrollY + windowHeight);
      const isNearBottom = distFromBottom < 10; // 10px threshold for footer

      if (isPastInitial && !isNearBottom) {
        setShouldShow(true);
      } else {
        setShouldShow(false);
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isExcluded]);

  if (isExcluded) return null;

  return (
    <div style={{ 
      opacity: shouldShow ? 1 : 0, 
      transition: "opacity 0.2s ease-in-out",
      pointerEvents: shouldShow ? "auto" : "none" 
    }}>
      <GradualBlur
        target="page"
        position="bottom"
        height="5rem"
        strength={2}
        divCount={8}
        curve="bezier"
        exponential
        opacity={1}
      />
    </div>
  );
}
