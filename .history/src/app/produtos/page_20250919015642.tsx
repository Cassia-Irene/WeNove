"use client"

import Image from "next/image"
import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import HeaderProduto from "@/components/HeaderProduto"
import products from "@/lib/products"
import Filtros from "@/components/Filtros"

export default function ProdutosPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  // 👉 Estado centralizado dos filtros
  const [selectedOptions, setSelectedOptions] = useState({
    Material: [] as string[],
    "Tipo de peça": [] as string[],
    "Condição da peça": [] as string[],
    Tamanho: [] as string[],
  })

  // 👉 Filtragem de produtos
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedOptions.Material.length > 0 && !selectedOptions.Material.includes(product.material)) {
        return false
      }
      if (
        selectedOptions["Tipo de peça"].length > 0 &&
        !selectedOptions["Tipo de peça"].includes(product.tipo)
      ) {
        return false
      }
      if (
        selectedOptions["Condição da peça"].length > 0 &&
        !selectedOptions["Condição da peça"].includes(product.condicao)
      ) {
        return false
      }
      if (selectedOptions.Tamanho.length > 0 && !selectedOptions.Tamanho.includes(product.tamanho)) {
        return false
      }

      // Busca pelo nome
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false
      }

      return true
    })
  }, [selectedOptions, searchQuery])

  return (
    <div className="min-h-screen bg-[#FFF]">
      {/* Header */}
      <HeaderProduto />

      {/* Botão menu mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#88a51d] rounded-full flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </button>

      {/* Sidebar mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-[#0C3729] shadow-xl">
            <div className="flex items-center justify-between p-6 border-b border-[#FFCC00]/20">
              <Image src="/Logo-landing.svg" alt="Wenove Logo" width={30} height={30} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#FFCC00]"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <Link href="/" className="text-white text-lg font-dosis hover:text-[#FFCC00]">Início</Link>
              <Link href="/sobre-nos" className="text-white text-lg font-dosis hover:text-[#FFCC00]">Sobre nós</Link>
              <Link href="/produtos" className="text-white text-lg font-dosis hover:text-[#FFCC00]">Produtos</Link>
              <Link href="/contato" className="text-white text-lg font-dosis hover:text-[#FFCC00]">Contato</Link>
            </nav>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="mt-22 py-10 text-center mb-8 xl:mt-35 xl:mb-20 bg-[#efe8db] shadow-md">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl text-[#88a51d] mb-4" style={{ fontFamily: "Futura, sans-serif" }}>
          Explore Produtos
        </h1>
        <p className="text-[#993F3C] text-lg md:text-2xl font-dosis font-medium mb-4">
          Descubra peças únicas, feitas com propósito, <br /> e escolha com consciência.
        </p>

        {/* Barra de busca */}
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#FFF]" />
          <input
            type="text"
            placeholder="Busque por peças, marcas ou materiais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-[20px] border-2 border-[#0C3729] bg-[#B2CC57] text-white placeholder-white font-dosis font-medium focus:outline-none"
          />
        </div>
      </div>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Filtros responsivos */}
        <div className="hidden lg:flex xl:hidden justify-center mb-6">
          <Filtros selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Sidebar de filtros */}
          <aside className="lg:hidden xl:block lg:col-span-1">
            <Filtros selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          </aside>

          {/* Produtos */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Link key={product.id} href={`/produtos/${product.id}`} className="w-full flex justify-center">
                  <Card className="rounded-lg border-none hover:shadow-lg w-full max-w-[280px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[300px]">
                    <div className="w-full h-[240px]">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={300}
                        height={240}
                        className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform"
                      />
                    </div>
                    <CardContent className="p-2">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-dosis font-semibold text-[#0C3729] text-sm">
                          {product.name}
                        </h3>
                        <span className="w-[70px] h-[30px] rounded-[20px] bg-[#8B3130] text-white text-xs flex items-center justify-center">
                          {product.price}
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Image
                          src={product.sellerAvatar || "/placeholder.svg"}
                          alt={product.seller}
                          width={36}
                          height={36}
                          className="rounded-full object-cover w-9 h-9"
                        />
                        <span className="font-dosis font-bold text-sm text-[#88A51D]">
                          {product.seller}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
              {filteredProducts.length === 0 && (
                <p className="col-span-full text-center text-[#8f3332] font-dosis font-medium">
                  Nenhum produto encontrado.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
