"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export function StickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-md border-t border-cream/10 py-3 px-4 md:hidden">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        <div className="text-cream text-xs">
          <span className="text-cream/50">🛡️ Garantía 72h ·</span>{" "}
          <span className="font-bold">€47 hoy</span>
        </div>
        <Link
          href="#comprar"
          className="bg-coral hover:bg-coral-dark text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all"
        >
          COMPRAR →
        </Link>
      </div>
    </div>
  );
}

export function SectionDivider() {
  return <div className="divider-botanical" />;
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function FadeIn({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function QuoteBlock({ quote, source, likes }: { quote: string; source: string; likes?: number }) {
  return (
    <FadeIn>
      <blockquote className="glass-card rounded-2xl p-6 my-8 border-l-4 border-coral/40">
        <p className="text-navy/80 italic leading-relaxed text-sm md:text-base">
          &ldquo;{quote}&rdquo;
        </p>
        <footer className="mt-3 flex items-center justify-between text-xs text-muted">
          <span>— {source}</span>
          {likes && <span>👍 {likes}</span>}
        </footer>
      </blockquote>
    </FadeIn>
  );
}

export function StackItem({ icon, title, description, value }: { icon: string; title: string; description: string; value: string }) {
  return (
    <FadeIn>
      <div className="flex items-start gap-4 py-5 border-b border-navy/5 last:border-0">
        <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-heading font-bold text-navy text-base">{title}</h4>
            <span className="text-olive text-xs font-semibold whitespace-nowrap">{value}</span>
          </div>
          <p className="text-navy/60 text-sm leading-relaxed mt-1">{description}</p>
        </div>
      </div>
    </FadeIn>
  );
}

export function CTABlock({ id, label = "SÍ, QUIERO MI RESET 21" }: { id: string; label?: string }) {
  return (
    <FadeIn className="text-center py-8">
      <Link
        href="#comprar"
        id={id}
        className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-lg md:text-xl transition-all duration-300 hover:scale-105 glow-coral shadow-lg shadow-coral/20"
      >
        → {label}
      </Link>
      <p className="text-muted text-xs mt-3">
        Pago 100% seguro · Acceso inmediato · Tuyo para siempre · Sin renovaciones
      </p>
    </FadeIn>
  );
}

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
      <div className="inline-flex items-center gap-2 bg-navy/10 rounded-xl px-4 py-2 text-sm text-navy/50">
        <span>⏱️</span>
        <span>Bono Fast Action expirado</span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-3">
      <span className="text-coral text-xs font-bold uppercase tracking-widest">Expira en:</span>
      <div className="flex items-center gap-1">
        {[pad(mins), pad(secs)].map((unit, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="bg-coral text-white font-mono font-bold text-lg px-2.5 py-1 rounded-lg min-w-[2.5rem] text-center tabular-nums">
              {unit}
            </span>
            {i === 0 && <span className="text-coral font-bold text-lg">:</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

export function FAQItem({ question, answer }: { question: string; answer: string }) {
  return (
    <FadeIn>
      <details className="glass-card rounded-xl group mb-3">
        <summary className="px-6 py-4 cursor-pointer text-navy font-semibold flex items-center justify-between list-none text-sm md:text-base">
          {question}
          <svg className="w-5 h-5 text-olive transition-transform group-open:rotate-45 flex-shrink-0 ml-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </summary>
        <p className="px-6 pb-4 text-navy/60 text-sm leading-relaxed">{answer}</p>
      </details>
    </FadeIn>
  );
}
