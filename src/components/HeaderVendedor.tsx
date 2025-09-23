import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useUser } from "@/contexts/UserContext";

export default function HeaderVendedor() {
  return (
      <div className="relative bg-transparent pt-24">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full h-16 sm:h-20 lg:h-24 z-10 flex items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
          <Image 
          src="/Logo-vendedor.svg"
          alt="Wenove Logo"
          width={192}
          height={50}
          className="hidden sm:block absolute top-6 sm:top-6 lg:top-[30px] left-4 sm:left-6 lg:left-[30px] w-34 sm:w-34 lg:w-auto"
          />
        

        {/* Nav + Retângulo */}
        <div className="hidden sm:flex absolute top-4 sm:top-6 lg:top-[30px] left-1/2 -translate-x-1/2 w-[400px] lg:w-[500px] h-[40px] lg:h-[50px] flex items-center justify-center">
          
          {/* Retângulo atrás da nav */}
          <div className="absolute inset-0 bg-[#8B3130] rounded-[30px] shadow-[0_4px_4px_rgba(0,0,0,0.45)]" />

          {/* Navegação */}
          <nav className="relative flex items-center gap-6 lg:gap-10 text-white text-sm lg:text-base">
            <Link href="/" className="">Início</Link>
            <Link href="/sobre-nos" className="">Sobre nós</Link>
            <Link href="/produtos" className="">Produtos</Link>
            <Link href="/sobre-nos#contato" className="">Contato</Link>
          </nav>
        </div>

        {/* Usuário */}
            <div className="absolute top-6 sm:top-6 lg:top-[30px] right-4 sm:right-6 lg:right-[30px] flex items-center space-x-3 sm:space-x-5 lg:space-x-7">
                
                <UserAvatar />
            </div>
        </header>
    </div>
    );
}

// Componente UserAvatar com dropdown
function UserAvatar() {
  const { user, logout, avatarUrl, isAuthenticated } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <Link href="/login" className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-user bg-gray-300">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </Link>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-user focus:outline-none focus:ring-2 focus:ring-[#8B3130] focus:ring-offset-2"
      >
        {avatarUrl ? (
          <Image 
            src={avatarUrl} 
            alt={`Avatar de ${user?.name}`}
            width={48}
            height={48}
            className="w-full h-full rounded-full object-cover"
            unoptimized={true}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-[#8B3130] flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        )}
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
          <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-100">
            <p className="font-medium">{user?.name}</p>
            <p className="text-gray-500 text-xs">{user?.email}</p>
          </div>
          
          <Link
            href="/perfil"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            <User className="w-4 h-4 mr-2" />
            Ver Perfil
          </Link>
          
          <button
            onClick={() => {
              setIsDropdownOpen(false);
              logout();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </button>
        </div>
      )}
    </div>
  );
}