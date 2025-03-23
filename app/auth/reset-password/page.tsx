import { resetPasswordAction } from "@/app/actions/Authentication/actions"
import { FormMessage } from "@/components/form-message"
import { SubmitButton } from "@/components/submit-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { decodeMessage } from "@/utils/utils"
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function ResetPassword({
  searchParams: searchParamsPromise,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const searchParams = (await searchParamsPromise) ?? {}
  const supabase = await createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  const message = decodeMessage(searchParams)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center py-12">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#2C3930]">Definir nova senha</h1>
          <p className="mt-2 text-[#3F4F44]">Crie uma nova senha para sua conta</p>
        </div>

        <form className="flex-1 flex flex-col">
          <div className="flex flex-col gap-2 [&>input]:mb-3 mt-4">
            <Label htmlFor="password">Nova senha</Label>
            <Input type="password" name="password" placeholder="Nova senha" required minLength={6} />

            <Label htmlFor="confirmPassword">Confirmar senha</Label>
            <Input type="password" name="confirmPassword" placeholder="Confirme a nova senha" required />

            <SubmitButton pendingText="Atualizando..." formAction={resetPasswordAction}>
              Atualizar senha
            </SubmitButton>
            <FormMessage message={message} />
          </div>
        </form>
      </div>
    </div>
  )
}

