"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import type { AchievementsData, AchievementItem } from "@/types";
import { SectionHeading } from "@/components/ui/section-heading";
import { Ticker } from "@/components/ui/ticker";

interface AchievementsSectionProps {
  data: AchievementsData;
}

export default function AchievementsSection({ data }: AchievementsSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCardsRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    // Stagger cards entrance
    const cards = gsap.utils.toArray('.achievement-card', containerRef.current);
    
    (cards as HTMLElement[]).forEach((card, i) => {
      gsap.from(card, {
        y: 40,
        opacity: 0,
        duration: 0.4,
        delay: (i % 2) * 0.08,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 92%',
          once: true,
        }
      });
    });

    // Featured card entrance
    gsap.from('.featured-card', {
      x: 30,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.featured-card',
        start: 'top 85%',
      }
    });

    // Character image entrance
    gsap.from('.achievement-image', {
      y: 20,
      opacity: 0,
      duration: 0.4,
      delay: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.featured-card',
        start: 'top 85%',
      }
    });
  }, { scope: containerRef });

  const getBadgeStyle = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('competition')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (t.includes('fellowship')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (t.includes('certification')) return 'bg-green-100 text-green-800 border-green-200';
    if (t.includes('publication')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (t.includes('award')) return 'bg-primary-light text-primary border-primary/20';
    if (t.includes('leadership')) return 'bg-teal-100 text-teal-800 border-teal-200';
    return 'bg-muted text-muted-foreground border-border';
  };

  const list: AchievementItem[] = (data as any).achievements || data.items || [];
  const featured = list.find((a) => a.featured) || list[0];
  const regular = list.filter((a) => a !== featured);

  return (
    <section id="achievements" className="py-24 md:py-32 bg-background overflow-hidden relative" ref={containerRef}>
      <Ticker text="ACHIEVEMENTS • AWARDS • PUBLICATIONS • " speed="normal" />

      <div className="container mx-auto px-4 mt-10 max-w-7xl">
        <SectionHeading number={data.sectionNumber || "05"} title="Achievements" />

        <h3 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-foreground max-w-3xl">
          {data.headline || "Recognitions & Milestones"}
        </h3>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile: Featured card at top, Desktop: Right side sticky */}
          <div className="w-full lg:w-[35%] lg:order-last relative">
            <div className="lg:sticky lg:top-32">
              {featured && (
              <div className="featured-card rounded-xl bg-primary text-primary-foreground p-8 shadow-xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-primary-foreground/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-primary-foreground/20">
                    <span className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></span>
                    Featured Highlight
                  </div>

                  {featured.stat && (
                    <div className="text-6xl md:text-7xl font-display font-bold mb-4 tracking-tighter">
                      {featured.stat}
                    </div>
                  )}

                  <h4 className="text-2xl font-bold mb-4">{featured.title}</h4>
                  <p className="text-primary-foreground/90 text-base mb-8 leading-relaxed">
                    {featured.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-primary-foreground/20">
                    {featured.url ? (
                      <a
                        href={featured.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold underline underline-offset-4 hover:text-primary-foreground/80 transition-colors inline-flex items-center gap-1"
                      >
                        {featured.organization || "Milestone"} ↗
                      </a>
                    ) : (
                      <span className="text-sm font-medium">{(featured as any).organization || "Milestone"}</span>
                    )}
                    <span className="text-sm font-medium opacity-80">{featured.date}</span>
                  </div>
                </div>
              </div>
              )}
              
              <div className="mt-8 relative h-64 w-full hidden lg:block rounded-xl overflow-hidden shadow-md achievement-image">
                <Image
                  src="/characters/celebrating.jpg"
                  alt="Illustration of Nimra Naz celebrating her achievements and awards"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* Left Side - Grid of Cards */}
          <div className="w-full lg:w-[65%]" ref={leftCardsRef}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {regular.map((achievement, i) => (
                <div
                  key={i}
                  className="achievement-card rounded-xl bg-card p-6 md:p-8 border border-border shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-6 gap-2">
                    <span className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap",
                      getBadgeStyle(achievement.type)
                    )}>
                      {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">{achievement.date}</span>
                  </div>

                  <h4 className="text-xl font-bold text-foreground mb-3">{achievement.title}</h4>
                  <p className="text-muted-foreground text-sm flex-grow mb-6 leading-relaxed">{achievement.description}</p>

                  {achievement.organization && (
                    <div className="text-sm font-medium text-foreground/80 pt-4 border-t border-border mt-auto">
                      {achievement.url ? (
                        <a
                          href={achievement.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          {achievement.organization} ↗
                        </a>
                      ) : (
                        achievement.organization
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
