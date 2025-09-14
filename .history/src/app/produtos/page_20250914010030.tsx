"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link";
import { Menu, X } from "lucide-react"
import { Search } from "lucide-react"
import HeaderProduto from "@/components/HeaderProduto"


export default function ProdutosPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const products = [
    {
      id: 1,
      name: "Bolsa Eco Jeans",
      price: "R$ 45,00",
      image: "/produto1.png",
      seller: "Ana Luíza",
      sellerAvatar: "/vendendor-1.png",
    },
    {
      id: 2,
      name: "Camiseta Orgânica",
      price: "R$ 35,00",
      image: "/produto2.png",
      seller: "Lucas Ferreira",
      sellerAvatar: "/vendendor-2.png",
    },
    {
      id: 3,
      name: "Tênis Recycle Step",
      price: "R$ 109,00",
      image: "/produto3.png",
      seller: "Rafael Almeida",
      sellerAvatar: "/vendendor-3.png",
    },
    {
      id: 4,
      name: "Saia de Linho Sustentável",
      price: "R$ 89,00",
      image: "/produto4.png",
      seller: "Pedro Santos",
      sellerAvatar: "/vendendor-4.png",
    },
    {
      id: 5,
      name: "Bolsa Eco Retalhada",
      price: "R$ 89,90",
      image: "/produto5.png",
      seller: "Camila Rocha",
      sellerAvatar: "/vendendor-5.png",
    },
    {
      id: 6,
      name: "Calça Eco Wide Leg",
      price: "R$ 109,90",
      image: "/produto6.png",
      seller: "Juliana Ribeiro",
      sellerAvatar: "/vendendor-6.png",
    },
    {
      id: 7,
      name: "Camiseta EcoFit",
      price: "R$ 60,00",
      image: "/produto7.png",
      seller: "Lara Mendes",
      sellerAvatar: "/vendendor-7.png",
    },
    {
      id: 8,
      name: "Jaqueta Upcycling",
      price: "R$ 108,90",
      image: "/produto8.png",
      seller: "Ricardo Almeida",
      sellerAvatar: "/vendendor-8.png",
    },
  ]

  const filters = [
    { name: "Tipo de Peça", active: false },
    { name: "Material", active: false },
    { name: "Tamanho", active: false },
    { name: "Condição da Peça", active: false },
  ]

  return (
    <div className="min-h-screen bg-[#FFF]">
      
      {/* Header */}
      <HeaderProduto />

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
                    <img src="/Logo-landing.svg" alt="Wenove Logo" className="w-30" />
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

                </div>
              </div>
            )}

      {/* Page Header */}
        <div className="sm:top-[20%] lg:top-[0] xl:top-[0] py-10 xl:py-15 text-center mb-8 xl:mt-10 xl:mb-20 bg-[#efe8db]"
        style={{boxShadow: '0 -1px 4px 0 rgba(0,0,0,0.25), 0 1px 4px 0 rgba(0,0,0,0.25)'}}
        >

          <h1 className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#88a51d] mb-4 sm:mb-4 xl:mb-8"
          style={{ fontFamily: "Futura, sans-serif" }}
          >Explore Produtos</h1>
          
          <p className="text-[#993F3C] text-lg md:text-2xl font-dosis font-medium mb-4 leading-relaxed max-w-3xl mx-auto">
            Descubra peças únicas, feitas com propósito,
            <br />e escolha com consciência.
          </p>

          {/* Barra de Busca */}
          <div className="max-w-xs sm:max-w-md mx-auto relative">
            <Search className="absolute left-4 lg:left-20 xl:left-20 top-1/2 transform -translate-y-1/2 text-[#FFF] h-4 w-4 sm:h-5 sm:w-5 sm:h-6 sm:w-6 " />
            
            <input
              type="text"
              placeholder="Busque por peças, marcas ou materiais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 sm:pl-10 lg:pl-28 xl:pl-30 pr-4 py-2 sm:py-3 rounded-[20px] border-2 border-[#0C3729] bg-[#B2CC57] focus:outline-none focus:border-[#0C3729] text-white placeholder-white font-dosis font-medium"
              style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}
            />
          </div>
        </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-10 xl:mb-20">
          {filters.map((filter, index) => (
            <Button
              key={index}
              variant="outline"
              className="bg-[#0c3729] font-dosis font-semibold text-white border-[#0c3729] rounded"
              style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}
            >
              {filter.name}
            </Button>
          ))}
          <Button
            variant="outline"
            className="bg-[#8f3332] text-white border-[#8f3332] rounded"
            style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}
          >
            Limpar Filtros
          </Button>
        </div>

        {/* Grade de produtos */}
        
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:mb-10 justify-items-center">
          {products.map((product) => (
            
            <Card
              key={product.id}
              className="rounded-lg border-none hover:shadow-lg w-full max-w-[280px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[300px] py-0"
            >
              <div className="w-full h-[240px]">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              <CardContent className="p-2">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-dosis font-semibold text-[#0C3729] mb-0 text-sm sm:text-base md:text-base lg:text-base">{product.name}</h3>

                  <span className="flex items-center justify-center w-[70px] h-[30px] rounded-[20px] bg-[#8B3130] text-white text-xs sm:text-sm font-dosis font-semibold">
                    {product.price}
                  </span>

                </div>
                
                <div className="flex items-center space-x-3">
                  <img
                    src={product.sellerAvatar || "/placeholder.svg"}
                    alt={product.seller}
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="font-dosis font-bold text-sm text-[#88A51D]">{product.seller}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Botões de paginação */}
        <div className="flex items-center justify-center space-x-6 mt-20 mb-20">
          <Button
            variant="outline"
            className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white bg-transparent"
          >
            ←
          </Button>
          <Button className="bg-[#88a51d] text-white hover:bg-[#708943]">Página seguinte →</Button>
          <div className="text-[#8f3332] font-dosis">
            Página <span className="font-bold">1</span> de 10
          </div>
        </div>
      </main>
    </div>
  )
}
