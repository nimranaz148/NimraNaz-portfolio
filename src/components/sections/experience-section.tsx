"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import SectionHeading from "@/components/ui/section-heading";
import type { ExperienceData } from "@/types";

interface ExperienceSectionProps {
  data: ExperienceData;
}

export default function ExperienceSection({ data }: ExperienceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useGSAP(
    () => {
      if (!cardsContainerRef.current) return;

      const mm = gsap.matchMedia();

      // Floating character animation (shared)
      gsap.to(".floating-char", {
        y: -15,
        duration: 2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      mm.add("(min-width: 768px)", () => {
        // Desktop: pinned stacked cards
        const cards = cardsRef.current;
        if (cards.length === 0) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        cards.forEach((card, index) => {
          if (index === 0) {
            // First card doesn't come from bottom, just sits there
            // Optional: slight fade/scale as we scroll past it if there were elements after, but we just let it scale when next cards come.
            return;
          }
          
          // Animate previous cards to scale down and translate up slightly
          tl.to(
            cards.slice(0, index),
            {
              scale: () => 1 - 0.05 * index,
              y: () => -20 * index,
              opacity: 1 - (0.15 * index),
              duration: 1,
              ease: "none",
            },
            "start-" + index
          );

          // Animate current card coming from bottom
          tl.fromTo(
            card,
            {
              y: "100%",
            },
            {
              y: "0%",
              duration: 1,
              ease: "none",
            },
            "start-" + index
          );
        });
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: vertical stacking with fade-in on scroll
        const cards = cardsRef.current;
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section 
      id="experience" 
      ref={sectionRef} 
      className="relative bg-[#F4F5F7] py-24 md:py-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading number={data.sectionNumber} title={data.sectionTitle || data.headline} />
        
        <div className="mt-8 md:mt-16 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-6xl font-bold max-w-2xl leading-tight text-gray-900">
            {data.headline}
          </h2>
          <div className="mt-8 md:mt-0 floating-char relative w-32 h-32 md:w-48 md:h-48 flex-shrink-0">
            <Image 
              src="/characters/presenting.jpg"
              alt="Presenting character"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div 
          ref={cardsContainerRef} 
          className="relative w-full flex flex-col gap-6 md:block md:h-[500px]"
        >
          {(data.jobs || data.items || []).map((job, index) => {
            const dateStr = (job as any).dateRange || `${job.startDate} — ${job.endDate}`;
            const descList = (job as any).descriptions || job.description || [];
            return (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={cn(
                "w-full rounded-xl p-6 md:p-10 border shadow-sm flex flex-col justify-between transform origin-top",
                "relative md:absolute md:top-0 md:left-0 md:h-full",
                job.accentCard 
                  ? "bg-[#FEF2F2] border-red-200" 
                  : "bg-white border-gray-200"
              )}
            >
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                      {job.url ? (
                        <a
                          href={job.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors inline-flex items-center gap-2"
                        >
                          {job.company}
                          <span className="text-sm font-normal text-muted-foreground">↗</span>
                        </a>
                      ) : (
                        job.company
                      )}
                    </h3>
                    <div className="flex items-center gap-3 mt-2 flex-wrap">
                      <span className="text-lg font-medium text-gray-800">
                        {job.role}
                      </span>
                      {job.type && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold tracking-wide">
                          {job.type}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-gray-500 font-medium bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100 self-start md:self-auto">
                    {dateStr}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {descList.map((desc: string, i: number) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <span className="mr-3 text-red-500 mt-1.5 flex-shrink-0">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="6" cy="6" r="4" fill="currentColor" />
                        </svg>
                      </span>
                      <span className="leading-relaxed">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {job.metrics && job.metrics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-gray-100/50">
                  {job.metrics.map((metric: string, i: number) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-white rounded-full text-sm font-semibold text-gray-700 shadow-sm border border-gray-100"
                    >
                      {metric}
                    </span>
                  ))}
                </div>
              )}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
