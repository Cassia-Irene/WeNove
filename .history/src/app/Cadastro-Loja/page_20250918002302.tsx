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

export default function SellerRegistration() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationType, setRegistrationType] = useState("fisica")

  // Refs e estado para upload
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
    { number: 3, title: "Pagamentos" },
    { number: 4, title: "Documentos" },
    { number: 5, title: "Loja" },
  ]

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1)
  }

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Abra sua Loja e Venda Conosco"
      case 2: return "Informações Fiscais e de Endereço"
      case 3: return "Configure seus Pagamentos"
      case 4: return "Verificação de Documentos"
      case 5: return "Personalize sua Loja"
      default: return "Abra sua Loja e Venda Conosco"
    }
  }

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1: return "Siga as etapas para configurar sua conta de vendedor. É rápido e fácil!"
      case 2: return "Precisamos dos seus dados para a emissão de notas e para garantir a conformidade."
      case 3: return "Informe onde você deseja receber o dinheiro das suas vendas."
      case 4: return "Envie seus documentos para análise e para garantir a segurança da plataforma."
      case 5: return "Estamos quase lá! Configure os detalhes finais da sua vitrine."
      default: return "Siga as etapas para configurar sua conta de vendedor. É rápido e fácil!"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 font-dosis">
      <HeaderVendendor />

      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#8B3130] rounded-full flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </button>

      {/* Menu do celular */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-[#8B3130] shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-6 border-b border-[#FFCC00]/20">
              <Image src="/Logo-landing.svg" alt="Wenove Logo" className="w-30" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#FFCC00] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <Link href="/" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
              <Link href="/sobre-nos" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Sobre nós</Link>
              <Link href="/produtos" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link>
              <Link href="/contato" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#000000] mb-4 text-balance">{getStepTitle()}</h1>
          <p className="text-base sm:text-lg text-gray-600 text-pretty max-w-3xl mx-auto">{getStepSubtitle()}</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 mb-8">
          {/* Etapas */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 mb-6 sm:mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  step.number === currentStep
                    ? "bg-green-500 text-white"
                    : step.number < currentStep
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                }`}>{step.number}</span>
                <span className={`text-sm sm:text-base ${
                  step.number === currentStep
                    ? "font-semibold text-gray-900 border-b-2 border-green-500 pb-1"
                    : "text-gray-600"
                }`}>{step.title}</span>
                {index < steps.length - 1 && <div className="hidden sm:block w-8 h-px bg-gray-200 ml-2" />}
              </div>
            ))}
          </div>

          {/* Formulários das etapas */}
          <div>
            {currentStep === 1 && (
              <>
                {/* Informações da Conta */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">1. Informações da Conta</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2"><Label htmlFor="fullName" className="text-sm font-medium text-gray-700">Nome completo ou Razão Social <span className="text-red-500">*</span></Label><Input id="fullName" type="text" className="w-full" /></div>
                  <div className="space-y-2"><Label htmlFor="storeName" className="text-sm font-medium text-gray-700">Nome da Loja <span className="text-red-500">*</span></Label><Input id="storeName" type="text" className="w-full" /></div>
                  <div className="space-y-2"><Label htmlFor="email" className="text-sm font-medium text-gray-700">E-mail <span className="text-red-500">*</span></Label><Input id="email" type="email" className="w-full" /></div>
                  <div className="space-y-2"><Label htmlFor="phone" className="text-sm font-medium text-gray-700">Telefone (WhatsApp) <span className="text-red-500">*</span></Label><Input id="phone" type="tel" className="w-full" /></div>
                  <div className="space-y-2"><Label htmlFor="password" className="text-sm font-medium text-gray-700">Senha <span className="text-red-500">*</span></Label><Input id="password" type="password" placeholder="xxxxxxxxx" className="w-full" /></div>
                  <div className="space-y-2"><Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirmar Senha <span className="text-red-500">*</span></Label><Input id="confirmPassword" type="password" placeholder="xxxxxxxxx" className="w-full" /></div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                {/* Dados Fiscais e Endereço */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">2. Dados Fiscais e Endereço</h2>
                <div className="space-y-6">
                  {/* Tipo de cadastro */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Tipo de cadastro</Label>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <input type="radio" id="fisica" name="registrationType" value="fisica" checked={registrationType === "fisica"} onChange={(e) => setRegistrationType(e.target.value)} className="w-4 h-4 text-green-600" />
                        <Label htmlFor="fisica" className="text-sm text-gray-700 cursor-pointer">Pessoa Física</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" id="juridica" name="registrationType" value="juridica" checked={registrationType === "juridica"} onChange={(e) => setRegistrationType(e.target.value)} className="w-4 h-4 text-green-600" />
                        <Label htmlFor="juridica" className="text-sm text-gray-700 cursor-pointer">Pessoa Jurídica</Label>
                      </div>
                    </div>
                  </div>

                  {/* Pessoa Jurídica */}
                  {registrationType === "juridica" && (
                    <div className="space-y-4">
                      <h3 className="text-base font-medium text-gray-900">Dados de Pessoa Jurídica <span className="text-red-500">*</span></h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2"><Label htmlFor="cnpj" className="text-sm font-medium text-gray-700">CNPJ <span className="text-red-500">*</span></Label><Input id="cnpj" type="text" className="w-full" /></div>
                        <div className="space-y-2"><Label htmlFor="razaoSocial" className="text-sm font-medium text-gray-700">Razão Social</Label><Input id="razaoSocial" type="text" className="w-full" /></div>
                        <div className="space-y-2"><Label htmlFor="nomeFantasia" className="text-sm font-medium text-gray-700">Nome Fantasia <span className="text-red-500">*</span></Label><Input id="nomeFantasia" type="text" className="w-full" /></div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                {/* Configuração de Pagamentos */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">3. Configuração de Pagamentos</h2>
                <p className="text-gray-600">Escolha como deseja receber seus pagamentos. Funciona com transferência direta.</p>
              </>
            )}

            {currentStep === 4 && (
              <>
                {/* Upload de Documentos */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">4. Documentos de Verificação</h2>
                <p className="text-gray-600 mb-6">Para sua segurança e dos clientes, precisamos verificar sua identidade. Seus dados estão seguros.</p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Documento 1 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Documento de Identidade (RG/CPF ou Contrato Social) <span className="text-red-500">*</span></Label>
                      <div onClick={() => fileInput1.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                        <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">{fileName1 || "Clique para enviar"}</p>
                        <input ref={fileInput1} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, setFileName1)} />
                      </div>
                    </div>

                    {/* Documento 2 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Comprovante de Endereço <span className="text-red-500">*</span></Label>
                      <div onClick={() => fileInput2.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                        <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">{fileName2 || "Clique para enviar"}</p>
                        <input ref={fileInput2} type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={(e) => handleFileChange(e, setFileName2)} />
                      </div>
                    </div>
                  </div>

                  {/* Logotipo */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Logotipo da Loja</Label>
                    <div onClick={() => fileInputLogo.current?.click()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer max-w-md">
                      <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm">{fileLogoName || "Clique para enviar"}</p>
                      <input ref={fileInputLogo} type="file" className="hidden" accept=".jpg,.jpeg,.png,.svg" onChange={(e) => handleFileChange(e, setFileLogoName)} />
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                {/* Personalize a Loja */}
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">5. Personalize sua Loja</h2>
                <p className="text-gray-600">Adicione toques finais à sua vitrine e prepare-se para vender!</p>
              </>
            )}
          </div>

          {/* Botões */}
          <div className="flex justify-between mt-8">
            {currentStep > 1 ? <Button variant="outline" onClick={handlePrevious}>Voltar</Button> : <div />}
            <Button onClick={handleNext}>{currentStep === 5 ? "Concluir" : "Próximo"}</Button>
          </div>
        </div>
      </main>
    </div>
  )
}
