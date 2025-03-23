"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"

export default function HeaderAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Verificar sessão atual
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user || null)
      setLoading(false)
    }

    checkSession()

    // Configurar listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const handleLogout = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (error) {
      console.error("Erro ao fazer logout:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center gap-4">
        <div className="h-9 w-20 bg-[#3F4F44]/20 animate-pulse rounded-md"></div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="text-[#3F4F44] hover:text-[#A27B5C] transition-colors">
          Dashboard
        </Link>
        <Button
          onClick={handleLogout}
          variant="outline"
          className="border-[#3F4F44] text-[#3F4F44] hover:bg-[#3F4F44] hover:text-[#DCD7C9]"
        >
          Sair
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-4">
      <Link
        href="/auth/sign-in"
        className="inline-flex h-9 items-center justify-center rounded-md border border-[#3F4F44] bg-transparent px-4 py-2 text-sm font-medium text-[#3F4F44] shadow-sm transition-colors hover:bg-[#3F4F44] hover:text-[#DCD7C9] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A27B5C]"
      >
        Entrar
      </Link>
      <Link
        href="/auth/sign-up"
        className="inline-flex h-9 items-center justify-center rounded-md bg-[#A27B5C] px-4 py-2 text-sm font-medium text-[#DCD7C9] shadow transition-colors hover:bg-[#8a6a4e] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#A27B5C]"
      >
        Cadastrar
      </Link>
    </div>
  )
}

