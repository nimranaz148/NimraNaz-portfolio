import type { PortfolioData } from "@/types";

const coreSkillsList = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "GraphQL",
  "AWS",
  "Docker",
];

const experienceItemsList = [
  {
    id: "exp-1",
    company: "Freelance & Client Projects",
    role: "Full-Stack Web Developer",
    type: "freelance" as const,
    startDate: "2024",
    endDate: "Present",
    description: [
      "Designed and deployed production-ready web solutions for clients including Divine Group corporate website",
      "Engineered responsive, accessible frontend architectures using Next.js, React, and Tailwind CSS",
      "Handled domain deployment on Vercel and optimized performance for fast, smooth user experiences",
    ],
    metrics: ["Live Client Work", "Next.js", "Vercel"],
    accentCard: false,
  },
  {
    id: "exp-2",
    company: "Independent AI & Web Building",
    role: "Agentic AI & Full-Stack Builder",
    type: "full-time" as const,
    startDate: "2024",
    endDate: "Present",
    description: [
      "Developing practical full-stack web applications integrating modern AI workflows and automation tools",
      "Built specialized platforms including AI Service Marketplace and PromptVault prompt management system",
      "Active participant in tech hackathons including Physical AI & Humanoid Robotics showcase",
    ],
    metrics: ["AI Marketplace", "PromptVault", "Hackathons"],
    accentCard: true,
  },
  {
    id: "exp-3",
    company: "Panaversity",
    role: "Certified Agentic AI & Full-Stack Development",
    type: "training" as const,
    startDate: "2023",
    endDate: "Present",
    description: [
      "Rigorous hands-on training in Agentic AI, Large Language Models (LLMs), Python, and Prompt Engineering",
      "Mastered modern full-stack web engineering using Next.js App Router, TypeScript, React, and Tailwind CSS",
      "Earned official course certifications and developed real-world AI-integrated projects and hackathon submissions",
    ],
    metrics: ["Panaversity Certified", "Agentic AI", "Next.js"],
    accentCard: false,
    url: "https://panaversity.org/",
  },
  {
    id: "exp-4",
    company: "Sir Syed Government Girls College",
    role: "Intermediate (F.Sc)",
    type: "training" as const,
    startDate: "2022",
    endDate: "2024",
    description: [
      "Completed higher secondary education building strong analytical and mathematical problem-solving foundations",
      "Cultivated dedication to computer technologies, autonomous agents, and software engineering",
    ],
    metrics: ["F.Sc Science", "Analytical Thinking"],
    accentCard: true,
  },
];

