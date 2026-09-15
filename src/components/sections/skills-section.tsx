"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
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

  useGSAP(() => {
    // Animate badges stagger when category changes
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
      className="py-24 md:py-32 bg-[#F4F5F7] text-slate-900 overflow-hidden"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <SectionHeading number={data.number || data.sectionNumber || "04"} title={data.title || data.headline || "Skills"} />
        
        <h3 className="font-display text-4xl md:text-5xl font-bold mt-6 mb-16 text-slate-900">
          {data.headline || "Technologies I work with"}
        </h3>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column: Navigation & Bento Grid */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Category Navigation */}
            <div className="flex flex-wrap gap-2 pb-4 border-b border-slate-200">
              {data.categories.map((category) => {
                const isActive = activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={cn(
                      "relative px-5 py-2.5 text-sm font-medium rounded-full transition-colors z-10",
                      isActive ? "text-white" : "text-slate-600 hover:text-slate-900"
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-skill-tab"
                        className="absolute inset-0 bg-[#DC2626] rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    {category.name || category.title}
                  </button>
                );
              })}
            </div>

            {/* Active Spotlight Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`spotlight-${activeCategoryId}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm glass-strong"
              >
                <h4 className="text-xl font-bold mb-3 text-slate-900">
                  {activeCategory?.name || activeCategory?.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {activeCategory?.description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Bento Grid of Skills */}
            <div ref={badgesRef} className="flex flex-wrap gap-3 mt-4">
              {activeCategory?.skills.map((skill, index) => (
                <motion.div
                  key={`${activeCategoryId}-${skill}-${index}`}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="skill-badge bg-white px-4 py-2.5 rounded-lg border border-slate-200 text-sm font-medium text-slate-800 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-default"
                >
                  {skill}
                </motion.div>
              ))}
            </div>

            {/* Animated Ticker for Active Category Skills */}
            <div className="mt-8 pt-8 border-t border-slate-200 overflow-hidden">
              <Ticker text={activeCategory?.skills?.join(" • ") || ""} speed="slow" />
            </div>
          </div>

          {/* Right Column: Character Image (Desktop) */}
          <div className="hidden lg:block lg:w-[400px] xl:w-[450px] flex-shrink-0">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/characters/coding.jpg"
                alt="Coding character illustration"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 450px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
