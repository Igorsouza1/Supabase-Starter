import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function getSession() {
  const supabase = createClient(cookies())

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return session
}

export async function getUserDetails() {
  const supabase = createClient(cookies())

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return {
    ...user,
    profile,
  }
}

export async function requireAuth() {
  const session = await getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  return session
}

