"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import { updatePassword } from "@/lib/supabase-actions"
import { useFormState } from "react-dom"

const initialState = {
  error: null,
  success: null,
}

export default function UpdatePasswordForm() {
  const [state, formAction] = useFormState(updatePassword, initialState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordMatch(false)
      return
    }

    setPasswordMatch(true)
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    formAction(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {state?.error && (
        <div className="flex items-start rounded-lg bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>{state.error}</span>
        </div>
      )}

      {!passwordMatch && (
        <div className="flex items-start rounded-lg bg-red-50 p-4 text-sm text-red-800">
          <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
          <span>As senhas não coincidem</span>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">Nova senha</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full rounded-md border border-[#A27B5C]/30 p-2"
        />
        <p className="text-xs text-[#3F4F44]">A senha deve ter pelo menos 6 caracteres</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirmar senha</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full rounded-md border border-[#A27B5C]/30 p-2"
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
        {isSubmitting ? "Atualizando..." : "Atualizar senha"}
      </Button>
    </form>
  )
}

