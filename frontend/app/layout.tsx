import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { LayoutContainer } from "@/components/LayoutContainer";

export const metadata: Metadata = {
  title: "Cursos Open Source",
  description: "Plataforma open source de cursos en línea (base de proyecto)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <AuthProvider>
        <LayoutContainer>{children}</LayoutContainer>
      </AuthProvider>
    </html>
  );
}
