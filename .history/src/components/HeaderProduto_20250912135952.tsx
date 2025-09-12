import React from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react"

export default function HeaderProduto() {
  return (
      <div className="relative bg-transparent pt-24">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full h-16 sm:h-20 lg:h-24 z-10 flex items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <img
          src="/Logo-produto.svg"
          alt="Wenove Logo"
          className="absolute top-6 sm:top-6 lg:top-[30px] left-4 sm:left-6 lg:left-[30px] w-34 sm:w-34 lg:w-auto"
        />

        {/* Nav + Retângulo */}
        <div className="hidden sm:flex absolute top-4 sm:top-6 lg:top-[30px] left-1/2 -translate-x-1/2 w-[400px] lg:w-[500px] h-[40px] lg:h-[50px] flex items-center justify-center">
          
          {/* Retângulo atrás da nav */}
          <div className="absolute inset-0 bg-[#88A51D] rounded-[30px] shadow-[0_4px_4px_rgba(0,0,0,0.45)]" />

          {/* Navegação */}
          <nav className="relative flex items-center gap-6 lg:gap-10 text-white text-sm lg:text-base">
            <Link href="/" className="">Início</Link>
            <Link href="/sobre-nos" className="">Sobre nós</Link>
            <Link href="/produtos" className="">Produtos</Link>
            <Link href="/contato" className="">Contato</Link>
          </nav>
        </div>

        {/* Carrinho + Usuário */}
            <div className="absolute top-4 sm:top-6 lg:top-[30px] right-4 sm:right-6 lg:right-[30px] flex items-center space-x-3 sm:space-x-5 lg:space-x-7">
                
                <div className="relative">
                <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6 text-[#5e4f45]" />
                
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-[#8f3332] text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center text-[10px] sm:text-xs">
                    0
                </span>
                
                </div>
                
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-user">
                <img src="/usuario-foto.png" alt="Foto do usuário" />
                </div>
            </div>
        </header>
    </div>
    );
}