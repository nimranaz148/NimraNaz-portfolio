"use client";

import { motion } from "motion/react";

/**
 * Template wrapper for page-mount transitions.
 * Unlike layout.tsx, template.tsx creates a new instance on every route change.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
