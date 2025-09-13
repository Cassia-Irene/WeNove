"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Menu, Cloud,  } from "lucide-react"
import Link from "next/link";


export default function SellerRegistration() {
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationType, setRegistrationType] = useState("fisica")

  const steps = [
    { number: 1, title: "Conta" },
    { number: 2, title: "Dados" },
    { number: 3, title: "Pagamentos" },
    { number: 4, title: "Documentos" },
    { number: 5, title: "Loja" },
  ]

  const handleNext = () => {
    if (currentStep < 5) {
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
        return "Configure seus Pagamentos"
      case 4:
        return "Verificação de Documentos"
      case 5:
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#000000] mb-4 text-balance">
            {getStepTitle()}
          </h1>
          <p className="text-base sm:text-lg text-gray-600 text-pretty max-w-3xl mx-auto">{getStepSubtitle()}</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 mb-6 sm:mb-8">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    step.number === currentStep
                      ? "bg-green-500 text-white"
                      : step.number < currentStep
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {step.number}
                </span>
                <span
                  className={`text-sm sm:text-base ${
                    step.number === currentStep
                      ? "font-semibold text-gray-900 border-b-2 border-green-500 pb-1"
                      : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
                {index < steps.length - 1 && <div className="hidden sm:block w-8 h-px bg-gray-200 ml-2" />}
              </div>
            ))}
          </div>

          {/* Form Section */}
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

                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                      Senha <span className="text-red-500">*</span>
                    </Label>
                    <Input id="password" type="password" placeholder="xxxxxxxxx" className="w-full" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                      Confirmar Senha <span className="text-red-500">*</span>
                    </Label>
                    <Input id="confirmPassword" type="password" placeholder="xxxxxxxxx" className="w-full" />
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">2. Dados Fiscais e Endereço</h2>

                <div className="space-y-6">
                  {/* Registration Type */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Tipo de cadastro</Label>
                    <div className="flex gap-6">
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="fisica"
                          name="registrationType"
                          value="fisica"
                          checked={registrationType === "fisica"}
                          onChange={(e) => setRegistrationType(e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <Label htmlFor="fisica" className="text-sm text-gray-700 cursor-pointer">
                          Pessoa Física
                        </Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          id="juridica"
                          name="registrationType"
                          value="juridica"
                          checked={registrationType === "juridica"}
                          onChange={(e) => setRegistrationType(e.target.value)}
                          className="w-4 h-4 text-green-600"
                        />
                        <Label htmlFor="juridica" className="text-sm text-gray-700 cursor-pointer">
                          Pessoa Jurídica
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Legal Entity Data */}
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

                        <div className="space-y-2">
                          <Label htmlFor="razaoSocial" className="text-sm font-medium text-gray-700">
                            Razão Social
                          </Label>
                          <Input id="razaoSocial" type="text" className="w-full" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="nomeFantasia" className="text-sm font-medium text-gray-700">
                            Nome Fantasia <span className="text-red-500">*</span>
                          </Label>
                          <Input id="nomeFantasia" type="text" className="w-full" />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="inscricaoEstadual" className="text-sm font-medium text-gray-700">
                            Inscrição Estadual (se aplicável)
                          </Label>
                          <Input id="inscricaoEstadual" type="text" className="w-full" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Physical Person Data */}
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

                  {/* Company Address */}
                  <div className="space-y-4">
                    <h3 className="text-base font-medium text-gray-900">
                      Endereço Completo <span className="text-red-500">*</span>
                    </h3>

                    <div className="space-y-4">
                      {/* CEP and Street Address */}
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

                      {/* Address Details */}
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
                  3. Informações Bancárias para Repasses
                </h2>

                <div className="space-y-6">
                  {/* Bank Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="banco" className="text-sm font-medium text-gray-700">
                        Banco <span className="text-red-500">*</span>
                      </Label>
                      <Input id="banco" type="text" className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="agencia" className="text-sm font-medium text-gray-700">
                        Agência <span className="text-red-500">*</span>
                      </Label>
                      <Input id="agencia" type="text" className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="conta" className="text-sm font-medium text-gray-700">
                        Conta (com dígito) <span className="text-red-500">*</span>
                      </Label>
                      <Input id="conta" type="text" className="w-full" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="titular" className="text-sm font-medium text-gray-700">
                        Nome do Titular <span className="text-red-500">*</span>
                      </Label>
                      <Input id="titular" type="text" className="w-full" />
                      <p className="text-xs text-gray-500">Deve ser o mesmo do CPF/CNPJ.</p>
                    </div>
                  </div>

                  {/* PIX Key */}
                  <div className="space-y-2">
                    <Label htmlFor="chavePix" className="text-sm font-medium text-gray-700">
                      Ou Chave PIX (opcional)
                    </Label>
                    <Input
                      id="chavePix"
                      type="text"
                      placeholder="CPF, CNPJ, e-mail, telefone ou aleatória"
                      className="w-full"
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  4. Documentos de Verificação
                </h2>
                <p className="text-gray-600 mb-6">
                  Para sua segurança e dos clientes, precisamos verificar sua identidade. Seus dados estão seguros.
                </p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Document Upload 1 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Documento de Identidade (RG/CPF ou Contrato Social) <span className="text-red-500">*</span>
                      </Label>

                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                        <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">Clique para enviar</p>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                    </div>

                    {/* Document Upload 2 */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">
                        Comprovante de Endereço <span className="text-red-500">*</span>
                      </Label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer">
                        <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 text-sm">Clique para enviar</p>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" />
                      </div>
                    </div>
                  </div>

                  {/* Logo Upload */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-700">Logotipo da Loja</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors cursor-pointer max-w-md">
                      <Cloud className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500 text-sm">Clique para enviar</p>
                      <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.svg" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">
                  5. Configurações da Loja e Políticas
                </h2>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Main Category */}
                    <div className="space-y-2">
                      <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
                        Categoria Principal <span className="text-red-500">*</span>
                      </Label>
                      <Input id="categoria" type="text" className="w-full" />
                    </div>

                    {/* Social Media Links */}
                    <div className="space-y-2">
                      <Label htmlFor="socialLinks" className="text-sm font-medium text-gray-700">
                        Links de Redes Sociais
                      </Label>
                      <Input
                        id="socialLinks"
                        type="url"
                        placeholder="https://instagram.com/sualoja"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Store Description */}
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

                  {/* Terms and Conditions */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox id="terms" className="mt-1" />
                      <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Eu li e aceito os <span className="text-green-600 underline">Termos de Uso e Políticas</span> do
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

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mt-8 pt-6 border-t">
              {currentStep === 1 ? (
                <>
                  <Button
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200 w-full sm:w-auto order-2 sm:order-1"
                  >
                    Salvar Rascunho
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto order-1 sm:order-2"
                  >
                    Próximo
                  </Button>
                </>
              ) : currentStep === 5 ? (
                <>
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200 w-full sm:w-auto order-2 sm:order-1"
                  >
                    Anterior
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto order-1 sm:order-2">
                    Finalizar Cadastro
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handlePrevious}
                    variant="outline"
                    className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200 w-full sm:w-auto order-2 sm:order-1"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto order-1 sm:order-2"
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
