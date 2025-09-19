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

    const [selectedOptions, setSelectedOptions] = useState({
      Material: [] as string[],
      "Tipo de peça": [] as string[],
      "Condição da peça": [] as string[],
      Tamanho: [] as string[],
    })

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

          if (searchQuery && !product.name.toLowerCase().includes   (searchQuery.toLowerCase())) {
            return false
          }

          return true
        })
      }, [selectedOptions, searchQuery])


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
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />

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
          </div>
        </div>
      )}

      {/* Page Header */}
      <div
        className="mt-22 py-10 xl:py-15 text-center mb-8 xl:mt-35 xl:mb-20 bg-[#efe8db]"
        style={{
          boxShadow:
            "0 -1px 4px 0 rgba(0,0,0,0.25), 0 1px 4px 0 rgba(0,0,0,0.25)",
        }}
      >
        <h1
          className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#88a51d] mb-4 sm:mb-4 xl:mb-8"
          style={{ fontFamily: "Futura, sans-serif" }}
        >
          Explore Produtos
        </h1>

        <p className="text-[#993F3C] text-lg md:text-2xl font-dosis font-medium mb-4 leading-relaxed max-w-3xl mx-auto">
          Descubra peças únicas, feitas com propósito,
          <br />
          e escolha com consciência.
        </p>

        {/* Barra de Busca */}
        <div className="max-w-xs sm:max-w-md mx-auto relative">
          <Search className="absolute left-4 lg:left-20 xl:left-20 top-1/2 transform -translate-y-1/2 text-[#FFF] h-4 w-4 sm:h-6 sm:w-6" />

          <input
            type="text"
            placeholder="Busque por peças, marcas ou materiais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-10 lg:pl-28 xl:pl-30 pr-4 py-2 sm:py-3 rounded-[20px] border-2 border-[#0C3729] bg-[#B2CC57] focus:outline-none focus:border-[#0C3729] text-white placeholder-white font-dosis font-medium"
            style={{
              boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
            }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">

    <div className="hidden lg:flex xl:hidden justify-center mb-6">
      <Filtros
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
    </div>

    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

      {/* Sidebar de filtros */}
      <aside className="lg:hidden xl:block lg:col-span-1">
        <Filtros 
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </aside>

      {/* Grade de produtos */}
      <div className="lg:col-span-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:mb-10 justify-items-center">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produtos/${product.id}`}
              className="w-full flex justify-center"
            >
              <Card className="rounded-lg border-none hover:shadow-lg w-full max-w-[280px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[300px] py-0 cursor-pointer">
                <div className="w-full h-[240px]">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={240}
                    className="w-full h-full rounded-lg object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <CardContent className="p-2">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-dosis font-semibold text-[#0C3729] mb-0 text-sm sm:text-base md:text-base lg:text-base">
                      {product.name}
                    </h3>

                    <span className="flex items-center justify-center w-[70px] h-[30px] rounded-[20px] bg-[#8B3130] text-white text-xs sm:text-sm font-dosis font-semibold">
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
        </div>
      </div>

    </div>

    {/* Botões de paginação */}
    <div className="flex items-center justify-center space-x-6 mt-20 mb-20">
      <Button
        variant="outline"
        className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white bg-transparent"
      >
        ←
      </Button>

      <Button className="bg-[#88a51d] text-white hover:bg-[#708943]">
        Página seguinte →
      </Button>
      <div className="text-[#8f3332] font-dosis">
        Página <span className="font-bold">1</span> de 10
      </div>
    </div>
      </main>
    </div>
  )
}