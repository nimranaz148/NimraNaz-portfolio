"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Mail } from 'lucide-react';
import { Github, Linkedin, Twitter } from '@/components/ui/social-icons';
import type { FooterData, SiteConfig } from '@/types';
import Ticker from '@/components/ui/ticker';

interface FooterProps {
  data: FooterData;
  siteConfig: SiteConfig;
}

const socialIconMap: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5" />,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  email: <Mail className="w-5 h-5" />,
};

export default function Footer({ data, siteConfig }: FooterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });

  const currentYear = new Date().getFullYear();
  const authorName = siteConfig.author || siteConfig.name;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <footer className="relative bg-foreground/[0.03] overflow-hidden pt-12 pb-8">
      {/* Top Ticker */}
      <div className="mb-16 md:mb-24 border-b border-foreground/5 pb-12">
        <Ticker text={data.statusText} />
      </div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-6 md:px-8 max-w-7xl"
      >
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-24">
          {/* Column 1: Focus Areas */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-foreground/80">Focus Areas</h3>
            <ul className="flex flex-col gap-2">
              {data.focusAreas.map((area, index) => (
                <li key={index} className="text-muted-foreground text-sm">
                  {area}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Location & Availability */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-foreground/80">Location</h3>
            <div className="flex flex-col gap-2">
              <p className="text-muted-foreground text-sm">{data.location || siteConfig.location}</p>
              {(data.availability || true) && (
                <div className="inline-flex items-center gap-2 mt-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary w-fit text-xs font-medium border border-primary/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  {data.availability || "Available for projects"}
                </div>
              )}
            </div>
          </motion.div>

          {/* Column 3: Connect */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg text-foreground/80">Connect</h3>
            <ul className="flex flex-col gap-2">
              {siteConfig.socialLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm hover:text-primary transition-colors flex items-center gap-2 w-fit"
                  >
                    {link.name || link.platform}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Large Central Name */}
        <motion.div variants={itemVariants} className="flex flex-col items-center justify-center text-center mb-16 select-none pointer-events-none">
          <h2 className="font-display text-6xl md:text-[10rem] leading-none text-foreground/5 tracking-tighter w-full overflow-hidden whitespace-nowrap">
            {authorName}
          </h2>
          <p className="mt-4 text-foreground/40 font-medium tracking-widest uppercase text-sm md:text-base">
            {data.roleSubtitle || siteConfig.role}
          </p>
        </motion.div>

        {/* Bottom Row */}
        <motion.div variants={itemVariants} className="pt-8 border-t border-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {authorName}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {siteConfig.socialLinks.map((link, index) => {
              const label = link.name || link.platform;
              const iconKey = label.toLowerCase();
              const Icon = socialIconMap[iconKey] || <Github className="w-5 h-5" />;
              
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-full transition-all"
                  aria-label={label}
                >
                  {Icon}
                </a>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
