import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bastet",
  description: "Plataforma de cursos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col gap-10">
          <header className="layout-guide h-[16rem] flex flex-col justify-end">
            <h1 className="text-5xl font-bold py-5"><Link href="/" className="text-indigo-800 hover:text-indigo-900">Bastet</Link></h1>
            <p>Uma nova plataforma de cursos</p>
            <menu className="flex flex-row gap-4">
              <Link className="text-indigo-600" href="/cadastro">Fazer cadastro</Link>
              <Link className="text-indigo-600" href="/login">Fazer login</Link>
              <Link className="text-indigo-600" href="/usuario/will">Meus cursos</Link>
            </menu>
          </header>
          <div className="layout-guide flex-1">
            {children}
          </div>
          <footer className="bg-indigo-800">
            <p className="p-4 text-center text-white text-sm">A plataforma Baslet faz parte de um projeto criado para fins didaticos para a disciplina de Backend Node.js com SQL no Instituto INFnet.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
