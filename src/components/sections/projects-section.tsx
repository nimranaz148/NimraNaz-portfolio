"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import type { ProjectsData } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Ticker } from "@/components/ui/ticker";
import { ProjectCard } from "@/components/ui/project-card";

interface ProjectsSectionProps {
  data: ProjectsData;
}

export default function ProjectsSection({ data }: ProjectsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!gridRef.current) return;
      
      const cards = gsap.utils.toArray(".project-card");
      
      gsap.from(cards, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
    },
    { scope: containerRef }
  );

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative py-24 md:py-32 w-full overflow-hidden bg-background"
    >
      {/* Watermark Typography */}
      <div
        className="absolute top-32 left-1/2 -translate-x-1/2 select-none pointer-events-none z-0"
        aria-hidden="true"
      >
        <span className="text-[20vw] font-display font-bold leading-none text-foreground/5 whitespace-nowrap">
          WORK
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <SectionHeading number={data.sectionNumber || "02"} title={data.title || "Projects"} />

        {data.headline && (
          <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mt-6 mb-16 text-foreground max-w-3xl">
            {data.headline}
          </h3>
        )}

        <div className="flex flex-col lg:flex-row gap-12 items-start mt-12">
          {/* Character Image (Desktop Left) */}
          <div className="hidden lg:block w-1/3 relative shrink-0 sticky top-32">
            <div className="relative aspect-[3/4] w-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-xl border border-card/50">
              <Image
                src="/characters/pointing-right.jpg"
                alt="Illustration of Nimra Naz pointing toward the projects showcased in this section"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 0vw, 33vw"
              />
            </div>
            {data.items && data.items.length > 0 && (
              <div className="mt-6 max-w-sm mx-auto grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-card border border-border p-4 text-center shadow-sm">
                  <div className="font-display text-3xl font-bold text-primary">{data.items.length}+</div>
                  <div className="text-xs text-muted-foreground mt-1">Projects Shipped</div>
                </div>
                <div className="rounded-xl bg-card border border-border p-4 text-center shadow-sm">
                  <div className="font-display text-3xl font-bold text-primary">
                    {new Set(data.items.flatMap((p) => p.techTags || [])).size}+
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">Technologies Used</div>
                </div>
              </div>
            )}
          </div>

          {/* Cards Grid */}
          <div 
            ref={gridRef}
            className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {data.items?.map((project, index) => (
              <div key={project.id || index} className="project-card">
                <ProjectCard data={project} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ticker Banner */}
      {data.tickerText && data.tickerText.length > 0 && (
        <div className="mt-24 md:mt-32 w-full border-y border-foreground/5 bg-card py-8">
          <Ticker text={data.tickerText} />
        </div>
      )}
    </section>
  );
}
