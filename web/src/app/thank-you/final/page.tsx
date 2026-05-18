"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/sales-components";

export default function ThankYouFinal() {
  return (
    <main className="min-h-screen bg-pattern">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* Confetti-like celebration */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
            className="w-24 h-24 rounded-3xl bg-olive/10 flex items-center justify-center text-5xl mx-auto mb-6"
          >
            🎉
          </motion.div>

          <FadeIn>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight mb-3">
              ¡Tu pedido está confirmado!
            </h1>
            <p className="text-navy/60 text-lg">
              En 2 minutos recibes el acceso completo por email.
            </p>
          </FadeIn>
        </div>

        {/* What happens next */}
        <FadeIn delay={0.15}>
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <h3 className="font-heading font-bold text-navy text-lg mb-5">Próximos pasos:</h3>
            <div className="space-y-5">
              {[
                { step: "1", icon: "📧", title: "Revisa tu email", desc: "Recibirás un email de Hotmart con tu acceso en los próximos 2 minutos. Revisa spam si no lo ves.", time: "Ahora" },
                { step: "2", icon: "🔑", title: "Accede al portal", desc: "Haz clic en el enlace del email o usa el botón de abajo para entrar directamente al programa.", time: "2 min" },
                { step: "3", icon: "▶️", title: "Mira el Módulo 1", desc: "Empieza por 'La Paradoja Tiene Nombre' (15 min). Cuando termines, sabrás exactamente qué está pasando en tu cuerpo.", time: "15 min" },
                { step: "4", icon: "🍽️", title: "Aplica desde mañana", desc: "El Módulo 2 te da el protocolo del Desinflama Rápido. Primer cambio visible entre el día 5 y 7.", time: "Mañana" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-olive/10 flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-navy text-sm">{item.title}</h4>
                      <span className="text-olive text-xs font-medium">{item.time}</span>
                    </div>
                    <p className="text-navy/55 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Access Button */}
        <FadeIn delay={0.25}>
          <div className="text-center mb-10">
            <Link
              href="/portal"
              id="cta-access-portal"
              className="inline-flex items-center gap-3 bg-olive hover:bg-olive-dark text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-105 glow-olive shadow-lg shadow-olive/20"
            >
              Acceder al programa →
            </Link>
          </div>
        </FadeIn>

        {/* Share */}
        <FadeIn delay={0.3}>
          <div className="rounded-2xl p-6 bg-coral/5 border border-coral/10 text-center">
            <p className="text-navy/70 text-sm mb-3">
              ¿Conoces a una amiga que vive inflamada? Comparte el test con ella:
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  if (typeof navigator !== "undefined") {
                    navigator.clipboard.writeText("https://vientrelibre.com/test?ref=amiga");
                  }
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-cream-dark text-navy font-medium px-5 py-2.5 rounded-xl text-sm transition-all border border-navy/10"
              >
                📋 Copiar enlace del test
              </button>
            </div>
            <p className="text-muted text-xs mt-2">
              Con el código AMIGA10 ella tiene un 10% de descuento
            </p>
          </div>
        </FadeIn>

        {/* Guarantee reminder */}
        <FadeIn delay={0.35}>
          <div className="mt-8 text-center">
            <p className="text-navy/30 text-xs">
              🛡️ Recuerda: tienes la Garantía Alivio 72 horas. Si en 3 días tu ropa no te aprieta menos, te devolvemos todo.
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Footer */}
      <footer className="bg-navy py-6 text-center">
        <p className="text-cream/25 text-xs">
          Vientre Libre · RESET 21 © {new Date().getFullYear()} · ¿Necesitas ayuda? hola@vientrelibre.com
        </p>
      </footer>
    </main>
  );
}
