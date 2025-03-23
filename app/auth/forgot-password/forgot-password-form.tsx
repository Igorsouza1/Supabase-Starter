"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"
import { resetPassword } from "@/lib/supabase-actions"
import { useFormState } from "react-dom"

const initialState = {
  error: null,
  success: null,
}

export default function ForgotPasswordForm() {
  const [state, formAction] = useFormState(resetPassword, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (formData: FormData) => {
    setIsSubmitting(true)
    formAction(formData)
  }

  if (state?.success) {
    return (
      <div className="space-y-6 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>

        <h2 className="text-xl font-bold text-[#2C3930]">Verifique seu email</h2>

        <p className="text-[#3F4F44]">{state.success}</p>

        <div className="pt-4">
          <Link href="/auth/sign-in">
            <Button className="bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">Voltar para o login</Button>
          </Link>
        </div>
      </div>
    )
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

      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
        {isSubmitting ? "Enviando..." : "Enviar link de recuperação"}
      </Button>

      <div className="text-center text-sm">
        <span className="text-[#3F4F44]">Lembrou sua senha? </span>
        <Link href="/auth/sign-in" className="font-medium text-[#A27B5C] hover:text-[#8a6a4e]">
          Voltar para o login
        </Link>
      </div>
    </form>
  )
}

