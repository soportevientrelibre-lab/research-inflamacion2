"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/sales-components";

export default function OTOPage() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    if (typeof window !== "undefined") {
      window.location.assign("/thank-you/downsell");
    }
    return null;
  }

  return (
    <main className="min-h-screen bg-cream">
      {/* Mobile sticky */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-navy/97 backdrop-blur-md border-t border-cream/8 py-3 px-4 md:hidden">
        <div className="flex items-center justify-between max-w-lg mx-auto">
          <div className="text-cream text-xs">
            <span className="text-cream/40">El Generador ·</span>{" "}
            <span className="font-bold text-cream">Solo en este momento · €87</span>
          </div>
          <a
            href="#cta-oto"
            className="bg-coral hover:bg-coral-dark text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all"
          >
            Añadir →
          </a>
        </div>
      </div>

      {/* Header confirmation */}
      <div className="bg-olive text-cream text-center py-3.5 px-4 border-b border-olive-dark/20">
        <p className="text-sm font-medium">
          ✅ Tu RESET 21 está confirmado — antes de acceder a tu área privada…
        </p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12 md:py-16 pb-24 md:pb-16">
        {/* ═══ PRE-HEADLINE ═══ */}
        <FadeIn>
          <p className="text-olive text-xs font-semibold tracking-[0.15em] uppercase text-center mb-4">
            Antes de que accedas a tu área privada
          </p>
        </FadeIn>

        {/* ═══ HEADLINE ═══ */}
        <FadeIn>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center leading-tight mb-10">
            Tu RESET 21 está confirmado. Y hoy puedes añadir lo que hace que{" "}
            <span className="text-coral">el reset dure.</span>
          </h1>
        </FadeIn>

        {/* ═══ CUERPO — Ancla científica ═══ */}
        <FadeIn>
          <div className="bg-white border border-navy/8 rounded-2xl p-6 md:p-8 mb-10">
            <p className="text-navy/70 leading-relaxed mb-4">
              Hay una investigación de la Universidad de Londres que cambia la manera en que
              entendemos el hábito alimentario.
            </p>
            <p className="text-navy/70 leading-relaxed mb-4">
              Phillippa Lally y su equipo estudiaron cuánto tiempo tarda un comportamiento en
              volverse automático — en que el cerebro lo ejecute sin esfuerzo consciente. No son
              los 21 días que el mito popular repite desde los años 60.{" "}
              <strong className="text-navy">Son 66 días de media.</strong> Y en algunos patrones
              alimentarios complejos, hasta 84.
            </p>
            <p className="text-navy/70 leading-relaxed mb-4">
              ¿Qué significa para ti?
            </p>
            <p className="text-navy/70 leading-relaxed mb-4">
              Que el RESET 21 hace exactamente lo que promete:{" "}
              <strong className="text-navy">reordena los 3 sistemas en 21 días.</strong> Ese es su
              trabajo. El orden glucémico, el reset hormonal, el mapa personal — todo eso ocurre
              en los 21 días. Lo has empezado ya.
            </p>
            <p className="text-navy/70 leading-relaxed">
              Pero entre el día 21 y el día 66 hay un período que casi nadie cubre: el período
              donde el cuerpo ya sabe qué necesita, pero el cerebro todavía no lo ejecuta en
              automático. La semana donde tienes la lista de la compra en blanco y vuelves al
              patrón antiguo. La tarde de domingo donde no sabes qué preparar para los próximos
              5 días.
            </p>
          </div>
        </FadeIn>

        {/* ═══ SOLUCIÓN ═══ */}
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-olive text-xs font-bold tracking-[0.15em] uppercase mb-3">
              El puente entre el reset y la consolidación
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">
              El Generador Automatizado de Menús
            </h2>
            <p className="text-navy/50 text-sm italic">
              No es un extra. Es el puente entre el reset y la consolidación.
            </p>
          </div>
        </FadeIn>

        {/* ═══ STACK / TABLA DE VALOR ═══ */}
        <FadeIn>
          <div className="bg-white border border-navy/8 rounded-2xl overflow-hidden mb-10">
            {[
              {
                icon: "⚡",
                title: "El Generador Automatizado de Menús (Notion)",
                desc: "3 clics → menú semanal completo + lista de compra + mapa de compatibilidad cíclica + alertas de reintroducción automáticas.",
                value: "€110",
              },
              {
                icon: "🌙",
                title: "Protocolo Hormonal Estacional",
                desc: "Las 4 fases del ciclo × 4 reglas de alimentación. El puente definitivo entre ciclo menstrual y digestión femenina. Nadie en español tiene esto.",
                value: "€47",
              },
              {
                icon: "🍽️",
                title: "BONO OTO 1 — 7 Cenas Anti-Cortisol Nocturnas",
                desc: "Cenar tarde sin elevar cortisol ni glucosa antes de dormir. Para las noches donde comes a las 21:00 y no quieres amanecer inflamada.",
                value: "€27",
              },
              {
                icon: "🏖️",
                title: "BONO OTO 2 — Plantilla Lista de Comidas Vacaciones",
                desc: "Cómo mantener el protocolo en vacaciones, hoteles, comidas de familia. La versión offline del Generador.",
                value: "€17",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-5 py-4 border-b border-navy/5 last:border-0"
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-navy text-sm leading-tight">{item.title}</h4>
                  <p className="text-navy/50 text-xs leading-relaxed mt-1">{item.desc}</p>
                </div>
                <span className="text-olive/70 text-xs font-medium whitespace-nowrap tabular-nums">
                  {item.value}
                </span>
              </div>
            ))}

            {/* Total */}
            <div className="flex items-center justify-between px-5 py-4 bg-navy/3 border-t border-navy/8">
              <span className="font-heading font-bold text-navy text-sm">VALOR TOTAL</span>
              <span className="font-heading font-bold text-navy/25 text-lg line-through tabular-nums">
                €201
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ═══ PRECIO ═══ */}
        <FadeIn>
          <div className="text-center mb-10">
            <p className="text-navy/40 text-xs uppercase tracking-widest mb-2">
              Hoy, una sola vez
            </p>
            <div className="flex items-end justify-center gap-3 mb-2">
              <span className="text-navy/20 text-3xl font-bold line-through tabular-nums">€201</span>
              <span className="font-heading font-bold text-6xl md:text-7xl text-navy tabular-nums leading-none">
                €87
              </span>
            </div>
            <p className="text-olive text-sm font-medium">
              Pago único · Para siempre · Sin suscripciones
            </p>
          </div>
        </FadeIn>

        {/* ═══ GARANTÍA OTO ═══ */}
        <FadeIn>
          <div className="border-2 border-olive/15 rounded-2xl p-5 md:p-6 bg-white mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xl">🛡️</span>
              <h3 className="font-heading font-bold text-navy text-base">
                La garantía cubre también este bloque
              </h3>
            </div>
            <p className="text-navy/60 text-sm leading-relaxed">
              Si después de la semana 2 del protocolo no notas diferencia en la automatización
              de tu menú semanal — si sigues tardando tanto tiempo en decidir qué comer como
              antes de tener el Generador — te devolvemos estos €87 adicionales. Sin preguntas.
              Sin cuestionarios.
            </p>
          </div>
        </FadeIn>

        {/* ═══ RAZÓN DE URGENCIA ═══ */}
        <FadeIn>
          <div className="border border-navy/8 rounded-xl p-4 bg-cream-dark/50 mb-10">
            <p className="text-navy/50 text-sm leading-relaxed text-center">
              Esta oferta solo aparece en este momento, antes de acceder a tu área privada.
              Si entras al portal sin añadirla,{" "}
              <strong className="text-navy/70">
                El Generador Automatizado está disponible por €127.
              </strong>
            </p>
          </div>
        </FadeIn>

        {/* ═══ CTA DUAL ═══ */}
        <div id="cta-oto" className="text-center mb-8">
          <FadeIn>
            <Link
              href="/thank-you/final"
              id="cta-oto-accept"
              className="inline-flex items-center justify-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-[1.02] glow-coral shadow-lg shadow-coral/20 w-full sm:w-auto"
            >
              ✅ Sí — añadir El Generador a mi RESET 21 por €87
            </Link>
          </FadeIn>
        </div>

        <div className="text-center">
          <button
            onClick={() => setDismissed(true)}
            className="text-navy/30 hover:text-navy/50 text-sm transition-colors"
          >
            No gracias, voy a empezar solo con mi RESET 21
          </button>
        </div>

        {/* ═══ DISCLAIMER ═══ */}
        <p className="text-navy/20 text-xs text-center italic mt-12">
          *Resultados individuales pueden variar. Este protocolo no reemplaza diagnóstico médico.
        </p>
      </div>
    </main>
  );
}
