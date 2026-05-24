"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/sales-components";

export default function ThankYouFinal() {
  return (
    <main className="min-h-screen bg-cream">
      <div className="max-w-2xl mx-auto px-6 py-16 md:py-24">
        {/* ═══ CONFIRMACIÓN VISIBLE ═══ */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
            className="w-24 h-24 rounded-3xl bg-olive/10 flex items-center justify-center text-5xl mx-auto mb-6"
          >
            ✅
          </motion.div>

          <FadeIn>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy leading-tight mb-3">
              Tu RESET 21 está confirmado
            </h1>
            <div className="text-navy/50 text-sm space-y-1 mt-4">
              <p>
                <span className="text-navy/30">Pedido</span>{" "}
                <span className="font-mono text-navy/50">#[ORDER_ID]</span>
              </p>
              <p>
                <span className="text-navy/30">Acceso enviado a</span>{" "}
                <span className="font-medium text-navy/60">[EMAIL_CLIENTE]</span>
              </p>
            </div>
          </FadeIn>
        </div>

        {/* ═══ INSTRUCCIÓN PRINCIPAL ═══ */}
        <FadeIn>
          <div className="bg-white border border-navy/10 rounded-2xl p-6 md:p-8 mb-10 text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
              Revisa tu correo ahora.
            </h2>
            <p className="text-navy/60 leading-relaxed">
              En los próximos 5 minutos recibirás el email de bienvenida con el enlace a tu
              área privada, todos tus entregables descargables y el acceso a los módulos en video.
            </p>
            <p className="text-navy/40 text-sm mt-3">
              Si no lo ves en bandeja de entrada, revisa la carpeta de spam — y márcalo como
              &ldquo;no es spam&rdquo; para que los 21 emails del protocolo no se pierdan.
            </p>
          </div>
        </FadeIn>

        {/* ═══ MAPA DE LOS 21 DÍAS — Timeline ═══ */}
        <FadeIn>
          <div className="mb-10">
            <h3 className="font-heading font-bold text-navy text-lg mb-6 text-center">
              Lo que pasa a partir de ahora:
            </h3>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[23px] top-3 bottom-3 w-px bg-olive/15" />

              <div className="space-y-6">
                {[
                  {
                    time: "Hoy — Primeros 5 minutos",
                    icon: "📧",
                    items: [
                      "Email de bienvenida con enlace a tu área privada",
                      "Acceso a todos los entregables descargables (PDFs + Tracker + Conversor)",
                      "Módulo 1 disponible: La Paradoja Tiene Nombre (15 min)",
                    ],
                  },
                  {
                    time: "Mañana",
                    icon: "▶️",
                    items: [
                      "Empieza el Módulo 1: entiende los 3 sistemas y tus 5 Villanos específicos",
                      "Primera anotación en tu Mapa Personal de la Paradoja",
                    ],
                  },
                  {
                    time: "Día 3",
                    icon: "📊",
                    items: [
                      "Primera entrada en el Tracker Ciclo-Intestinal (AM y PM)",
                      "Ya tienes los datos de los primeros 2 días: empieza el patrón",
                    ],
                  },
                  {
                    time: "Día 7 — Momento de la Garantía",
                    icon: "🛡️",
                    items: [
                      "Al final del día 7, tu vientre debería sentirse diferente que cuando empezaste",
                      "Si no es así, escríbenos \"no funcionó\" — te devolvemos todo",
                    ],
                  },
                  {
                    time: "Día 14",
                    icon: "🌙",
                    items: [
                      "Inicio de la Fase 3: Reintroducción y Mapa Personal",
                      "Aquí empiezas a identificar TUS detonadores específicos (no los de otra persona)",
                    ],
                  },
                  {
                    time: "Día 21 — El activo que no tiras nunca",
                    icon: "🗺️",
                    items: [
                      "Tu Mapa Personal de la Paradoja: completado",
                      "Sabes qué te inflama a ti, qué no, y en qué fase del ciclo eres más sensible",
                      "Ese conocimiento es tuyo de por vida",
                    ],
                  },
                ].map((phase, i) => (
                  <div key={i} className="flex gap-4 relative">
                    <div className="w-12 h-12 rounded-xl bg-white border border-navy/8 flex items-center justify-center text-xl flex-shrink-0 z-10">
                      {phase.icon}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="font-heading font-bold text-navy text-sm mb-2">{phase.time}</p>
                      <ul className="space-y-1.5">
                        {phase.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-navy/60">
                            <span className="text-olive mt-0.5 flex-shrink-0">→</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ═══ CTA — ACCEDER AL PORTAL ═══ */}
        <FadeIn>
          <div className="text-center mb-10">
            <Link
              href="/portal"
              id="cta-access-portal"
              className="inline-flex items-center gap-3 bg-olive hover:bg-olive-dark text-white font-bold px-10 py-5 rounded-2xl text-lg transition-all duration-300 hover:scale-[1.03] glow-olive shadow-lg shadow-olive/20"
            >
              → Acceder a mi área privada
            </Link>
          </div>
        </FadeIn>

        {/* ═══ SOPORTE ═══ */}
        <FadeIn>
          <div className="border border-navy/8 rounded-xl p-4 bg-white text-center mb-10">
            <p className="text-navy/50 text-sm">
              Si tienes cualquier problema de acceso al área privada o con los descargables, escríbenos a:{" "}
              <a
                href="mailto:hola@vientrelibre.com"
                className="text-navy font-medium hover:text-coral transition-colors"
              >
                hola@vientrelibre.com
              </a>
            </p>
            <p className="text-navy/30 text-xs mt-1">
              Respondemos en menos de 24h en días laborables.
            </p>
          </div>
        </FadeIn>

        {/* ═══ CIERRE EMOCIONAL ═══ */}
        <FadeIn>
          <div className="text-center max-w-lg mx-auto mb-12">
            <p className="text-navy/65 text-base md:text-lg leading-relaxed italic">
              Llevas tiempo despertándote con el vientre plano — y acostándote preguntándote
              qué hiciste mal. Hoy es el primer día que tu cuerpo va a recibir una respuesta
              real a lo que lleva años preguntando.
            </p>
            <p className="text-navy/65 text-base leading-relaxed mt-4">
              No otra dieta. No otro recetario.{" "}
              <strong className="text-navy">El mapa de lo que le pasa a tu cuerpo específico.</strong>
            </p>
            <p className="font-heading font-bold text-navy text-xl mt-6">
              Bienvenida al RESET.
            </p>
          </div>
        </FadeIn>

        {/* ═══ SHARE ═══ */}
        <FadeIn>
          <div className="rounded-2xl p-6 bg-coral/5 border border-coral/10 text-center mb-10">
            <p className="text-navy/70 text-sm mb-3">
              ¿Conoces a una amiga que vive inflamada? Comparte el test con ella:
            </p>
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
        </FadeIn>
      </div>

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-navy py-6 text-center">
        <p className="text-cream/15 text-xs">
          Vientre Libre · RESET 21 es un programa educativo. No sustituye el consejo médico profesional.
        </p>
        <p className="text-cream/10 text-xs mt-2">
          © {new Date().getFullYear()} Vientre Libre · Política de privacidad · Términos y condiciones
        </p>
      </footer>
    </main>
  );
}
