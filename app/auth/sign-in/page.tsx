"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Login bem-sucedido, redirecionar para o dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      console.error("Erro de login:", err.message)
      setError(err.message || "Falha ao fazer login. Verifique suas credenciais.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3930]">Entrar no FaunaDetec</h1>
          <p className="mt-2 text-[#3F4F44]">Acesse sua conta para gerenciar seus projetos</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="flex items-start rounded-lg bg-red-50 p-4 text-sm text-red-800">
              <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              required
              className="w-full rounded-md border border-[#A27B5C]/30 p-2"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Senha</Label>
              <Link href="/auth/forgot-password" className="text-sm text-[#A27B5C] hover:text-[#8a6a4e]">
                Esqueceu a senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-[#A27B5C]/30 p-2"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
            {loading ? "Entrando..." : "Entrar"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-[#3F4F44]">Não tem uma conta? </span>
            <Link href="/auth/sign-up" className="font-medium text-[#A27B5C] hover:text-[#8a6a4e]">
              Cadastre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

