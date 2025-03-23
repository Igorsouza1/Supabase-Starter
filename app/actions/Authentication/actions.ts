"use server"

import { encodedRedirect } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const signUpAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const password = formData.get("password")?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get("origin")

  if (!email || !password) {
    return encodedRedirect("error", "/auth/sign-up", "Email e senha são obrigatórios")
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    console.error(error.code + " " + error.message)
    return encodedRedirect("error", "/auth/sign-up", error.message)
  } else {
    return encodedRedirect(
      "success",
      "/auth/sign-up",
      "Obrigado por se cadastrar! Por favor, verifique seu email para confirmar sua conta.",
    )
  }
}

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return encodedRedirect("error", "/auth/sign-in", error.message)
  }

  return redirect("/dashboard")
}

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString()
  const supabase = await createClient()
  const origin = (await headers()).get("origin")
  const callbackUrl = formData.get("callbackUrl")?.toString()

  if (!email) {
    return encodedRedirect("error", "/auth/forgot-password", "Email é obrigatório")
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/auth/reset-password`,
  })

  if (error) {
    console.error(error.message)
    return encodedRedirect("error", "/auth/forgot-password", "Não foi possível redefinir a senha")
  }

  if (callbackUrl) {
    return redirect(callbackUrl)
  }

  return encodedRedirect(
    "success",
    "/auth/forgot-password",
    "Verifique seu email para obter um link para redefinir sua senha.",
  )
}

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient()

  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string

  if (!password || !confirmPassword) {
    return encodedRedirect("error", "/auth/reset-password", "Senha e confirmação de senha são obrigatórias")
  }

  if (password !== confirmPassword) {
    return encodedRedirect("error", "/auth/reset-password", "As senhas não coincidem")
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  })

  if (error) {
    return encodedRedirect("error", "/auth/reset-password", "Falha na atualização da senha")
  }

  return encodedRedirect("success", "/auth/reset-password", "Senha atualizada")
}

export const signOutAction = async () => {
  try {
    const supabase = await createClient()
    await supabase.auth.signOut()
    return redirect("/auth/sign-in")
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return redirect("/auth/sign-in")
  }
}

