"use client";

import { motion, Variants, useMotionValue, useTransform, animate } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";

// ─── Shared motion variants ──────────────────────────────────────────────────

export const reveal: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const viewportOnce = { once: true, margin: "-80px" };

// ─── FadeIn (generic wrapper) ────────────────────────────────────────────────

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section header ──────────────────────────────────────────────────────────

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "left",
  titleClass = "",
}: {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  titleClass?: string;
}) {
  const alignClass = align === "center" ? "text-center" : "";
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`mb-14 ${alignClass}`}
    >
      {label && (
        <motion.p variants={reveal} className="text-olive text-xs font-semibold tracking-[0.2em] uppercase mb-4">
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={reveal}
        className={`font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy leading-[1.1] ${titleClass}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p variants={reveal} className="text-navy/55 text-lg mt-4 max-w-2xl leading-relaxed">
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// ─── Animated number count-up ────────────────────────────────────────────────

export function AnimatedCounter({
  to,
  suffix = "",
  duration = 2,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration, ease: "easeOut" });
    const unsub = rounded.on("change", setDisplay);
    return () => { controls.stop(); unsub(); };
  }, [inView, to, duration, count, rounded]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

// ─── Large data stat ─────────────────────────────────────────────────────────

export function DataStat({
  value,
  unit = "",
  label,
  animated = true,
}: {
  value: number;
  unit?: string;
  label: string;
  animated?: boolean;
}) {
  return (
    <FadeIn>
      <div className="text-center">
        <div className="font-heading font-bold text-6xl md:text-8xl text-navy leading-none tabular-nums">
          {animated ? <AnimatedCounter to={value} suffix={unit} /> : `${value}${unit}`}
        </div>
        <p className="text-navy/50 text-sm mt-2 tracking-widest uppercase font-medium">{label}</p>
      </div>
    </FadeIn>
  );
}

// ─── Data bar / progress ─────────────────────────────────────────────────────

export function DataBar({
  percentage,
  label,
  sublabel,
}: {
  percentage: number;
  label: string;
  sublabel?: string;
}) {
  return (
    <FadeIn>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-navy">{label}</span>
          <span className="font-bold text-coral tabular-nums">{percentage}%</span>
        </div>
        <div className="h-1.5 bg-navy/8 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral rounded-full"
            style={{ transformOrigin: "left center", width: `${percentage}%` }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>
        {sublabel && <p className="text-navy/40 text-xs">{sublabel}</p>}
      </div>
    </FadeIn>
  );
}

// ─── System block (for the 3 systems) ───────────────────────────────────────

export function SystemBlock({
  num,
  icon,
  title,
  body,
  stat,
  statLabel,
}: {
  num: string;
  icon: string;
  title: string;
  body: string;
  stat?: string;
  statLabel?: string;
}) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative py-16 md:py-24 border-b border-navy/8 last:border-0"
    >
      {/* Watermark number */}
      <span
        className="absolute right-0 top-1/2 -translate-y-1/2 font-heading font-bold select-none pointer-events-none"
        style={{ fontSize: "clamp(120px, 20vw, 220px)", lineHeight: 1, color: "rgba(30,42,58,0.04)" }}
        aria-hidden
      >
        {num}
      </span>

      <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.div variants={reveal} className="flex items-center gap-3 mb-5">
            <span className="text-3xl" aria-hidden="true">{icon}</span>
            <span className="text-olive text-xs font-bold tracking-[0.2em] uppercase">Sistema {num}</span>
          </motion.div>
          <motion.h3 variants={reveal} className="font-heading text-2xl md:text-3xl font-bold text-navy mb-5 leading-tight">
            {title}
          </motion.h3>
          <motion.p variants={reveal} className="text-navy/60 leading-relaxed text-base md:text-lg">
            {body}
          </motion.p>
        </div>

        {stat && (
          <motion.div variants={reveal} className="flex flex-col items-center md:items-end gap-2">
            <div className="font-heading font-bold text-7xl md:text-8xl text-navy/10 tabular-nums leading-none select-none">
              {stat}
            </div>
            <DataBar
              percentage={parseInt(stat)}
              label={statLabel ?? "reducción de inflamación"}
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Quote block ─────────────────────────────────────────────────────────────

export function QuoteBlock({
  quote,
  source,
  likes,
}: {
  quote: string;
  source: string;
  likes?: number;
}) {
  return (
    <FadeIn>
      <blockquote className="border border-coral/15 bg-coral/3 rounded-2xl px-6 py-5 my-8">
        <p className="text-navy/75 italic leading-relaxed text-base md:text-lg">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="mt-3 flex items-center justify-between text-xs text-navy/35 font-medium">
          <span>{source}</span>
          {likes && <span>{likes} <span aria-hidden="true">❤️</span></span>}
        </footer>
      </blockquote>
    </FadeIn>
  );
}

// ─── Sticky bottom bar (mobile) ──────────────────────────────────────────────

export function StickyBar({
  href = "#comprar",
  price = "€47",
  label = "COMPRAR",
  prefix = "🛡️ Garantía 72h ·",
}: {
  href?: string;
  price?: string;
  label?: string;
  prefix?: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy/97 backdrop-blur-md border-t border-cream/8 py-3 px-4 md:hidden">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="text-cream text-xs">
          <span className="text-cream/40">{prefix}</span>{" "}
          <span className="font-bold text-cream">{price} hoy</span>
        </div>
        <Link
          href={href}
          className="bg-coral hover:bg-coral-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coral"
        >
          {label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}

// ─── Stack item ──────────────────────────────────────────────────────────────

export function StackItem({
  icon,
  title,
  description,
  value,
}: {
  icon: string;
  title: string;
  description: string;
  value: string;
}) {
  return (
    <motion.div
      variants={reveal}
      className="flex items-start gap-4 py-5 border-b border-navy/6 last:border-0 group"
    >
      <span className="text-2xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-heading font-bold text-navy text-base leading-tight">{title}</h4>
          {value && (
            <span className="text-olive text-xs font-bold whitespace-nowrap tabular-nums bg-olive/8 px-2 py-0.5 rounded-md">
              {value}
            </span>
          )}
        </div>
        <p className="text-navy/55 text-sm leading-relaxed mt-1">{description}</p>
      </div>
    </motion.div>
  );
}

// ─── CTA block ───────────────────────────────────────────────────────────────

export function CTABlock({
  id,
  label = "SÍ, QUIERO MI RESET 21",
  href = "/checkout",
  subtitle = "Pago seguro · Acceso en 2 min · Sin renovaciones · 🛡️ Garantía 72h",
}: {
  id: string;
  label?: string;
  href?: string;
  subtitle?: string;
}) {
  return (
    <FadeIn className="text-center py-6">
      <Link
        href={href}
        id={id}
        className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-lg md:text-xl transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-coral/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coral"
      >
        <span aria-hidden="true">→</span> {label}
      </Link>
      <p className="text-navy/35 text-xs mt-4 tracking-wide">
        {subtitle}
      </p>
    </FadeIn>
  );
}

// ─── FAQ accordion ───────────────────────────────────────────────────────────

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <FadeIn>
      <details className="group border-b border-navy/8 last:border-0">
        <summary className="py-5 cursor-pointer text-navy font-semibold flex items-center justify-between list-none text-sm md:text-base pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral focus-visible:ring-offset-2 rounded-sm">
          {question}
          <svg
            className="w-4 h-4 text-olive transition-transform duration-300 group-open:rotate-45 flex-shrink-0 ml-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </summary>
        <p className="pb-5 text-navy/55 text-sm leading-relaxed">{answer}</p>
      </details>
    </FadeIn>
  );
}

// ─── Fast action countdown ────────────────────────────────────────────────────

const TIMER_KEY = "vl-fast-action-expiry";
const FAST_ACTION_MINUTES = 15;

export function FastActionCountdown() {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    let expiry = parseInt(localStorage.getItem(TIMER_KEY) || "0", 10);
    if (!expiry || expiry < Date.now()) {
      expiry = Date.now() + FAST_ACTION_MINUTES * 60 * 1000;
      localStorage.setItem(TIMER_KEY, String(expiry));
    }

    function tick() {
      const remaining = Math.max(0, Math.floor((expiry - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining === 0) setExpired(true);
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  if (secondsLeft === null) return null;

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const pad = (n: number) => String(n).padStart(2, "0");

  if (expired) {
    return (
      <span className="inline-flex items-center gap-2 text-xs text-navy/35">
        <span aria-hidden="true">⏱️</span> Bono expirado
      </span>
    );
  }

  return (
    <div className="inline-flex items-center gap-2">
      <span className="text-coral text-xs font-bold uppercase tracking-widest">Expira:</span>
      {[pad(mins), pad(secs)].map((unit, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="bg-coral text-white font-mono font-bold text-base px-2 py-0.5 rounded-md min-w-[2rem] text-center tabular-nums">
            {unit}
          </span>
          {i === 0 && <span className="text-coral font-bold">:</span>}
        </span>
      ))}
    </div>
  );
}
