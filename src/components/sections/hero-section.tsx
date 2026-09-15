"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { Marquee } from "@/components/ui/marquee";
import { MagneticButton } from "@/components/ui/magnetic-button";
import type { SiteConfig, HeroData } from "@/types";
import { cn } from "@/lib/utils";

interface HeroSectionProps {
  siteConfig: SiteConfig;
  hero: HeroData;
}

export default function HeroSection({ siteConfig, hero }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlayingIntro, setIsPlayingIntro] = useState(false);
  
  const mousePosition = useMousePosition();

  const handlePlayIntro = () => {
    if (!videoRef.current) return;
    if (isPlayingIntro) {
      videoRef.current.pause();
      setIsPlayingIntro(false);
    } else {
      videoRef.current.currentTime = 0;
      videoRef.current.play().then(() => {
        setIsPlayingIntro(true);
      }).catch((err) => {
        console.warn("Video play failed:", err);
      });
    }
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Background text animation
      gsap.from(bgTextRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.2
      });

      // Left column stagger
      gsap.from(".hero-anim", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.5
      });

      // Character floating animation
      gsap.to(characterRef.current, {
        y: "-=20",
        duration: 2.5,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Simpler mobile animations
      gsap.from(bgTextRef.current, {
        opacity: 0,
        duration: 1,
        delay: 0.2
      });

      gsap.from(".hero-anim", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
      });
    });

    return () => mm.revert();
  }, { scope: containerRef });

  // Mouse Parallax Effect for Character
  useGSAP(() => {
    if (typeof window === "undefined" || !mousePosition.x || !mousePosition.y) return;
    
    // Convert mouse coordinates to center-based values (-1 to 1)
    const xPos = (mousePosition.x / window.innerWidth - 0.5) * 2;
    const yPos = (mousePosition.y / window.innerHeight - 0.5) * 2;

    gsap.to(characterRef.current, {
      x: xPos * -30,
      rotationY: xPos * 10,
      rotationX: yPos * -10,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto"
    });
  }, [mousePosition.x, mousePosition.y]);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-background pt-24 pb-12 md:py-32"
    >
      {/* Background radial gradient following cursor */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: mousePosition.x && mousePosition.y 
            ? `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(220, 38, 38, 0.05), transparent 80%)`
            : "none"
        }}
      />

      {/* Oversized background typography */}
      <div 
        ref={bgTextRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-0"
      >
        <span className="whitespace-nowrap text-[8rem] md:text-[12rem] lg:text-[16rem] font-display font-black text-foreground/5 leading-none select-none">
          {(siteConfig.author || siteConfig.name).split(' ')[0]}
        </span>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div ref={leftColRef} className="flex flex-col space-y-6 max-w-2xl">
            <div className="space-y-2">
              <p className="hero-anim text-lg md:text-xl font-medium text-primary">
                {hero.greeting || "Hello, I'm"}
              </p>
              <h1 className="hero-anim text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground">
                {siteConfig.author || siteConfig.name}
              </h1>
              <h2 className="hero-anim text-xl md:text-2xl text-muted-foreground font-medium">
                {hero.role || siteConfig.role}
              </h2>
            </div>
            
            <div className="hero-anim space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
              {hero.description || hero.introLines?.join(" ")}
            </div>

            <div className="hero-anim flex flex-wrap gap-4 pt-4 items-center">
              <MagneticButton>
                <a href={hero.primaryCTA?.href || "#projects"} className="inline-block px-8 py-3 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors">
                  {hero.primaryCTA?.label || "View Projects"}
                </a>
              </MagneticButton>
              <MagneticButton>
                <a href={hero.secondaryCTA?.href || "#contact"} className="inline-block px-8 py-3 rounded-full border border-border bg-transparent text-foreground font-medium hover:bg-muted transition-colors">
                  {hero.secondaryCTA?.label || "Contact Me"}
                </a>
              </MagneticButton>
              <MagneticButton>
                <button
                  type="button"
                  onClick={handlePlayIntro}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all shadow-sm cursor-pointer",
                    isPlayingIntro
                      ? "bg-primary text-white ring-2 ring-primary/30"
                      : "border border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:border-primary/50"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full", isPlayingIntro ? "bg-white animate-pulse" : "bg-primary animate-ping")} />
                  <span>{isPlayingIntro ? "Pause Intro" : "▶ Hear Intro (12s)"}</span>
                </button>
              </MagneticButton>
            </div>
          </div>

          {/* Right Column - 3D Character & Interactive Video */}
          <div ref={rightColRef} className="relative h-[400px] md:h-[600px] w-full flex items-center justify-center perspective-[1000px]">
            <div 
              ref={characterRef}
              className="relative w-full max-w-[400px] aspect-[3/4] rounded-xl overflow-hidden glass shadow-2xl group cursor-pointer"
              onClick={handlePlayIntro}
              title={isPlayingIntro ? "Click to pause intro" : "Click to hear Nimra speak"}
            >
              {/* Static Avatar */}
              <Image 
                src="/characters/standing.jpg"
                alt="3D Character"
                fill
                className={cn(
                  "object-cover transition-opacity duration-500",
                  isPlayingIntro ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Video Element (Plays when avatar comes to life) */}
              <video
                ref={videoRef}
                src="/characters/my-intro1.mp4"
                playsInline
                preload="auto"
                onEnded={() => setIsPlayingIntro(false)}
                className={cn(
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 bg-[#E5E7EB]",
                  isPlayingIntro ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
              />

              {/* Floating Pill when not playing */}
              {!isPlayingIntro && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/95 hover:bg-white text-foreground shadow-lg backdrop-blur-md border border-white/70 transition-all group-hover:scale-105 active:scale-95 pointer-events-none">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
                  </span>
                  <span className="text-xs font-semibold tracking-wide text-foreground">
                    Hear Me Speak (12s)
                  </span>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white text-[9px] font-bold">
                    ▶
                  </span>
                </div>
              )}

              {/* Live indicator & Stop button when playing */}
              {isPlayingIntro && (
                <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 text-white backdrop-blur-md text-xs font-medium border border-white/20 shadow-md">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span>Speaking...</span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      videoRef.current?.pause();
                      setIsPlayingIntro(false);
                    }}
                    className="p-1.5 px-2.5 rounded-full bg-black/70 hover:bg-black text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all shadow-md"
                    title="Stop video"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* Marquee Section at bottom */}
      <div className="relative z-10 mt-16 md:mt-24 w-full overflow-hidden">
        <div className="hero-anim opacity-0" style={{ opacity: 1 }}>
          <Marquee items={hero.skills || hero.coreSkills || []} className="py-2" />
          <Marquee items={hero.skills || hero.coreSkills || []} className="py-2" reverse />
        </div>
      </div>
    </section>
  );
}
