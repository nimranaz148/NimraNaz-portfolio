"use client";

import { useState, useEffect } from "react";

interface MousePosition {
  x: number;
  y: number;
  /** x normalized to [-1, 1] relative to viewport center */
  normalizedX: number;
  /** y normalized to [-1, 1] relative to viewport center */
  normalizedY: number;
}

/**
 * Track mouse position with normalized coordinates for parallax effects.
 * Returns { x, y, normalizedX, normalizedY }.
 */
export function useMousePosition(): MousePosition {
  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
        normalizedX: (e.clientX / window.innerWidth) * 2 - 1,
        normalizedY: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return position;
}
