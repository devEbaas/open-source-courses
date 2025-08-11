"use client";

import { useAuth } from "@/app/context/AuthContext";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";

export const LayoutContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAuth();
  return (
    <body>
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <a href="/" className="font-semibold text-xl tracking-tight">
            Cursos OS
          </a>
          <nav className="flex gap-4 text-sm">
            {!user?.id && (
              <Link
                href="/register"
                className="group relative inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-teal-600 text-white font-semibold rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
              >
                <span>Registrate</span>{" "}
              </Link>
            )}
            {user?.id && <LogoutButton />}
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100dvh-64px)]">{children}</main>
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Cursos Open Source</p>
          <p className="text-gray-500">
            Base de proyecto lista para implementar lógica real.
          </p>
        </div>
      </footer>
    </body>
  );
};
