"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import type { AboutData } from "@/types";

interface AboutSectionProps {
  data: AboutData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Floating background elements
    gsap.to(".bg-shape", {
      y: -30,
      rotation: 15,
      duration: 5,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut",
      stagger: {
        each: 2,
        from: "random",
      }
    });

    // Character float
    gsap.to(".character-img", {
      y: -15,
      duration: 3,
      yoyo: true,
      repeat: -1,
      ease: "sine.inOut"
    });

    // Scroll trigger animations
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: ".text-container",
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });

      gsap.from(".fact-card", {
        scrollTrigger: {
          trigger: ".facts-grid",
          start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile
      gsap.from(".reveal-text", {
        scrollTrigger: {
          trigger: ".text-container",
          start: "top 85%",
        },
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out"
      });

      gsap.from(".fact-card", {
        scrollTrigger: {
          trigger: ".facts-grid",
          start: "top 90%",
        },
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="relative py-24 md:py-32 px-6 overflow-hidden bg-[#F4F5F7]"
    >
      {/* Background Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full border border-gray-300 opacity-20 bg-shape pointer-events-none" />
      <div className="absolute bottom-40 right-20 w-24 h-24 rounded-lg border border-gray-300 opacity-20 bg-shape pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-gray-200 opacity-30 bg-shape pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading number={data.sectionNumber || "01"} title="About" />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="md:col-span-7 text-container">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-8 reveal-text">
              {data.headline}
            </h2>
            
            <div className="space-y-6 text-gray-600 text-lg">
              {(data.storyParagraphs || (data as any).story || []).map((paragraph: string, index: number) => (
                <p key={index} className="reveal-text">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="md:col-span-5 relative flex justify-center items-center">
            {/* Ambient Lighting Blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-[#DC2626] opacity-10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="relative w-64 h-64 md:w-80 md:h-80 character-img z-10">
              <Image
                src="/characters/thinking.jpg"
                alt="Character illustration"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Facts Grid */}
        <div className="mt-24 facts-grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(data.personalFacts || (data as any).facts || []).map((fact: any, index: number) => (
              <div 
                key={index} 
                className="fact-card glass p-6 rounded-xl bg-[#FFFFFF] border border-gray-100 shadow-sm"
              >
                <div className="text-xs text-muted-foreground uppercase tracking-wider mb-2 font-semibold">
                  {fact.label}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {fact.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
