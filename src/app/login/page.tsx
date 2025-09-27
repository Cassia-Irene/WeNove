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
    if (status === "loading") return // Still loading
    if (!session) router.push("/") // Not authenticated, redirect to login
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#ced7d4" }}>
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-8 w-8 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#88a51d" }}
          ></div>
          <p style={{ color: "#1c1c1c" }}>Carregando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#ced7d4" }}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8" style={{ backgroundColor: "#f0edff" }}>
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#8b3130" }}
                >
                  <div className="w-6 h-6 rounded-full border-2 border-white relative">
                    <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white rounded-full"></div>
                    <div className="absolute bottom-0.5 right-0.5 w-1 h-1 bg-white rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-xl font-bold" style={{ color: "#8b3130" }}>
                  WeMove
                </h1>
              </div>
              <Button
                onClick={() => signOut({ callbackUrl: "/" })}
                variant="outline"
                className="border-2"
                style={{ borderColor: "#8b3130", color: "#8b3130" }}
              >
                Sair
              </Button>
            </div>

            {/* Welcome Message */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#88a51d" }}>
                Bem-vindo!
              </h2>
              <div className="flex items-center justify-center gap-4 mb-4">
                {session.user?.image && (
                  <img
                    src={session.user.image || "/placeholder.svg"}
                    alt="Profile"
                    className="w-16 h-16 rounded-full border-2"
                    style={{ borderColor: "#88a51d" }}
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold text-lg" style={{ color: "#1c1c1c" }}>
                    {session.user?.name}
                  </p>
                  <p className="text-sm" style={{ color: "#8b3130" }}>
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <p className="text-sm" style={{ color: "#1c1c1c" }}>
                Você fez login com sucesso usando o Google!
              </p>
            </div>

            {/* Dashboard Content */}
            <div className="grid gap-4 sm:gap-6">
              <div
                className="p-4 rounded-lg border-2"
                style={{ borderColor: "#88a51d", backgroundColor: "rgba(136, 165, 29, 0.1)" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "#88a51d" }}>
                  Dashboard
                </h3>
                <p className="text-sm" style={{ color: "#1c1c1c" }}>
                  Esta é sua área principal. Aqui você pode gerenciar suas atividades e configurações.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
