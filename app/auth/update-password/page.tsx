import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"
import UpdatePasswordForm from "./update-password-form"

export default async function UpdatePasswordPage() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // Verificar se o usuário está autenticado via token de recuperação
  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3930]">Definir nova senha</h1>
          <p className="mt-2 text-[#3F4F44]">
            {session ? "Crie uma nova senha para sua conta" : "O link de recuperação é inválido ou expirou"}
          </p>
        </div>
        {session ? (
          <UpdatePasswordForm />
        ) : (
          <div className="text-center">
            <p className="text-[#3F4F44] mt-4">Por favor, solicite um novo link de recuperação de senha.</p>
            <a href="/auth/forgot-password" className="mt-4 inline-block text-[#A27B5C] hover:text-[#8a6a4e]">
              Voltar para recuperação de senha
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

