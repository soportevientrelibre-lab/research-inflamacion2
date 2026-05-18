"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { programData, PHASES } from "@/lib/program-data";

const STORAGE_KEY = "vl-completed-days";
const START_KEY = "vl-program-start";

function getCompletedDays(): Set<number> {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored) as number[]) : new Set();
  } catch {
    return new Set();
  }
}

function getCurrentDay(completedDays: Set<number>): number {
  // The current day is the next incomplete day, capped at 21
  for (let d = 1; d <= 21; d++) {
    if (!completedDays.has(d)) return d;
  }
  return 21;
}

export default function DashboardPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    const days = getCompletedDays();
    setCompletedDays(days);

    // Record program start date if not set
    if (!localStorage.getItem(START_KEY)) {
      localStorage.setItem(START_KEY, new Date().toISOString());
    }
  }, []);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setEmail(user.email ?? "");
    }
    getUser();
  }, [supabase]);

  const currentDay = mounted ? getCurrentDay(completedDays) : 1;
  const totalCompleted = completedDays.size;
  const progress = Math.round((totalCompleted / 21) * 100);
  const todayData = programData[currentDay];
  const phase = PHASES[todayData.phase];

  const dayBlocks = Array.from({ length: 21 }, (_, i) => i + 1);

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-2">
          Hola{email ? `, ${email.split("@")[0]}` : ""}.
        </h1>
        <p className="text-navy/60 text-lg">
          {totalCompleted === 0
            ? "Bienvenida al protocolo. Empieza cuando estés lista."
            : totalCompleted === 21
            ? "Completaste el protocolo. Tu Mapa Personal es tuyo para siempre."
            : `Llevas ${totalCompleted} de 21 días completados.`}
        </p>
      </header>

      {/* Progress Bar */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-navy">Progreso del protocolo</span>
            <span className="text-sm font-bold text-olive">{progress}%</span>
          </div>
          <div className="h-2 bg-cream-dark rounded-full overflow-hidden mb-4">
            <div
              className="h-full progress-bar-fill rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex flex-wrap gap-1.5">
            {dayBlocks.map((d) => {
              const isCompleted = completedDays.has(d);
              const isCurrent = d === currentDay && !isCompleted;
              return (
                <Link
                  key={d}
                  href={`/portal/dia/${d}`}
                  title={`Día ${d}: ${programData[d].title}`}
                  className={`w-7 h-7 rounded-md text-xs font-bold flex items-center justify-center transition-all hover:scale-110 ${
                    isCompleted
                      ? "bg-olive text-cream"
                      : isCurrent
                      ? "bg-coral text-white ring-2 ring-coral ring-offset-1"
                      : "bg-cream-dark text-navy/30 hover:bg-olive/20"
                  }`}
                >
                  {isCompleted ? "✓" : d}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Main Action Card */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-3xl p-6 md:p-8 border-l-8 shadow-xl mb-10 bg-white/70 relative overflow-hidden"
        style={{ borderLeftColor: phase.color }}
      >
        <div className="absolute -right-10 -top-10 text-9xl opacity-5">🎯</div>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: phase.color + "20", color: phase.color }}
          >
            {phase.label}
          </span>
        </div>
        <p className="text-coral text-xs font-bold tracking-widest uppercase mb-2">
          {totalCompleted === 21 ? "Protocolo completado" : `Tu acción de hoy — Día ${currentDay}`}
        </p>
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-3">
          {todayData.title}
        </h2>
        <p className="text-navy/70 leading-relaxed mb-6 max-w-2xl text-sm md:text-base">
          {todayData.subtitle}
        </p>

        <Link
          href={`/portal/dia/${currentDay}`}
          className="inline-flex items-center gap-3 bg-navy hover:bg-navy-light text-cream font-bold px-8 py-4 rounded-xl text-sm transition-all"
        >
          ▶️ {totalCompleted === 0 ? "Empezar el Día 1" : `Continuar — Día ${currentDay}`}
        </Link>
      </motion.section>

      {/* Secondary Cards Grid */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-2xl p-6 hover:border-olive/30 transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-olive/10 text-olive flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            📚
          </div>
          <h3 className="font-heading font-bold text-navy text-lg mb-2">Módulos Base</h3>
          <p className="text-navy/60 text-sm mb-4">Los 4 módulos en video para entender el protocolo completo.</p>
          <Link href="/portal/modulo" className="text-olive text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Ver módulos →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card rounded-2xl p-6 hover:border-coral/30 transition-colors group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-lg bg-coral/10 text-coral flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            📥
          </div>
          <h3 className="font-heading font-bold text-navy text-lg mb-2">Descargas</h3>
          <p className="text-navy/60 text-sm mb-4">Entregables, trackers y listas de supermercado.</p>
          <Link href="/portal/descargas" className="text-coral text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Ver descargas →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card rounded-2xl p-6 hover:border-navy/20 transition-colors group cursor-pointer bg-white/40"
        >
          <div className="w-10 h-10 rounded-lg bg-navy/5 text-navy flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition-transform">
            🎧
          </div>
          <h3 className="font-heading font-bold text-navy text-lg mb-2">Audios S.O.S</h3>
          <p className="text-navy/60 text-sm mb-4">5 audios para los momentos donde sientes que vas a abandonar.</p>
          <Link href="/portal/audios" className="text-navy text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
            Escuchar ahora →
          </Link>
        </motion.div>
      </section>

      <footer className="text-center p-6 border-t border-navy/5">
        <p className="text-navy/40 text-sm">
          ¿Te perdiste un día? No pasa nada. El metabolismo no es lineal. Retoma desde donde lo dejaste.
        </p>
      </footer>
    </div>
  );
}
