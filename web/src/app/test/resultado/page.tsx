"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import {
  calculateQuizResult,
  perfilDescriptions,
  type QuizResult,
  type Perfil,
} from "@/lib/quiz-scoring";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ScoreBar({
  label,
  percentage,
  color,
  isWinner,
  delay,
}: {
  label: string;
  percentage: number;
  color: string;
  isWinner: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="flex items-center gap-3"
    >
      <span
        className={`text-xs font-medium w-24 text-right ${
          isWinner ? "text-navy font-bold" : "text-navy/50"
        }`}
      >
        {label}
      </span>
      <div className="flex-1 h-3 bg-navy/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ delay: delay + 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <span
        className={`text-sm font-bold w-10 ${
          isWinner ? "text-navy" : "text-navy/40"
        }`}
      >
        {percentage}%
      </span>
    </motion.div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for answers in sessionStorage
    const answersStr = sessionStorage.getItem("quiz-answers");
    if (!answersStr) {
      router.push("/test");
      return;
    }

    const answers = JSON.parse(answersStr);

    // Simulate brief analysis animation
    const timer = setTimeout(() => {
      const quizResult = calculateQuizResult(answers);
      setResult(quizResult);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-pattern">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center px-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6 rounded-full border-4 border-olive/20 border-t-olive"
          />
          <h2 className="font-heading text-xl font-bold text-navy mb-2">
            Analizando tus respuestas…
          </h2>
          <p className="text-muted text-sm">
            Identificando tu perfil de inflamación
          </p>
        </motion.div>
      </main>
    );
  }

  if (!result) return null;

  const perfil = perfilDescriptions[result.perfil];
  const perfilColors: Record<Perfil, string> = {
    glucemico: "#E07856",
    hormonal: "#7B68AE",
    "mixto-sibo": "#5C6F47",
  };

  return (
    <main className="min-h-screen bg-pattern">
      {/* Progress - Complete */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-6 py-3">
          <div className="h-1.5 bg-navy/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-olive"
              initial={{ width: "95%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6 }}
            />
          </div>
          <p className="text-xs text-olive font-medium text-center mt-2">
            ✓ Test completado
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Result Header */}
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-6"
            style={{ backgroundColor: perfil.colorLight }}
          >
            {perfil.emoji}
          </motion.div>

          <p className="text-olive text-xs font-semibold tracking-widest uppercase mb-3">
            Tu perfil es
          </p>
          <h1
            className="font-heading text-3xl md:text-4xl font-bold leading-tight mb-2"
            style={{ color: perfil.color }}
          >
            {perfil.title}
          </h1>
          <p className="text-navy/60 text-lg">{perfil.subtitle}</p>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="glass-card rounded-2xl p-6 mb-8"
        >
          <h3 className="text-xs font-semibold text-muted uppercase tracking-widest mb-4">
            Desglose de tu perfil
          </h3>
          <div className="space-y-3">
            <ScoreBar
              label="Glucémico"
              percentage={result.percentages.glucemico}
              color={perfilColors.glucemico}
              isWinner={result.perfil === "glucemico"}
              delay={0.5}
            />
            <ScoreBar
              label="Hormonal"
              percentage={result.percentages.hormonal}
              color={perfilColors.hormonal}
              isWinner={result.perfil === "hormonal"}
              delay={0.6}
            />
            <ScoreBar
              label="Mixto-SIBO"
              percentage={result.percentages.mixto}
              color={perfilColors["mixto-sibo"]}
              isWinner={result.perfil === "mixto-sibo"}
              delay={0.7}
            />
          </div>
        </motion.div>

        {/* Profile Description */}
        <motion.div
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h3 className="font-heading text-xl font-bold text-navy mb-4">
            ¿Qué significa esto para ti?
          </h3>
          <p className="text-navy/70 leading-relaxed mb-6">
            {perfil.description}
          </p>
        </motion.div>

        {/* What RESET 21 does for your profile */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-2xl p-6 mb-8 border-2"
          style={{
            backgroundColor: perfil.colorLight,
            borderColor: `${perfil.color}20`,
          }}
        >
          <h3 className="font-heading text-lg font-bold text-navy mb-4">
            Lo que el RESET 21 va a hacer por ti específicamente:
          </h3>
          <ul className="space-y-4">
            {perfil.bullets.map((bullet, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i * 0.15 }}
                className="flex items-start gap-3"
              >
                <svg
                  className="flex-shrink-0 mt-0.5"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={perfil.color}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17L4 12" />
                </svg>
                <span className="text-navy/80 text-sm leading-relaxed">
                  {bullet}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* CTA */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <Link
            href={`/programa?perfil=${result.perfil}`}
            id="cta-result"
            className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-105 glow-coral shadow-lg shadow-coral/20"
          >
            Ver el programa diseñado para mi perfil →
          </Link>
          <p className="text-muted text-xs mt-4">
            €47 · Acceso inmediato · Garantía 72 horas
          </p>
        </motion.div>

        {/* Divider */}
        <div className="divider-botanical my-12" />

        {/* Social Proof Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-navy/40 text-sm italic mb-2">
            &ldquo;En pocos lados escuchas acerca de la perimenopausia. Es un
            período &#39;perdido&#39; entre el mundo de información. Me siento
            que no soy de aquí ni de allá.&rdquo;
          </p>
          <p className="text-muted text-xs">
            — Comentario en YouTube con 8 likes, mayo 2026
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-navy py-6 text-center mt-12">
        <p className="text-cream/30 text-xs">
          Vientre Libre · RESET 21 © {new Date().getFullYear()} · Programa
          educativo de nutrición funcional · No sustituye el consejo médico
          profesional
        </p>
      </footer>
    </main>
  );
}
