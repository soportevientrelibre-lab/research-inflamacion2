"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/portal/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-pattern flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full glass-card rounded-3xl p-8 shadow-xl"
      >
        <div className="text-center mb-8">
          <p className="font-heading font-bold text-navy text-2xl tracking-tight">VIENTRE LIBRE</p>
          <p className="text-olive text-xs font-bold tracking-widest uppercase mt-1">Portal de Alumnas</p>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-olive/10 text-olive rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
              ✉️
            </div>
            <h2 className="font-heading font-bold text-navy text-xl mb-2">Revisa tu correo</h2>
            <p className="text-navy/70 text-sm leading-relaxed mb-6">
              Hemos enviado un enlace mágico a <strong>{email}</strong>. 
              Haz clic en él para acceder inmediatamente.
            </p>
            <p className="text-navy/40 text-xs">
              No necesitas contraseña. Si no lo ves, revisa la carpeta de spam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-navy mb-2">
                Email de compra
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 rounded-xl border border-navy/10 bg-white/50 focus:bg-white focus:border-olive focus:ring-1 focus:ring-olive outline-none transition-all"
              />
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-coral/10 text-coral text-sm border border-coral/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-olive hover:bg-olive-dark disabled:bg-olive/50 text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-olive/20 flex justify-center items-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Recibir enlace de acceso →"
              )}
            </button>
            
            <p className="text-center text-navy/40 text-xs mt-6">
              Recibirás un enlace seguro para entrar sin contraseñas.
            </p>
          </form>
        )}
      </motion.div>
    </main>
  );
}
