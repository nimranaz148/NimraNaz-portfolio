"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Send, Check, Loader2 } from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/ui/social-icons";
import type { ContactData } from "@/types";
import SectionHeading from "@/components/ui/section-heading";
import Ticker from "@/components/ui/ticker";
import { cn } from "@/lib/utils";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";

interface ContactSectionProps {
  data: ContactData;
}

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "You must agree to be contacted" }),
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactSection({ data }: ContactSectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const socialColRef = useRef<HTMLDivElement>(null);
  const submitContentRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useGSAP(
    () => {
      if (!watermarkRef.current) return;

      gsap.to(watermarkRef.current, {
        y: "20%",
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        formColRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        }
      );

      gsap.fromTo(
        socialColRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 70%" },
        }
      );
    },
    { scope: containerRef }
  );

  // Crossfade the submit button's content on state change (replaces Motion's AnimatePresence)
  useGSAP(
    () => {
      if (!submitContentRef.current) return;
      gsap.fromTo(
        submitContentRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    },
    { dependencies: [isSubmitting, isSuccess], scope: containerRef }
  );

  const onSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 overflow-hidden bg-background"
    >
      <Ticker text={data.headline || "GET IN TOUCH"} />

      <div
        ref={watermarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display font-bold text-foreground/5 whitespace-nowrap pointer-events-none select-none z-0"
        aria-hidden="true"
      >
        GET IN TOUCH
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        <SectionHeading number="04" title="Contact" />

        <div className="mt-16 md:mt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column: Form */}
          <div ref={formColRef}>
            <div className="glass-strong rounded-xl p-6 sm:p-8 md:p-10 bg-card/80 backdrop-blur-md border border-card-foreground/10 shadow-xl">
              <h3 className="font-display text-3xl font-bold text-foreground mb-2">
                Let&apos;s build something great
              </h3>
              <p className="text-muted-foreground mb-8">
                {data.subheadline || "Fill out the form below and I'll get back to you as soon as possible."}
              </p>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-foreground/80"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
                        errors.firstName ? "border-destructive" : "border-border"
                      )}
                      placeholder="John"
                      aria-invalid={!!errors.firstName}
                      aria-describedby={errors.firstName ? "firstName-error" : undefined}
                      {...register("firstName")}
                    />
                    {errors.firstName && (
                      <p id="firstName-error" className="text-sm text-destructive mt-1">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-foreground/80"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={cn(
                        "w-full px-4 py-3 rounded-lg border bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
                        errors.lastName ? "border-destructive" : "border-border"
                      )}
                      placeholder="Naz"
                      aria-invalid={!!errors.lastName}
                      aria-describedby={errors.lastName ? "lastName-error" : undefined}
                      {...register("lastName")}
                    />
                    {errors.lastName && (
                      <p id="lastName-error" className="text-sm text-destructive mt-1">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground/80"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors",
                      errors.email ? "border-destructive" : "border-border"
                    )}
                    placeholder="john@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-sm text-destructive mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground/80"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border bg-card/50 focus:bg-card focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none",
                      errors.message ? "border-destructive" : "border-border"
                    )}
                    placeholder="Tell me about your project..."
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                    {...register("message")}
                  />
                  {errors.message && (
                    <p id="message-error" className="text-sm text-destructive mt-1">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex items-center h-6">
                    <input
                      id="consent"
                      type="checkbox"
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                      {...register("consent")}
                    />
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <label htmlFor="consent" className="font-medium text-foreground/80">
                      I agree to be contacted regarding this inquiry
                    </label>
                    {errors.consent && (
                      <p className="text-destructive mt-1">{errors.consent.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isSuccess}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-4 px-8 rounded-full text-primary-foreground font-medium transition-all duration-300",
                    isSuccess
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-primary hover:bg-primary-hover",
                    (isSubmitting || isSuccess) && "opacity-90 cursor-not-allowed"
                  )}
                >
                  <div ref={submitContentRef} className="flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : isSuccess ? (
                      <>
                        <Check className="w-5 h-5" />
                        <span>Message Sent!</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Social Links & Image */}
          <div ref={socialColRef} className="flex flex-col justify-between h-full">
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-6">
                Connect with me
              </h3>
              <div className="flex flex-wrap gap-4 mb-12">
                <SocialButton
                  href={data.socials?.email || data.socialLinks?.find(s => s.platform.toLowerCase().includes("email"))?.url || "mailto:hello@nimranaz.dev"}
                  icon={<Mail className="w-5 h-5" />}
                  label="Email"
                />
                <SocialButton
                  href={data.socials?.github || data.socialLinks?.find(s => s.platform.toLowerCase().includes("git"))?.url || "https://github.com"}
                  icon={<Github className="w-5 h-5" />}
                  label="GitHub"
                />
                <SocialButton
                  href={data.socials?.linkedin || data.socialLinks?.find(s => s.platform.toLowerCase().includes("link"))?.url || "https://linkedin.com"}
                  icon={<Linkedin className="w-5 h-5" />}
                  label="LinkedIn"
                />
                {(data.socials?.twitter || data.socialLinks?.find(s => s.platform.toLowerCase().includes("twit"))?.url) && (
                  <SocialButton
                    href={data.socials?.twitter || data.socialLinks?.find(s => s.platform.toLowerCase().includes("twit"))!.url}
                    icon={<Twitter className="w-5 h-5" />}
                    label="Twitter"
                  />
                )}
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20 w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Usually replies within 24 hours
              </div>
            </div>

            <div className="relative aspect-square w-full max-w-sm mx-auto lg:mt-auto rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/characters/thumbs-up.jpg"
                alt="Illustration of Nimra Naz giving a thumbs up, welcoming visitors to get in touch"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialButton({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 px-5 py-3 rounded-full bg-card text-foreground/80 hover:text-primary hover:shadow-lg transition-all duration-300 border border-border"
      aria-label={label}
    >
      {icon}
      <span className="font-medium">{label}</span>
    </a>
  );
}
