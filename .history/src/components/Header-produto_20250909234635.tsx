import React from "react";
import Link from "next/link";
import { ShoppingCart, User } from "lucide-react"

export default function Header_Produto() {
  return (
      <div className="min-h-screen relative bg-transparent">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full h-4 z-10 flex items-center justify-between px-6">
        
        {/* Logo */}
        <img
          src="/Logo-landing.svg"
          alt="Wenove Logo"
          className="absolute top-[30px] left-[30px]"
        />

        {/* Nav + Retângulo */}
        <div className="absolute top-[30px] left-1/2 -translate-x-1/2 w-[500px] h-[50px] flex items-center justify-center">
          
          {/* Retângulo atrás da nav */}
          <div className="absolute inset-0 bg-[#CDBBA7]/30 rounded-[30px] shadow-[0_4px_4px_rgba(0,0,0,0.45)]" />

          {/* Navegação */}
          <nav className="relative flex items-center gap-10 text-white">
            <Link href="/" className="hover:text-[#ffcc00] transition-colors">Início</Link>
            <Link href="/sobre-nos" className="hover:text-[#ffcc00] transition-colors">Sobre nós</Link>
            <Link href="/produtos" className="hover:text-[#ffcc00] transition-colors">Produtos</Link>
            <Link href="/contato" className="hover:text-[#ffcc00] transition-colors">Contato</Link>
          </nav>
        </div>

        {/* Right side */}
            <div className="absolute top-[30px] right-[30px] flex items-center space-x-4">
                <div className="relative">
                <ShoppingCart className="h-6 w-6 text-[#5e4f45]" />
                <span className="absolute -top-2 -right-2 bg-[#8f3332] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    0
                </span>
                </div>
                <div className="w-8 h-8 bg-[#88a51d] rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-white" />
                </div>
            </div>
        </header>
    </div>
    );
}