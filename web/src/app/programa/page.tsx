"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { perfilDescriptions, type Perfil } from "@/lib/quiz-scoring";
import {
  StickyBar,
  FadeIn,
  QuoteBlock,
  StackItem,
  CTABlock,
  FAQItem,
  FastActionCountdown,
  SystemBlock,
  SectionHeader,
  DataStat,
  DataBar,
  stagger,
  reveal,
  viewportOnce,
} from "@/components/sales-components";

// ─── Scroll indicator ────────────────────────────────────────────────────────

function ScrollIndicator() {
  return (
    <motion.div
      aria-hidden="true"
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span className="text-navy/25 text-xs tracking-[0.2em] uppercase font-medium">scroll</span>
      <motion.div
        className="w-px h-10 bg-gradient-to-b from-navy/20 to-transparent"
        animate={{ scaleY: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}

// ─── Hero data stats ─────────────────────────────────────────────────────────

function HeroStats() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      transition={{ delayChildren: 0.9 }}
      className="flex items-end justify-center gap-0 mt-14"
    >
      {/* Número dominante — 73% lleva el peso visual */}
      <motion.div variants={reveal} className="text-left pr-8 sm:pr-12 border-r border-navy/10">
        <div className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl text-navy tabular-nums leading-none">
          73<span className="text-2xl md:text-3xl text-coral font-semibold">%</span>
        </div>
        <p className="text-navy/50 text-xs mt-2.5 max-w-[140px] leading-snug">
          reducción de picos de glucosa con orden biológico correcto
        </p>
        <p className="text-navy/20 text-[10px] mt-1.5 uppercase tracking-widest font-medium">Estudio Stanford</p>
      </motion.div>

      {/* Stats secundarios — peso visual reducido, sin competir */}
      <motion.div variants={reveal} className="flex flex-col gap-6 pl-8 sm:pl-12">
        <div>
          <div className="font-heading font-bold text-3xl text-navy/30 tabular-nums leading-none">21</div>
          <p className="text-navy/35 text-xs mt-1 uppercase tracking-widest">días · 3 fases</p>
        </div>
        <div className="border-t border-navy/8 pt-5">
          <div className="font-heading font-bold text-3xl text-navy/30 tabular-nums leading-none">3</div>
          <p className="text-navy/30 text-xs mt-1 leading-snug">sistemas<br className="hidden sm:block" />en paralelo</p>
          <p className="text-navy/20 text-[10px] mt-1 uppercase tracking-wider">glucosa · hormonas · microbiota</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Pain timeline ───────────────────────────────────────────────────────────

function PainTimeline() {
  const moments = [
    { time: "7:00", state: "Vientre plano. Te pones lo que quieres.", good: true },
    { time: "8:30", state: "Overnight de avena. Desayuno perfecto.", good: true },
    { time: "11:30", state: "Primera presión. El pantalón empieza.", good: false },
    { time: "14:00", state: "El pantalón aprieta. Ya no quieres salir.", good: false },
    { time: "16:00", state: "No te levantas de la silla en la oficina.", good: false },
    { time: "19:00", state: "El espejo. Un cuerpo que no reconoces.", good: false },
  ];

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className="relative"
    >
      {/* Vertical line */}
      <div className="absolute left-[52px] md:left-[68px] top-0 bottom-0 w-px bg-navy/8" />

      {moments.map((m, i) => (
        <motion.div
          key={i}
          variants={reveal}
          className="flex items-start gap-5 md:gap-8 mb-7 last:mb-0 relative"
        >
          {/* Time */}
          <span className="w-16 md:w-20 text-right text-xs font-mono text-navy/35 pt-0.5 flex-shrink-0">
            {m.time}
          </span>
          {/* Dot */}
          <div
            className={`w-3 h-3 rounded-full flex-shrink-0 mt-0.5 ring-4 ring-white z-10 ${
              m.good ? "bg-olive" : "bg-coral"
            }`}
          />
          {/* Text */}
          <p className={`text-sm leading-relaxed ${m.good ? "text-navy/55" : "text-navy/80 font-medium"}`}>
            {m.state}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ─── Main sales content ───────────────────────────────────────────────────────

function SalesContent() {
  const searchParams = useSearchParams();
  const perfil = (searchParams.get("perfil") as Perfil) || null;
  const info = perfil ? perfilDescriptions[perfil] : null;

  return (
    <main className="min-h-screen pb-20 md:pb-0 bg-cream">
      <StickyBar />

      {/* ══════════════════════════════════════════
          HERO — Primer impacto
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-cream px-6 py-24 overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(224,120,86,0.07),transparent)]" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Kicker — v1.1 CAMBIO 1: establece categoría desde la primera línea */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-olive text-xs font-bold tracking-[0.2em] uppercase mb-8 max-w-lg mx-auto"
          >
            No es un recetario. No es una dieta de eliminación. Es el primer método en español que reordena los 3 sistemas que te inflaman después de los 35.
          </motion.p>

          {/* Perfil badge */}
          {info && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
              style={{ backgroundColor: info.colorLight, color: info.color }}
            >
              {info.emoji} Personalizado para ti — Perfil {info.title}
            </motion.div>
          )}

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-navy leading-[1.05] mb-6"
          >
            Te despiertas con<br className="hidden sm:block" />{" "}
            el vientre plano.{" "}
            <span className="text-coral">A las 4 de la tarde,<br className="hidden sm:block" />{" "}
            pareces embarazada.</span>
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-navy/55 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-4"
          >
            No es lo que comiste hoy. Es lo que tu cuerpo cambió a partir de los 35 —
            y nadie te lo explicó.
          </motion.p>

          {/* Sub-kicker — v1.1 CAMBIO 2: nombre del mecanismo */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-coral italic text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10"
          >
            La Paradoja Endo-Glucémica-Hormonal: cuando glucosa, hormonas e intestino
            se desincronizan al mismo tiempo — ningún recetario ni dieta puede resolverlo solo.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            <Link
              href="/checkout"
              className="inline-flex items-center gap-3 bg-coral hover:bg-coral-dark text-white font-bold px-10 py-5 rounded-2xl text-base md:text-lg transition-all duration-300 hover:scale-[1.03] shadow-xl shadow-coral/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coral"
            >
              <span aria-hidden="true">→</span> Descubrir por qué
            </Link>
          </motion.div>

          {/* Data stats bar */}
          <HeroStats />
        </div>

        <ScrollIndicator />
      </section>

      {/* ══════════════════════════════════════════
          INTRO — El día que reconoces
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            label="Si estás aquí"
            title="Has vivido este día más veces de las que quieres contar."
          />
          <PainTimeline />
          <div className="mt-12">
            <QuoteBlock
              quote="Estoy harta de la barriga hinchada. Me levanto deshinchada, me tomo mi primer café y ya empiezo a hinchar."
              source="YouTube, abril 2026"
              likes={10}
            />
          </div>
          {/* v1.1 CAMBIO 3: párrafo pivote — el problema no está en la receta */}
          <FadeIn>
            <p className="text-navy/60 italic text-sm leading-relaxed border border-navy/8 rounded-xl px-5 py-4 mt-8 bg-white/50">
              &ldquo;¿Qué hice mal? Si comí lo mismo de siempre. ¿Será el estrés? Voy a comer menos
              mañana. Voy a eliminar el gluten otra vez…&rdquo;
            </p>
          </FadeIn>
          <FadeIn>
            <p className="text-navy/75 text-base leading-relaxed mt-6 font-medium">
              Si te suena familiar, hay una razón muy específica por la que los recetarios, las dietas y los planes
              de alimentación saludable no han podido romper ese bucle. No es falta de voluntad.{" "}
              <strong className="text-navy">El problema no está en la receta. Está en tres sistemas que ninguna receta puede reordenar sola.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          RECOGNITION — No eres tú
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            label="No eres tú"
            title={<>No es tu disciplina.<br />No es tu estrés.<br />Y no eres la única.</>}
            align="center"
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              { quote: "Me miro al espejo y no me reconozco. Con la menopausia llegué a los 70kg. Me debe engordar hasta el aire.", source: "YouTube", likes: 16 },
              { quote: "Tengo 42, ya mi abdomen amanece inflamado. Reglas irregulares, grasa solo abdominal, malestar todo el día.", source: "Doctor Menopausia", likes: 7 },
              { quote: "En pocos lados escuchas acerca de la perimenopausia. Es un período 'perdido' entre el mundo de información.", source: "YouTube", likes: 8 },
            ].map((t, i) => (
              <motion.blockquote
                key={i}
                variants={reveal}
                className="bg-white border border-navy/6 rounded-2xl p-6"
              >
                <p className="text-navy/70 italic text-sm leading-relaxed mb-4">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center justify-between text-xs text-navy/30">
                  <span>{t.source}</span>
                  <span>{t.likes} <span aria-hidden="true">❤️</span></span>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>

          {/* v1.1 CAMBIO 4: anclaje de precio — consulta nutricionista €80-150 */}
          <FadeIn>
            <p className="text-navy/50 text-sm leading-relaxed mt-10 border border-navy/8 rounded-xl px-5 py-4 bg-white/60">
              Una consulta de nutricionista especializada en SIBO o perimenopausia en España cuesta entre{" "}
              <strong className="text-navy/70">€80 y €150 la sesión</strong>. Las publicaciones que ahora nombran la inflamación crónica
              de bajo grado no te dan un protocolo — te dan un artículo.
            </p>
          </FadeIn>
          <FadeIn>
            <p className="text-navy/70 leading-relaxed mt-6 text-base md:text-lg">
              Si reconoces una sola de estas frases como propia, estás en el lugar correcto.
              Voy a explicarte, en los próximos 8 minutos,{" "}
              <strong className="text-navy">exactamente qué te está pasando</strong> — y
              por qué nada de lo que has probado hasta hoy ha podido resolverlo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE QUESTION — Central paradox
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-navy overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(224,120,86,0.12),transparent)]" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-coral text-xs font-bold tracking-[0.2em] uppercase mb-8">La pregunta que nadie te hizo</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-cream leading-[1.1]">
              ¿Por qué cuanto{" "}
              <span className="text-coral">MÁS saludable</span>{" "}
              comes,{" "}
              <span className="text-coral">MÁS inflamada</span>{" "}
              te sientes?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-cream/45 text-base md:text-lg mt-8 max-w-xl mx-auto leading-relaxed">
              Has eliminado el azúcar. Has probado sin gluten. Tienes brócoli y kale en
              el frigorífico. Y sigues igual.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          3 SYSTEMS — The mechanism
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeader
            label="El mecanismo"
            title={<>A partir de los 35, tres cosas<br />cambian al mismo tiempo.</>}
            subtitle="Y producen exactamente la misma señal: inflamación de bajo grado constante."
          />

          <SystemBlock
            num="01"
            icon="📊"
            title="Tu glucosa pica con alimentos que antes no te picaban"
            body="A partir de los 35, tu cuerpo desarrolla resistencia a la insulina creciente. La avena que desayunabas a los 28 hoy te dispara un pico de glucosa. Se manifiesta como pantalón apretado a las 4 de la tarde — no como 'azúcar alto'."
            stat="73"
            statLabel="% reducción con orden glucémico correcto"
          />

          <SystemBlock
            num="02"
            icon="🌙"
            title="Tus hormonas cambiaron de ritmo — sin que nadie te avisara"
            body="La perimenopausia puede empezar a los 38, 4-10 años antes de la menopausia. La progesterona cae primero. Eso ralentiza tu intestino, aumenta retención de líquidos y dispara inflamación de bajo grado constante independiente de lo que comas."
          />

          <SystemBlock
            num="03"
            icon="🔬"
            title="Tu microbiota perdió el escudo hormonal que la protegía"
            body="El estrógeno protegía tu microbiota. Cuando baja, las bacterias se vuelven vulnerables al cortisol. El mismo nivel de estrés que tolerabas a los 25, hoy te inflama físicamente — porque tu intestino perdió su sistema de defensa."
          />

          {/* Summary */}
          <FadeIn>
            <div className="mt-16 rounded-3xl p-8 md:p-10 bg-navy text-cream">
              <p className="text-coral text-xs font-bold tracking-[0.2em] uppercase mb-4">El nudo</p>
              <h3 className="font-heading font-bold text-xl md:text-2xl mb-4 leading-tight">
                Estos 3 sistemas actúan al mismo tiempo.
              </h3>
              <p className="text-cream/60 leading-relaxed">
                Cada uno produce la misma señal:{" "}
                <strong className="text-cream">inflamación crónica de bajo grado.</strong>{" "}
                Por eso comes sano y sigues inflamada — los 3 sistemas le están diciendo
                a tu cuerpo &ldquo;estoy bajo amenaza&rdquo; a la vez.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4 border-t border-cream/10 pt-8">
                {[
                  { n: "01", label: "Glucosa" },
                  { n: "02", label: "Hormonas" },
                  { n: "03", label: "Microbiota" },
                ].map((s) => (
                  <div key={s.n} className="text-center">
                    <div className="font-heading font-bold text-3xl text-cream/20 tabular-nums">{s.n}</div>
                    <div className="text-xs text-cream/40 uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WHY NOTHING WORKED
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            label="Por qué fallaron"
            title="Por qué nada de lo que has probado ha funcionado de forma definitiva."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-5"
          >
            {[
              { label: "Recetarios con 700 recetas anti-inflamatorias", reason: "Pensadas para un cuerpo joven con microbiota intacta. No para ti ahora." },
              { label: "Dietas de eliminación (Whole30, Keto, paleo)", reason: "Funcionan parcialmente. Vuelves a comer 'normal' y vuelve todo." },
              { label: "Apps de glucosa con CGM", reason: "Miden picos pero ignoran tu ciclo hormonal y microbiota por completo." },
              { label: "Probióticos genéricos", reason: "Intentan repoblar un intestino que no se ha resetado. El orden importa." },
              { label: "Tu nutricionista: 'come más despacio'", reason: "Bien intencionado. No resuelve nada cuando 3 sistemas están desincronizados." },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={reveal}
                className="flex items-start gap-4 p-5 bg-white border border-navy/6 rounded-2xl"
              >
                <span className="text-coral font-bold text-base flex-shrink-0 mt-0.5" aria-hidden="true">✕</span>
                <div>
                  <p className="font-semibold text-navy text-sm">{item.label}</p>
                  <p className="text-navy/45 text-sm mt-1 leading-relaxed">{item.reason}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <FadeIn>
            <p className="text-navy/75 font-semibold mt-10 text-base md:text-lg leading-relaxed">
              Cada uno de esos enfoques toca un sistema a la vez. Ninguno aborda los 3
              en paralelo.{" "}
              <span className="text-coral font-bold">Hasta hoy.</span>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          THE SOLUTION — Product reveal
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white border-y border-navy/6">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-olive text-xs font-bold tracking-[0.25em] uppercase mb-6">
              Te presento
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-navy mb-4 leading-none">
              VIENTRE LIBRE
            </h2>
            <p className="font-heading text-xl md:text-2xl text-coral font-semibold mb-4">
              RESET 21
            </p>
          </FadeIn>
          {/* v1.1 CAMBIO 5: intro reescrita — desposiciona recetarios */}
          <FadeIn delay={0.15}>
            <p className="text-navy/70 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-4 italic">
              Si esperabas otro recetario de recetas anti-inflamatorias para imprimir y pegar en la nevera,
              esto no es para ti.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-navy/60 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
              El primer método en español que reordena glucosa, hormonas e intestino en paralelo,
              en 21 días, sin que tengas que eliminar nada de tu vida para siempre.
            </p>
          </FadeIn>

          {/* Mechanism callout — los 3 en paralelo */}
          <FadeIn>
            <div className="mt-2 mb-12 rounded-3xl bg-cream px-8 py-8 text-left">
              <p className="text-olive text-[10px] font-bold tracking-[0.25em] uppercase mb-7">Por qué es el primero en español que lo hace</p>
              <div className="space-y-5">
                {[
                  { num: "01", name: "Glucosa", detail: "Orden biológico adaptado a resistencia insulínica post-35. No es eliminar — es secuenciar." },
                  { num: "02", name: "Hormonas", detail: "Protocolo sincronizado con tu ciclo menstrual y perimenopausia. Ningún recetario puede hacer esto." },
                  { num: "03", name: "Microbiota", detail: "Reset del escudo intestinal antes de repoblar. El orden importa más que los probióticos." },
                ].map((s) => (
                  <div key={s.num} className="flex items-start gap-5">
                    <span className="font-heading font-bold text-xl text-navy/15 tabular-nums flex-shrink-0 w-8 text-right leading-tight">{s.num}</span>
                    <div>
                      <span className="font-heading font-bold text-navy text-sm">{s.name}</span>
                      <p className="text-navy/40 text-xs mt-0.5 leading-relaxed">{s.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-navy/35 text-xs text-center mt-7 pt-5 border-t border-navy/8">
                Los 3 en paralelo. En 21 días. <strong className="text-navy/55">Por primera vez en español.</strong>
              </p>
            </div>
          </FadeIn>

          {/* Is / Isn't */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid sm:grid-cols-2 gap-5 text-left"
          >
            <motion.div variants={reveal} className="border border-navy/8 rounded-2xl p-6">
              <h4 className="font-bold text-navy text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-coral/10 text-coral flex items-center justify-center text-xs" aria-hidden="true">✕</span>
                Lo que NO es
              </h4>
              {["Un recetario más", "Una dieta de eliminación", "Coaching uno a uno", "App con suscripción mensual"].map((t, i) => (
                <p key={i} className="text-navy/45 text-sm flex items-center gap-2 mb-2">
                  <span className="text-coral text-xs" aria-hidden="true">—</span>{t}
                </p>
              ))}
            </motion.div>
            <motion.div variants={reveal} className="border border-olive/20 bg-olive/4 rounded-2xl p-6">
              <h4 className="font-bold text-navy text-sm mb-4 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-olive/15 text-olive flex items-center justify-center text-xs" aria-hidden="true">✓</span>
                Lo que SÍ recibes
              </h4>
              {["4 módulos en video", "7 entregables descargables", "3 bonos que matan objeciones", "Acceso inmediato y vitalicio"].map((t, i) => (
                <p key={i} className="text-navy/60 text-sm flex items-center gap-2 mb-2">
                  <span className="text-olive" aria-hidden="true">✓</span>{t}
                </p>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FULL STACK — Everything you get
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            label="El stack completo"
            title="Todo lo que recibes en el momento exacto en que completas tu pago."
          />

          {/* v1.1 CAMBIO 6: línea del quiz antes del stack */}
          <FadeIn>
            <div className="-mt-8 mb-12 p-5 rounded-2xl border border-olive/15 bg-olive/4">
              <p className="text-navy/70 text-sm leading-relaxed">
                <span className="text-olive font-bold">Antes de empezar</span> — un quiz de 9 preguntas diagnostica tu perfil:
                ¿tu inflamación es de origen glucémico, hormonal o mixto? Un recetario no puede hacerte esa pregunta.
                Nosotros sí. Y el protocolo de tus 21 días arranca desde tu respuesta específica.
              </p>
            </div>
          </FadeIn>

          {/* 4 Video modules */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <motion.h3 variants={reveal} className="font-heading text-lg font-bold text-olive mb-2 flex items-center gap-2">
              <span aria-hidden="true">📹</span> Programa Base — 4 módulos en video
            </motion.h3>
            <motion.p variants={reveal} className="text-navy/40 text-xs mb-6 uppercase tracking-widest">
              15–18 min c/u · Acceso inmediato · Alojado en Hotmart
            </motion.p>
            <StackItem icon="1️⃣" title="La Paradoja Tiene Nombre" description="Los 3 sistemas desincronizados y los 5 alimentos «sanos» que son TUS villanos. Momento 'ahá' que justifica la compra antes del Módulo 2." value="€97" />
            <StackItem icon="2️⃣" title="El Desinflama Rápido (Días 1–7)" description="Protocolo del orden glucémico + retiro estratégico. Primer cambio visible al día 5–7." value="" />
            <StackItem icon="3️⃣" title="El Reset Hormonal (Días 8–14)" description="Adaptar alimentación a cada fase de tu ciclo menstrual. El módulo que ningún competidor tiene." value="" />
            <StackItem icon="4️⃣" title="El Mapa es Tuyo (Días 15–21)" description="Reintroducción inteligente. Construyes tu mapa personal de tolerancia de por vida." value="" />
          </motion.div>

          {/* 7 Downloads */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-14"
          >
            <motion.h3 variants={reveal} className="font-heading text-lg font-bold text-olive mb-6 flex items-center gap-2">
              <span aria-hidden="true">📦</span> 7 Entregables Descargables
            </motion.h3>
            <StackItem icon="📋" title="Tu Informe Personal de la Paradoja" description="PDF 5 páginas personalizado por tu perfil del quiz. Lleva tu nombre y habla de TU tipo de inflamación." value="€50" />
            <StackItem icon="🔍" title="Los 5 Expedientes de los Villanos" description="Brócoli, garbanzos, cebolla/ajo, avena, kale — mecanismo + señal + sustituto." value="€27" />
            <StackItem icon="🍽️" title="Las 21 Combinaciones Base" description="Una por día. Foto, 20 min máximo, semáforo FODMAP, fase del ciclo. 21 perfectas > 700 confusas." value="€47" />
            <StackItem icon="📊" title="El Tracker Ciclo-Intestinal" description="Notion template que sincroniza síntomas con fases del ciclo automáticamente." value="€27" />
            <StackItem icon="🗺️" title="El Mapa Personal de la Paradoja" description="Workbook que completas en 21 días. Tu guía de por vida, hecha a mano de tu cuerpo." value="€37" />
            <StackItem icon="🏷️" title="Índice de Etiquetas Anti-Villanos" description="Los 22 ingredientes disfrazados en productos «saludables». Para abrir en el súper." value="€17" />
            <StackItem icon="🔄" title="El Conversor Anti-Villanos" description="Sofrito sin ajo ni cebolla que sabe a sofrito. Único en español." value="€37" />
          </motion.div>

          {/* 3 Bonuses */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-14"
          >
            <motion.h3 variants={reveal} className="font-heading text-lg font-bold text-olive mb-2 flex items-center gap-2">
              <span aria-hidden="true">🎁</span> 3 Bonos — cada uno mata una objeción
            </motion.h3>
            <motion.p variants={reveal} className="text-navy/40 text-xs mb-6 uppercase tracking-widest">
              No son contenido genérico. Cada bono existe para eliminar una razón específica de abandono.
            </motion.p>
            <StackItem icon="🎧" title="Botiquín de Audios de Emergencia Mental" description="5 audios para los 5 momentos donde abandonas: vientre disparado, culpa, día 7–10, evento, confusión." value="€37" />
            <StackItem icon="🍷" title="Comer Libre en Cualquier Mesa" description="Cómo leer un menú en 30 seg · 12 platos trampa · scripts para pedir sin explicar." value="€27" />
            <StackItem icon="💊" title="La Carta para tu Médico" description="PDF clínico con solicitud de 3 pruebas raramente pedidas. Por primera vez te escuchan." value="€47" />
          </motion.div>

          {/* Value total */}
          <FadeIn>
            <div className="mt-10 flex items-center justify-between py-5 border-t-2 border-navy/10">
              <span className="font-heading font-bold text-navy text-lg">Valor total</span>
              <span className="font-heading font-bold text-2xl text-navy/25 line-through tabular-nums">€467</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAST ACTION
      ══════════════════════════════════════════ */}
      <section className="py-10 bg-coral/6 border-y border-coral/12">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <span className="text-3xl flex-shrink-0">🎁</span>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-3">
                  <p className="text-coral text-xs font-bold uppercase tracking-[0.2em]">Bono Fast Action</p>
                  <FastActionCountdown />
                </div>
                <h3 className="font-heading font-bold text-navy text-xl mb-2">
                  La Lista de Supermercado Anti-Inflamatoria con Marcas Españolas
                </h3>
                <p className="text-navy/55 text-sm leading-relaxed">
                  Lista real con marcas de Mercadona, Carrefour, Lidl. Las 8 marcas trampa
                  que se venden como &ldquo;saludables&rdquo; con FODMAP ocultos.{" "}
                  <strong className="text-navy">Valor: €17 — gratis si pagas ahora.</strong>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          PRICE — The moment of decision
      ══════════════════════════════════════════ */}
      <section id="comprar" className="py-32 md:py-40 bg-white">
        <div className="max-w-lg mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-olive text-xs font-bold tracking-[0.25em] uppercase mb-8">
              Inversión total
            </p>
          </FadeIn>

          {/* Price anchoring — antes de mostrar el número */}
          <FadeIn>
            <div className="mb-10 rounded-2xl border border-navy/8 bg-cream/60 text-left overflow-hidden">
              <div className="px-5 py-3 border-b border-navy/6">
                <p className="text-navy/35 text-[10px] uppercase tracking-[0.2em] font-medium">Compara antes de decidir</p>
              </div>
              <div className="divide-y divide-navy/6">
                {[
                  {
                    label: "Consulta nutricionista especializada (España)",
                    price: "€80–150",
                    note: "Por sesión · Sin protocolo propio · Sin garantía",
                    dim: true,
                  },
                  {
                    label: "Programa de coaching 1:1 online",
                    price: "€300–600",
                    note: "Misma información · Agenda limitada · Sin acceso permanente",
                    dim: true,
                  },
                  {
                    label: "RESET 21 — Protocolo completo + 72h de garantía",
                    price: "€47",
                    note: "Acceso inmediato y vitalicio · Pago único · Sin renovaciones",
                    dim: false,
                  },
                ].map((row, i) => (
                  <div
                    key={i}
                    className={`flex items-start justify-between gap-4 px-5 py-4 ${row.dim ? "opacity-50" : ""}`}
                  >
                    <div>
                      <p className={`text-sm font-medium leading-snug ${row.dim ? "text-navy/70" : "text-navy"}`}>{row.label}</p>
                      <p className="text-navy/30 text-xs mt-0.5 leading-snug">{row.note}</p>
                    </div>
                    <span className={`font-heading font-bold tabular-nums flex-shrink-0 ${row.dim ? "text-navy/40 text-base" : "text-coral text-xl"}`}>{row.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <p className="font-heading font-bold text-4xl text-navy/20 line-through tabular-nums mb-1">€467</p>
            <p className="text-navy/30 text-xs uppercase tracking-widest">valor total del stack completo</p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="flex items-end justify-center gap-3 my-6">
              <span className="font-heading font-bold text-8xl md:text-9xl text-navy tabular-nums leading-none">
                47
              </span>
              <span className="font-heading text-3xl text-navy/40 mb-4">€</span>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="text-coral font-semibold text-sm mb-1">
              O €37 si entras antes de que se cierre el cupo del lanzamiento
            </p>
            <p className="text-navy/30 text-xs mb-10 tracking-wide">
              Pago único · Sin renovaciones · Acceso inmediato y para siempre
            </p>
          </FadeIn>

          {/* Trust seals grid */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
              {[
                { icon: "🛡️", label: "Garantía 72h" },
                { icon: "⚡", label: "Acceso inmediato" },
                { icon: "📱", label: "Móvil, tablet, PC" },
                { icon: "∞", label: "Acceso vitalicio" },
              ].map((item) => (
                <div key={item.label} className="border border-navy/8 rounded-xl py-4 px-2">
                  <div className="text-xl mb-1.5" aria-hidden="true">{item.icon}</div>
                  <p className="text-navy/50 text-xs font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <CTABlock id="cta-price" />

        </div>
      </section>

      {/* ══════════════════════════════════════════
          GUARANTEE
      ══════════════════════════════════════════ */}
      <section className="py-24 bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <div className="border-2 border-olive/15 rounded-3xl p-8 md:p-10 bg-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-olive/3 rounded-full -translate-y-1/3 translate-x-1/3" />
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-olive/10 flex items-center justify-center text-2xl flex-shrink-0" aria-hidden="true">
                    🛡️
                  </div>
                  <div>
                    <p className="text-olive text-xs font-bold tracking-[0.2em] uppercase mb-1">Sin riesgo</p>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-navy">
                      Garantía Alivio en 72 Horas
                    </h2>
                  </div>
                </div>
                <p className="text-navy/65 leading-relaxed mb-6">
                  Mira el Módulo 1 y 2. Aplica el inicio del Desinflama Rápido durante 72
                  horas. Si después tu ropa no te aprieta menos al final del día — me
                  escribes &ldquo;no funcionó&rdquo; y te devuelvo cada centavo. Sin
                  cuestionarios. Sin demostrar nada.
                </p>
                <p className="text-olive font-bold text-sm">
                  72 horas. El riesgo es mío. Tú solo pierdes la inflamación.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TRANSFORMATION — Los 21 días en concreto
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-white">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            label="Los 21 días"
            title={<>No es una promesa.<br />Es un orden.</>}
            subtitle="Cada semana tiene un trabajo específico. Aquí está la secuencia exacta — y qué cambia en tu cuerpo."
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="space-y-0"
          >
            {[
              {
                phase: "Días 1–7",
                name: "Desinflama Rápido",
                accent: "text-coral",
                before: "El pantalón que no podías abrochar a las 4pm",
                after: "Primera vez en años que terminas el día sin presión en el vientre",
                note: "Protocolo glucémico + retiro estratégico de los 5 alimentos paradójicos. El primer cambio visible aparece al día 5.",
              },
              {
                phase: "Días 8–14",
                name: "El Reset Hormonal",
                accent: "text-olive",
                before: "Hinchazón que varía sola, sin saber por qué",
                after: "Empiezas a ver el patrón — y puedes anticiparlo antes de que llegue",
                note: "Alimentación adaptada a cada fase de tu ciclo menstrual. El módulo que ningún recetario puede ofrecerte porque requiere saber cuándo estás.",
              },
              {
                phase: "Días 15–21",
                name: "El Mapa es Tuyo",
                accent: "text-navy/40",
                before: "Miedo permanente a comer \"lo equivocado\"",
                after: "Sabes exactamente qué tolera tu cuerpo. Para siempre.",
                note: "Reintroducción sistemática. Al día 22 tienes un Mapa Personal de tolerancia hecho de tu cuerpo — que nadie más puede tener.",
              },
            ].map((phase, i) => (
              <motion.div
                key={i}
                variants={reveal}
                className="py-10 border-b border-navy/8 last:border-0 grid md:grid-cols-[180px_1fr] gap-6 md:gap-10"
              >
                <div>
                  <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-1.5 ${phase.accent}`}>{phase.phase}</p>
                  <p className="font-heading font-bold text-navy text-lg leading-tight">{phase.name}</p>
                </div>
                <div>
                  <div className="flex items-start gap-4 mb-3">
                    <span className="text-coral text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5 w-16">Antes</span>
                    <p className="text-navy/50 text-sm leading-relaxed">{phase.before}</p>
                  </div>
                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-olive text-[10px] font-bold uppercase tracking-wider flex-shrink-0 mt-0.5 w-16">Después</span>
                    <p className="text-navy font-semibold text-sm leading-relaxed">{phase.after}</p>
                  </div>
                  <p className="text-navy/35 text-xs leading-relaxed">{phase.note}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section className="py-24 md:py-32 bg-cream">
        <div className="max-w-2xl mx-auto px-6">
          <SectionHeader
            label="Dudas frecuentes"
            title="Preguntas frecuentes"
            align="center"
          />
          <FAQItem question="He probado de todo, ¿por qué esto sería diferente?" answer="Porque hasta hoy, lo que probaste atacaba un sistema a la vez. RESET 21 aborda glucosa + hormonas + microbiota en paralelo. Y tienes 72h de garantía para comprobarlo — riesgo cero." />
          <FAQItem question="¿Sirve si no estoy en menopausia oficialmente?" answer="Sí. La perimenopausia puede empezar a los 38. Si tienes ciclos irregulares o hinchazón nueva, ya estás en ella. RESET 21 te da el protocolo antes de que se asiente." />
          <FAQItem question="¿Voy a tener que renunciar al pan, al vino, al chocolate para siempre?" answer="No. Durante los días 1–14 hacemos un reset estratégico. En los días 15–21 reintroducimos sistemáticamente. Al día 22, tienes tu Mapa Personal: comes desde ese mapa para siempre." />
          <FAQItem question="No tengo tiempo de cocinar 21 platos diferentes." answer="Las 21 combinaciones tienen tiempo máximo de 20 minutos. Para semanas caóticas, incluye batch cooking de 90 min/semana." />
          <FAQItem question="¿Necesito comprar suplementos caros?" answer="No. El protocolo usa alimentos de Mercadona/Carrefour/Lidl. Si quieres potenciar, el Módulo 3 recomienda solo 3 productos con evidencia real." />
          <FAQItem question="¿Y si me pierdo días?" answer="El programa es 100% asincrónico. Lo haces a tu ritmo. El acceso es para siempre. No hay fecha de expiración." />
          <FAQItem question="¿Por qué no es más caro?" answer="Porque es el lanzamiento. Necesitamos casos reales para testimonios. Después sube a €87. Si entras hoy, te quedas con tu precio para siempre." />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════ */}
      <section className="py-32 md:py-40 bg-navy text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(224,120,86,0.1),transparent)]" />
        <div className="relative max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-cream leading-tight mb-6">
              El día más caro de tu vida es el siguiente que pasas sin
              entender qué te está pasando.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-cream/45 text-base mb-3 leading-relaxed">
              Llevas meses — quizás años — buscando la razón. Ya la tienes.
            </p>
            <p className="text-cream/30 text-sm mb-10">
              72h de garantía. Si no funciona, te devuelvo cada euro. Sin preguntas.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <Link
              href="/checkout"
              className="inline-flex items-center gap-3 bg-coral hover:bg-coral-light text-white font-bold px-10 py-5 rounded-2xl text-lg md:text-xl transition-all duration-300 hover:scale-[1.03] shadow-2xl shadow-coral/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-coral"
            >
              <span aria-hidden="true">→</span> SÍ, QUIERO MI RESET 21
            </Link>
            <p className="text-cream/25 text-xs mt-5">
              €47 hoy · Sin renovaciones · Acceso inmediato y para siempre · 🛡️ Garantía 72h
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <section className="py-10 bg-navy border-t border-cream/6 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-cream/25 text-xs mb-4">
            <span>✅ Pago seguro vía Hotmart</span>
            <span>✅ Acceso inmediato</span>
            <span>✅ Móvil, tablet, ordenador</span>
            <span>✅ Sin suscripciones</span>
          </div>
          <p className="text-cream/15 text-xs">
            Vientre Libre · RESET 21 es un programa educativo. No sustituye el consejo médico profesional.
          </p>
          <p className="text-cream/10 text-xs mt-2">
            © {new Date().getFullYear()} Vientre Libre{" "}·{" "}
            <Link href="/privacidad" className="hover:text-cream/25 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/30 rounded-sm">Política de privacidad</Link>
            {" "}·{" "}
            <Link href="/terminos" className="hover:text-cream/25 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cream/30 rounded-sm">Términos</Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default function ProgramaPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-cream">
          <div className="w-10 h-10 rounded-full border-2 border-olive/20 border-t-olive animate-spin" />
        </div>
      }
    >
      <SalesContent />
    </Suspense>
  );
}
