import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MVP Skills - Basketball Training Tracker",
  description: "Aplicación de seguimiento de entrenamiento de baloncesto y preparación física",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
