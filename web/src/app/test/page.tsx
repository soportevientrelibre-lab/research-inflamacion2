"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

const testimonials = [
  {
    quote:
      "Estoy harta de la barriga hinchada. Me levanto deshinchada, me tomo mi primer café y ya empiezo a hinchar.",
    source: "Comentario en YouTube — abril 2026",
    likes: 10,
  },
  {
    quote:
      "Tengo 42, ya mi abdomen amanece inflamado. Reglas irregulares, grasa solo abdominal, malestar todo el día.",
    source: "Comentario en video de Doctor Menopausia",
    likes: 7,
  },
  {
    quote:
      "Me miro al espejo y no me reconozco. Como de todo pero en pocas cantidades y hago las 5 comidas como siempre.",
    source: "Comentario en YouTube — mayo 2026",
    likes: 16,
  },
];

const faqs = [
  {
    q: "¿Es gratis?",
    a: "Sí, completamente gratis. Sin tarjeta. Sin truco.",
  },
  {
    q: "¿Cuánto tarda?",
    a: "90 segundos. Son 8 preguntas rápidas con opciones claras.",
  },
  {
    q: "¿Qué recibo al final?",
    a: "Tu perfil de inflamación personalizado: Glucémico, Hormonal o Mixto-SIBO, con una explicación de por qué te pasa lo que te pasa.",
  },
  {
    q: "¿Vais a spamearme?",
    a: "No. Recibirás tu informe personal por email y nada más, a menos que tú lo decidas.",
  },
];

export default function TestLanding() {
  return (
    <main className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-pattern overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-olive/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
          {/* Pre-headline */}
          <motion.p
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-olive font-medium tracking-widest uppercase text-xs md:text-sm mb-6"
          >
            Para mujeres de 35+ que ya comen sano y siguen inflamadas
          </motion.p>

          {/* Headline */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.1] mb-6"
          >
            ¿Tu Ensalada{" "}
            <span className="text-coral relative">
              Te Miente
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
              >
                <path
                  d="M2 6C50 2 150 2 198 6"
                  stroke="#E07856"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>
            ?
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-navy/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Descubre en <strong>90 segundos</strong> si tu inflamación es de
            glucosa, hormonal o mixta — y por qué los alimentos que te dijeron
            que eran sanos podrían ser{" "}
            <strong>tu villano específico.</strong>
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
          >
            <Link
              href="/test/pregunta/1"
              id="cta-hero"
              className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-lg md:text-xl transition-all duration-300 hover:scale-105 glow-coral shadow-lg shadow-coral/20"
            >
              EMPEZAR EL TEST
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M4 10H16M16 10L11 5M16 10L11 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <p className="text-muted text-sm mt-4">
              8 preguntas · 90 segundos · gratis · sin spam
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="bg-white/60 py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-olive font-medium tracking-widest uppercase text-xs mb-3"
          >
            No eres la única
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-heading text-2xl md:text-3xl font-bold text-navy text-center mb-12"
          >
            Esto dicen mujeres como tú en YouTube
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-2xl p-6 hover:shadow-md transition-shadow duration-300"
              >
                <svg
                  className="text-coral/30 mb-3"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.3 2.6C6 5 2.4 9.7 2.4 15.3c0 3.3 2 5.7 4.6 5.7 2.4 0 4.2-1.9 4.2-4.2 0-2.2-1.6-3.9-3.6-4.2.4-3.2 2.8-6.4 5.8-8l-2.1-2zM22.1 2.6c-5.3 2.4-8.9 7.1-8.9 12.7 0 3.3 2 5.7 4.6 5.7 2.4 0 4.2-1.9 4.2-4.2 0-2.2-1.6-3.9-3.6-4.2.4-3.2 2.8-6.4 5.8-8l-2.1-2z" />
                </svg>
                <p className="text-navy/80 text-sm leading-relaxed italic mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{t.source}</span>
                  <span className="flex items-center gap-1">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M14 9V5.5a2.5 2.5 0 00-5 0V9H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2h-4z" />
                    </svg>
                    {t.likes}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-16 md:py-20 bg-pattern">
        <div className="max-w-3xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl md:text-3xl font-bold text-navy text-center mb-12"
          >
            Cómo funciona
          </motion.h2>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Responde 8 preguntas",
                desc: "Sobre tu cuerpo, tus hábitos y cómo te sientes. No hay respuestas correctas ni incorrectas.",
                icon: "📋",
              },
              {
                step: "02",
                title: "Descubre tu perfil",
                desc: "Nuestro algoritmo identifica si tu inflamación es Glucémica, Hormonal o Mixta-SIBO.",
                icon: "🔬",
              },
              {
                step: "03",
                title: "Recibe tu informe personal",
                desc: "Una explicación clara de por qué te pasa lo que te pasa — y qué hacer al respecto.",
                icon: "📊",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start gap-5"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl">
                  {item.icon}
                </div>
                <div>
                  <p className="text-olive text-xs font-semibold tracking-widest uppercase mb-1">
                    Paso {item.step}
                  </p>
                  <h3 className="font-heading text-lg font-bold text-navy mb-1">
                    {item.title}
                  </h3>
                  <p className="text-navy/60 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href="/test/pregunta/1"
              id="cta-how"
              className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-300 hover:scale-105 glow-coral"
            >
              EMPEZAR AHORA →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="py-16 md:py-20 bg-white/60">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-2xl md:text-3xl font-bold text-navy text-center mb-10"
          >
            Preguntas frecuentes
          </motion.h2>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="glass-card rounded-xl group"
              >
                <summary className="px-6 py-4 cursor-pointer text-navy font-semibold flex items-center justify-between list-none">
                  {faq.q}
                  <svg
                    className="w-5 h-5 text-olive transition-transform group-open:rotate-45"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </summary>
                <p className="px-6 pb-4 text-navy/60 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-16 md:py-24 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-4xl font-bold text-cream leading-tight mb-4"
          >
            Descubre por qué comes sano y sigues inflamada
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-cream/60 text-lg mb-8"
          >
            90 segundos. 8 preguntas. Tu respuesta personalizada.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/test/pregunta/1"
              id="cta-final"
              className="inline-flex items-center gap-3 bg-coral hover:bg-coral-light text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all duration-300 hover:scale-105"
            >
              EMPEZAR EL TEST GRATIS →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-navy-light py-6 text-center">
        <p className="text-cream/30 text-xs">
          Vientre Libre · RESET 21 © {new Date().getFullYear()} · Programa
          educativo de nutrición funcional
        </p>
      </footer>
    </main>
  );
}
