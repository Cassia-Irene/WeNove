"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { RegisterRequest } from "@/lib/api.types";
import { useUser } from "@/contexts/UserContext";

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
  general?: string;
}

export default function CadastroPage() {
  const router = useRouter();
  const { isAuthenticated } = useUser();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState<{
    score: number;
    label: string;
    color: string;
  }>({ score: 0, label: '', color: '' });

  // Função para calcular força da senha
  const calculatePasswordStrength = (password: string) => {
    let score = 0;
    let label = '';
    let color = '';

    if (password.length === 0) {
      return { score: 0, label: '', color: '' };
    }

    // Critérios de força
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/\d/.test(password)) score += 1;
    if (/[^\w\s]/.test(password)) score += 1;

    // Definir label e cor baseado na pontuação
    if (score <= 2) {
      label = 'Fraca';
      color = 'text-red-500';
    } else if (score <= 4) {
      label = 'Média';
      color = 'text-yellow-500';
    } else {
      label = 'Forte';
      color = 'text-green-500';
    }

    return { score, label, color };
  };

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/Perfil-Empreen-Editavel');
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Nome deve ter pelo menos 2 caracteres';
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Nome deve ter no máximo 50 caracteres';
    } else if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Nome deve conter apenas letras e espaços';
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    } else if (formData.email.length > 100) {
      newErrors.email = 'Email deve ter no máximo 100 caracteres';
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Senha deve ter pelo menos 8 caracteres';
    } else if (formData.password.length > 50) {
      newErrors.password = 'Senha deve ter no máximo 50 caracteres';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula e 1 número';
    }

    // Validação da confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }

    // Validação dos termos
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos e condições';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação em tempo real para melhor UX
  const validateField = (field: keyof FormData, value: string | boolean): string | undefined => {
    switch (field) {
      case 'name':
        if (typeof value === 'string') {
          if (!value.trim()) return undefined; // Não mostrar erro se estiver vazio
          if (value.trim().length < 2) return 'Nome muito curto';
          if (value.trim().length > 50) return 'Nome muito longo';
          if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value.trim())) return 'Apenas letras e espaços';
        }
        break;
      case 'email':
        if (typeof value === 'string') {
          if (!value.trim()) return undefined;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
          if (value.length > 100) return 'Email muito longo';
        }
        break;
      case 'password':
        if (typeof value === 'string') {
          if (!value) return undefined;
          if (value.length < 8) return 'Mínimo 8 caracteres';
          if (value.length > 50) return 'Máximo 50 caracteres';
          if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Precisa de: minúscula, maiúscula e número';
        }
        break;
      case 'confirmPassword':
        if (typeof value === 'string') {
          if (!value) return undefined;
          if (formData.password !== value) return 'Senhas não coincidem';
        }
        break;
    }
    return undefined;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Validação em tempo real
    const fieldError = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: fieldError }));

    // Calcular força da senha
    if (field === 'password' && typeof value === 'string') {
      setPasswordStrength(calculatePasswordStrength(value));
    }

    // Limpar erro geral
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }

    // Limpar mensagem de sucesso se o usuário começar a editar
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const registerData: RegisterRequest = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        admin: false,
        upToDateTerms: true
      };

      const response = await apiClient.register(registerData);

      if (response.success) {
        setSuccessMessage('Cadastro realizado com sucesso! Redirecionando para o login...');
        // Limpar formulário
        setFormData({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        });
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Erro interno do servidor. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#CED7D4] p-4 md:p-6 flex items-center justify-center animate-fade-in">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">

        {/* Lado esquerdo - Formulário de inscrição */}
        <div className="bg-[#f5f1eb] rounded-3xl p-6 md:p-8 w-full md:max-w-md shadow-lg order-2 md:order-1 animate-slide-up animate-delay-100 hover:shadow-xl transition-shadow duration-300">

          {/* Logo and Header */}
          <div className="mb-6 lg:mb-8 animate-fade-in animate-delay-200">

            {/* --- SEÇÃO ALTERADA --- */}
            <div className="flex justify-center lg:justify-start-center mb-4 lg:mb-6">
              <Image
                src="/Logo-vendedor.svg"
                alt="WeNove Logo"
                width={192}
                height={50}
                className="h-10 sm:h-12 animate-scale-in animate-delay-300 hover:scale-110 transition-transform duration-200"
              />
            </div>

            {/* --- FIM DA SEÇÃO ALTERADA --- */}

            <div className="text-center lg:text-left">
              <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-[#88a51d] mb-2 animate-slide-up animate-delay-400" style={{ fontFamily: "Futura, sans-serif" }}>Bem-Vindo!</h2>
              <p className="text-center text-[#8b3130] font-dosis-medium text-sm sm:text-2xl animate-fade-in animate-delay-500">Cadastre-se na WeNove</p>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            {/* Mensagem de erro geral */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-shake animate-fade-in">
                {errors.general}
              </div>
            )}

            {/* Mensagem de sucesso */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg animate-fade-in animate-bounce-in">
                {successMessage}
              </div>
            )}

            <div className="animate-fade-in animate-delay-600">
              <Input
                id="name"
                type="text"
                placeholder="Digite seu nome"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`bg-transparent border-2 rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70 transition-all duration-300 focus:scale-105 focus:shadow-lg ${
                  errors.name ? 'border-red-300 bg-red-50 animate-shake' : 'border-[#0c3729] focus:border-[#88a51d]'
                }`}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 animate-slide-down animate-fade-in">{errors.name}</p>
              )}
            </div>

            <div className="animate-fade-in animate-delay-700">
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`bg-transparent border-2 rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70 transition-all duration-300 focus:scale-105 focus:shadow-lg ${
                  errors.email ? 'border-red-300 bg-red-50 animate-shake' : 'border-[#0c3729] focus:border-[#88a51d]'
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 animate-slide-down animate-fade-in">{errors.email}</p>
              )}
            </div>

            <div className="animate-fade-in animate-delay-800">
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Senha"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={`bg-transparent border-2 rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70 transition-all duration-300 focus:scale-105 focus:shadow-lg ${
                    errors.password ? 'border-red-300 bg-red-50 animate-shake' : 'border-[#0c3729] focus:border-[#88a51d]'
                  }`}
                  disabled={isLoading}
                />
                {formData.password && passwordStrength.label && (
                  <div className="mt-2 animate-slide-down animate-fade-in">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Força da senha:</span>
                      <span className={`font-medium ${passwordStrength.color} transition-colors duration-300`}>
                        {passwordStrength.label}
                      </span>
                    </div>
                    <div className="mt-1 w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ease-out ${
                          passwordStrength.score <= 2 ? 'bg-red-500' :
                          passwordStrength.score <= 4 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 animate-slide-down animate-fade-in">{errors.password}</p>
              )}
            </div>

            <div className="animate-fade-in animate-delay-900">
              <Input
                type="password"
                placeholder="Confirme a senha"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className={`bg-transparent border-2 rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70 transition-all duration-300 focus:scale-105 focus:shadow-lg ${
                  errors.confirmPassword ? 'border-red-300 bg-red-50 animate-shake' : 'border-[#0c3729] focus:border-[#88a51d]'
                }`}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 animate-slide-down animate-fade-in">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Caixa de seleção de termos */}
            <div className="space-y-2 animate-fade-in animate-delay-1000">
              <div className="flex items-start gap-3 mt-4 md:mt-6">
                <Checkbox
                  id="terms"
                  checked={formData.acceptTerms}
                  onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                  className="mt-1 bg-transparent border-[#88a51d] data-[state=checked]:bg-[#88a51d] data-[state=checked]:border-[#88a51d] flex-shrink-0 transition-all duration-200 hover:scale-110"
                  disabled={isLoading}
                />
                <label htmlFor="terms" className="text-xs text-[#0c3729] font-dosis leading-relaxed">
                  Ao clicar em &quot;inscrever-se&quot;, você concorda com os da WeNove{" "}
                  <span className="underline hover:text-[#88a51d] transition-colors duration-200 cursor-pointer">Termos de Serviço</span> e a{" "}
                  <span className="underline hover:text-[#88a51d] transition-colors duration-200 cursor-pointer">Política de Privacidade</span>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-red-600 animate-slide-down animate-fade-in">{errors.acceptTerms}</p>
              )}
            </div>

            {/* Botão Enviar */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#88a51d] hover:bg-[#256609] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-dosis-semibold py-3 rounded-xl mt-4 md:mt-6 flex items-center justify-center gap-2 animate-fade-in animate-delay-1100 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              )}
              {isLoading ? 'Registrando...' : 'Registrar'}
            </Button>
          </form>
        </div>

        {/* Lado direito - Ilustração */}
        <div className="flex-1 flex justify-center items-center order-1 md:order-2 w-full md:w-auto animate-slide-right animate-delay-200">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image
              src="/cadastro.svg"
              alt="Ilustração vetorial mostrando duas pessoas em um ambiente de compras, uma segurando sacolas e outra escolhendo produtos"
              width={580}
              height={601}
              className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>
    </div>
  )

}