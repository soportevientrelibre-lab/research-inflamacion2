"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function EmailCapture() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Por favor, introduce un email válido");
      return;
    }

    setIsSubmitting(true);

    // Guardar en sessionStorage para optimismo y evitar bloqueos si la API falla
    sessionStorage.setItem("quiz-email", email);

    // Obtener los datos del quiz del sessionStorage
    const perfil = sessionStorage.getItem("quiz-perfil") || "mixto-sibo"; // Fallback por defecto
    const scoresStr = sessionStorage.getItem("quiz-scores");
    const scores = scoresStr ? JSON.parse(scoresStr) : {};

    try {
      // Enviar de forma asíncrona al backend
      await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          perfil,
          scores,
        }),
      });
    } catch (err) {
      console.error("No se pudo guardar el lead en tiempo real", err);
    }

    // Redirigir suavemente al resultado
    setTimeout(() => {
      router.push("/test/resultado");
    }, 400);
  };

  return (
    <main className="min-h-screen flex flex-col bg-pattern">
      {/* Progress Bar */}
      <div className="sticky top-0 z-50 bg-cream/90 backdrop-blur-md">
        <div className="max-w-xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={() => router.push("/test/pregunta/8")}
              className="text-navy/40 hover:text-navy transition-colors"
              aria-label="Volver"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M5 12L12 19M5 12L12 5" />
              </svg>
            </button>
            <span className="text-xs text-muted font-medium">
              Último paso
            </span>
          </div>
          <div className="h-1.5 bg-navy/5 rounded-full overflow-hidden">
            <motion.div
              className="h-full progress-bar-fill rounded-full"
              initial={{ width: "87%" }}
              animate={{ width: "95%" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-2xl bg-olive/10 flex items-center justify-center text-4xl mx-auto mb-6"
          >
            📋
          </motion.div>

          <h2 className="font-heading text-2xl md:text-3xl font-bold text-navy leading-snug mb-3">
            Tu resultado está listo
          </h2>
          <p className="text-navy/60 text-base mb-8 max-w-sm mx-auto leading-relaxed">
            Introduce tu email para ver tu{" "}
            <strong className="text-navy">perfil de inflamación personalizado</strong>{" "}
            y recibir tu Informe Personal.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                id="quiz-email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="tu@email.com"
                autoFocus
                className={`w-full px-5 py-4 rounded-xl border-2 bg-white/80 text-navy text-center text-lg font-medium placeholder:text-navy/25 transition-all duration-200 focus:outline-none focus:ring-0 ${
                  error
                    ? "border-red-400 focus:border-red-400"
                    : "border-navy/10 focus:border-olive"
                }`}
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-2"
                >
                  {error}
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              id="cta-email-submit"
              className={`w-full py-4 rounded-xl font-bold text-white text-lg transition-all duration-300 ${
                isSubmitting
                  ? "bg-olive/50 cursor-not-allowed"
                  : "bg-coral hover:bg-coral-dark hover:scale-[1.02] glow-coral shadow-lg shadow-coral/20"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Analizando tus respuestas…
                </span>
              ) : (
                "VER MI RESULTADO →"
              )}
            </button>
          </form>

          {/* Trust signals */}
          <div className="mt-8 flex items-center justify-center gap-6 text-muted/40">
            <div className="flex items-center gap-1.5 text-xs">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
              </svg>
              100% privado
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Sin spam
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
