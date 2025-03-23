"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string

  const cookieStore = cookies()
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  return redirect("/dashboard")
}

export async function signUp(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const fullName = formData.get("fullName") as string

  const cookieStore = cookies()
  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  return {
    success: "Verifique seu e-mail para confirmar seu cadastro.",
  }
}

export async function signOut() {
  const supabase = await createClient()

  // Verificar se auth existe antes de chamar signOut
  if (supabase && supabase.auth) {
    await supabase.auth.signOut()
  }

  return redirect("/")
}

export async function resetPassword(formData: FormData) {
  const email = formData.get("email") as string

  const cookieStore = cookies()
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/update-password`,
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  return {
    success: "Verifique seu e-mail para redefinir sua senha.",
  }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string

  const cookieStore = cookies()
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return {
      error: error.message,
    }
  }

  return redirect("/dashboard")
}

