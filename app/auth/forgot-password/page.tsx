import { forgotPasswordAction } from "@/app/actions/Authentication/actions"
import { FormMessage } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { decodeMessage } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function ForgotPassword({
  searchParams: searchParamsPromise,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = (await searchParamsPromise) ?? {}
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    redirect("/dashboard")
  }

  const message = decodeMessage(searchParams)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3930]">Recuperar senha</h1>
          <p className="mt-2 text-[#3F4F44]">Enviaremos um link para redefinir sua senha</p>
        </div>

        <form className="flex-1 flex flex-col">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="seu@email.com" required />

            <SubmitButton pendingText="Enviando..." formAction={forgotPasswordAction}>
              Enviar link de recuperação
            </SubmitButton>
            <FormMessage message={message} />

            <div className="text-center text-sm mt-4">
              <span className="text-[#3F4F44]">Lembrou sua senha? </span>
              <Link href="/auth/sign-in" className="font-medium text-[#A27B5C] hover:text-[#8a6a4e]">
                Voltar para o login
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

