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
    
    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: leftCardsRef.current,
        start: 'top 80%',
      }
    });

    // Featured card entrance
    gsap.from('.featured-card', {
      x: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.featured-card',
        start: 'top 80%',
      }
    });

    // Character image entrance
    gsap.from('.achievement-image', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.featured-card',
        start: 'top 80%',
      }
    });
  }, { scope: containerRef });

  const getBadgeStyle = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('competition')) return 'bg-blue-100 text-blue-800 border-blue-200';
    if (t.includes('fellowship')) return 'bg-purple-100 text-purple-800 border-purple-200';
    if (t.includes('certification')) return 'bg-green-100 text-green-800 border-green-200';
    if (t.includes('publication')) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (t.includes('award')) return 'bg-[#FEF2F2] text-[#DC2626] border-[#DC2626]/20'; // Primary/crimson
    if (t.includes('leadership')) return 'bg-teal-100 text-teal-800 border-teal-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const list: AchievementItem[] = (data as any).achievements || data.items || [];
  const featured = list.find((a) => a.featured) || list[0];
  const regular = list.filter((a) => a !== featured);

  return (
    <section id="achievements" className="py-24 md:py-32 bg-[#F4F5F7] overflow-hidden relative" ref={containerRef}>
      <Ticker text="ACHIEVEMENTS • AWARDS • PUBLICATIONS • " speed="normal" />
      
      <div className="container mx-auto px-4 mt-20 max-w-7xl">
        <SectionHeading number={data.sectionNumber || "05"} title="Achievements" />
        
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-16 text-gray-900 max-w-3xl">
          {data.headline || "Recognitions & Milestones"}
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile: Featured card at top, Desktop: Right side sticky */}
          <div className="w-full lg:w-[35%] lg:order-last relative">
            <div className="lg:sticky lg:top-32">
              {featured && (
              <div className="featured-card rounded-xl bg-[#DC2626] text-white p-8 shadow-xl relative overflow-hidden">
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    Featured Highlight
                  </div>
                  
                  {featured.stat && (
                    <div className="text-6xl md:text-7xl font-display font-bold mb-4 tracking-tighter">
                      {featured.stat}
                    </div>
                  )}
                  
                  <h3 className="text-2xl font-bold mb-4">{featured.title}</h3>
                  <p className="text-red-50 text-base mb-8 opacity-90 leading-relaxed">
                    {featured.description}
                  </p>
                  
                  <div className="flex justify-between items-center pt-6 border-t border-white/20">
                    {featured.url ? (
                      <a
                        href={featured.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold underline underline-offset-4 hover:text-white/80 transition-colors inline-flex items-center gap-1"
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
                  alt="Celebrating achievements"
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
                  className="achievement-card rounded-xl bg-white p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 duration-300 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-6 gap-2">
                    <span className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full border whitespace-nowrap",
                      getBadgeStyle(achievement.type)
                    )}>
                      {achievement.type.charAt(0).toUpperCase() + achievement.type.slice(1)}
                    </span>
                    <span className="text-sm font-medium text-gray-500 whitespace-nowrap">{achievement.date}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                  <p className="text-gray-600 text-sm flex-grow mb-6 leading-relaxed">{achievement.description}</p>
                  
                  {achievement.organization && (
                    <div className="text-sm font-medium text-gray-800 pt-4 border-t border-gray-100 mt-auto">
                      {achievement.url ? (
                        <a
                          href={achievement.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#DC2626] transition-colors inline-flex items-center gap-1"
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
