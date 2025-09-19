import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function HeaderVendedor() {
  return (
      <div className="relative bg-transparent pt-24">

      {/* Header */}
      <header className="absolute top-0 left-0 w-full h-16 sm:h-20 lg:h-24 z-10 flex items-center justify-between px-4 sm:px-6">
        
        {/* Logo */}
        <divclassName="hidden sm:block absolute top-6 sm:top-6 lg:top-[30px] left-4 sm:left-6 lg:left-[30px] w-34 sm:w-34 lg:w-auto">

        </div>
        <Image 
          src="/Logo-vendedor.svg"
          alt="Wenove Logo"
          
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

        {/* Carrinho + Usuário */}
            <div className="absolute top-6 sm:top-6 lg:top-[30px] right-4 sm:right-6 lg:right-[30px] flex items-center space-x-3 sm:space-x-5 lg:space-x-7">
                
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center shadow-user">
                <Image  src="/usuario-foto.png" alt="Foto do usuário" className="w-full h-full rounded-full object-cover"/>
                </div>
            </div>
        </header>
    </div>
    );
}