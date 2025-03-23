"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { signIn } from "@/lib/supabase-actions"
import { useFormState } from "react-dom"

const initialState = {
  error: null,
  success: null,
}

export default function SignInForm() {
  const [state, formAction] = useFormState(signIn, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true)
    formAction(formData)
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {state?.error && (
        <div className="flex items-start rounded-lg bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
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
          name="password"
          type="password"
          required
          className="w-full rounded-md border border-[#A27B5C]/30 p-2"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <div className="text-center text-sm">
        <span className="text-[#3F4F44]">Não tem uma conta? </span>
        <Link href="/auth/sign-up" className="font-medium text-[#A27B5C] hover:text-[#8a6a4e]">
          Cadastre-se
        </Link>
      </div>
    </form>
  )
}