export const portfolioData: PortfolioData = {
  // ─── Site Config ────────────────────────────────────────────
  siteConfig: {
    name: "NIMRA Naz",
    author: "NIMRA Naz",
    firstName: "Nimra",
    lastName: "Naz",
    monogram: "NN",
    role: "Full-Stack Developer",
    tagline: "Building digital experiences that matter",
    email: "nimranaz148@gmail.com",
    location: "Karachi, Pakistan",
    socialLinks: [
      { platform: "GitHub", name: "GitHub", url: "https://github.com/nimranaz148", icon: "Github" },
      { platform: "LinkedIn", name: "LinkedIn", url: "https://www.linkedin.com/in/nimra-naz-671ab32b9/", icon: "Linkedin" },
      { platform: "Twitter", name: "Twitter", url: "https://x.com/NazNimranaz148", icon: "Twitter" },
      { platform: "Email", name: "Email", url: "mailto:nimranaz148@gmail.com", icon: "Mail" },
    ],
  },

  // ─── Hero ───────────────────────────────────────────────────
  hero: {
    greeting: "Hello, I'm",
    role: "Full-Stack Developer",
    description: "A passionate full-stack developer crafting high-performance web applications with modern technologies.",
    introLines: [
      "A passionate full-stack developer crafting high-performance",
      "web applications with modern technologies.",
    ],
    primaryCTA: { label: "View Projects", href: "#projects" },
    secondaryCTA: { label: "Contact Me", href: "#contact" },
    coreSkills: coreSkillsList,
    skills: coreSkillsList,
  },

  // ─── About ──────────────────────────────────────────────────
  about: {
    sectionNumber: "01",
    headline: "Crafting Code with Purpose & Precision",
    storyParagraphs: [
      "I'm a full-stack developer with a passion for building modern, scalable web applications. With a background in frontend development and ongoing learning in backend development and Agentic AI, I bring both technical skills and creative thinking to every project.",
      "My journey started with a fascination for how things work on the web. Today, I'm expanding my expertise across React, Next.js, Node.js, Python, databases, and AI technologies — always focusing on building practical and user-friendly applications.",
      "When I'm not coding, you'll find me working on real-world projects, exploring Agentic AI and automation, or learning new technologies to push my skills further and create more intelligent solutions for the web.",
    ],
    personalFacts: [
      { label: "Academics", value: "F.Sc, Sir Syed Govt Girls College" },
      { label: "Certifications", value: "Panaversity Certified (Agentic AI & Web)" },
      { label: "Technology", value: "React, Next.js, Node.js, Python & AI" },
      { label: "Focus", value: "Agentic AI, Automation & AI Applications" },
      { label: "Building", value: "Full-Stack & AI-Powered Applications" },
      { label: "Goal", value: "Growing as an Agentic AI Developer" },
    ],
  },

  // ─── Experience ─────────────────────────────────────────────
  experience: {
    sectionNumber: "02",
    headline: "My Journey & Practical Experience",
    sectionTitle: "My Journey & Practical Experience",
    items: experienceItemsList,
    jobs: experienceItemsList,
  },

  // ─── Projects ───────────────────────────────────────────────
  projects: {
    sectionNumber: "03",
    headline: "Selected Work",
    title: "Selected Work",
    tickerText: "FEATURED PROJECTS • CASE STUDIES • OPEN SOURCE •",
    items: [
      {
        id: "proj-1",
        title: "Divine Group Corporate Website",
        category: "Client Work",
        description:
          "A modern, responsive corporate website built for a local client featuring clean brand aesthetics, interactive services showcase, and structured inquiry workflows.",
        techTags: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
        outcomes: "Deployed live in production with fast load times and clean responsive UI",
        liveUrl: "https://divine-group-website.vercel.app/",
        sourceUrl: "https://github.com/nimranaz148/divine-group-website",
        featured: true,
      },
      {
        id: "proj-2",
        title: "AI Service Marketplace",
        category: "AI & Full-Stack",
        description:
          "A full-stack web marketplace designed to showcase and discover specialized AI services and tools with categorized listings, modern navigation, and responsive layout.",
        techTags: ["React", "Next.js", "TypeScript", "Tailwind CSS", "AI Services"],
        outcomes: "End-to-end marketplace architecture for browsing and ordering AI solutions",
        sourceUrl: "https://github.com/nimranaz148/ai-service-marketplace",
        featured: true,
      },
      {
        id: "proj-3",
        title: "PromptVault — AI Prompt Repository",
        category: "AI & Productivity",
        description:
          "A dedicated repository tool for saving, categorizing, and managing high-quality system prompts and templates for LLMs, Agentic AI agents, and content creators.",
        techTags: ["Next.js", "React", "TypeScript", "Prompt Engineering", "Tailwind"],
        outcomes: "Streamlines prompt management and reusable AI template workflows",
        sourceUrl: "https://github.com/nimranaz148/promptVault",
        featured: true,
      },
      {
        id: "proj-4",
        title: "Doctor Appointment Booking System",
        category: "Web Application",
        description:
          "A healthcare web app facilitating patient scheduling, doctor specialty search, availability check, and intuitive appointment booking interface.",
        techTags: ["React", "Next.js", "TypeScript", "Form Validation", "Tailwind CSS"],
        outcomes: "Intuitive scheduling experience with responsive appointment booking workflows",
        sourceUrl: "https://github.com/nimranaz148/doctor-appoinement-project",
        featured: false,
      },
      {
        id: "proj-5",
        title: "Physical AI & Humanoid Robotics Portal",
        category: "Hackathon Project",
        description:
          "A hackathon project exploring the frontier of Physical AI and humanoid robotics, presenting interactive technical overviews, hardware specs, and autonomous agents.",
        techTags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Robotics & AI"],
        outcomes: "Deployed live hackathon project spotlighting embodied artificial intelligence",
        liveUrl: "https://hackathon-update.vercel.app/",
        sourceUrl: "https://github.com/nimranaz148/hackathon-Physical-AI-Humanoid-Robotics",
        featured: true,
      },
      {
        id: "proj-6",
        title: "Dashboard Live — Analytics Platform",
        category: "SaaS Dashboard",
        description:
          "A modern administrative dashboard featuring real-time metrics, interactive data charts, clean metric summary cards, and responsive sidebar navigation.",
        techTags: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Data Charts"],
        outcomes: "Clean visual data presentation with modern modular dashboard UI",
        sourceUrl: "https://github.com/nimranaz148/dashboard-live",
        featured: false,
      },
    ],
  },

  // ─── Skills ─────────────────────────────────────────────────
  skills: {
    sectionNumber: "04",
    number: "04",
    headline: "Tools & Technologies",
    title: "Tools & Technologies",
    categories: [
      {
        id: "ai",
        name: "Agentic AI",
        title: "Agentic AI",
        description: "Building intelligent agents, LLM integrations, and automated workflows",
        skills: [
          "Agentic AI",
          "Prompt Engineering",
          "OpenAI API",
          "Gemini API",
          "Python",
          "FastAPI",
          "Autonomous Agents",
          "LangChain",
          "AI Automation",
        ],
      },
      {
        id: "frontend",
        name: "Frontend",
        title: "Frontend",
        description: "Building responsive, accessible, and performant user interfaces",
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "GSAP",
          "Framer Motion",
          "HTML5",
          "CSS3",
          "Redux",
          "Zustand",
        ],
      },
      {
        id: "backend",
        name: "Backend",
        title: "Backend",
        description: "Designing scalable APIs and server-side architectures",
        skills: [
          "Node.js",
          "Python",
          "Express",
          "FastAPI",
          "GraphQL",
          "REST APIs",
          "PostgreSQL",
          "MongoDB",
          "Prisma",
        ],
      },
      {
        id: "tools",
        name: "Tools & Workflow",
        title: "Tools & Workflow",
        description: "Productivity tools and deployment workflows",
        skills: [
          "Git",
          "GitHub",
          "VS Code",
          "Vercel",
          "Figma",
          "Postman",
          "Docker",
          "ESLint",
        ],
      },
    ],
  },

  // ─── Achievements ───────────────────────────────────────────
  achievements: {
    sectionNumber: "05",
    headline: "Certifications & Milestones",
    items: [
      {
        id: "ach-1",
        title: "Panaversity Certified in Agentic AI & Web",
        description: "Certified in Applied Generative AI, Agentic AI engineering, and modern Next.js/React full-stack development through Panaversity.",
        type: "certification",
        date: "2024",
        stat: "Certified",
        organization: "Panaversity",
        url: "https://panaversity.org/",
        featured: true,
      },
      {
        id: "ach-2",
        title: "Physical AI & Humanoid Robotics Hackathon",
        description: "Developed and launched an embodied intelligence showcase portal for the Physical AI & Humanoid Robotics Hackathon.",
        type: "competition",
        date: "2024",
        stat: "Hackathon",
        organization: "Hackathon",
      },
      {
        id: "ach-3",
        title: "Divine Group Corporate Website Delivery",
        description: "Engineered and deployed a production corporate web solution for local client Divine Group on Vercel.",
        type: "award",
        date: "2024",
        stat: "Client",
      },
      {
        id: "ach-4",
        title: "Open Source Creator (6+ Projects)",
        description: "Authored and published 6+ full-stack and AI repositories on GitHub including AI Marketplace, PromptVault, and Dashboards.",
        type: "leadership",
        stat: "6+ Repos",
      },
      {
        id: "ach-5",
        title: "Intermediate (F.Sc) Science Graduate",
        description: "Graduated with F.Sc from Sir Syed Government Girls College with core discipline in science and mathematics.",
        type: "fellowship",
        date: "2024",
        stat: "F.Sc",
        organization: "Sir Syed College",
      },
      {
        id: "ach-6",
        title: "AI Prompt Architecture & Vault Creation",
        description: "Designed PromptVault, a dedicated repository for curated system prompts, agent workflows, and LLM templates.",
        type: "publication",
        date: "2024",
        stat: "AI/LLM",
      },
    ],
  },

  // ─── Contact ────────────────────────────────────────────────
  contact: {
    sectionNumber: "06",
    headline: "Let's Work Together",
    subheadline: "Have a project in mind? I'd love to hear about it. Drop me a message and let's create something amazing.",
    socialLinks: [
      { platform: "GitHub", name: "GitHub", url: "https://github.com/nimranaz148", icon: "Github" },
      { platform: "LinkedIn", name: "LinkedIn", url: "https://www.linkedin.com/in/nimra-naz-671ab32b9/", icon: "Linkedin" },
      { platform: "Twitter", name: "Twitter", url: "https://x.com/NazNimranaz148", icon: "Twitter" },
      { platform: "Email", name: "Email", url: "mailto:nimranaz148@gmail.com", icon: "Mail" },
    ],
    socials: {
      github: "https://github.com/nimranaz148",
      linkedin: "https://www.linkedin.com/in/nimra-naz-671ab32b9/",
      twitter: "https://x.com/NazNimranaz148",
      email: "mailto:nimranaz148@gmail.com",
    },
  },

  // ─── Footer ─────────────────────────────────────────────────
  footer: {
    focusAreas: ["Full-Stack Web", "Agentic AI & LLMs", "Next.js & React", "Client & Open Source"],
    statusText: "// AVAILABLE FOR NEW PROJECTS",
    location: "Karachi, Pakistan",
    availability: "Available for projects",
    roleSubtitle: "Full-Stack Developer",
    copyright: `© ${new Date().getFullYear()} NIMRA Naz. All rights reserved.`,
  },
};
