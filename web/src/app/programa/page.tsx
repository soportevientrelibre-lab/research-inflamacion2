"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { perfilDescriptions, type Perfil } from "@/lib/quiz-scoring";
import { StickyBar, FadeIn, QuoteBlock, StackItem, CTABlock, FAQItem, FastActionCountdown } from "@/components/sales-components";

function SalesContent() {
  const searchParams = useSearchParams();
  const perfil = (searchParams.get("perfil") as Perfil) || null;
  const info = perfil ? perfilDescriptions[perfil] : null;

  return (
    <main className="min-h-screen pb-20 md:pb-0">
      <StickyBar />

      {/* PRE-HEADLINE */}
      <section className="bg-pattern pt-8 pb-2">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-olive text-xs md:text-sm font-medium tracking-widest uppercase">
              Para mujeres de 35+ que ya comen sano, han probado todo, y siguen inflamadas todas las tardes.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* HERO */}
      <section className="bg-pattern py-10 md:py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-[1.1] mb-5">
              Te despiertas con el vientre plano. A las 4 de la tarde,{" "}
              <span className="text-coral">pareces embarazada de 4 meses.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-navy/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-8">
              No es lo que comiste hoy. Es lo que tu cuerpo cambió a partir de los 35 — y nadie te lo explicó.
            </p>
          </FadeIn>
          {info && (
            <FadeIn delay={0.15}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium" style={{ backgroundColor: info.colorLight, color: info.color }}>
                {info.emoji} Personalizado para tu perfil: {info.title}
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* INTRO — THE PAIN */}
      <section className="py-12 md:py-16 bg-white/50">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <p className="text-navy/80 text-base md:text-lg leading-relaxed mb-6">
              Si estás aquí, probablemente has vivido este día más veces de las que quieres contar:
            </p>
            <p className="text-navy/70 leading-relaxed mb-6">
              Te despiertas. Te miras de perfil al espejo. El vientre está plano. Desayunas algo &ldquo;saludable&rdquo; — tu overnight de avena con arándanos, o tu tostada de pan integral con aguacate. A las 11:30, notas la primera presión. A las 14:00, el pantalón te aprieta. A las 16:00, ya no te quieres levantar de la silla. A las 19:00, en el espejo, te ves un cuerpo que no reconoces.
            </p>
            <p className="text-navy/60 italic leading-relaxed">
              &ldquo;¿Qué hice mal? Si comí lo mismo de siempre. ¿Será el estrés? Voy a comer menos mañana. Voy a eliminar el gluten otra vez…&rdquo;
            </p>
          </FadeIn>

          <QuoteBlock quote="Estoy harta de la barriga hinchada. Me levanto deshinchada, me tomo mi primer café y ya empiezo a hinchar." source="Comentario en YouTube, abril 2026" likes={10} />
        </div>
      </section>

      {/* RECOGNITION */}
      <section className="py-12 md:py-16 bg-pattern">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-6">
              No eres tú. No es tu disciplina. Y no eres la única.
            </h2>
          </FadeIn>

          <QuoteBlock quote="Me miro al espejo y no me reconozco. Mi peso estaba entre los 54-56kg, con la menopausia llegué a los 70kg. Me debe engordar hasta el aire." source="YouTube, 16 likes" likes={16} />
          <QuoteBlock quote="Tengo 42, ya mi abdomen amanece inflamado. Reglas irregulares, grasa solo abdominal, malestar todo el día." source="Video de Doctor Menopausia" likes={7} />
          <QuoteBlock quote="En pocos lados escuchas acerca de la perimenopausia. Es un período 'perdido' entre el mundo de información." source="YouTube" likes={8} />

          <FadeIn>
            <p className="text-navy/70 leading-relaxed mt-8">
              Si reconoces una sola de estas frases como propia, este es el lugar correcto. Voy a explicarte <strong className="text-navy">exactamente qué te está pasando</strong> — y por qué nada de lo que has probado hasta hoy ha podido resolverlo.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* THE QUESTION */}
      <section className="py-12 md:py-16 bg-white/50">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-6">
              La pregunta que tu nutricionista no te hizo
            </h2>
            <p className="text-navy/70 leading-relaxed mb-8">
              Has eliminado el azúcar refinado. Has probado sin gluten. Has reducido los lácteos. Tienes brócoli en el congelador. Compras kale fresco. Y aquí está la pregunta que <strong className="text-navy">nadie te ha hecho directamente</strong>:
            </p>
          </FadeIn>
          <FadeIn>
            <div className="glass-card rounded-2xl p-8 text-center glow-coral">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-coral leading-snug">
                ¿Por qué cuanto MÁS saludable comes, MÁS inflamada te sientes?
              </h3>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE 3 SYSTEMS */}
      <section className="py-12 md:py-16 bg-pattern">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-4">
              A partir de los 35, tres cosas cambian en tu cuerpo al mismo tiempo.
            </h2>
            <p className="text-navy/60 mb-10">Y producen exactamente la misma señal: inflamación constante.</p>
          </FadeIn>

          {[
            { num: "01", title: "Tu glucosa pica con alimentos que antes no te picaban", icon: "📊", text: "A partir de los 35, tu cuerpo desarrolla resistencia a la insulina creciente. La avena que desayunabas a los 28, hoy te dispara un pico de glucosa. Se siente como pantalón apretado a las 4 de la tarde." },
            { num: "02", title: "Tus hormonas cambiaron de ritmo", icon: "🌙", text: "La perimenopausia puede empezar a los 38. Estrógeno y progesterona oscilan de formas nuevas. Reducen la motilidad intestinal, aumentan retención de líquidos, disparan inflamación de bajo grado constante." },
            { num: "03", title: "Tu microbiota perdió su escudo hormonal", icon: "🔬", text: "El estrógeno protegía tu microbiota. Cuando baja, las bacterias se vuelven vulnerables al cortisol. El mismo nivel de estrés que tolerabas a los 25, hoy te inflama." },
          ].map((s, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="glass-card rounded-2xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <span className="text-olive text-xs font-semibold tracking-widest uppercase">Sistema {s.num}</span>
                    <h3 className="font-heading font-bold text-navy text-base md:text-lg">{s.title}</h3>
                  </div>
                </div>
                <p className="text-navy/65 text-sm leading-relaxed">{s.text}</p>
              </div>
            </FadeIn>
          ))}

          <FadeIn>
            <div className="rounded-2xl p-6 bg-navy text-cream mt-8">
              <h3 className="font-heading font-bold text-lg mb-2">Estos 3 sistemas actúan al mismo tiempo.</h3>
              <p className="text-cream/70 text-sm leading-relaxed">
                Cada uno produce la misma señal: <strong className="text-cream">inflamación crónica de bajo grado.</strong> Por eso comes sano y sigues inflamada. Los 3 sistemas le están diciendo a tu cuerpo &ldquo;estoy bajo amenaza&rdquo; al mismo tiempo.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY NOTHING WORKED */}
      <section className="py-12 md:py-16 bg-white/50">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-8">
              Por qué nada de lo que has probado ha funcionado
            </h2>
          </FadeIn>
          {[
            { label: "Recetarios con 700 recetas \"anti-inflamatorias\"", reason: "Pensadas para un cuerpo joven con microbiota intacta." },
            { label: "Dietas de eliminación (Whole30, Keto, paleo)", reason: "Funcionan parcialmente. Vuelves a comer \"normal\" y vuelve todo." },
            { label: "Apps de glucosa con CGM", reason: "Miden picos pero ignoran tu ciclo hormonal y microbiota." },
            { label: "Probióticos genéricos", reason: "Ayudan 2 semanas. Tu intestino necesita un reset antes de poblar." },
            { label: "Tu nutricionista: \"come más despacio\"", reason: "Bien intencionado. No resuelve nada con 3 sistemas desincronizados." },
          ].map((item, i) => (
            <FadeIn key={i}>
              <div className="flex items-start gap-3 mb-4">
                <span className="text-coral font-bold text-lg mt-0.5">✕</span>
                <div>
                  <p className="text-navy font-semibold text-sm">{item.label}</p>
                  <p className="text-navy/55 text-sm">{item.reason}</p>
                </div>
              </div>
            </FadeIn>
          ))}
          <FadeIn>
            <p className="text-navy/80 font-medium mt-6">
              Cada uno de esos enfoques toca un sistema a la vez. Ninguno los aborda los 3 en paralelo. <strong className="text-coral">Hasta hoy.</strong>
            </p>
          </FadeIn>
        </div>
      </section>

      {/* THE SOLUTION */}
      <section className="py-12 md:py-16 bg-pattern">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-olive text-xs font-semibold tracking-widest uppercase mb-3">Te presento</p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-3">VIENTRE LIBRE · RESET 21</h2>
            <p className="text-navy/60 text-lg max-w-xl mx-auto leading-relaxed">
              El primer método en español que reordena los 3 sistemas en paralelo, en 21 días, sin que tengas que eliminar nada de tu vida para siempre.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHAT IT IS / IS NOT */}
      <section className="py-12 md:py-16 bg-white/50">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <p className="text-navy/70 leading-relaxed mb-8">
              Un programa digital de 21 días. Lo descargas, lo consumes a tu ritmo, lo aplicas mientras vives tu vida normal. No hay sesiones agendadas. No hay grupo de WhatsApp.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="glass-card rounded-xl p-5">
                <h4 className="font-bold text-navy text-sm mb-3">Lo que NO es:</h4>
                {["Un recetario más","Una dieta de eliminación","Coaching uno a uno","App con suscripción mensual"].map((t,i)=>(
                  <p key={i} className="text-navy/55 text-sm flex items-center gap-2 mb-1.5"><span className="text-coral">✕</span>{t}</p>
                ))}
              </div>
              <div className="glass-card rounded-xl p-5">
                <h4 className="font-bold text-navy text-sm mb-3">Lo que SÍ recibes:</h4>
                {["4 módulos en video","7 entregables descargables","3 bonos que matan objeciones","Acceso inmediato y para siempre"].map((t,i)=>(
                  <p key={i} className="text-navy/55 text-sm flex items-center gap-2 mb-1.5"><span className="text-olive">✓</span>{t}</p>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FULL STACK */}
      <section className="py-12 md:py-16 bg-pattern">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn><h2 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-2">Todo lo que recibes</h2></FadeIn>
          <FadeIn><p className="text-muted text-sm mb-8">En el momento exacto en que completas tu pago</p></FadeIn>

          <FadeIn><h3 className="font-heading text-lg font-bold text-olive mb-4">📹 Programa Base — 4 módulos en video</h3></FadeIn>
          <StackItem icon="1️⃣" title="La Paradoja Tiene Nombre" description="Los 3 sistemas desincronizados y los 5 alimentos «sanos» que son TUS villanos." value="€97" />
          <StackItem icon="2️⃣" title="El Desinflama Rápido (Días 1-7)" description="Protocolo del orden glucémico + retiro estratégico. Primer cambio visible al día 5-7." value="" />
          <StackItem icon="3️⃣" title="El Reset Hormonal (Días 8-14)" description="Adaptar alimentación a cada fase de tu ciclo menstrual. Módulo que ningún competidor tiene." value="" />
          <StackItem icon="4️⃣" title="El Mapa es Tuyo (Días 15-21)" description="Reintroducción inteligente. Construyes tu mapa personal de tolerancia de por vida." value="" />

          <FadeIn><h3 className="font-heading text-lg font-bold text-olive mt-10 mb-4">📦 7 Entregables Descargables</h3></FadeIn>
          <StackItem icon="📋" title="Tu Informe Personal de la Paradoja" description="PDF 5 páginas personalizado por tu perfil del quiz. Lleva tu nombre." value="€50" />
          <StackItem icon="🔍" title="Los 5 Expedientes de los Villanos" description="Brócoli, garbanzos, cebolla/ajo, avena, kale — mecanismo + sustituto." value="€27" />
          <StackItem icon="🍽️" title="Las 21 Combinaciones Base" description="Una por día. Foto, 20 min máximo, semáforo FODMAP, fase del ciclo. 21 perfectas > 700 confusas." value="€47" />
          <StackItem icon="📊" title="El Tracker Ciclo-Intestinal" description="Notion template que sincroniza síntomas con fases del ciclo automáticamente." value="€27" />
          <StackItem icon="🗺️" title="El Mapa Personal de la Paradoja" description="Workbook que completas en 21 días. Tu guía hecha a mano de tu propio cuerpo." value="€37" />
          <StackItem icon="🏷️" title="Índice de Etiquetas Anti-Villanos" description="Los 22 ingredientes disfrazados en productos «saludables». Para abrir en el súper." value="€17" />
          <StackItem icon="🔄" title="El Conversor Anti-Villanos" description="Sofrito sin ajo ni cebolla que sabe a sofrito. Desayuno sin avena. Único en español." value="€37" />

          <FadeIn><h3 className="font-heading text-lg font-bold text-olive mt-10 mb-4">🎁 3 Bonos</h3></FadeIn>
          <StackItem icon="🎧" title="Botiquín de Audios de Emergencia Mental" description="5 audios para los 5 momentos donde abandonas: vientre disparado, culpa, día 7-10, evento, confusión." value="€37" />
          <StackItem icon="🍷" title="Comer Libre en Cualquier Mesa" description="Cómo leer un menú en 30 seg · 12 platos trampa · scripts para pedir sin explicar." value="€27" />
          <StackItem icon="💊" title="La Carta para tu Médico" description="PDF clínico con solicitud de 3 pruebas raramente pedidas. Por primera vez te escuchan." value="€47" />
        </div>
      </section>

      {/* FAST ACTION BONUS */}
      <section className="py-8 bg-coral/5 border-y-2 border-coral/10">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <span className="text-3xl flex-shrink-0">🎁</span>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                  <p className="text-coral text-xs font-bold uppercase tracking-widest">Bono Fast Action</p>
                  <FastActionCountdown />
                </div>
                <h3 className="font-heading font-bold text-navy text-lg mb-2">La Lista de Supermercado Anti-Inflamatoria con Marcas Españolas</h3>
                <p className="text-navy/60 text-sm leading-relaxed">
                  Lista real con marcas de Mercadona, Carrefour, Lidl. Las 8 marcas trampa que se venden como &ldquo;saludables&rdquo; con FODMAP ocultos. <strong className="text-navy">Valor: €17 — gratis si pagas ahora.</strong>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* VALUE + PRICE */}
      <section id="comprar" className="py-12 md:py-16 bg-pattern">
        <div className="max-w-xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-olive text-xs font-semibold tracking-widest uppercase mb-4">Valor total de todo lo que recibes</p>
            <p className="font-heading text-4xl font-bold text-navy/25 line-through mb-1">€467</p>
            <div className="flex items-end justify-center gap-3 mb-2">
              <h2 className="font-heading text-6xl md:text-7xl font-bold text-navy leading-none">€47</h2>
              <span className="text-navy/40 text-lg mb-2">único pago</span>
            </div>
            <p className="text-coral font-medium text-sm mb-2">O €37 con el cupón LANZAMIENTO (primeros 30 accesos)</p>
            <p className="text-navy/40 text-xs mb-8">Sin renovaciones · Acceso para siempre · Descargable en 2 min</p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 text-center">
              {[
                { icon: "🛡️", label: "Garantía 72h" },
                { icon: "⚡", label: "Acceso inmediato" },
                { icon: "📱", label: "Móvil y tablet" },
                { icon: "∞", label: "Acceso vitalicio" },
              ].map((item) => (
                <div key={item.label} className="glass-card rounded-xl py-3 px-2">
                  <div className="text-xl mb-1">{item.icon}</div>
                  <p className="text-navy/60 text-xs font-medium">{item.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>

          <CTABlock id="cta-price" />
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="py-12 md:py-16 bg-white/50">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <div className="rounded-2xl p-8 border-2 border-olive/20 bg-olive/5">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🛡️</span>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-navy">Garantía Alivio en 72 Horas</h2>
              </div>
              <p className="text-navy/70 leading-relaxed text-sm mb-4">
                Mira el Módulo 1 y 2. Aplica el inicio del Desinflama Rápido durante 72 horas. Si después tu ropa no te aprieta menos al final del día — me escribes &ldquo;no funcionó&rdquo;, y te devuelvo cada centavo. Sin cuestionarios. Sin demostrar nada.
              </p>
              <p className="text-olive font-semibold text-sm">72 horas. El riesgo es mío. Tú solo pierdes la inflamación.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-pattern">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn><h2 className="font-heading text-2xl md:text-3xl font-bold text-navy text-center mb-8">Preguntas frecuentes</h2></FadeIn>
          <FAQItem question="He probado de todo, ¿por qué esto sería diferente?" answer="Porque hasta hoy, lo que probaste atacaba un sistema a la vez. RESET 21 aborda glucosa + hormonas + microbiota en paralelo. Y tienes 72h de garantía para comprobarlo." />
          <FAQItem question="¿Sirve si no estoy en menopausia oficialmente?" answer="Sí. La perimenopausia puede empezar a los 38. Si tienes ciclos irregulares o hinchazón nueva, ya estás en ella. RESET 21 te da el protocolo antes de que se asiente." />
          <FAQItem question="¿Voy a tener que renunciar al pan, al vino, al chocolate para siempre?" answer="No. Durante los días 1-14 hacemos un reset estratégico. En los días 15-21 reintroducimos sistemáticamente. Al día 22, tienes tu Mapa Personal: comes desde ese mapa para siempre." />
          <FAQItem question="No tengo tiempo de cocinar 21 platos diferentes." answer="Las 21 combinaciones tienen tiempo máximo de 20 minutos. Para semanas caóticas, incluye batch cooking de 90 min/semana." />
          <FAQItem question="¿Necesito comprar suplementos caros?" answer="No. El protocolo usa alimentos de Mercadona/Carrefour/Lidl. Si quieres potenciar, el Módulo 3 recomienda solo 3 productos con evidencia real." />
          <FAQItem question="¿Y si me pierdo días?" answer="El programa es 100% asincrónico. Lo haces a tu ritmo. El acceso es para siempre. No hay fecha de expiración." />
          <FAQItem question="¿Por qué no es más caro?" answer="Porque es el lanzamiento. Necesitamos casos reales para testimonios. Después sube a €87. Si entras hoy, te quedas con tu precio para siempre." />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 md:py-24 bg-navy text-center">
        <div className="max-w-2xl mx-auto px-6">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-cream leading-tight mb-4">
              El día más caro de tu vida es el siguiente que pasas sin entender qué te está pasando.
            </h2>
            <p className="text-cream/60 leading-relaxed mb-8">
              El método existe. Funciona. Tiene 72 horas de garantía.
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <Link href="#comprar" className="inline-flex items-center gap-3 bg-coral hover:bg-coral-light text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all duration-300 hover:scale-105">
              → SÍ, QUIERO MI RESET 21
            </Link>
            <p className="text-cream/40 text-sm mt-4">€47 hoy · Sin renovaciones · Acceso inmediato · 🛡️ Garantía 72h</p>
          </FadeIn>
        </div>
      </section>

      {/* TRUST FOOTER */}
      <section className="py-8 bg-navy-light text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-cream/30 text-xs mb-4">
            <span>✅ Pago seguro vía Hotmart</span>
            <span>✅ Acceso inmediato</span>
            <span>✅ Móvil, tablet, ordenador</span>
            <span>✅ Descargable para siempre</span>
            <span>✅ Sin suscripciones</span>
          </div>
          <p className="text-cream/20 text-xs">
            Vientre Libre · RESET 21 es un programa educativo. No sustituye el consejo médico profesional.
          </p>
          <p className="text-cream/15 text-xs mt-2">
            © {new Date().getFullYear()} Vientre Libre · Política de privacidad · Términos · Contacto
          </p>
        </div>
      </section>
    </main>
  );
}

export default function ProgramaPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-pattern"><div className="w-12 h-12 rounded-full border-4 border-olive/20 border-t-olive animate-spin" /></div>}>
      <SalesContent />
    </Suspense>
  );
}
