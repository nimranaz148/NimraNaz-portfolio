"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

/**
 * Template wrapper for page-mount transitions.
 * Unlike layout.tsx, template.tsx creates a new instance on every route change.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.inOut",
          // A leftover inline transform (even translate(0,0)) creates a new
          // containing block, breaking position:fixed descendants (navbar,
          // mobile menu, ScrollTrigger pins). Clear it once the tween ends.
          clearProps: "transform",
        }
      );
    },
    { scope: containerRef }
  );

  return <div ref={containerRef}>{children}</div>;
}
