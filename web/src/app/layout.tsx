import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vientre Libre · RESET 21 — ¿Tu Ensalada Te Miente?",
  description:
    "Descubre en 90 segundos si tu inflamación es de glucosa, hormonal o mixta. El primer método en español que reordena los 3 sistemas en paralelo, en 21 días.",
  keywords: [
    "inflamación abdominal",
    "hinchazón",
    "perimenopausia",
    "salud digestiva",
    "mujer 35+",
    "vientre hinchado",
  ],
  openGraph: {
    title: "¿Tu Ensalada Te Miente? · Test de la Paradoja",
    description:
      "Descubre en 90 segundos si tu inflamación es de glucosa, hormonal o mixta.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>{children}</body>
    </html>
  );
}
