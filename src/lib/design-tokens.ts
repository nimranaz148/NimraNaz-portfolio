/** Shared animation timing constants */
export const ANIMATION = {
  /** Standard durations (seconds) */
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.0,
    preloader: 2.5,
  },
  /** Easing curves */
  ease: {
    smooth: "power3.out",
    snappy: "power4.out",
    bounce: "back.out(1.4)",
    linear: "none",
  },
  /** Stagger timing */
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

/** Motion (Framer Motion) spring configurations */
export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  smooth: { type: "spring" as const, stiffness: 100, damping: 20 },
  gentle: { type: "spring" as const, stiffness: 50, damping: 15 },
} as const;

/** Responsive breakpoints (px) */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** Brand colors (match globals.css) */
export const COLORS = {
  background: "#F4F5F7",
  foreground: "#1a1a1a",
  primary: "#DC2626",
  primaryLight: "#FEF2F2",
  card: "#FFFFFF",
  muted: "#6B7280",
  border: "#E5E7EB",
} as const;
