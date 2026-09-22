"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { SkillsData } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Ticker } from "@/components/ui/ticker";

interface SkillsSectionProps {
  data: SkillsData;
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabPillRef = useRef<HTMLDivElement>(null);
  const tabButtonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const spotlightRef = useRef<HTMLParagraphElement>(null);

  // Default to the first category
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    data?.categories?.[0]?.id || ""
  );

  const activeCategory = data?.categories?.find(
    (cat) => cat.id === activeCategoryId
  );

  useGSAP(() => {
    // Section fade in on scroll
    gsap.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      }
    );
  }, { scope: containerRef });

  // Sliding active-tab pill (replaces Motion's layoutId)
  useGSAP(() => {
    const activeButton = tabButtonRefs.current.get(activeCategoryId);
    const tabs = tabsRef.current;
    const pill = tabPillRef.current;
    if (!activeButton || !tabs || !pill) return;

    const tabsRect = tabs.getBoundingClientRect();
    const btnRect = activeButton.getBoundingClientRect();

    gsap.to(pill, {
      x: btnRect.left - tabsRect.left,
      y: btnRect.top - tabsRect.top,
      width: btnRect.width,
      height: btnRect.height,
      opacity: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
    });
  }, [activeCategoryId]);

  // Spotlight crossfade + badge stagger when category changes
  useGSAP(() => {
    if (spotlightRef.current) {
      gsap.fromTo(
        spotlightRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }

    if (!badgesRef.current) return;
    const badges = badgesRef.current.querySelectorAll(".skill-badge");
    if (badges.length === 0) return;

    gsap.fromTo(
      badges,
      { opacity: 0, scale: 0.9, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.5)",
      }
    );
  }, { dependencies: [activeCategoryId], scope: containerRef });

  if (!data || !data.categories || data.categories.length === 0) {
    return null;
  }

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 md:py-32 bg-background text-foreground overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading number={data.number || data.sectionNumber || "04"} title={data.title || data.headline || "Skills"} />

        <h3 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-16 text-foreground">
          {data.headline || "Technologies I work with"}
        </h3>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Navigation & Bento Grid */}
          <div className="flex-1 min-w-0 flex flex-col gap-8 lg:justify-center">
            {/* Category Navigation */}
            <div ref={tabsRef} className="relative flex flex-wrap gap-2 pb-4 border-b border-border">
              <div
                ref={tabPillRef}
                aria-hidden="true"
                className="absolute top-0 left-0 bg-primary rounded-full opacity-0"
                style={{ willChange: "transform, width, height" }}
              />
              {data.categories.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    ref={(el) => {
                      if (el) tabButtonRefs.current.set(category.id, el);
                    }}
                    onClick={() => setActiveCategoryId(category.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors z-10",
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {category.name || category.title}
                  </button>
                );
              })}
            </div>

            {/* Active category subtitle */}
            <p
              key={`spotlight-${activeCategoryId}`}
              ref={spotlightRef}
              className="text-muted-foreground leading-relaxed max-w-xl -mt-2"
            >
              {activeCategory?.description}
            </p>

            {/* Bento Grid of Skills */}
            <div ref={badgesRef} className="flex flex-wrap gap-3 mt-4">
              {activeCategory?.skills.map((skill, index) => (
                <div
                  key={`${activeCategoryId}-${skill}-${index}`}
                  className="skill-badge bg-card px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground shadow-sm transition-all cursor-default hover:shadow-md hover:border-muted-foreground/30 hover:-translate-y-0.5 hover:scale-105"
                >
                  {skill}
                </div>
              ))}
            </div>

            {/* Animated Ticker for Active Category Skills */}
            <div className="mt-8 pt-8 border-t border-border overflow-hidden">
              <Ticker text={activeCategory?.skills?.join(" • ") || ""} speed="slow" />
            </div>
          </div>

          {/* Right Column: Character Image (Desktop) */}
          <div className="hidden lg:block lg:w-[400px] xl:w-[450px] flex-shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-card">
              <Image
                src="/characters/coding.jpg"
                alt="Illustration of Nimra Naz coding at a laptop, representing her technical skill set"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
