import type { Metadata } from "next";
import { Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/smooth-scroll";
import { MotionProvider } from "@/components/motion-provider";

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

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
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
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
