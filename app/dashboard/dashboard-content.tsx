"use client"

import { useState } from "react"
import type { User } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImageIcon, FilterIcon, BarChart } from "lucide-react"

interface DashboardContentProps {
  user: User
}

export default function DashboardContent({ user }: DashboardContentProps) {
  const [activeTab, setActiveTab] = useState("overview")

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

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="bg-[#DCD7C9]/50">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#A27B5C] data-[state=active]:text-[#DCD7C9]">
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="images" className="data-[state=active]:bg-[#A27B5C] data-[state=active]:text-[#DCD7C9]">
            Imagens
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-[#A27B5C] data-[state=active]:text-[#DCD7C9]">
            Relatórios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Imagens</CardTitle>
                <ImageIcon className="h-4 w-4 text-[#A27B5C]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Nenhuma imagem processada ainda</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Imagens com Animais</CardTitle>
                <FilterIcon className="h-4 w-4 text-[#A27B5C]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0</div>
                <p className="text-xs text-muted-foreground">Nenhuma detecção ainda</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Uso do Plano</CardTitle>
                <BarChart className="h-4 w-4 text-[#A27B5C]" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">0%</div>
                <p className="text-xs text-muted-foreground">Do seu limite mensal</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Bem-vindo ao FaunaDetec</CardTitle>
              <CardDescription>Comece a processar suas imagens de armadilhas fotográficas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-[#3F4F44]">
                Olá, {user.user_metadata?.full_name || user.email?.split("@")[0]}! Para começar a usar o FaunaDetec,
                siga os passos abaixo:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-[#3F4F44]">
                <li>Clique no botão "Enviar Imagens" para fazer upload das suas fotos</li>
                <li>Aguarde o processamento automático pela nossa IA</li>
                <li>Visualize os resultados na aba "Imagens"</li>
                <li>Gere relatórios e exporte dados na aba "Relatórios"</li>
              </ol>
              <Button className="mt-4 bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
                <Upload className="mr-2 h-4 w-4" />
                Começar a Enviar
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Suas Imagens</CardTitle>
              <CardDescription>Visualize e gerencie todas as suas imagens processadas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="mx-auto h-12 w-12 text-[#A27B5C]/50" />
                <h3 className="mt-4 text-lg font-medium text-[#2C3930]">Nenhuma imagem encontrada</h3>
                <p className="mt-2 text-sm text-[#3F4F44]">
                  Envie suas primeiras imagens para começar a usar o FaunaDetec
                </p>
                <Button className="mt-4 bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Imagens
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios</CardTitle>
              <CardDescription>Gere relatórios e exporte dados das suas imagens</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="mx-auto h-12 w-12 text-[#A27B5C]/50" />
                <h3 className="mt-4 text-lg font-medium text-[#2C3930]">Nenhum dado disponível</h3>
                <p className="mt-2 text-sm text-[#3F4F44]">Envie e processe imagens para gerar relatórios</p>
                <Button className="mt-4 bg-[#A27B5C] text-[#DCD7C9] hover:bg-[#8a6a4e]">
                  <Upload className="mr-2 h-4 w-4" />
                  Enviar Imagens
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

