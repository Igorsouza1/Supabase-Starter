import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rotas que requerem autenticação
  const authRoutes = ["/dashboard", "/profile", "/upload"]

  // Rotas de autenticação
  const authPages = ["/auth/sign-in", "/auth/sign-up", "/auth/forgot-password"]

  // Verificar se a rota atual requer autenticação
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  // Verificar se a rota atual é uma página de autenticação
  const isAuthPage = authPages.some((page) => pathname === page)

  // Criar cliente Supabase
  const supabase = createClient(cookies())

  // Verificar se o usuário está autenticado
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Se o usuário não estiver autenticado e tentar acessar uma rota protegida
  if (!session && isAuthRoute) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }

  // Se o usuário estiver autenticado e tentar acessar uma página de autenticação
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/upload/:path*", "/auth/:path*"],
}

