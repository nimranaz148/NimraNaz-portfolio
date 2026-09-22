# UI/UX Audit — NIMRA Naz Portfolio

**Method:** Single-context code review (static analysis of `src/`, plus the bundled Impeccable detector). No live browser/device inspection was performed in this pass — treat spacing/contrast/touch-target numbers as computed from code, not measured on a rendered page. Re-run with a live pass (`$impeccable critique`) for pixel-verified findings.

**Scope:** `src/app`, `src/components`, `src/data`, `src/lib` (Next.js 16 / React 19 single-page portfolio).

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 2/4 | Section headings are non-semantic `<span>`s; heading levels skip h2 in Projects/Skills |
| 2 | Performance | 2/4 | Three animation runtimes loaded together (GSAP + Motion + Lenis) for overlapping jobs |
| 3 | Responsive Design | 3/4 | Solid breakpoint coverage; a couple of touch targets sit right at the 40px line |
| 4 | Theming | 3/4 | Real token system exists but most sections bypass it with hardcoded hex |
| 5 | Implementation Integrity | 3/4 | Detector clean, content is product-specific and real (not boilerplate) |
| **Total** | | **13/20** | **Acceptable — significant work needed, foundation is solid** |

## UX Heuristic Score (Nielsen, Experience-mode surface)

Heuristics 7 (Flexibility/Efficiency) and 10 (Help/Documentation) are marked n/a — expected accelerators and help systems don't apply to a portfolio's primary "read and be persuaded" flow.

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good: preloader progress, active-nav pill, form loading/success states |
| 2 | Match Between System & Real World | 3 | Plain language throughout, no jargon |
| 3 | User Control and Freedom | 2 | Preloader is unskippable (~3.5s forced wait); mobile menu has no Esc-to-close |
| 4 | Consistency and Standards | 2 | Token system bypassed inconsistently; heading semantics inconsistent |
| 5 | Error Prevention | 3 | Zod-validated form, sensible constraints |
| 6 | Recognition Rather Than Recall | 3 | Nav is text-labeled; footer social row is icon-only (has aria-label, no visible text) |
| 8 | Aesthetic and Minimalist Design | 3 | Clean editorial layout, clear focal points |
| 9 | Error Recovery | 3 | Field-level, specific error messages ("First name must be at least 2 characters") |
| **Total** | | **22/32 (69%)** | **Acceptable, bordering Good** |

---

## Priority Issues

### [P1] Preloader forces every visitor through an unskippable ~3.5s wait
- **Location:** `src/components/sections/preloader.tsx:19-38`
- **Category:** UX / User Control and Freedom
- **Impact:** The progress bar runs 2s, holds until 2.5s, then plays a 1s exit animation before `onComplete` fires — with no click-to-skip. Every return visitor pays this tax on every load; there's no `sessionStorage` check to skip it after the first view.
- **Recommendation:** Add a skip affordance (click/tap/Esc), and only show the full preloader on first visit per session.
- **Suggested command:** `$impeccable onboard` (first-run/loading experience is its territory)

### [P1] Section headings aren't real headings, and heading levels skip
- **Location:** `src/components/ui/section-heading.tsx:16-26` renders the "01 — About" label as `<span>` elements, not an `<h2>`. Combine that with `src/components/sections/projects-section.tsx:62` and `src/components/sections/skills-section.tsx:82`, which jump straight to `<h3>` for their headline with no `<h2>` anywhere in that section.
- **Category:** Accessibility (WCAG 1.3.1, 2.4.6) / SEO
- **Impact:** Screen-reader users navigating by heading (a primary VoiceOver/NVDA navigation method) never hear "About", "Experience", "Projects", etc. as landmarks — those numbered labels are invisible to the accessibility tree as headings. The document outline also goes h1 → h2 → h2 → h3 (skip) → h3, which confuses outline-based tools and search engines.
- **Recommendation:** Make `SectionHeading`'s title render as an `<h2>` (visually styled however you like), and demote the large display headlines that currently double as the "real" heading to `<h3>` children of it.
- **Suggested command:** `$impeccable harden`

### [P1] Lenis smooth-scroll ignores `prefers-reduced-motion`
- **Location:** `src/components/providers/smooth-scroll-provider.tsx:9-27` vs. the reduced-motion handling in `src/app/globals.css:150-163`
- **Category:** Accessibility (motion sensitivity)
- **Impact:** `globals.css` correctly disables the CSS-keyframe animations (marquee, float, ticker) under `prefers-reduced-motion`, but Lenis's JS-driven scroll lerp (`duration: 1.2`, `smoothWheel: true`) is untouched by that media query — vestibular-sensitive users who set the OS preference still get inertial, decoupled scrolling on every interaction.
- **Recommendation:** Read `matchMedia("(prefers-reduced-motion: reduce)")` and pass `smoothWheel: false` / a ~0 lerp to `ReactLenis` when it's set (or skip the provider entirely).
- **Suggested command:** `$impeccable harden`

