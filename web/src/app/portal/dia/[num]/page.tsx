"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { programData, PHASES } from "@/lib/program-data";

const STORAGE_KEY = "vl-completed-days";

function getCompletedDays(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? new Set(JSON.parse(stored) as number[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveCompletedDays(days: Set<number>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...days]));
}

export default function DiaPage() {
  const params = useParams();
  const dayNum = Math.min(21, Math.max(1, parseInt(params.num as string) || 1));
  const dayData = programData[dayNum];
  const phase = PHASES[dayData.phase];

  const [completed, setCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const days = getCompletedDays();
    setCompleted(days.has(dayNum));
  }, [dayNum]);

  function toggleComplete() {
    const days = getCompletedDays();
    if (completed) {
      days.delete(dayNum);
    } else {
      days.add(dayNum);
    }
    saveCompletedDays(days);
    setCompleted(!completed);
  }

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto">
      <Link href="/portal/dashboard" className="text-navy/50 hover:text-navy text-sm flex items-center gap-2 mb-6 transition-colors">
        ← Volver al dashboard
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span
            className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
            style={{ backgroundColor: phase.color + "20", color: phase.color }}
          >
            {phase.label}
          </span>
          {mounted && completed && (
            <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-olive/10 text-olive">
              ✓ Completado
            </span>
          )}
        </div>
        <p className="text-coral text-xs font-bold tracking-widest uppercase mb-2">
          Día {dayNum} de 21 · {dayData.moduleName}
        </p>
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-3">
          {dayData.title}
        </h1>
        <p className="text-navy/60 text-lg leading-relaxed">
          {dayData.subtitle}
        </p>
      </header>

      {/* Video Player Placeholder */}
      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full aspect-video bg-navy rounded-3xl mb-10 overflow-hidden relative shadow-2xl flex items-center justify-center group cursor-pointer"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-navy to-navy-light" />
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-3">
          <div className="w-20 h-20 bg-coral rounded-full flex items-center justify-center text-white text-3xl pl-2 shadow-lg group-hover:scale-110 transition-transform">
            ▶
          </div>
          <p className="text-cream/70 text-sm">Módulo {dayData.module} — {dayData.moduleName}</p>
        </div>
        <div className="absolute bottom-4 right-6 bg-black/60 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-md z-10">
          {dayData.videoDuration}
        </div>
      </motion.section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Action Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-card rounded-3xl p-8 border-t-4 border-olive"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">⚡</span>
            <h2 className="font-heading font-bold text-navy text-xl">Tu acción hoy</h2>
          </div>
          <p className="text-navy/70 leading-relaxed mb-4">
            {dayData.action}
          </p>
          {dayData.actionNote && (
            <p className="text-navy/50 text-sm italic leading-relaxed border-l-2 border-olive/30 pl-3 mb-6">
              {dayData.actionNote}
            </p>
          )}

          {mounted && (
            <button
              onClick={toggleComplete}
              className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                completed
                  ? "bg-olive text-cream"
                  : "bg-olive/10 hover:bg-olive text-olive hover:text-cream"
              }`}
            >
              <span className="text-lg border-2 border-current rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {completed ? "✓" : "○"}
              </span>
              {completed ? "Día completado" : "Marcar como completado"}
            </button>
          )}
        </motion.div>

        {/* Reflection & Resources */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-3xl p-6 bg-coral/5"
          >
            <h3 className="font-heading font-bold text-navy mb-2 flex items-center gap-2">
              <span>✍️</span> Para tu diario
            </h3>
            <p className="text-navy/60 text-sm italic leading-relaxed">
              &quot;{dayData.reflection}&quot;
            </p>
          </motion.div>

          {dayData.downloads.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-3xl p-6"
            >
              <h3 className="font-heading font-bold text-navy mb-4 flex items-center gap-2">
                <span>📎</span> Recursos de hoy
              </h3>
              <div className="space-y-3">
                {dayData.downloads.map((doc, i) => (
                  <Link
                    key={i}
                    href="/portal/descargas"
                    className="flex items-center justify-between p-3 rounded-xl bg-white/50 hover:bg-white transition-colors group"
                  >
                    <span className="text-sm font-medium text-navy/80">{doc}</span>
                    <span className="text-coral group-hover:translate-y-0.5 transition-transform">↓</span>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-12 flex items-center justify-between border-t border-navy/10 pt-6">
        <Link
          href={`/portal/dia/${Math.max(1, dayNum - 1)}`}
          className={`text-navy/50 font-medium ${dayNum <= 1 ? "invisible" : "hover:text-navy transition-colors"}`}
        >
          ← Día anterior
        </Link>
        <span className="text-navy/30 text-sm">
          {dayNum} / 21
        </span>
        <Link
          href={`/portal/dia/${Math.min(21, dayNum + 1)}`}
          className={`text-navy font-bold hover:text-coral transition-colors ${dayNum >= 21 ? "invisible" : ""}`}
        >
          Siguiente día →
        </Link>
      </div>
    </div>
  );
}
