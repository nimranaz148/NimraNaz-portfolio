"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

interface PreloaderProps {
  monogram: string;
  role: string;
  onComplete: () => void;
}

const PRELOADER_SESSION_KEY = "preloader-shown";

export default function Preloader({ monogram, role, onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const progressNumberRef = useRef<HTMLSpanElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const skippedRef = useRef(false);

  const finish = (skipExit = false) => {
    if (skippedRef.current) return;
    skippedRef.current = true;

    try {
      sessionStorage.setItem(PRELOADER_SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (privacy mode, etc.) — non-fatal
    }

    gsap.killTweensOf([progressNumberRef.current, progressBarRef.current]);

    if (skipExit || !rootRef.current) {
      setIsVisible(false);
      onComplete();
      return;
    }

    gsap.to(rootRef.current, {
      opacity: 0,
      y: "-100%",
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => {
        setIsVisible(false);
        onComplete();
      },
    });
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") finish();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(
    () => {
      const progress = { value: 0 };

      gsap.to(progress, {
        value: 100,
        duration: 2,
        ease: "power3.out",
        onUpdate: () => {
          const rounded = Math.round(progress.value);
          if (progressNumberRef.current) {
            progressNumberRef.current.textContent = String(rounded);
          }
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${progress.value / 100})`;
          }
        },
      });

      gsap.fromTo(
        ".preloader-heading",
        { opacity: 0, scale: 0.85, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
      );

      gsap.fromTo(
        ".preloader-role",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
      );

      gsap.fromTo(
        ".preloader-ticker-text",
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 1.5, ease: "power1.inOut" }
      );

      gsap.to(".preloader-dot", {
        opacity: 0.2,
        repeat: -1,
        yoyo: true,
        duration: 0.75,
        ease: "linear",
      });

      const timer = setTimeout(() => finish(), 2500);
      return () => clearTimeout(timer);
    },
    { scope: rootRef }
  );

  if (!isVisible) return null;

  return (
    <div
      ref={rootRef}
      role="status"
      aria-live="polite"
      aria-label={`Loading ${role} portfolio`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background)] overflow-hidden"
    >
      {/* Floating Light Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-card/60 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-3/4 left-1/3 w-96 h-96 bg-card/50 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-primary-light/70 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-card/40 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary-light/60 rounded-full blur-2xl animate-float"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* System Status Ticker */}
      <div className="absolute top-8 left-8 flex items-center space-x-3 text-xs font-mono text-muted-foreground tracking-wider">
        <div className="preloader-dot w-2 h-2 rounded-full bg-primary" />
        <div className="preloader-ticker-text whitespace-nowrap">{"// SYSTEM BOOT SEQUENCE"}</div>
      </div>

      {/* Skip control */}
      <button
        type="button"
        onClick={() => finish()}
        className="absolute top-8 right-8 z-20 rounded-full border border-border bg-card/70 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground backdrop-blur-md transition-colors hover:bg-card focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
      >
        Skip intro
      </button>

      {/* Center Content */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <h1 className="preloader-heading font-display text-8xl md:text-9xl text-foreground tracking-tighter">
          {monogram}
        </h1>

        <p className="preloader-role mt-6 text-sm md:text-base text-muted-foreground tracking-[0.3em] uppercase">
          {role}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-8 right-8 text-7xl md:text-9xl font-display font-bold text-foreground/10 pointer-events-none tabular-nums tracking-tighter">
        <span ref={progressNumberRef}>0</span>
        <span className="text-4xl md:text-6xl text-foreground/5 ml-1">%</span>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-12 left-8 right-48 md:right-64 h-[2px] bg-border/50 overflow-hidden rounded-full">
        <div ref={progressBarRef} className="h-full bg-primary origin-left" style={{ transform: "scaleX(0)" }} />
      </div>
    </div>
  );
}