### [P1] Mobile menu has no keyboard escape or focus trap
- **Location:** `src/components/sections/navbar.tsx:105-164`
- **Category:** Accessibility / User Control and Freedom
- **Impact:** The slide-in mobile nav (`AnimatePresence` panel) closes only via mouse click on the backdrop or the X button. There's no `Escape` key handler, no `role="dialog"`/`aria-modal`, and no focus trap or focus return to the toggle button on close — a keyboard-only user who tabs into the open menu can tab out into content behind it.
- **Recommendation:** Add an Escape listener, trap focus while open, set `aria-expanded` on the toggle button, and return focus to the toggle on close.
- **Suggested command:** `$impeccable harden`

### [P2] Design tokens exist but most sections bypass them
- **Location:** Every section hardcodes `bg-[#F4F5F7]` instead of the `bg-background` token that already maps to the same value (`about-section.tsx:104`, `experience-section.tsx:115`, `projects-section.tsx:46`, `skills-section.tsx:77`, `contact-section.tsx:86`). `navbar.tsx:63,77-78,83` uses Tailwind's stock `bg-red-600`/`text-red-600`/`bg-red-50` instead of `bg-primary`/`text-primary`/`bg-primary-light`. `preloader.tsx` inlines raw hex (`#DC2626`, `#F4F5F7`) in multiple places.
- **Category:** Theming / Consistency and Standards
- **Impact:** A real `--primary`/`--background` token system was built (`globals.css:1-24`) but roughly two-thirds of the surface area doesn't use it. A future rebrand or dark-mode pass means hunting down hex literals across 8 files instead of editing one CSS variable — the token system is currently decorative, not load-bearing.
- **Recommendation:** Sweep hardcoded `#DC2626`/`#F4F5F7`/`red-600`/`red-50` to the equivalent `primary`/`background`/`primary-light` token classes.
- **Suggested command:** `$impeccable extract` (pull the drifted literals back into the token system), then `$impeccable document`

### [P2] Decorative character images use generic, near-duplicate alt text
- **Location:** `hero-section.tsx:202` (`alt="3D Character"`), `about-section.tsx:138` (`alt="Character illustration"`), `projects-section.tsx:73` (`alt="Character pointing at projects"`), `skills-section.tsx:157` (`alt="Coding character illustration"`), `contact-section.tsx:336` (`alt="Character giving a thumbs up"`), `experience-section.tsx:126` (`alt="Presenting character"`)
- **Category:** Accessibility
- **Impact:** These are purely decorative brand-mascot illustrations that repeat down the page. Screen-reader users hear six near-identical "character" announcements that add no information, when the honest choice is either `alt=""` (decorative, skip) or one genuinely descriptive alt per distinct pose if they're meant to carry meaning.
- **Recommendation:** Mark them `alt=""` if decorative (they visually are — no `<figcaption>` or surrounding text depends on them), or write real descriptions if you want them announced.
- **Suggested command:** `$impeccable clarify`

### [P2] Hero avatar card isn't keyboard-operable
- **Location:** `hero-section.tsx:193-197` — `onClick={handlePlayIntro}` on a plain `<div>` with `cursor-pointer`, no `role`, `tabIndex`, or key handler.
- **Category:** Accessibility
- **Impact:** Mitigated by the fact that the adjacent "▶ Hear Intro" button (`hero-section.tsx:173-187`) does the same thing and *is* keyboard-accessible — but the big, visually primary click target (the avatar itself) silently does nothing for keyboard/switch users, which reads as a broken affordance once they notice it's clickable for mouse users.
- **Recommendation:** Add `role="button"`, `tabIndex={0}`, and an Enter/Space key handler to the avatar card, or drop the `cursor-pointer`/`onClick` from it and rely solely on the explicit button.
- **Suggested command:** `$impeccable harden`

### [P3] Two touch targets sit at exactly 40px, under the 44px guideline
- **Location:** `navbar.tsx:63` (monogram/logo button, `h-10 w-10`) and `navbar.tsx:95` (mobile menu toggle, `h-10 w-10`)
- **Category:** Responsive / Touch targets
- **Impact:** 40×40px is close but under Apple/WCAG's 44×44pt guidance, and both sit in a fixed floating pill where mis-taps are easy to make one-handed.
- **Recommendation:** Bump to `h-11 w-11` (44px) or pad the tap area beyond the visible circle with invisible hit-slop.
- **Suggested command:** `$impeccable adapt`

