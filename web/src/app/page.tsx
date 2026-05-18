import Link from "next/link";

export default function Home() {
  return (
    <main className="flex items-center justify-center min-h-screen bg-pattern">
      <div className="text-center px-6">
        <p className="text-olive font-medium tracking-widest uppercase text-sm mb-4">
          Vientre Libre · RESET 21
        </p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold text-navy leading-tight mb-6">
          No comes mal.<br />
          <span className="text-coral">Tu cuerpo cambió.</span>
        </h1>
        <p className="text-muted text-lg md:text-xl max-w-lg mx-auto mb-10">
          Reordénalo en 21 días — sin restringir nada de por vida.
        </p>
        <Link
          href="/test"
          className="inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg glow-coral"
        >
          EMPEZAR EL TEST GRATIS →
        </Link>
      </div>
    </main>
  );
}
