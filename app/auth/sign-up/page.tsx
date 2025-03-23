"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setLoading(true)

    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        throw error
      }

      // Cadastro bem-sucedido
      setSuccess("Verifique seu email para confirmar seu cadastro.")
      setEmail("")
      setPassword("")
    } catch (err: any) {
      console.error("Erro de cadastro:", err.message)
      setError(err.message || "Falha ao criar conta. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3930]">Criar uma conta</h1>
          <p className="mt-2 text-[#3F4F44]">Junte-se ao FaunaDetec para começar a processar suas imagens</p>
        </div>

        {success ? (
          <div className="space-y-6 text-center">
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#2C3930]">Verifique seu email</h2>
            <p className="text-[#3F4F44]">{success}</p>

            <div className="pt-4">
              <Link href="/auth/sign-in">
                <Button className="bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">Voltar para o login</Button>
              </Link>
            </div>
          </div>
        ) : (
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
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full rounded-md border border-[#A27B5C]/30 p-2"
              />
              <p className="text-xs text-[#3F4F44]">A senha deve ter pelo menos 6 caracteres</p>
            </div>

            <Button type="submit" disabled={loading} className="w-full bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
              {loading ? "Criando conta..." : "Criar conta"}
            </Button>

            <div className="text-center text-sm">
              <span className="text-[#3F4F44]">Já tem uma conta? </span>
              <Link href="/auth/sign-in" className="font-medium text-[#A27B5C] hover:text-[#8a6a4e]">
                Entrar
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