### [P3] Three animation runtimes loaded for overlapping jobs
- **Location:** `package.json:12-24` — `gsap` + `@gsap/react`, `motion` (Framer Motion), and `lenis` are all present; every section file uses at least two of the three.
- **Category:** Performance
- **Impact:** GSAP (ScrollTrigger-driven reveals), Motion (mobile menu, form states, footer stagger), and Lenis (scroll smoothing) each ship their own runtime and overlapping tweening logic. Not wrong, but it's real bundle weight for a portfolio's first-load JS, and `html.scroll-smooth` (`layout.tsx:52`) plus Lenis smoothing running simultaneously is a second, unrelated redundancy.
- **Recommendation:** Standardize scroll-triggered reveals on one library (GSAP already owns most of them); reserve Motion for component-state transitions it's already doing well (menu, form). Drop the CSS `scroll-smooth` class since Lenis owns scroll behavior.
- **Suggested command:** `$impeccable optimize`

### [P3] Several project cards show only "Source Code," no live demo
- **Location:** `src/data/portfolio-data.ts` — of the projects listed, several (e.g. lines ~169, ~180, ~203, ~226) define `sourceUrl` but no `liveUrl`, so `ProjectCard`'s `item.liveUrl &&` guard (`project-card.tsx:65`) silently hides the "Live Demo →" link.
- **Category:** Content / Persuade credibility
- **Impact:** On a portfolio, "prove it works" beats "read the code" for most visitors. A card with only a GitHub link reads as unfinished or abandoned next to cards that do have live demos.
- **Recommendation:** Either deploy/host the remaining projects and add `liveUrl`, or add a small "In development" / "Code sample" badge so the missing link reads as intentional, not incomplete.
- **Suggested command:** `$impeccable clarify`

---

## Patterns & Systemic Issues

- **Hardcoded color literals recur in 8+ files** despite a working CSS-variable token system — this is the single highest-leverage fix, since it currently blocks any future theme change (dark mode, rebrand) from being a one-file edit.
- **Decorative image alt text is templated but not meaningful** across all six character illustrations — same root cause, same fix, applied once.
- **Motion is applied per-library by convenience, not by rule** — GSAP for scroll-triggered reveals, Motion for state-driven UI, Lenis for scroll feel, with no documented boundary between them. Fine today; will get harder to extend consistently as more sections are added.

## Positive Findings

- **The contact form is a model of the "error prevention + recovery" heuristics**: Zod schema validation, `aria-invalid`/`aria-describedby` wired correctly, field-level messages that name the actual problem ("First name must be at least 2 characters," not "Invalid input"). This is the strongest piece of the whole implementation.
- **`prefers-reduced-motion` is handled at the CSS layer** (`globals.css:150-163`) — most portfolios skip this entirely; it's just incomplete because it doesn't reach the JS-driven Lenis scroll (see P1 above).
- **Content is real, not placeholder** — actual GitHub repos, real deployed URLs, specific outcomes/metrics per job in the Experience section. The detector scan found zero boilerplate/generic-content flags, and manual review confirms the copy is product-specific throughout.
- **Responsive breakpoint discipline is consistent** — every section uses GSAP `matchMedia` or Tailwind breakpoints to genuinely simplify (not just shrink) the mobile layout, e.g. Experience's pinned-stack desktop animation correctly degrades to a simple fade-in list on mobile rather than trying to force the desktop interaction onto touch.

---

## Recommended Actions

1. **[P1] `$impeccable onboard`** — redesign the preloader to be skippable and session-aware.
2. **[P1] `$impeccable harden`** — fix heading semantics (real `<h2>`s in `SectionHeading`), wire `prefers-reduced-motion` into the Lenis provider, and add keyboard support/focus trapping to the mobile menu.
3. **[P2] `$impeccable extract`** — sweep hardcoded hex/Tailwind-stock colors back onto the existing `primary`/`background`/`primary-light` tokens.
4. **[P2] `$impeccable clarify`** — fix decorative alt text and address the missing-live-demo project cards.
5. **[P2] `$impeccable harden`** — make the hero avatar keyboard-operable (or remove its redundant click handler).
6. **[P3] `$impeccable adapt`** — bump the two 40px nav touch targets to 44px.
7. **[P3] `$impeccable optimize`** — consolidate animation-library responsibilities and drop the redundant `scroll-smooth` class.
8. **`$impeccable polish`** — final pass once the above land.

You can ask me to run these one at a time, all at once, or in any order you prefer.
Re-run this audit after fixes to see the score improve.
