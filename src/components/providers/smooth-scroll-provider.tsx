"use client";

import { ReactLenis } from "lenis/react";

/**
 * Wraps the entire app in Lenis smooth scroll.
 * Syncs with GSAP ScrollTrigger via lenis's built-in RAF.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        syncTouch: false, // native touch is better on mobile
      }}
    >
      {children}
    </ReactLenis>
  );
}
