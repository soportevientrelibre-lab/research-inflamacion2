"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/sales-components";

export default function DownsellPage() {
  return (
    <main className="min-h-screen bg-pattern">
      <div className="px-6 py-12 md:py-16">
        <div className="max-w-lg w-full mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 rounded-2xl bg-coral/10 flex items-center justify-center text-3xl mx-auto mb-5"
              >
                ⚡
              </motion.div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy leading-tight mb-3">
                Antes de que cierres, una última cosa rápida…
              </h1>
              <p className="text-navy/60 leading-relaxed">
                Entiendo que el Generador completo no es para todos. Pero esto sí te puede salvar las semanas más difíciles:
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="glass-card rounded-2xl p-6 mb-8">
              <h3 className="font-heading font-bold text-navy text-lg mb-3">
                30 Combinaciones SOS Express
              </h3>
              <p className="text-navy/60 text-sm leading-relaxed mb-4">
                Las 30 combinaciones más rápidas y seguras para cuando no tienes tiempo, energía ni ganas de pensar. Incluye las 12 sustituciones más críticas del Conversor Anti-Villanos.
              </p>

              <ul className="space-y-2 mb-6">
                {[
                  "30 combinaciones listas en menos de 15 min",
                  "12 sustituciones clave (sofrito sin ajo, desayuno sin avena…)",
                  "Semáforo FODMAP incluido en cada una",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-navy/70">
                    <span className="text-olive mt-0.5">✓</span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <span className="text-navy/25 text-xl font-bold line-through">€37</span>
                  <span className="font-heading text-4xl font-bold text-navy">€17</span>
                </div>
                <Link
                  href="/thank-you/final"
                  id="cta-downsell-accept"
                  className="inline-flex items-center justify-center gap-2 bg-olive hover:bg-olive-dark text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:scale-105 w-full"
                >
                  SÍ, QUIERO LAS 30 COMBINACIONES POR €17 →
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="text-center">
              <Link
                href="/thank-you/final"
                className="text-navy/30 hover:text-navy/50 text-sm underline transition-colors"
              >
                No gracias, llevarme directamente al programa →
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </main>
  );
}
