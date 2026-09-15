"use client";

import { cn } from "@/lib/utils";

export interface TickerProps {
  text: string;
  className?: string;
  speed?: "slow" | "normal" | "fast";
}

/**
 * Animated horizontal ticker/marquee for status messages.
 * Duplicates content for seamless infinite loop.
 */
export default function Ticker({ text, className, speed = "normal" }: TickerProps) {
  const speedClass = {
    slow: "animate-ticker [animation-duration:30s]",
    normal: "animate-ticker [animation-duration:20s]",
    fast: "animate-ticker [animation-duration:12s]",
  }[speed];

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap border-y border-border/50 py-2",
        className
      )}
    >
      <div className={cn("inline-block", speedClass)}>
        {/* Duplicate text for seamless loop */}
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="inline-block px-6 text-xs font-mono text-muted-foreground/60 uppercase tracking-widest"
          >
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}

export { Ticker };
