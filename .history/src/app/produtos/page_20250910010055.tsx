"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, ShoppingCart, User } from "lucide-react"
import Header_Produto from "@/components/Header-produto"


export default function ProdutosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const products = [
    {
      id: 1,
      name: "Bolsa Eco Jeans",
      price: "R$ 45,00",
      image: "/produto1.png",
      seller: "Ana Luna",
      sellerAvatar: "/woman-profile.png",
    },
    {
      id: 2,
      name: "Camiseta Orgânica",
      price: "R$ 35,00",
      image: "/produto2.png",
      seller: "Lucas Ferreira",
      sellerAvatar: "/man-profile.png",
    },
    {
      id: 3,
      name: "Tênis Recycle Step",
      price: "R$ 109,00",
      image: "/produto3.png",
      seller: "Rafael Almeida",
      sellerAvatar: "/man-profile.png",
    },
    {
      id: 4,
      name: "Saia de Linho Sustentável",
      price: "R$ 89,00",
      image: "/produto4.png",
      seller: "Thais Santos",
      sellerAvatar: "/woman-profile.png",
    },
    {
      id: 5,
      name: "Bolsa Eco Retalhada",
      price: "R$ 89,90",
      image: "/produto5.png",
      seller: "Camila Rocha",
      sellerAvatar: "/woman-profile.png",
    },
    {
      id: 6,
      name: "Calça Eco Wide Leg",
      price: "R$ 109,90",
      image: "/produto6.png",
      seller: "Marina Oliveira",
      sellerAvatar: "/woman-profile.png",
    },
    {
      id: 7,
      name: "Camiseta EcoFit",
      price: "R$ 60,00",
      image: "/produto7.png",
      seller: "Luis Martins",
      sellerAvatar: "/man-profile.png",
    },
    {
      id: 8,
      name: "Jaqueta Upcycling",
      price: "R$ 108,90",
      image: "/patchwork-denim-jacket-upcycled.jpg",
      seller: "Ricardo Almeida",
      sellerAvatar: "/man-profile.png",
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
      <Header_Produto />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="w-screen  sm:-mx-6 lg:-mx-89 py-15 text-center mb-20 bg-[#efe8db]"
        style={{boxShadow: '0 -1px 4px 0 rgba(0,0,0,0.25), 0 1px 4px 0 rgba(0,0,0,0.25)'}}
        >

          <h1 className="text-3xl md:text-5xl text-[#88a51d] mb-8"
          style={{ fontFamily: "Futura, sans-serif" }}
          
          >Explore Produtos</h1>
          <p className="text-[#993F3C] text-lg md:text-2xl font-dosis font-medium mb-8 leading-relaxed max-w-3xl mx-auto">
            Descubra peças únicas, feitas com propósito,
            <br />e escolha com consciência.
          </p>

          {/* Barra de Busca */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-20 top-1/2 transform -translate-y-1/2 text-[#FFF] h-6 w-6" />
            <input
              type="text"
              placeholder="Busque por peças, marcas ou materiais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-30 pr-4 py-3 rounded-full border-2 border-[#0C3729] bg-[#88a51d] focus:outline-none focus:border-[#0C3729] text-white placeholder-white font-dosis font-medium"
              style={{ boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)' }}
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <Card
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-[#3b2d24] mb-2">{product.name}</h3>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-[#8f3332]">{product.price}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={product.sellerAvatar || "/placeholder.svg"}
                    alt={product.seller}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-[#5e4f45]">{product.seller}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white bg-transparent"
          >
            ←
          </Button>
          <Button className="bg-[#88a51d] text-white hover:bg-[#708943]">Página seguinte →</Button>
          <div className="text-[#8f3332] ml-4">
            Página <span className="font-semibold">1</span> de 10
          </div>
        </div>
      </main>
    </div>
  )
}
