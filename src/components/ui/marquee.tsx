"use client";

import { cn } from "@/lib/utils";

export interface MarqueeProps {
  items: string[];
  className?: string;
  reverse?: boolean;
  separator?: string;
}

/**
 * Infinite horizontal scrolling marquee for skills/text.
 * CSS-only animation for best performance.
 */
export default function Marquee({
  items,
  className,
  reverse = false,
  separator = "•",
}: MarqueeProps) {
  // Duplicate items to fill the loop
  const content = [...items, ...items];

  return (
    <div
      className={cn(
        "overflow-hidden whitespace-nowrap group",
        className
      )}
    >
      <div
        className={cn(
          "inline-flex items-center gap-6",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          "group-hover:[animation-play-state:paused]"
        )}
      >
        {content.map((item, i) => (
          <span key={`${item}-${i}`} className="inline-flex items-center gap-6">
            <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground/10 select-none">
              {item}
            </span>
            <span className="text-foreground/10 text-xl select-none">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export { Marquee };
