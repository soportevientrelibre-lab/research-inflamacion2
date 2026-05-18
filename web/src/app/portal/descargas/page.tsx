"use client";

import { motion } from "framer-motion";

export default function DescargasPage() {
  const downloads = [
    { title: "Tu Informe Personal de la Paradoja", desc: "Basado en tu perfil del quiz. La hoja de ruta.", icon: "📋", isNew: false },
    { title: "Los 5 Expedientes de los Villanos", desc: "Brócoli, garbanzos, cebolla/ajo, avena, kale — mecanismo + sustituto.", icon: "🔍", isNew: true },
    { title: "Las 21 Combinaciones Base", desc: "Una por día. Foto, 20 min máximo, semáforo FODMAP, fase del ciclo.", icon: "🍽️", isNew: false },
    { title: "El Tracker Ciclo-Intestinal", desc: "Notion template que sincroniza síntomas con fases del ciclo.", icon: "📊", isNew: false },
    { title: "El Mapa Personal de la Paradoja", desc: "Workbook que completas en 21 días para entender tu cuerpo.", icon: "🗺️", isNew: false },
    { title: "Índice de Etiquetas Anti-Villanos", desc: "Los 22 ingredientes disfrazados en productos «saludables».", icon: "🏷️", isNew: false },
    { title: "El Conversor Anti-Villanos", desc: "Sustitutos que mantienen el sabor. Único en español.", icon: "🔄", isNew: false },
  ];

  const bonuses = [
    { title: "Botiquín de Audios de Emergencia Mental", desc: "5 audios para los 5 momentos donde abandonas.", icon: "🎧" },
    { title: "Comer Libre en Cualquier Mesa", desc: "Cómo pedir en restaurantes sin hincharte.", icon: "🍷" },
    { title: "La Carta para tu Médico", desc: "PDF clínico para solicitar pruebas raramente pedidas.", icon: "💊" },
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-2">
          Tus Descargas
        </h1>
        <p className="text-navy/60 text-lg">
          Todos tus entregables y herramientas complementarias al programa.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="font-heading text-xl font-bold text-olive mb-6 flex items-center gap-2">
          <span>📦</span> Entregables del Programa
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {downloads.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5 flex items-start gap-4 hover:border-coral/30 transition-all group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-white/50 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-heading font-bold text-navy">{item.title}</h3>
                  {item.isNew && (
                    <span className="bg-coral/10 text-coral text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Nuevo
                    </span>
                  )}
                </div>
                <p className="text-navy/60 text-xs mb-3 leading-relaxed">{item.desc}</p>
                <button className="text-coral text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                  Descargar PDF <span>↓</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-heading text-xl font-bold text-olive mb-6 flex items-center gap-2">
          <span>🎁</span> Tus Bonos
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {bonuses.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + (i * 0.05) }}
              className="glass-card rounded-2xl p-5 hover:border-navy/20 transition-all group cursor-pointer"
            >
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform origin-left">
                {item.icon}
              </div>
              <h3 className="font-heading font-bold text-navy mb-1">{item.title}</h3>
              <p className="text-navy/60 text-xs mb-4 leading-relaxed">{item.desc}</p>
              <button className="text-navy text-xs font-bold uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                Acceder <span>→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
