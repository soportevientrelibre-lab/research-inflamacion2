"use client";

import { useState } from "react";
import Link from "next/link";
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
    <main className="min-h-screen bg-pattern">
      {/* Header */}
      <div className="bg-olive text-cream text-center py-3 px-4">
        <p className="text-sm font-medium">✅ ¡Tu pedido está confirmado! Pero antes de acceder, tienes una oportunidad única…</p>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Headline */}
        <FadeIn>
          <p className="text-olive text-xs font-semibold tracking-widest uppercase text-center mb-3">
            Oferta exclusiva — solo para nuevas clientas
          </p>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy text-center leading-tight mb-3">
            ¿Quieres que el programa <span className="text-coral">se planifique solo?</span>
          </h1>
          <p className="text-navy/60 text-center text-lg max-w-xl mx-auto mb-10">
            El Generador Automatizado de Menús + Protocolo Hormonal Estacional. 3 clics → tu semana entera planificada.
          </p>
        </FadeIn>

        {/* What you get */}
        <FadeIn>
          <div className="glass-card rounded-2xl p-6 mb-8">
            <h3 className="font-heading font-bold text-navy text-lg mb-4">Lo que incluye:</h3>

            <div className="space-y-4">
              {[
                { icon: "⚡", title: "Generador Automatizado de Menús", desc: "3 clics → menú semanal completo + lista de compra + mapa de compatibilidad cíclica + alertas de reintroducción automáticas." },
                { icon: "🌙", title: "Protocolo Hormonal Estacional", desc: "Las 4 fases del ciclo × 4 reglas de alimentación. El puente definitivo ciclo menstrual → digestión femenina." },
                { icon: "🍽️", title: "7 Cenas Anti-Cortisol Nocturnas", desc: "Recetas específicas para cenar después de las 8pm sin elevar cortisol ni glucosa antes de dormir." },
                { icon: "🏖️", title: "Plantilla Vacaciones & Familia", desc: "Cómo planificar comidas en vacaciones, viajes y reuniones familiares sin perder tu protocolo." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                    <p className="text-navy/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Price comparison */}
        <FadeIn>
          <div className="text-center mb-8">
            <p className="text-muted text-sm mb-2">Consulta nutricionista SIBO en España: €150-€250/sesión</p>
            <p className="text-muted text-sm mb-4">Real Plans (versión anglosajona): $99/año</p>
            <div className="inline-flex items-center gap-4">
              <span className="text-navy/30 text-2xl font-bold line-through">€157</span>
              <span className="font-heading text-5xl font-bold text-navy">€87</span>
            </div>
            <p className="text-olive text-sm font-medium mt-1">Pago único · Para siempre · Sin suscripciones</p>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn>
          <div className="text-center mb-6">
            <Link
              href="/thank-you/final"
              id="cta-oto-accept"
              className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-105 glow-coral shadow-lg shadow-coral/20 w-full sm:w-auto justify-center"
            >
              SÍ, LO QUIERO POR €87 →
            </Link>
          </div>
        </FadeIn>

        {/* Guarantee */}
        <FadeIn>
          <div className="rounded-xl p-4 bg-olive/5 border border-olive/15 text-center mb-8">
            <p className="text-navy/60 text-sm">
              🛡️ Misma Garantía 72h — Si no te funciona, te devolvemos todo (incluyendo el upgrade).
            </p>
          </div>
        </FadeIn>

        {/* No thanks */}
        <div className="text-center">
          <button
            onClick={() => setDismissed(true)}
            className="text-navy/30 hover:text-navy/50 text-sm underline transition-colors"
          >
            No gracias, quiero acceder solo con el programa base →
          </button>
        </div>
      </div>
    </main>
  );
}
