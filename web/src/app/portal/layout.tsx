"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const supabase = createClient();
  const router = useRouter();

  // Si estamos en la página de login o en el callback, no mostramos el layout del portal
  if (pathname === "/portal/login" || pathname === "/portal/auth/callback") {
    return <>{children}</>;
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/portal/login");
    router.refresh();
  };

  const navItems = [
    { label: "Dashboard", href: "/portal/dashboard", icon: "🏠" },
    { label: "Módulos", href: "/portal/modulo", icon: "▶️" },
    { label: "Descargas", href: "/portal/descargas", icon: "📁" },
    { label: "Mi Cuenta", href: "/portal/cuenta", icon: "👤" },
  ];

  return (
    <div className="min-h-screen bg-cream flex flex-col md:flex-row">
      {/* Sidebar para Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-navy text-cream/80 min-h-screen border-r border-navy-light sticky top-0">
        <div className="p-6">
          <Link href="/portal/dashboard" className="font-heading font-bold text-xl text-cream">
            VIENTRE LIBRE
            <span className="block text-xs font-sans text-coral font-normal tracking-widest uppercase mt-1">
              Reset 21
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors text-sm font-medium ${
                  isActive
                    ? "bg-olive text-cream"
                    : "hover:bg-cream/5 hover:text-cream"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-cream/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 text-sm text-cream/50 hover:text-cream transition-colors"
          >
            <span>🚪</span> Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 w-full relative pb-24 md:pb-0">
        {/* Header móvil */}
        <header className="md:hidden bg-navy text-cream p-4 sticky top-0 z-40">
          <Link href="/portal/dashboard" className="font-heading font-bold text-lg">
            VIENTRE LIBRE
          </Link>
        </header>

        {children}
      </main>

      {/* Navegación móvil inferior */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-navy border-t border-cream/10 flex items-center justify-around p-3 z-50 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
                isActive ? "text-coral" : "text-cream/50 hover:text-cream/80"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
