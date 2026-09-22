"use client";

import { useEffect, useState } from "react";
import { portfolioData } from "@/data/portfolio-data";
import { useSectionInView } from "@/hooks/use-section-in-view";
import { ScrollTrigger } from "@/lib/gsap";
import Preloader from "@/components/sections/preloader";
import Navbar from "@/components/sections/navbar";
import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ExperienceSection from "@/components/sections/experience-section";
import ProjectsSection from "@/components/sections/projects-section";
import SkillsSection from "@/components/sections/skills-section";
import AchievementsSection from "@/components/sections/achievements-section";
import ContactSection from "@/components/sections/contact-section";
import Footer from "@/components/sections/footer";

const SECTION_IDS = [
  "about",
  "experience",
  "projects",
  "skills",
  "achievements",
  "contact",
];

const PRELOADER_SESSION_KEY = "preloader-shown";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const activeSection = useSectionInView(SECTION_IDS);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(PRELOADER_SESSION_KEY)) {
        // One-time sync from an external system (sessionStorage) read on mount,
        // not state derived from props/state — safe despite the lint rule's default guidance.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsLoading(false);
      }
    } catch {
      // sessionStorage unavailable — fall back to always showing the preloader once
    }
  }, []);

  // Content mounts after the preloader and images/fonts shift the layout, so
  // ScrollTrigger start positions go stale and later reveals never fire.
  useEffect(() => {
    if (isLoading) return;
    const refresh = () => ScrollTrigger.refresh();
    const timers = [300, 1000, 2500].map((ms) => window.setTimeout(refresh, ms));
    window.addEventListener("load", refresh);
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("load", refresh);
    };
  }, [isLoading]);

  const { siteConfig, hero, about, experience, projects, skills, achievements, contact, footer } =
    portfolioData;

  return (
    <>
      {/* Preloader */}
      {isLoading && (
        <Preloader
          monogram={siteConfig.monogram}
          role={siteConfig.role}
          onComplete={() => setIsLoading(false)}
        />
      )}

      {/* Main content — hidden while preloader is active */}
      {!isLoading && (
        <>
          {/* Floating Navbar */}
          <Navbar monogram={siteConfig.monogram} activeSection={activeSection} />

          {/* Main content area */}
          <main id="main-content">
            {/* 01 — Hero */}
            <HeroSection siteConfig={siteConfig} hero={hero} />

            {/* 02 — About */}
            <AboutSection data={about} />

            {/* 03 — Experience */}
            <ExperienceSection data={experience} />

            {/* 04 — Projects */}
            <ProjectsSection data={projects} />

            {/* 05 — Skills */}
            <SkillsSection data={skills} />

            {/* 06 — Achievements */}
            <AchievementsSection data={achievements} />

            {/* 07 — Contact */}
            <ContactSection data={contact} />
          </main>

          {/* Footer */}
          <Footer data={footer} siteConfig={siteConfig} />
        </>
      )}
    </>
  );
}
