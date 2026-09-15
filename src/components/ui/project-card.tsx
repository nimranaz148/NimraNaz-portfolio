"use client";

import { cn } from "@/lib/utils";
import type { ProjectItem } from "@/types";

export interface ProjectCardProps {
  project?: ProjectItem;
  data?: ProjectItem;
  className?: string;
}

/**
 * Reusable project card with hover micro-interactions.
 * Displays category, title, description, tech tags, and outcomes.
 */
export default function ProjectCard({ project, data, className }: ProjectCardProps) {
  const item = (project || data)!;
  if (!item) return null;
  return (
    <div
      className={cn(
        "group relative bg-card rounded-xl border border-border/50 p-6",
        "transition-all duration-300 ease-out",
        "hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1",
        "hover:border-primary/20",
        className
      )}
    >
      {/* Category badge */}
      <span className="inline-block text-xs font-mono font-medium text-primary bg-primary-light px-3 py-1 rounded-full mb-4">
        {item.category}
      </span>

      {/* Title */}
      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {item.description}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {item.techTags?.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium bg-secondary text-secondary-foreground px-2.5 py-1 rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Outcomes */}
      {item.outcomes && (
        <p className="text-xs text-muted-foreground italic border-t border-border/50 pt-3 mb-4">
          📊 {item.outcomes}
        </p>
      )}

      {/* Links */}
      <div className="flex items-center gap-3">
        {item.liveUrl && (
          <a
            href={item.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-primary hover:underline underline-offset-4"
          >
            Live Demo →
          </a>
        )}
        {item.sourceUrl && (
          <a
            href={item.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            Source Code ↗
          </a>
        )}
      </div>
    </div>
  );
}

export { ProjectCard };
