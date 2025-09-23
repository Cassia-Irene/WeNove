"use client"


import Image from "next/image";
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Menu, Cloud, X } from "lucide-react"
import Link from "next/link";
import HeaderVendendor from "@/components/HeaderVendedor"


export default function CadastroLoja() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationType, setRegistrationType] = useState("juridica")

  const fileInput1 = useRef<HTMLInputElement>(null)
  const fileInput2 = useRef<HTMLInputElement>(null)
  const fileInputLogo = useRef<HTMLInputElement>(null)

  const [fileName1, setFileName1] = useState("")
  const [fileName2, setFileName2] = useState("")
  const [fileLogoName, setFileLogoName] = useState("")

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFileName: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name)
    }
  }

  const steps = [
    { number: 1, title: "Conta" },
    { number: 2, title: "Dados" },
    { number: 3, title: "Loja" },
  ]

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Abra sua Loja e Venda Conosco"
      case 2:
        return "Informações Fiscais e de Endereço"
      case 3:
        return "Personalize sua Loja"
      default:
        return "Abra sua Loja e Venda Conosco"
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Siga as etapas para configurar sua conta de vendedor. É rápido e fácil!"
      case 2:
        return "Precisamos dos seus dados para a emissão de notas e para garantir a conformidade."
      case 3:
        return "Informe onde você deseja receber o dinheiro das suas vendas."
      case 4:
        return "Envie seus documentos para análise e para garantir a segurança da plataforma."
      case 5:
        return "Estamos quase lá! Configure os detalhes finais da sua vitrine."
      default:
        return "Siga as etapas para configurar sua conta de vendedor. É rápido e fácil!"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-dosis">

      <HeaderVendendor />

      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#8B3130] rounded-full flex items-center justify-center animate-scale-in animate-delay-200 hover:scale-110 transition-transform duration-200"
      >
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </button>

      {/* Menu do celular */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden animate-fade-in">

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)} />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-[#8B3130] shadow-xl transform transition-transform duration-300 ease-in-out animate-slide-right">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#FFCC00]/20">
              <Image
                src="/Logo-landing.svg"
                alt="Wenove Logo"
                height={30}
                width={30}
                className="w-30" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#FFCC00] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-6 space-y-6">
              <Link
                href="/"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>

              <Link
                href="/sobre-nos"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre nós
              </Link>

              <Link
                href="/produtos"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Produtos
              </Link>

              <Link
                href="/contato"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>

          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-fade-in">

        {/* Seção de Heróis */}
        <div className="text-center mb-8 sm:mb-12 animate-slide-up animate-delay-300">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#000000] mb-4 text-balance hover:scale-105 transition-transform duration-300">
            {getStepTitle()}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 text-pretty max-w-3xl mx-auto animate-fade-in animate-delay-500">{getStepSubtitle()}</p>
        </div>

        {/* Etapas do progresso */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 mb-8 animate-slide-up animate-delay-600 hover:shadow-lg transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 mb-6 sm:mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-2 animate-scale-in" style={{ animationDelay: `${700 + index * 100}ms` }}>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 hover:scale-110 ${step.number === currentStep
                    ? "bg-[#E9EFD3] text-[#0C3729]"
                    : step.number < currentStep
                      ? "bg-[#88A51D] text-[#0C3729]"
                      : "bg-gray-200 text-gray-600"
                    }`}
                >
                  {step.number}
                </span>
                <span
                  className={`text-sm sm:text-base transition-colors duration-300 ${step.number === currentStep
                    ? "font-semibold text-gray-900 border-b-2 border-[#88A51D] pb-1"
                    : "text-gray-600"
                    }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && <div className="hidden sm:block w-8 h-px bg-gray-200 ml-2" />}
              </div>
            ))}
          </div>

          {/* Seção de formulário */}
          <div>
            {currentStep === 1 && (
              <>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">1. Informações da Conta</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                      Nome completo ou Razão Social <span className="text-red-500">*</span>
                    </Label>
                    <Input id="fullName" type="text" className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeName" className="text-sm font-medium text-gray-700">
                      Nome da Loja <span className="text-red-500">*</span>
                    </Label>
                    <Input id="storeName" type="text" className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" type="email" className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefone (WhatsApp) <span className="text-red-500">*</span>
                    </Label>
                    <Input id="phone" type="tel" className="w-full" />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">2. Dados Fiscais e Endereço</h2>

                <div className="space-y-6">
                  {/* Dados da Entidade Jurídica */}
                  {registrationType === "juridica" && (
                    <div className="space-y-4">
                      <h3 className="text-base font-medium text-gray-900">
                        Dados de Pessoa Jurídica <span className="text-red-500">*</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="cnpj" className="text-sm font-medium text-gray-700">
                            CNPJ <span className="text-red-500">*</span>
                          </Label>
                          <Input id="cnpj" type="text" className="w-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dados de Pessoa Física */}
                  {registrationType === "fisica" && (
                    <div className="space-y-4">
                      <h3 className="text-base font-medium text-gray-900">Dados de Pessoa Física</h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="cpf" className="text-sm font-medium text-gray-700">
                            CPF <span className="text-red-500">*</span>
                          </Label>
                          <Input id="cpf" type="text" className="w-full" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomeLoja" className="text-sm font-medium text-gray-700">
                            Nome da Loja <span className="text-red-500">*</span>
                          </Label>
                          <Input id="nomeLoja" type="text" className="w-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Endereço da empresa */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900">
                      Endereço Completo <span className="text-red-500">*</span>
                    </h3>

                    <div className="space-y-4">

                      {/* CEP e Endereço */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <Input id="cep" type="text" placeholder="CEP" className="flex-1" />
                            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 whitespace-nowrap">
                              BUSCAR CEP
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Input id="endereco" type="text" placeholder="Rua, Avenida, etc." className="w-full" />
                        </div>
                      </div>

                      {/* Detalhes do endereço */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Input id="numero" type="text" placeholder="Número" className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <Input id="bairro" type="text" placeholder="Bairro" className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <Input id="cidade" type="text" placeholder="Cidade" className="w-full" />
                        </div>
                        <div className="space-y-2">
                          <Input id="estado" type="text" placeholder="Estado" className="w-full" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  5. Configurações da Loja e Políticas
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Categoria principal */}
                    <div className="space-y-2">
                      <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                        Categoria Principal <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="categoria"
                        type="text"
                        placeholder="Blusas"
                        className="w-full"
                      />
                    </div>

                    {/* Links de mídia social */}
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks" className="text-sm font-medium text-gray-700">
                        Seu principal @ nas mídias
                      </Label>
                      <Input
                        id="socialLinks"
                        type="url"
                        placeholder="@lojawenove"
                        className="w-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Categoria principal */}
                    <div className="space-y-2">
                      <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                        URL da Logo <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="url_logo"
                        type="link"
                        placeholder="https://www.exemplo.com/logo.png"
                        className="w-full"
                      />
                    </div>

                    {/* Links de mídia social */}
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks" className="text-sm font-medium text-gray-700">
                        URL do Banner
                      </Label>
                      <Input
                        id="socialLinks"
                        type="url"
                        placeholder="https://www.exemplo.com/banner.png"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Descrição da Loja */}
                  <div className="space-y-2">
                    <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                      Breve descrição da sua loja
                    </Label>
                    <Textarea
                      id="descricao"
                      rows={4}
                      placeholder="Conte um pouco sobre sua loja, produtos e diferenciais..."
                      className="w-full resize-none"
                    />
                  </div>

                  {/* Descrição da Loja */}
                  <div className="space-y-2">
                    <Label htmlFor="descricao" className="text-sm font-medium text-gray-700">
                      A proposta da sua empresa para entrar no mundo do upscaling têxtil sustentável
                    </Label>
                    <Textarea
                      id="descricao"
                      rows={4}
                      placeholder="Nossa proposta é produzir peças sem resíduos, respeitando o meio ambiente e as necessidades dos consumidores."
                      className="w-full resize-none"
                    />
                  </div>

                  {/* Termos e Condições */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="terms" className="mt-1" />
                      <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Eu li e aceito os <span className="text-[#88A51D] underline">Termos de Uso e Políticas</span> do
                        marketplace.
                      </Label>
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox id="lgpd" className="mt-1" />
                      <Label htmlFor="lgpd" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Eu concordo com o uso dos meus dados conforme a LGPD para fins de cadastro e operação da loja.
                      </Label>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Botões de ação */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mt-8 pt-6 border-t">
              {currentStep === 1 ? (
                <>
                  <Button
                    variant="outline"
                    className="bg-[#E9EFD3] text-[#0C3729] border-[#E9EFD3] hover:bg-[#88A51D] w-full sm:w-auto order-2 sm:order-1"
                  >
                    Salvar Rascunho
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-[#0C3729] hover:bg-[#88A51D] text-[#E9EFD3] w-full sm:w-auto order-1 sm:order-2"
                  >
                    Próximo
                  </Button>
                </>
              ) : currentStep === 5 ? (
                <>
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="bg-[#E9EFD3] text-[#0C3729] border-[#E9EFD3] hover:bg-[#88A51D] w-full sm:w-auto order-2 sm:order-1"
                  >
                    Anterior
                  </Button>
                  <Button className="bg-[#0C3729] hover:bg-[#88A51D] text-[#E9EFD3] w-full sm:w-auto order-1 sm:order-2">
                    Finalizar Cadastro
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="bg-[#E9EFD3] text-[#0C3729] border-[#E9EFD3] hover:bg-[#88A51D]  w-full sm:w-auto order-2 sm:order-1"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-[#0C3729] hover:bg-[#88A51D] text-[#E9EFD3]  w-full sm:w-auto order-1 sm:order-2"
                  >
                    Próximo
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
