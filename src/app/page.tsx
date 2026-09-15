"use client";

import { useState } from "react";
import { portfolioData } from "@/data/portfolio-data";
import { useSectionInView } from "@/hooks/use-section-in-view";
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

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const activeSection = useSectionInView(SECTION_IDS);

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
