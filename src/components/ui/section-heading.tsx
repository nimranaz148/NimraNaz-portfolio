"use client";

import { cn } from "@/lib/utils";

export interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

/**
 * Numbered editorial section heading used consistently across all sections.
 * e.g. "01 — About". Renders as a real <h2> so screen readers and outline
 * tools see each section labeled, instead of a decorative span.
 */
export default function SectionHeading({ number, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center gap-4 mb-12", className)}>
      <span className="text-sm font-mono text-primary font-semibold tracking-wider">
        {number}
      </span>
      <div className="h-px w-12 bg-primary/30" />
      <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </h2>
    </div>
  );
}

export { SectionHeading };
