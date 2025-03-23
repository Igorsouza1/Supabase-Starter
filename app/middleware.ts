import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { createServerClient } from "@supabase/ssr"

export async function middleware(request: NextRequest) {
  // Criar uma resposta que podemos modificar
  const response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Criar cliente Supabase
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          response.cookies.set({
            name,
            value: "",
            ...options,
          })
        },
      },
    },
  )

  // Verificar se o usuário está autenticado
  const { data } = await supabase.auth.getSession()

  // Rotas que requerem autenticação
  const isAuthRoute = request.nextUrl.pathname.startsWith("/dashboard")

  // Páginas de autenticação
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/auth/sign-in") ||
    request.nextUrl.pathname.startsWith("/auth/sign-up") ||
    request.nextUrl.pathname.startsWith("/auth/forgot-password")

  // Redirecionar usuários não autenticados para a página de login
  if (isAuthRoute && !data.session) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url))
  }

  // Redirecionar usuários autenticados para o dashboard se tentarem acessar páginas de autenticação
  if (isAuthPage && data.session) {
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  return response
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}

