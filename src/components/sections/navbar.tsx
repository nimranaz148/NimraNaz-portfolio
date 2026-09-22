"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import MagneticButton from "@/components/ui/magnetic-button";

interface NavbarProps {
  monogram: string;
  activeSection: string;
}

const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Navbar({ monogram, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const navListRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Header entrance
  useGSAP(() => {
    gsap.from(headerRef.current, {
      y: -100,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, { scope: headerRef });

  // Sliding active-section pill (replaces Motion's layoutId)
  useGSAP(() => {
    const activeButton = buttonRefs.current.get(activeSection);
    const nav = navListRef.current;
    const pill = pillRef.current;
    if (!activeButton || !nav || !pill) {
      if (pill) gsap.set(pill, { opacity: 0 });
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const btnRect = activeButton.getBoundingClientRect();

    gsap.to(pill, {
      x: btnRect.left - navRect.left,
      width: btnRect.width,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });
  }, [activeSection]);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Mobile menu open/close animation + focus management
  useGSAP(() => {
    const backdrop = backdropRef.current;
    const panel = panelRef.current;
    if (!backdrop || !panel) return;

    if (mobileMenuOpen) {
      gsap.set([backdrop, panel], { display: "block", pointerEvents: "auto" });
      gsap.set(panel, { display: "flex" });
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" });
      gsap.fromTo(
        panel,
        { x: "100%" },
        {
          x: "0%",
          duration: 0.4,
          ease: "power3.out",
          onComplete: () => {
            const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
            firstFocusable?.focus();
          },
        }
      );
    } else {
      gsap.to(backdrop, { opacity: 0, duration: 0.25, ease: "power2.in" });
      gsap.to(panel, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          gsap.set([backdrop, panel], { display: "none", pointerEvents: "none" });
          toggleButtonRef.current?.focus();
        },
      });
    }
  }, [mobileMenuOpen]);

  // Escape-to-close + focus trap while menu is open
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusables = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      );
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between rounded-full px-4 py-2 transition-all duration-300",
          scrolled ? "glass shadow-xl py-2 w-[95%] md:w-auto" : "glass py-3 w-[95%] md:w-auto",
          "md:px-6"
        )}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold"
          >
            {monogram}
          </button>
        </div>

        {/* Desktop Nav */}
        <nav
          ref={navListRef}
          className="relative hidden md:flex items-center gap-2 ml-8"
          aria-label="Primary"
        >
          <div
            ref={pillRef}
            aria-hidden="true"
            className="absolute inset-y-0 left-0 top-0 h-full rounded-full bg-primary-light opacity-0"
            style={{ willChange: "transform, width" }}
          />
          {navItems.map((item) => (
            <MagneticButton key={item.id}>
              <button
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                }}
                onClick={() => handleScrollTo(item.id)}
                aria-current={activeSection === item.id ? "true" : undefined}
                className={cn(
                  "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </button>
            </MagneticButton>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <button
          ref={toggleButtonRef}
          className="md:hidden flex flex-col items-center justify-center gap-1 h-11 w-11 rounded-full bg-card/50"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
        >
          <div className="h-0.5 w-5 bg-foreground rounded-full" />
          <div className="h-0.5 w-5 bg-foreground rounded-full" />
          <div className="h-0.5 w-5 bg-foreground rounded-full" />
        </button>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        ref={backdropRef}
        onClick={() => setMobileMenuOpen(false)}
        className="fixed inset-0 z-[60] bg-overlay hidden"
        style={{ display: "none" }}
        aria-hidden="true"
      />

      {/* Mobile Menu Panel */}
      <div
        ref={panelRef}
        id="mobile-nav-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed right-0 top-0 bottom-0 z-[70] w-[80vw] max-w-sm bg-card shadow-2xl p-6 hidden flex-col"
        style={{ display: "none", transform: "translateX(100%)" }}
      >
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-border transition-colors"
            aria-label="Close menu"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-2" aria-label="Mobile primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleScrollTo(item.id)}
              aria-current={activeSection === item.id ? "true" : undefined}
              className={cn(
                "flex items-center px-4 py-4 rounded-xl text-left text-lg font-medium transition-colors",
                activeSection === item.id
                  ? "bg-primary-light text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
