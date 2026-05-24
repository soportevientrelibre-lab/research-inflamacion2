"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/sales-components";

export default function DownsellPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Mobile sticky */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy/97 backdrop-blur-md border-t border-cream/8 py-3 px-4 md:hidden">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="text-cream text-xs">
            <span className="text-cream/40">30 Combinaciones SOS ·</span>{" "}
            <span className="font-bold text-cream">€17</span>
          </div>
          <a
            href="#cta-downsell"
            className="bg-olive hover:bg-olive-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            Añadir →
          </a>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-12 md:py-16 pb-24 md:pb-16">
        {/* ═══ HEADLINE — comprensión, no drama ═══ */}
        <FadeIn>
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-navy leading-tight mb-6 text-center">
            De acuerdo. El Generador es una herramienta potente — y tiene sentido empezar con lo esencial.
          </h1>
        </FadeIn>

        {/* ═══ CUERPO — Reframe ═══ */}
        <FadeIn>
          <div className="space-y-4 text-navy/70 leading-relaxed mb-10">
            <p>
              Hay una sola cosa que quiero dejarte antes de que pases a tu área privada.
            </p>
            <p>
              No es el Generador. Es algo más pequeño, más concreto, y pensado para un
              momento muy específico que casi todas las clientas del RESET 21 mencionan en
              algún punto de las semanas 2 y 3:
            </p>
            <p className="font-heading font-bold text-navy text-xl text-center py-2">
              El día caótico.
            </p>
            <p>
              El miércoles por la noche donde llegas tarde, la nevera está a medias, tienes
              el cerebro frito después del trabajo, y lo único que quieres es que alguien te
              diga exactamente qué poner en el plato sin pensar. Sin calcular. Sin recordar
              si los garbanzos están dentro o fuera del protocolo esta semana.
            </p>
            <p>
              Para ese día existe el <strong className="text-navy">SOS Express</strong>.
            </p>
          </div>
        </FadeIn>

        {/* ═══ OFERTA ═══ */}
        <FadeIn>
          <div className="bg-white border border-navy/8 rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="font-heading font-bold text-navy text-xl mb-2">
              30 Combinaciones SOS Express
            </h3>
            <p className="text-navy/50 text-sm mb-5 leading-relaxed">
              Treinta combinaciones listas para cuando no hay tiempo de pensar. No son las
              21 combinaciones del core (esas son tu menú base). Estas son las de emergencia:
            </p>

            <ul className="space-y-3 mb-6">
              {[
                "Las 12 sustituciones más críticas del Conversor Anti-Villanos, condensadas en una sola referencia",
                "Comidas armadas en 10 minutos con ingredientes que ya tienes en la nevera o la despensa",
                "Sin picos de glucosa. Sin villanos ocultos. Sin cálculos de fase del ciclo",
                "Formato tarjeta: buscas el ingrediente que tienes, te dice qué hacer",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-navy/70">
                  <span className="text-olive mt-0.5 flex-shrink-0">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-navy/45 text-xs italic leading-relaxed mb-6">
              No es el Generador. No te va a armar la semana entera ni sincronizar con tu ciclo.
              Pero <strong className="text-navy/60">sí te salva los días donde todo falla</strong> — que
              son los días donde la mayoría abandona un protocolo.
            </p>

            {/* Precio con ancla */}
            <div className="text-center mb-6">
              <div className="flex items-end justify-center gap-3 mb-1">
                <span className="text-navy/20 text-xl font-bold line-through tabular-nums">€37</span>
                <span className="font-heading font-bold text-5xl text-navy tabular-nums leading-none">
                  €17
                </span>
              </div>
              <p className="text-navy/40 text-xs italic">
                No es el Generador. Es la red de seguridad para los días donde todo se complica.
              </p>
            </div>

            {/* CTA primario */}
            <div id="cta-downsell">
              <Link
                href="/thank-you/final"
                id="cta-downsell-accept"
                className="flex items-center justify-center gap-2 bg-olive hover:bg-olive-dark text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:scale-[1.02] w-full"
              >
                ✅ Sí — añadir SOS Express a mi RESET 21 por €17
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* ═══ CTA secundario — sin presión ═══ */}
        <FadeIn>
          <div className="text-center">
            <Link
              href="/thank-you/final"
              className="text-navy/30 hover:text-navy/50 text-sm transition-colors"
            >
              No, ir directo a mi RESET 21
            </Link>
          </div>
        </FadeIn>

        {/* ═══ DISCLAIMER ═══ */}
        <p className="text-navy/20 text-xs text-center italic mt-12">
          *Resultados individuales pueden variar. Este protocolo no reemplaza diagnóstico médico.
        </p>
      </div>
    </main>
  );
}
