"use client";

import { motion } from "framer-motion";


export default function ModuloPage() {
  const modulos = [
    {
      id: 1,
      title: "La Paradoja Tiene Nombre",
      subtitle: "Módulo Base",
      duration: "45 min",
      lessons: 3,
      desc: "Los 3 sistemas desincronizados y los 5 alimentos «sanos» que son TUS villanos. Comprende por qué tu cuerpo cambió a partir de los 35.",
      progress: 100,
    },
    {
      id: 2,
      title: "El Desinflama Rápido (Días 1-7)",
      subtitle: "Acción Inmediata",
      duration: "32 min",
      lessons: 4,
      desc: "Protocolo del orden glucémico + retiro estratégico. Primer cambio visible al día 5-7. Cómo aplicar la fibra primero.",
      progress: 25,
    },
    {
      id: 3,
      title: "El Reset Hormonal (Días 8-14)",
      subtitle: "Profundización",
      duration: "55 min",
      lessons: 5,
      desc: "Adaptar alimentación a cada fase de tu ciclo menstrual. Módulo que ningún competidor tiene. Sincroniza tu comida con tus hormonas.",
      progress: 0,
    },
    {
      id: 4,
      title: "El Mapa es Tuyo (Días 15-21)",
      subtitle: "Reintroducción",
      duration: "40 min",
      lessons: 4,
      desc: "Reintroducción inteligente. Construyes tu mapa personal de tolerancia de por vida para no tener que eliminar alimentos para siempre.",
      progress: 0,
    }
  ];

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-navy mb-2">
          Módulos del Programa
        </h1>
        <p className="text-navy/60 text-lg">
          Los 4 pilares fundamentales de tu RESET 21. Míralos a tu propio ritmo.
        </p>
      </header>

      <div className="space-y-8">
        {modulos.map((modulo, i) => (
          <motion.div
            key={modulo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-3xl overflow-hidden group"
          >
            <div className="md:flex">
              {/* Thumbnail Area */}
              <div className="md:w-1/3 bg-navy relative min-h-[200px] flex items-center justify-center cursor-pointer overflow-hidden">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy to-transparent z-0 opacity-80" />
                <span className="font-heading text-6xl font-bold text-white/10 absolute -bottom-4 -left-2 z-0">
                  0{modulo.id}
                </span>
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white text-2xl pl-1 z-20 group-hover:scale-110 transition-transform">
                  ▶
                </div>
              </div>

              {/* Content Area */}
              <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-center">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-olive text-xs font-bold uppercase tracking-widest">
                    {modulo.subtitle}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-navy/40 font-medium">
                    <span>{modulo.lessons} Lecciones</span>
                    <span>•</span>
                    <span>{modulo.duration}</span>
                  </div>
                </div>

                <h2 className="font-heading text-2xl font-bold text-navy mb-3 group-hover:text-coral transition-colors cursor-pointer">
                  Módulo {modulo.id}: {modulo.title}
                </h2>
                
                <p className="text-navy/60 leading-relaxed mb-6 text-sm">
                  {modulo.desc}
                </p>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-navy/40 mb-2 uppercase tracking-wide">
                    <span>Progreso</span>
                    <span>{modulo.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-navy/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${modulo.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 + (i * 0.1) }}
                      className={`h-full rounded-full ${modulo.progress === 100 ? 'bg-olive' : 'bg-coral'}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
