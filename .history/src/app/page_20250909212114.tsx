"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Scissors, RefreshCw, Recycle, Search, Users, RotateCcw } from "lucide-react"
import HeroSection from "@/components/HeroSection";

export default function WenoveLanding() {

  return (
    
    <div className="min-h-screen relative bg-transparent">

  {/* Header */}
  <header className="absolute top-0 left-0 w-full h-24 z-10 flex items-center justify-between px-6">
    
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
        <a href="#" className="hover:text-[#ffcc00] transition-colors">Início</a>
        <a href="#" className="hover:text-[#ffcc00] transition-colors">Sobre nós</a>
        <a href="#" className="hover:text-[#ffcc00] transition-colors">Produtos</a>
        <a href="#" className="hover:text-[#ffcc00] transition-colors">Contato</a>
      </nav>
    </div>

    {/* Botão */}
    <div>
      <Button className="
      absolute top-[30px] right-[30px]
      w-[150px] h-[50px] bg-[#FFCC00] hover:bg-[#e5dc3c]
      text-[#0C3729] font-dosis font-semibold text-[20px]
      rounded-full flex items-center justify-center
      shadow-[0_4px_4px_rgba(0,0,0,0.25)]
      before:absolute before:inset-0 before:shadow-inner before:shadow-[0_4px_4px_rgba(0,0,0,0.25)] before:rounded-full
      transition
      ">
        Sou Wenove
      </Button>
    </div>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Section de Serviços */}
      <section
        className="relative py-16 px-6 z-20 mt-[-150px] rounded-[20px] overflow-hidden"
        style={{
          backgroundImage: 'url("/Fundo-servicos.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '500px',
          maxWidth: '1300px',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '-4px -4px 4px 0 rgba(0, 0, 0, 0.25), 4px 4px 4px 0 rgba(0, 0, 0, 0.25)'
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-6xl text-[#8f3332] text-center mb-12"
          style={{ fontFamily: "Futura, sans-serif" }}
          >
            Dando um novo propósito às suas roupas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <Card className=" group bg-[transparent] border-4 border-[#8f3332] rounded-lg transition-colors duration-300 hover:bg-[#8F3332] hover:border-[#8F3332]">
              
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-[transparent] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-16 h-16 text-[#8F3332] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-[#8f3332] mb-3 transition-colors duration-300 group-hover:text-white"
                style={{ fontFamily: "Futura, sans-serif" }}
                >COLETA</h3>
                
                <p className="text-[#993F3C] font-dosis text-m leading-relaxed transition-colors duration-300 group-hover:text-white">
                  Agenda coleta de suas roupas usadas de forma rápida e prática.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-[transparent] border-4 border-[#8f3332] rounded-lg transition-colors duration-300 hover:bg-[#8F3332] hover:border-[#8F3332]">
              
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-[transparent] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Scissors className="w-16 h-16 text-[#8f3332] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-[#8f3332] mb-3 transition-colors duration-300 group-hover:text-white"
                style={{ fontFamily: "Futura, sans-serif" }}
                >TRIAGEM</h3>
                <p className="text-[#993F3C] font-dosis text-m leading-relaxed transition-colors duration-300 group-hover:text-white">
                  Cada peça é analisada e separada para ganhar um novo propósito.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-[transparent] border-4 border-[#8f3332] rounded-lg transition-colors duration-300 hover:bg-[#8F3332] hover:border-[#8F3332]">
              
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-[transparent] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-16 h-16 text-[#8f3332] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-[#8f3332] mb-3 transition-colors duration-300 group-hover:text-white"
                style={{ fontFamily: "Futura, sans-serif" }}
                >REAPROVEITAMENTO</h3>
                <p className="text-[#993F3C] font-dosis text-m leading-relaxed transition-colors duration-300 group-hover:text-white">
                  Transformamos roupas e tecidos em novos produtos de valor.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-[transparent] border-4 border-[#8f3332] rounded-lg transition-colors duration-300 hover:bg-[#8F3332] hover:border-[#8F3332]">
              
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-[transparent] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-16 h-16 text-[#8f3332] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-[#8f3332] mb-3 transition-colors duration-300 group-hover:text-white"
                style={{ fontFamily: "Futura, sans-serif" }}
                >RECICLAGEM</h3>
                <p className="text-[#993F3C] font-dosis text-m leading-relaxed transition-colors duration-300 group-hover:text-white">
                  Materiais têxteis das reciclados reduzindo impacto ambiental.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section sobre a Plataforma */}
      
      <section className="py-35 px-6 bg-[#ffffff]">
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            
            <div className="">
              <h2 
                className="text-[60px] text-[#ffcc00] text-justify mb-6 leading-tight"
                style={{ fontFamily: "Futura, sans-serif" }}
                >
                  Uma plataforma que
                  <br />
                  conecta e transforma
              </h2>
              
              <p className="text-[#0C3729] font-dosis font-medium text-[30px] text-justify leading-relaxed max-w-[500px]"
              style={{letterSpacing: '-0.005em'}}
              >
                Somos uma marketplace que aproxima consumidores, marcas e empreendedores responsáveis, criando oportunidades para dar uma nova vida às peças. Mais do que moda, promovemos consumo inteligente e impacto positivo.
              </p>
            </div>

            <div className="flex justify-center relative">
              <img 
              src="/img-sobre_plataforma.svg" 
              alt="Platform illustration" 
              className="w-full relative -top-14" 
              />
            </div>

          </div>
        </div>
      </section>

      {/* Section Como Funciona */}
      <section className="relative py-16 px-6 h-[500px] max-w-[1300px] bg-[#0c3729] rounded-[20px] overflow-hidden mx-auto mb-40"
      style={{boxShadow: '-4px -4px 4px 0 rgba(0, 0, 0, 0.25), 4px 4px 4px 0 rgba(0, 0, 0, 0.25)'}}
      >
        
        <div className="max-w-4xl mx-auto text-center -mt-10">
          <h2 className="text-3xl md:text-6xl text-[#ffffff] mb-3"
          style={{ fontFamily: "Futura, sans-serif" }}
          >Como funciona a Wenove</h2>
          
          <p className="text-[#ffcc00] font-dosis font-semibold md:text-2xl text-lg mb-10">
            Transformamos roupas usadas em novas oportunidades. Veja como participar:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            <Card className="group bg-transparent border-4 border-[#ffcc00] rounded-lg transition-colors duration-300 hover:bg-[#ffcc00]">
              
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-[#ffcc00] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                
                <h3 className="text-2xl text-[#ffffff] mb-3"
                style={{ fontFamily: "Futura, sans-serif" }}
                >EXPLORE</h3>
                
                <p className="text-[#ffffff] font-dosis font-bold text-m leading-relaxed">
                  Explore estudos únicos e marcas que inspiram um novo consumo.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-transparent border-4 border-[#ffcc00] rounded-lg transition-colors duration-300 hover:bg-[#ffcc00]">
              
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-12 h-12 text-[#ffcc00] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-[#ffffff] mb-3"
                style={{ fontFamily: "Futura, sans-serif" }}
                >CONECTE-SE</h3>
                
                <p className="text-[#ffffff] font-dosis font-bold text-m leading-relaxed">
                  Escolha, conecte e negocie de forma simples e segura.
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-transparent border-4 border-[#ffcc00] rounded-lg transition-colors duration-300 hover:bg-[#ffcc00]">
              
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-transparent rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-12 h-12 text-[#ffcc00] group-hover:text-[#FFFFFF] transition-colors duration-300" />
                </div>
                
                <h3 className="text-2xl text-[#ffffff] mb-3"
                style={{ fontFamily: "Futura, sans-serif" }}
                >TRANSFORME</h3>
                
                <p className="text-[#ffffff] font-dosis font-bold text-m leading-relaxed">
                  Mude sua no consumo — e ajude a reduzir o desperdício.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Section Escolher */}
      
      <section className="py-16 px-6 bg-[#efe8db] mb-40">
        
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-3xl md:text-6xl text-[#8f3332] text-center mb-12"
          style={{ fontFamily: "Futura, sans-serif" }}>
            Por que escolher a Wenove?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              
              <div className="w-16 h-16 bg-[#395C3E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] text-4xl"
                style={{ fontFamily: "Futura, sans-serif" }}
                >1</span>
              </div>
              
              <h3 className="text-2xl text-[#88a51d] mb-3"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Consumo inteligente</h3>
              
              <p className="text-[#88A51D] font-dosis font-semibold text-m leading-relaxed max-w-[240px]">Moda que faz sentido para você e para o planeta.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#395C3E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] text-4xl"
                style={{ fontFamily: "Futura, sans-serif" }}
                >2</span>
              </div>
              
              <h3 className="text-2xl text-[#88a51d] mb-3"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Sustentabilidade real</h3>
              
              <p className="text-[#88A51D] text-center font-dosis font-semibold text-m leading-relaxed">Menos descarte, mais responsabilidade.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#395C3E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] text-4xl"
                style={{ fontFamily: "Futura, sans-serif" }}
                >3</span>
              </div>
              
              <h3 className="text-2xl text-[#88a51d] mb-3"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Conexões que importam</h3>
              
              <p className="text-[#88A51D] font-dosis font-semibold text-m leading-relaxed">Pessoas, marcas e empreendedores juntos.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#395C3E] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] text-4xl"
                style={{ fontFamily: "Futura, sans-serif" }}
                >4</span>
              </div>
              
              <h3 className="text-2xl text-[#88a51d] mb-3"
              
              >Impacto positivo</h3>
              
              <p className="text-[#3b2d24] text-sm leading-relaxed">
                Cada peça tem uma nova proposta e muda o fim final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0c3729]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#ffffff] rounded-full flex items-center justify-center">
                  <span className="text-[#0c3729] font-bold text-sm">W</span>
                </div>
                <span className="text-[#ffffff] font-bold text-xl">Wenove</span>
              </div>
              <p className="text-[#ffffff] text-sm mb-4">Conectando pessoas através da moda sustentável.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#ffffff] bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-[#ffffff] text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-[#ffffff] bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-[#ffffff] text-sm">@</span>
                </div>
                <div className="w-8 h-8 bg-[#ffffff] bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-[#ffffff] text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[#ffffff] font-bold mb-4">Navegue</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#ffffff] font-bold mb-4">Para você</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Quero comprar roupas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Quero vender roupas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
