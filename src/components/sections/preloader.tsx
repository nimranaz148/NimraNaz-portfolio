"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "motion/react";
import { cn } from "@/lib/utils";

interface PreloaderProps {
  monogram: string;
  role: string;
  onComplete: () => void;
}

export default function Preloader({ monogram, role, onComplete }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const progress = useMotionValue(0);
  const roundedProgress = useTransform(progress, (latest) => Math.round(latest));
  const scaleX = useTransform(progress, [0, 100], [0, 1]);

  useEffect(() => {
    // Animate progress 0 -> 100
    const controls = animate(progress, 100, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
    });

    const timer = setTimeout(() => {
      setIsVisible(false);
      // Wait for exit animation to complete before signaling onComplete
      setTimeout(() => {
        onComplete();
      }, 1000); 
    }, 2500);

    return () => {
      controls.stop();
      clearTimeout(timer);
    };
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F4F5F7] overflow-hidden"
          initial={{ opacity: 1, y: 0 }}
          exit={{ 
            opacity: 0, 
            y: "-100%", 
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
        >
          {/* Floating Light Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/60 rounded-full blur-3xl animate-float" 
              style={{ animationDelay: "0s" }} 
            />
            <div 
              className="absolute top-3/4 left-1/3 w-96 h-96 bg-white/50 rounded-full blur-3xl animate-float" 
              style={{ animationDelay: "1s" }} 
            />
            <div 
              className="absolute top-1/3 right-1/4 w-72 h-72 bg-[#FEF2F2]/70 rounded-full blur-3xl animate-float" 
              style={{ animationDelay: "2s" }} 
            />
            <div 
              className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-white/40 rounded-full blur-3xl animate-float" 
              style={{ animationDelay: "0.5s" }} 
            />
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FEF2F2]/60 rounded-full blur-2xl animate-float" 
              style={{ animationDelay: "1.5s" }} 
            />
          </div>

          {/* System Status Ticker */}
          <div className="absolute top-8 left-8 flex items-center space-x-3 text-xs font-mono text-gray-500 tracking-wider">
            <motion.div 
              className="w-2 h-2 rounded-full bg-[#DC2626]"
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 1.5, ease: "linear" }}
              className="whitespace-nowrap"
            >
              // SYSTEM BOOT SEQUENCE
            </motion.div>
          </div>

          {/* Center Content */}
          <div className="relative z-10 flex flex-col items-center justify-center">
            <motion.h1
              className="font-display text-8xl md:text-9xl text-gray-900 tracking-tighter"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {monogram}
            </motion.h1>
            
            <motion.p
              className="mt-6 text-sm md:text-base text-gray-500 tracking-[0.3em] uppercase"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {role}
            </motion.p>
          </div>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 right-8 text-7xl md:text-9xl font-display font-bold text-gray-200/60 pointer-events-none tabular-nums tracking-tighter">
            <motion.span>{roundedProgress}</motion.span>
            <span className="text-4xl md:text-6xl text-gray-300/40 ml-1">%</span>
          </div>
          
          {/* Progress Bar */}
          <div className="absolute bottom-12 left-8 right-48 md:right-64 h-[2px] bg-gray-200/50 overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-[#DC2626] origin-left"
              style={{ scaleX }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
