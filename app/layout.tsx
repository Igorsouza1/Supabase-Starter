import type React from "react"
import HeaderAuth from "@/components/header-auth"
import { EnvVarWarning } from "@/components/env-var-warning"
import { hasEnvVars } from "@/utils/supabase/check-env-vars"
import { Geist } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Camera } from "lucide-react"
import Link from "next/link"
import "./globals.css"

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "FaunaDetec - Processamento Inteligente de Imagens de Armadilhas Fotográficas",
  description:
    "Sistema de processamento inteligente de imagens de armadilhas fotográficas. Velocidade, privacidade e controle.",
    generator: 'v0.dev'
}

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-[#DCD7C9] text-[#2C3930]">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <main className="min-h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b border-[#A27B5C]/20 bg-[#DCD7C9]/80 backdrop-blur-sm">
              <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-2">
                  <Link href="/" className="flex items-center gap-2">
                    <Camera className="h-6 w-6 text-[#2C3930]" />
                    <span className="text-xl font-bold text-[#2C3930]">FaunaDetec</span>
                  </Link>
                </div>
                <nav className="hidden md:flex gap-6">
                  <Link href="#features" className="text-[#2C3930] hover:text-[#A27B5C] transition-colors">
                    Recursos
                  </Link>
                  <Link href="#how-it-works" className="text-[#2C3930] hover:text-[#A27B5C] transition-colors">
                    Como Funciona
                  </Link>
                  <Link href="#testimonials" className="text-[#2C3930] hover:text-[#A27B5C] transition-colors">
                    Depoimentos
                  </Link>
                </nav>
                <div className="flex items-center">{!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}</div>
              </div>
            </header>
            {children}
            <footer className="border-t border-[#A27B5C]/20 bg-[#DCD7C9]">
              <div className="container flex flex-col gap-6 py-8 md:py-12">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Camera className="h-6 w-6 text-[#2C3930]" />
                    <span className="text-xl font-bold text-[#2C3930]">FaunaDetec</span>
                  </div>
                  <nav className="flex gap-4 md:gap-6">
                    <Link href="#" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
                      Sobre
                    </Link>
                    <Link href="#" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
                      Recursos
                    </Link>
                    <Link href="#" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
                      Preços
                    </Link>
                    <Link href="#" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
                      Contato
                    </Link>
                  </nav>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-sm text-[#3F4F44]">
                    &copy; {new Date().getFullYear()} FaunaDetec. Todos os direitos reservados.
                  </p>
                  <div className="flex gap-4">
                    <Link href="#" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
                      Termos
                    </Link>
                    <Link href="#" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
                      Privacidade
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'