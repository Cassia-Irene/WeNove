"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import { LoginRequest } from "@/lib/api.types";
import Link from "next/link";
import { useUser } from "@/contexts/UserContext";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { setUser, isAuthenticated } = useUser();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/produtos');
    }
  }, [isAuthenticated, router]);

  const validateForm = (): boolean => {
    const newErrors: LoginErrors = {};

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
    } else if (formData.password.length < 1) {
      newErrors.password = 'Senha não pode estar vazia';
    } else if (formData.password.length > 50) {
      newErrors.password = 'Senha deve ter no máximo 50 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validação em tempo real para melhor UX
  const validateField = (field: keyof LoginFormData, value: string): string | undefined => {
    switch (field) {
      case 'email':
        if (!value.trim()) return undefined;
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Email inválido';
        if (value.length > 100) return 'Email muito longo';
        break;
      case 'password':
        if (!value) return undefined;
        if (value.length > 50) return 'Senha muito longa';
        break;
    }
    return undefined;
  };

  const handleInputChange = (field: keyof LoginFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));

    // Validação em tempo real
    const fieldError = validateField(field, value);
    setErrors(prev => ({ ...prev, [field]: fieldError }));

    // Limpar erro geral
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: undefined }));
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const loginData: LoginRequest = {
        email: formData.email.trim(),
        password: formData.password
      };

      const response = await apiClient.login(loginData);

      if (response.success && response.data) {
        // Usar o contexto para definir o usuário
        setUser({
          id: response.data.uuid,
          name: response.data.name,
          email: response.data.email,
          admin: false,
          upToDateTerms: true,
          password : ''
        });

        setSuccessMessage('Login realizado com sucesso! Redirecionando...');

        // Limpar formulário
        setFormData({ email: '', password: '' });

        // Redirecionar para a página de produtos após 1 segundo
        setTimeout(() => {
          router.push('/produtos');
        }, 1000);
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({
        general: error instanceof Error ? error.message : 'Credenciais inválidas. Verifique seu email e senha.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#ced7d4] flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-md animate-slide-up animate-delay-100">
        {/* Logo */}
        <div className="text-center mb-8 animate-fade-in animate-delay-200">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-[#88a51d] rounded-full flex items-center justify-center animate-scale-in animate-delay-300 hover:scale-110 transition-transform duration-200">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <h1 className="text-2xl font-bold text-[#0c3729] font-dosis animate-slide-up animate-delay-400">
              WeNove
            </h1>
          </div>
          <h2 className="text-xl font-semibold text-[#0c3729] font-dosis mb-2 animate-fade-in animate-delay-500">
            Bem-vindo de volta!
          </h2>
          <p className="text-[#0c3729]/70 font-dosis animate-fade-in animate-delay-600">
            Faça login para continuar
          </p>
        </div>

        {/* Formulário de Login */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg animate-fade-in animate-delay-700 hover:shadow-xl transition-shadow duration-300">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Mensagem de erro geral */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake animate-fade-in">
                {errors.general}
              </div>
            )}

            {/* Mensagem de sucesso */}
            {successMessage && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm animate-fade-in animate-bounce-in">
                {successMessage}
              </div>
            )}

            <div className="animate-fade-in animate-delay-800">
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

            <div className="animate-fade-in animate-delay-900">
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
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 animate-slide-down animate-fade-in">{errors.password}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#88a51d] hover:bg-[#256609] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-dosis-semibold py-3 rounded-xl mt-6 flex items-center justify-center gap-2 animate-fade-in animate-delay-1000 transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              {isLoading && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              )}
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </form>

          {/* Link para cadastro */}
          <div className="text-center mt-6 animate-fade-in animate-delay-1100">
            <p className="text-[#0c3729]/70 font-dosis text-sm">
              Não tem uma conta?{' '}
              <Link
                href="/Cadastro"
                className="text-[#88a51d] hover:text-[#256609] font-semibold underline transition-all duration-200 hover:scale-105"
              >
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}