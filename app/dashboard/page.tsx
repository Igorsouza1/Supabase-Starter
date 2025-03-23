import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { Camera, Upload, BarChart3, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    redirect("/auth/sign-in")
  }

  // Buscar perfil do usuário
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", session.user.id).single()

  // Buscar estatísticas de jobs
  const { data: jobs, error: jobsError } = await supabase
    .from("jobs")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false })
    .limit(5)

  // Buscar estatísticas de uploads
  const { count: totalUploads } = await supabase
    .from("uploads")
    .select("*", { count: "exact", head: true })
    .eq("user_id", session.user.id)

  const { count: imagesWithAnimals } = await supabase
    .from("uploads")
    .select("*", { count: "exact", head: true })
    .eq("user_id", session.user.id)
    .eq("has_animal", true)

  // Buscar limites do usuário
  const { data: userLimits } = await supabase.from("user_limits").select("*").eq("user_id", session.user.id).single()

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-[#2C3930]">Dashboard</h2>
        <div className="flex items-center gap-2">
          <Button className="bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
            <Upload className="mr-2 h-4 w-4" />
            Enviar Imagens
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-[#A27B5C]/20 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#A27B5C]/10 p-3">
              <Camera className="h-6 w-6 text-[#A27B5C]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3F4F44]">Total de Imagens</p>
              <h3 className="text-2xl font-bold text-[#2C3930]">{totalUploads || 0}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#A27B5C]/20 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#A27B5C]/10 p-3">
              <BarChart3 className="h-6 w-6 text-[#A27B5C]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3F4F44]">Imagens com Animais</p>
              <h3 className="text-2xl font-bold text-[#2C3930]">{imagesWithAnimals || 0}</h3>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-[#A27B5C]/20 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-[#A27B5C]/10 p-3">
              <Settings className="h-6 w-6 text-[#A27B5C]" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#3F4F44]">Uso do Plano</p>
              <h3 className="text-2xl font-bold text-[#2C3930]">
                {userLimits ? `${userLimits.current_images}/${userLimits.max_images}` : "0/5000"}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {(!jobs || jobs.length === 0) && (
        <div className="mt-8 rounded-lg border border-[#A27B5C]/20 bg-white p-8 text-center shadow-sm">
          <Camera className="mx-auto h-12 w-12 text-[#A27B5C]/50" />
          <h3 className="mt-4 text-xl font-medium text-[#2C3930]">Comece a processar suas imagens</h3>
          <p className="mt-2 text-[#3F4F44]">
            Você ainda não tem imagens processadas. Faça upload das suas primeiras imagens para começar.
          </p>
          <Button className="mt-6 bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
            <Upload className="mr-2 h-4 w-4" />
            Enviar Imagens
          </Button>
        </div>
      )}

      {jobs && jobs.length > 0 && (
        <div className="rounded-lg border border-[#A27B5C]/20 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-bold text-[#2C3930] mb-4">Jobs Recentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#A27B5C]/20">
                  <th className="px-4 py-2 text-left text-sm font-medium text-[#3F4F44]">ID</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-[#3F4F44]">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-[#3F4F44]">Criado em</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-[#3F4F44]">Imagens</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b border-[#A27B5C]/10">
                    <td className="px-4 py-2 text-sm text-[#3F4F44]">{job.id.substring(0, 8)}...</td>
                    <td className="px-4 py-2 text-sm">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          job.status === "done"
                            ? "bg-green-100 text-green-800"
                            : job.status === "error"
                              ? "bg-red-100 text-red-800"
                              : job.status === "processing"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {job.status === "done"
                          ? "Concluído"
                          : job.status === "error"
                            ? "Erro"
                            : job.status === "processing"
                              ? "Processando"
                              : "Pendente"}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-[#3F4F44]">
                      {new Date(job.created_at).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-4 py-2 text-sm text-[#3F4F44]">{job.image_count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

