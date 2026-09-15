"use client";

import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

/**
 * Numbered editorial section heading used consistently across all sections.
 * e.g. "01 — About"
 */
export default function SectionHeading({ number, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-12", className)}>
      <span className="text-sm font-mono text-primary font-semibold tracking-wider">
        {number}
      </span>
      <div className="h-px w-12 bg-primary/30" />
      <span className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </span>
    </div>
  );
}

export { SectionHeading };
