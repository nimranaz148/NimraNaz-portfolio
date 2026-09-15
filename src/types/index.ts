// ─── Site Configuration ─────────────────────────────────────────
export interface SocialLink {
  platform: string;
  name?: string;
  url: string;
  icon: string; // lucide-react icon name or identifier
}

export interface SiteConfig {
  name: string;
  author?: string; // alias for name
  firstName: string;
  lastName: string;
  monogram: string;
  role: string;
  tagline: string;
  email: string;
  location: string;
  socialLinks: SocialLink[];
}

// ─── Hero ───────────────────────────────────────────────────────
export interface HeroData {
  greeting: string;
  introLines: string[];
  description?: string;
  role?: string;
  primaryCTA: { label: string; href: string };
  secondaryCTA: { label: string; href: string };
  coreSkills: string[];
  skills?: string[]; // alias for coreSkills
}

// ─── About ──────────────────────────────────────────────────────
export interface PersonalFact {
  label: string;
  value: string;
}

export interface AboutData {
  sectionNumber: string;
  headline: string;
  storyParagraphs: string[];
  personalFacts: PersonalFact[];
}

// ─── Experience ─────────────────────────────────────────────────
export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: "full-time" | "internship" | "freelance" | "training";
  startDate: string;
  endDate: string;
  description: string[];
  metrics?: string[];
  accentCard?: boolean; // use accent color background
  url?: string;
}

export interface ExperienceData {
  sectionNumber: string;
  headline: string;
  sectionTitle?: string;
  items: ExperienceItem[];
  jobs?: ExperienceItem[]; // alias for items
}

// ─── Projects ───────────────────────────────────────────────────
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  techTags: string[];
  outcomes?: string;
  liveUrl?: string;
  sourceUrl?: string;
  featured?: boolean;
}

export interface ProjectsData {
  sectionNumber: string;
  headline: string;
  title?: string;
  tickerText: string;
  items: ProjectItem[];
}

// ─── Skills ─────────────────────────────────────────────────────
export interface SkillCategory {
  id: string;
  name: string;
  title?: string; // alias for name
  description: string;
  skills: string[];
}

export interface SkillsData {
  sectionNumber: string;
  headline: string;
  number?: string;
  title?: string;
  categories: SkillCategory[];
}

// ─── Achievements ───────────────────────────────────────────────
export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  type: "competition" | "fellowship" | "certification" | "publication" | "award" | "leadership";
  date?: string;
  stat?: string; // e.g. "Top 5%", "1st Place"
  organization?: string;
  featured?: boolean;
  url?: string;
}

export interface AchievementsData {
  sectionNumber: string;
  headline: string;
  items: AchievementItem[];
}

// ─── Contact ────────────────────────────────────────────────────
export interface ContactData {
  sectionNumber: string;
  headline: string;
  subheadline: string;
  socialLinks: SocialLink[];
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

// ─── Footer ─────────────────────────────────────────────────────
export interface FooterData {
  focusAreas: string[];
  statusText: string;
  copyright: string;
  location?: string;
  availability?: string;
  roleSubtitle?: string;
}

// ─── Master Data Object ─────────────────────────────────────────
export interface PortfolioData {
  siteConfig: SiteConfig;
  hero: HeroData;
  about: AboutData;
  experience: ExperienceData;
  projects: ProjectsData;
  skills: SkillsData;
  achievements: AchievementsData;
  contact: ContactData;
  footer: FooterData;
}
