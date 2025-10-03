"use client"

import Image from "next/image";
import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Menu, X, AlertCircle } from "lucide-react"
import Link from "next/link";
import HeaderVendendor from "@/components/HeaderVendedor"
import apiClient from "@/lib/api"
import { StoreCreationRequest } from "@/lib/api.types"
import { useRouter } from "next/navigation"
import { useUser } from "@/contexts/UserContext"


// Interfaces para validação
interface FormData {
  // Step 1 - Conta
  fullName: string;
  storeName: string;
  email: string;
  phone: string;
  
  // Step 2 - Dados Fiscais
  cnpj: string;
  cpf: string;
  cep: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  
  // Step 3 - Loja
  categoria: string;
  socialLinks: string;
  logoUrl: string;
  bannerUrl: string;
  descricao: string;
  proposta: string;
  termsAccepted: boolean;
  lgpdAccepted: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export default function CadastroLoja() {
  // Todos os Hooks devem estar no topo do componente
  const router = useRouter();
  const { user, isAuthenticated } = useUser()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [registrationType, setRegistrationType] = useState("juridica")
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [isCheckingExistingStore, setIsCheckingExistingStore] = useState(false)
  const [hasExistingStore, setHasExistingStore] = useState(false)

  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    storeName: "",
    email: "",
    phone: "",
    cnpj: "",
    cpf: "",
    cep: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    estado: "",
    categoria: "",
    socialLinks: "",
    logoUrl: "",
    bannerUrl: "",
    descricao: "",
    proposta: "",
    termsAccepted: false,
    lgpdAccepted: false
  })

  // Estado dos erros
  const [errors, setErrors] = useState<FormErrors>({})
  
  // Estados para nomes dos arquivos
  const [fileName1, setFileName1] = useState("")
  const [fileName2, setFileName2] = useState("")
  const [fileLogoName, setFileLogoName] = useState("")

  // Refs para inputs de arquivo
  const fileInput1 = useRef<HTMLInputElement>(null)
  const fileInput2 = useRef<HTMLInputElement>(null)
  const fileInputLogo = useRef<HTMLInputElement>(null)

  // Check authentication and existing store on component mount
  useEffect(() => {
    const checkAuthAndStore = async () => {
      if (!isAuthenticated) {
        router.push('/login')
        return  
      }
      
      // Verificar se o usuário já possui uma loja
      if (user && user.id) {
        setIsCheckingExistingStore(true)
        try {
          const userStores = await apiClient.getStoresByOwner(user.id)
          if (userStores && userStores.data && userStores.data.name) {
            setHasExistingStore(true)
            // Redirecionar para perfil-empresa com mensagem
            router.push('/perfil-empresa?message=store-exists')
            return
          }
        } catch (error) {
          console.error('Erro ao verificar lojas existentes:', error)
          // Em caso de erro, permitir continuar mas mostrar aviso
        } finally {
          setIsCheckingExistingStore(false)
        }
      }
      
      setIsCheckingAuth(false)
    }
    
    checkAuthAndStore()
  }, [isAuthenticated, user, router])

  // Show loading while checking authentication and existing store
  if (isCheckingAuth || isCheckingExistingStore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#8B3130] mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isCheckingAuth ? 'Verificando autenticação...' : 'Verificando lojas existentes...'}
          </p>
        </div>
      </div>
    )
  }

  // Funções de validação
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/
    return phoneRegex.test(phone.replace(/\D/g, ''))
  }

  const validateCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\D/g, '')
    return cleanCNPJ.length === 14
  }

  const validateCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/\D/g, '')
    return cleanCPF.length === 11
  }

  const validateCEP = (cep: string): boolean => {
    const cleanCEP = cep.replace(/\D/g, '')
    return cleanCEP.length === 8
  }

  const validateURL = (url: string): boolean => {
    if (!url) return true // URL é opcional
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  // Função para atualizar dados do formulário
  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }))
    }
  }

  // Validação por step
  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório"
    }
    
    if (!formData.storeName.trim()) {
      newErrors.storeName = "Nome da loja é obrigatório"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório"
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email inválido"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório"
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Telefone inválido"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (registrationType === "juridica") {
      if (!formData.cnpj.trim()) {
        newErrors.cnpj = "CNPJ é obrigatório"
      } else if (!validateCNPJ(formData.cnpj)) {
        newErrors.cnpj = "CNPJ inválido"
      }
    } else {
      if (!formData.cpf.trim()) {
        newErrors.cpf = "CPF é obrigatório"
      } else if (!validateCPF(formData.cpf)) {
        newErrors.cpf = "CPF inválido"
      }
    }
    
    if (!formData.cep.trim()) {
      newErrors.cep = "CEP é obrigatório"
    } else if (!validateCEP(formData.cep)) {
      newErrors.cep = "CEP inválido"
    }
    
    if (!formData.endereco.trim()) {
      newErrors.endereco = "Endereço é obrigatório"
    }
    
    if (!formData.numero.trim()) {
      newErrors.numero = "Número é obrigatório"
    }
    
    if (!formData.bairro.trim()) {
      newErrors.bairro = "Bairro é obrigatório"
    }
    
    if (!formData.cidade.trim()) {
      newErrors.cidade = "Cidade é obrigatória"
    }
    
    if (!formData.estado.trim()) {
      newErrors.estado = "Estado é obrigatório"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep3 = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.categoria.trim()) {
      newErrors.categoria = "Categoria principal é obrigatória"
    }
    
    if (!formData.logoUrl.trim()) {
      newErrors.logoUrl = "URL da logo é obrigatória"
    } else if (!validateURL(formData.logoUrl)) {
      newErrors.logoUrl = "URL da logo inválida"
    }
    
    if (formData.bannerUrl && !validateURL(formData.bannerUrl)) {
      newErrors.bannerUrl = "URL do banner inválida"
    }
    
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "Você deve aceitar os termos de uso"
    }
    
    if (!formData.lgpdAccepted) {
      newErrors.lgpdAccepted = "Você deve aceitar os termos da LGPD"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Navegação entre steps com validação
  const handleNextStep = () => {
    let isValid = false
    
    switch (currentStep) {
      case 1:
        isValid = validateStep1()
        break
      case 2:
        isValid = validateStep2()
        break
      case 3:
        isValid = validateStep3()
        break
      default:
        isValid = true
    }
    
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else if (isValid && currentStep === 3) {
      handleSubmit()
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Função de envio dos dados
  const handleSubmit = async () => {
    // Verificar se o usuário está autenticado e tem ID válido
    if (!user || !user.id) {
      setSubmitError("Erro de autenticação. Por favor, faça login novamente.")
      router.push('/login')
      return
    }

    if (!validateStep3()) {
      return
    }

    setIsLoading(true)
    setSubmitError("")

    // Verificação adicional para garantir que o usuário não possui loja
    try {
      const userStores = await apiClient.getStoresByOwner(user.id)
      if (userStores && userStores.data) {
        setSubmitError("Você já possui uma loja cadastrada. Cada usuário pode ter apenas uma loja.")
        setIsLoading(false)
        setTimeout(() => {
          router.push('/perfil-empresa')
        }, 3000)
        return
      }
    } catch (error) {
      console.error('Erro ao verificar lojas existentes:', error)
      setSubmitError("Erro ao verificar lojas existentes. Tente novamente.")
      setIsLoading(false)
      return
    }

    try {
      // Construir o objeto StoreCreationRequest
      const storeData = {
        name: formData.storeName,
        completeName: formData.fullName,
        description: formData.descricao || formData.proposta || "",
        proposal: formData.proposta || "",
        sells: 0,
        badges: [],
        address: {
          country: "Brasil",
          state: formData.estado,
          zipCode: formData.cep,
          addressLineOne: `${formData.endereco}, ${formData.numero}`,
          addressLineTwo: formData.bairro,
          additionalInfo: formData.cidade
        },
        logoUrl: formData.logoUrl,
        bannerUrl: formData.bannerUrl || "",
        ownerUUID: user.id, // ID do usuário autenticado
        cnpj: registrationType === "juridica" ? formData.cnpj : "",
        whatsapp: formData.phone,
        email: formData.email,
        mainMediaTag: formData.socialLinks || "",
        mainCategory: formData.categoria
      } as unknown as StoreCreationRequest

      const response = await apiClient.createStoreNew(storeData)
      
      if (response.success) {
        setSubmitSuccess(true)
        // Redirecionar após sucesso
        setTimeout(() => {
          router.push('/dashboard') // ou para onde desejar redirecionar
        }, 2000)
      } else {
        setSubmitError(response.message || "Erro ao criar loja")
      }
    } catch (error) {
      console.error('Erro ao criar loja:', error)
      setSubmitError("Erro interno. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

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

  // Componente para mostrar erros
  const ErrorMessage = ({ error }: { error?: string }) => {
    if (!error) return null
    return (
      <div className="flex items-center gap-1 text-red-500 text-sm mt-1">
        <AlertCircle className="w-4 h-4" />
        <span>{error}</span>
      </div>
    )
  }

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

      {/* User info display */}
      {user && (
        <div className="bg-white border-b px-4 py-2">
          <div className="max-w-6xl mx-auto">
            <div className="text-sm text-gray-600">
              Logado como: <span className="font-medium text-gray-900">{user.name || user.email}</span>
            </div>
          </div>
        </div>
      )}

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
                href="/sobre-nos#contato"
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
                    <Input 
                      id="fullName" 
                      type="text" 
                      className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
                      value={formData.fullName}
                      onChange={(e) => updateFormData('fullName', e.target.value)}
                    />
                    <ErrorMessage error={errors.fullName} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="storeName" className="text-sm font-medium text-gray-700">
                      Nome da Loja <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="storeName" 
                      type="text" 
                      className={`w-full ${errors.storeName ? 'border-red-500' : ''}`}
                      value={formData.storeName}
                      onChange={(e) => updateFormData('storeName', e.target.value)}
                    />
                    <ErrorMessage error={errors.storeName} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      E-mail <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      className={`w-full ${errors.email ? 'border-red-500' : ''}`}
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                    />
                    <ErrorMessage error={errors.email} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                      Telefone (WhatsApp) <span className="text-red-500">*</span>
                    </Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                    />
                    <ErrorMessage error={errors.phone} />
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
                          <Input 
                            id="cnpj" 
                            type="text" 
                            className={`w-full ${errors.cnpj ? 'border-red-500' : ''}`}
                            value={formData.cnpj}
                            onChange={(e) => updateFormData('cnpj', e.target.value)}
                          />
                          <ErrorMessage error={errors.cnpj} />
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
                          <Input 
                            id="cpf" 
                            type="text" 
                            className={`w-full ${errors.cpf ? 'border-red-500' : ''}`}
                            value={formData.cpf}
                            onChange={(e) => updateFormData('cpf', e.target.value)}
                          />
                          <ErrorMessage error={errors.cpf} />
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
                            <div className="flex-1">
                              <Input 
                                id="cep" 
                                type="text" 
                                placeholder="CEP" 
                                className={`w-full ${errors.cep ? 'border-red-500' : ''}`}
                                value={formData.cep}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '');
                                  if (value.length <= 8) {
                                    updateFormData('cep', value);
                                  }
                                }}
                              />
                              <ErrorMessage error={errors.cep} />
                            </div>
                            <Button 
                              className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 whitespace-nowrap"
                              onClick={async () => {
                                if (formData.cep.length === 8) {
                                  try {
                                    const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
                                    const data = await response.json();
                                    
                                    if (!data.erro) {
                                      updateFormData('endereco', data.logradouro);
                                      updateFormData('bairro', data.bairro);
                                      updateFormData('cidade', data.localidade);
                                      updateFormData('estado', data.uf);
                                    } else {
                                      setErrors(prev => ({...prev, cep: "CEP não encontrado"}));
                                    }
                                  } catch (error) {
                                    setErrors(prev => ({...prev, cep: "Erro ao buscar CEP"}));
                                  }
                                } else {
                                  setErrors(prev => ({...prev, cep: "CEP inválido"}));
                                }
                              }}
                            >
                              BUSCAR CEP
                            </Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Input 
                            id="endereco" 
                            type="text" 
                            placeholder="Rua, Avenida, etc." 
                            className={`w-full ${errors.endereco ? 'border-red-500' : ''}`}
                            value={formData.endereco}
                            onChange={(e) => updateFormData('endereco', e.target.value)}
                          />
                          <ErrorMessage error={errors.endereco} />
                        </div>
                      </div>

                      {/* Detalhes do endereço */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <Input 
                            id="numero" 
                            type="text" 
                            placeholder="Número" 
                            className={`w-full ${errors.numero ? 'border-red-500' : ''}`}
                            value={formData.numero}
                            onChange={(e) => updateFormData('numero', e.target.value)}
                          />
                          <ErrorMessage error={errors.numero} />
                        </div>
                        <div className="space-y-2">
                          <Input 
                            id="bairro" 
                            type="text" 
                            placeholder="Bairro" 
                            className={`w-full ${errors.bairro ? 'border-red-500' : ''}`}
                            value={formData.bairro}
                            onChange={(e) => updateFormData('bairro', e.target.value)}
                          />
                          <ErrorMessage error={errors.bairro} />
                        </div>
                        <div className="space-y-2">
                          <Input 
                            id="cidade" 
                            type="text" 
                            placeholder="Cidade" 
                            className={`w-full ${errors.cidade ? 'border-red-500' : ''}`}
                            value={formData.cidade}
                            onChange={(e) => updateFormData('cidade', e.target.value)}
                          />
                          <ErrorMessage error={errors.cidade} />
                        </div>
                        <div className="space-y-2">
                          <Input 
                            id="estado" 
                            type="text" 
                            placeholder="Estado" 
                            className={`w-full ${errors.estado ? 'border-red-500' : ''}`}
                            value={formData.estado}
                            onChange={(e) => updateFormData('estado', e.target.value)}
                          />
                          <ErrorMessage error={errors.estado} />
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
                        className={`w-full ${errors.mainCategory ? 'border-red-500' : ''}`}
                        value={formData.categoria}
                        onChange={(e) => updateFormData('categoria', e.target.value)}
                      />
                      <ErrorMessage error={errors.mainCategory} />
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
                        value={formData.socialLinks}
                        onChange={(e) => updateFormData('socialLinks', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Categoria principal */}
                    <div className="space-y-2">
                      <Label htmlFor="url_logo" className="text-sm font-medium text-gray-700">
                        URL da Logo <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="url_logo"
                        type="url"
                        placeholder="https://www.exemplo.com/logo.png"
                        className={`w-full ${errors.logoUrl ? 'border-red-500' : ''}`}
                        value={formData.logoUrl}
                        onChange={(e) => updateFormData('logoUrl', e.target.value)}
                      />
                      <ErrorMessage error={errors.logoUrl} />
                    </div>

                    {/* Links de mídia social */}
                    <div className="space-y-2">
                      <Label htmlFor="bannerUrl" className="text-sm font-medium text-gray-700">
                        URL do Banner
                      </Label>
                      <Input
                        id="bannerUrl"
                        type="url"
                        placeholder="https://www.exemplo.com/banner.png"
                        className="w-full"
                        value={formData.bannerUrl}
                        onChange={(e) => updateFormData('bannerUrl', e.target.value)}
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
                      value={formData.descricao}
                      onChange={(e) => updateFormData('descricao', e.target.value)}
                    />
                  </div>

                  {/* Descrição da Loja */}
                  <div className="space-y-2">
                    <Label htmlFor="proposta" className="text-sm font-medium text-gray-700">
                      A proposta da sua empresa para entrar no mundo do upscaling têxtil sustentável
                    </Label>
                    <Textarea
                      id="proposta"
                      rows={4}
                      placeholder="Nossa proposta é produzir peças sem resíduos, respeitando o meio ambiente e as necessidades dos consumidores."
                      className="w-full resize-none"
                      value={formData.proposta}
                      onChange={(e) => updateFormData('proposta', e.target.value)}
                    />
                  </div>

                  {/* Termos e Condições */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="terms" 
                        className="mt-1" 
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => updateFormData('termsAccepted', checked)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Eu li e aceito os <span className="text-[#88A51D] underline">Termos de Uso e Políticas</span> do
                        marketplace. <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <ErrorMessage error={errors.acceptTerms} />

                    <div className="flex items-start gap-3">
                      <Checkbox 
                        id="lgpd" 
                        className="mt-1" 
                        checked={formData.lgpdAccepted}
                        onCheckedChange={(checked) => updateFormData('lgpdAccepted', checked)}
                      />
                      <Label htmlFor="lgpd" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                        Eu concordo com o uso dos meus dados conforme a LGPD para fins de cadastro e operação da loja. <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <ErrorMessage error={errors.acceptLGPD} />
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
                    onClick={handleNextStep}
                    disabled={isLoading}
                    className="bg-[#0C3729] hover:bg-[#88A51D] text-[#E9EFD3] w-full sm:w-auto order-1 sm:order-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Carregando...' : 'Próximo'}
                  </Button>
                </>
              ) : currentStep === 5 ? (
                <>
                  <Button
                    onClick={handlePrevStep}
                    variant="outline"
                    disabled={isLoading}
                    className="bg-[#E9EFD3] text-[#0C3729] border-[#E9EFD3] hover:bg-[#88A51D] w-full sm:w-auto order-2 sm:order-1 disabled:opacity-50"
                  >
                    Anterior
                  </Button>
                  <Button 
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-[#0C3729] hover:bg-[#88A51D] text-[#E9EFD3] w-full sm:w-auto order-1 sm:order-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Criando loja...' : 'Finalizar Cadastro'}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={handlePrevStep}
                    variant="outline"
                    disabled={isLoading}
                    className="bg-[#E9EFD3] text-[#0C3729] border-[#E9EFD3] hover:bg-[#88A51D] w-full sm:w-auto order-2 sm:order-1 disabled:opacity-50"
                  >
                    Anterior
                  </Button>
                  <Button
                    onClick={handleNextStep}
                    disabled={isLoading}
                    className="bg-[#0C3729] hover:bg-[#88A51D] text-[#E9EFD3] w-full sm:w-auto order-1 sm:order-2 disabled:opacity-50"
                  >
                    {isLoading ? 'Carregando...' : 'Próximo'}
                  </Button>
                </>
              )}
            </div>

            {/* Mensagens de feedback */}
            {submitError && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-red-700 font-medium">Erro ao criar loja</p>
                </div>
                <p className="text-red-600 mt-1">{submitError}</p>
              </div>
            )}

            {submitSuccess && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-700 font-medium">Loja criada com sucesso!</p>
                <p className="text-green-600 mt-1">Redirecionando...</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
