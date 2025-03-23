import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FastForward, Lock, Filter, Database, ArrowRight, CheckCircle2, Upload, Search, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-[#2C3930]">
                  Velocidade, privacidade e controle.
                </h1>
                <p className="text-xl text-[#3F4F44] md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Tudo o que você precisa para monitorar fauna, sem depender de ninguém.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-8">
                  <Button className="bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e] h-12 px-8 text-lg">
                    Começar Agora
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#3F4F44] text-[#3F4F44] hover:bg-[#3F4F44] hover:text-[#DCD7C9] h-12 px-8 text-lg"
                  >
                    Saiba Mais
                  </Button>
                </div>
              </div>
              <div className="relative lg:ml-auto">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-[#3F4F44]/10">
                  <Image
                    src="/onca.jpg"
                    alt="Camera trap image of wildlife"
                    width={700}
                    height={700}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-[#3F4F44]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#DCD7C9]">
                  Suba. Processe. Veja o que importa.
                </h2>
                <p className="max-w-[900px] text-[#DCD7C9]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Feito para quem cuida da natureza e precisa de agilidade.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <div className="grid gap-1 bg-[#2C3930]/30 p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FastForward className="h-6 w-6 text-[#DCD7C9]" />
                    <h3 className="text-xl font-bold text-[#DCD7C9]">Rápido</h3>
                  </div>
                  <p className="text-[#DCD7C9]/80">
                    Processamento em minutos, não semanas. Você subiu as imagens ontem. Hoje, já tem os dados.
                  </p>
                </div>
                <div className="grid gap-1 bg-[#2C3930]/30 p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Lock className="h-6 w-6 text-[#DCD7C9]" />
                    <h3 className="text-xl font-bold text-[#DCD7C9]">Privado</h3>
                  </div>
                  <p className="text-[#DCD7C9]/80">
                    Dados protegidos, sem compartilhamento. Você no controle do seu projeto.
                  </p>
                </div>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-1 bg-[#2C3930]/30 p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Filter className="h-6 w-6 text-[#DCD7C9]" />
                    <h3 className="text-xl font-bold text-[#DCD7C9]">Prático</h3>
                  </div>
                  <p className="text-[#DCD7C9]/80">
                    Interface fácil, uso direto, sem burocracia. Nada de filas. Nada de espera. Resultados agora.
                  </p>
                </div>
                <div className="grid gap-1 bg-[#2C3930]/30 p-6 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Database className="h-6 w-6 text-[#DCD7C9]" />
                    <h3 className="text-xl font-bold text-[#DCD7C9]">Flexível</h3>
                  </div>
                  <p className="text-[#DCD7C9]/80">
                    Cada projeto no seu ritmo, com seus critérios. Armazene o que importa, descarte o resto.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2C3930]">Como Funciona</h2>
                <p className="max-w-[900px] text-[#3F4F44] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Três passos simples para transformar suas imagens em dados valiosos.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A27B5C] text-[#DCD7C9]">
                  <Upload className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3930]">1. Envie suas imagens</h3>
                <p className="text-[#3F4F44]">
                  Faça upload de grandes lotes de imagens (até 20.000 por mês) diretamente pela nossa interface.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A27B5C] text-[#DCD7C9]">
                  <Search className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3930]">2. Processamento Inteligente</h3>
                <p className="text-[#3F4F44]">
                  Nossa IA (MegaDetector) identifica automaticamente os animais nas suas fotos com alta precisão.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#A27B5C] text-[#DCD7C9]">
                  <BarChart3 className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-[#2C3930]">3. Visualize e Analise</h3>
                <p className="text-[#3F4F44]">
                  Acesse um painel interativo com filtros para visualizar apenas as imagens relevantes para seu estudo.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-[#2C3930]">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#DCD7C9]">
                  O que dizem nossos usuários
                </h2>
                <p className="max-w-[900px] text-[#DCD7C9]/80 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pesquisadores e conservacionistas que já transformaram seus projetos com o FaunaDetec.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="rounded-lg bg-[#3F4F44] p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#A27B5C] p-2">
                    <CheckCircle2 className="h-4 w-4 text-[#DCD7C9]" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#DCD7C9]">
                      "Antes do FaunaDetec, eu passava semanas revisando milhares de imagens. Agora, consigo focar
                      apenas nas fotos com animais, economizando um tempo precioso para análise."
                    </p>
                    <div>
                      <p className="font-medium text-[#DCD7C9]">Dra. Mariana Silva</p>
                      <p className="text-sm text-[#DCD7C9]/70">Pesquisadora, UFRJ</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-[#3F4F44] p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-[#A27B5C] p-2">
                    <CheckCircle2 className="h-4 w-4 text-[#DCD7C9]" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-[#DCD7C9]">
                      "A privacidade dos dados era uma preocupação para nosso projeto com espécies ameaçadas. O
                      FaunaDetec nos deu o controle total sobre nossas imagens, sem comprometer a eficiência."
                    </p>
                    <div>
                      <p className="font-medium text-[#DCD7C9]">Carlos Mendes</p>
                      <p className="text-sm text-[#DCD7C9]/70">Coordenador, Instituto Mata Atlântica</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-[#2C3930]">Planos e Preços</h2>
                <p className="max-w-[900px] text-[#3F4F44] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Escolha o plano ideal para o seu projeto de monitoramento de fauna.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-8 py-12 md:grid-cols-3">
              {/* Plano Essencial */}
              <div className="flex flex-col rounded-lg border border-[#A27B5C]/20 bg-[#DCD7C9] shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C3930]">Plano Essencial</h3>
                  <div className="mt-4 flex items-baseline text-[#2C3930]">
                    <span className="text-3xl font-bold tracking-tight">R$19,90</span>
                    <span className="ml-1 text-sm font-medium text-[#3F4F44]">/mês</span>
                  </div>
                  <p className="mt-4 text-sm text-[#3F4F44]">Ideal para pequenos projetos e testes</p>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 pt-0">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">5.000 imagens/mês</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">2.000 imagens armazenadas (≈ 10 GB)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Favoritar e filtrar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Suporte via comunidade</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full bg-[#3F4F44] text-[#DCD7C9] hover:bg-[#2C3930]">Começar Agora</Button>
                </div>
              </div>

              {/* Plano Profissional - Destacado */}
              <div className="flex flex-col rounded-lg border-2 border-[#A27B5C] bg-[#DCD7C9] shadow-lg scale-105 relative">
                <div className="absolute -top-5 left-0 right-0 mx-auto w-fit px-4 py-1 bg-[#A27B5C] text-[#DCD7C9] text-sm font-medium rounded-full">
                  Mais Popular
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C3930]">Plano Profissional</h3>
                  <div className="mt-4 flex items-baseline text-[#2C3930]">
                    <span className="text-3xl font-bold tracking-tight">R$69,90</span>
                    <span className="ml-1 text-sm font-medium text-[#3F4F44]">/mês</span>
                  </div>
                  <p className="mt-4 text-sm text-[#3F4F44]">Ideal para ONGs e projetos médios</p>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 pt-0">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">20.000 imagens/mês</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">12.000 imagens armazenadas (≈ 60 GB)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Favoritar e filtrar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Acesso a relatórios</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Suporte por e-mail prioritário</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">Escolher Plano</Button>
                </div>
              </div>

              {/* Plano Avançado */}
              <div className="flex flex-col rounded-lg border border-[#A27B5C]/20 bg-[#DCD7C9] shadow-sm">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#2C3930]">Plano Avançado</h3>
                  <div className="mt-4 flex items-baseline text-[#2C3930]">
                    <span className="text-3xl font-bold tracking-tight">R$199,90</span>
                    <span className="ml-1 text-sm font-medium text-[#3F4F44]">/mês</span>
                  </div>
                  <p className="mt-4 text-sm text-[#3F4F44]">Ideal para grandes instituições e agências</p>
                </div>
                <div className="flex flex-1 flex-col justify-between p-6 pt-0">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">100.000 imagens/mês</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">60.000 imagens armazenadas (≈ 300 GB)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Favoritar e filtrar</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Relatórios + exportações</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Atendimento personalizado</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="mr-2 h-5 w-5 text-[#A27B5C]" />
                      <span className="text-sm text-[#3F4F44]">Acesso multiusuário</span>
                    </li>
                  </ul>
                  <Button className="mt-8 w-full bg-[#3F4F44] text-[#DCD7C9] hover:bg-[#2C3930]">
                    Falar com Consultor
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#2C3930]">
                  Pronto para transformar seu monitoramento de fauna?
                </h2>
                <p className="max-w-[700px] text-[#3F4F44] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Comece hoje mesmo e veja a diferença que o FaunaDetec pode fazer para seu projeto.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button className="bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e] h-12 px-8 text-lg">
                  Começar Gratuitamente
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="border-[#3F4F44] text-[#3F4F44] hover:bg-[#3F4F44] hover:text-[#DCD7C9] h-12 px-8 text-lg"
                >
                  Agendar Demonstração
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

