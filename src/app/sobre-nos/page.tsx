"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button"
import HeaderProduto from "@/components/HeaderProduto"
import { Menu, X } from "lucide-react"
import Link from "next/link";
import { useState } from "react"

export default function Sobre_nos() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div>
      
        {/* Header */}
        <HeaderProduto logoSrc="/Logo-landing.svg" cartColor="text-white" />

        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#88a51d] rounded-full flex items-center justify-center"
        >
          <Menu className="w-6 h-6 text-white drop-shadow-md" />
        </button>

        {/* Menu do celular */}
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-50 sm:hidden">
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />

                {/* Sidebar */}
                <div className="absolute left-0 top-0 h-full w-80 bg-[#0C3729] shadow-xl transform transition-transform duration-300 ease-in-out">
                  
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
                      href="/contato"
                      className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contato
                    </Link>
                  </nav>

                  {/* CTA Button */}
                  <div className="p-6 mt-8">
                    <Button
                      className="w-full h-12 bg-[#FFCC00] hover:bg-[#FFDE59] text-[#0C3729] font-dosis font-semibold text-lg rounded-full shadow-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Link href="/login">Sou Wenove</Link>
                    </Button>
                  </div>

                </div>
              </div>
            )}

        {/* Hero Section */}
          <section className="relative w-full overflow-hidden flex flex-col items-center justify-start pt-0 pb-0">
            <div className="relative w-full max-w-full h-auto flex-shrink-0 xl:hidden">
              <Image
                src={"/img-sobre-nos.png"}
                alt="Sobre Nós"
                width={5257}
                height={3198}
                className="w-full h-auto max-h-[80vh] sm:max-h-[70vh] md:max-h-[60vh] lg:max-h-screen object-contain xl:w-screen"
                priority
                sizes="(max-width: 1280px) 100vw, 100vw"
              />
            </div>
            {/* Overlay escuro - aplicado apenas sobre a imagem */}
            <div className="absolute inset-0 bg-black/40 w-full h-full max-h-[80vh] sm:max-h-[70vh] md:max-h-[60vh] lg:max-h-screen" />
            {/* Conteúdo central opcional - posicionado sobre a imagem */}
            <div className="absolute z-10 text-white text-center top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 xl:left-1/2 xl:w-screen">
              <h1 className="text-2xl md:text-5xl lg:text-6xl"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Sobre Nós</h1>
            </div>
          </section>

          <section className="hidden xl:block relative w-full h-screen overflow-hidden">
              <Image
                src="/img-sobre-nos.png"
                alt="Sobre Nós"
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute z-10 text-white text-center top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <h1 className="text-8xl" style={{ fontFamily: "Futura, sans-serif" }}>
                  Sobre Nós
                </h1>
              </div>
          </section>
          

      {/* Main Content */}

      <div className="bg-[#FFF]">
        <main className="px-4 md:px-8 py-12 md:py-16 max-w-4xl mx-auto">
        <div className="font-dosis space-y-6 leading-relaxed text-justify text-center">
          <p className="text-sm md:text-base">
            Nós somos estudantes de tecnologia do Centro Universitário Dom Bosco (UNDB) de São Luís - MA. Para nós, a
            sustentabilidade não deve ser apenas uma meta, mas também um compromisso diário. Motivados a aplicar o que
            aprendemos para construir um futuro mais sustentável, criamos a WeNove: uma startup maranhense dedicada a
            transformar a maneira como a moda é consumida.
          </p>

          <p className="text-sm md:text-base">
            Nosso propósito é aproximar pessoas comuns da sustentabilidade, de forma que ela deixe de ser algo futuro e
            passe a estar cada vez mais presente no cotidiano de todos. No contexto atual de fast fashion,{" "}
            <strong>nós acreditamos que cada peça de roupa tem valor e pode ter uma nova vida nas mãos certas</strong>.
          </p>

          <p className="text-sm md:text-base">
            Desse modo, ao tornar a moda sustentável mais acessível e prática, esperamos contribuir para a redução do
            impacto ambiental do lixo têxtil, transformando o que seria desperdício em oportunidade.
          </p>
        </div>
      </main>

      {/* Contact Section */}
      <section id="contato" className="px-4 md:px-8 py-4 lg:p-8 bg-[#FFF]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 mb-6 sm:mb-8 lg:mb-10 items-center">
            
            {/* Contact Info */}
            <div className="text-center">
              <h2 className="text-[#FFCC00] text-3xl md:text-4xl mb-6 md:mb-8"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Contato</h2>
             
              <p className="font-dosis font-medium text-[#0C3729] mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                A WeNove está sempre disponível para você. Para dúvidas, sugestões, reclamações e elogios, fale conosco!
              </p>

              {/* Contact Icons */}
              <div className="flex justify-center space-x-4 md:space-x-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Image  
                  src="/footer-zap.svg" 
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="sm:w-6 sm:h-6" />
                </div>
                
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Image  
                  src="/footer-email.svg" 
                  alt="Email" 
                  width={16}
                  height={16}
                  className="sm:w-6 sm:h-6" />
                </div>
                
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Image  
                  src="/footer-instagram.svg" 
                  alt="Instagram" 
                  width={16}
                  height={16}
                  className="sm:w-7 sm:h-7" />
                </div>
              </div>
            </div>

            {/* 3D Illustration */}
            <div className="flex justify-center">
              <div className="relative w-60 h-60 md:w-80 md:h-80 object-contain">
                <Image 
                  src="/svg-sobre-nos.svg"
                  alt="Recycling illustration"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section> 
    </div>
    </div>
  )
}
