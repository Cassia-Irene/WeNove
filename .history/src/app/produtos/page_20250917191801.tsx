"use client"
import Image from "next/image";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Menu, X, Search } from "lucide-react"
import HeaderProduto from "@/components/HeaderProduto"
import products from "@/lib/products"
export default function ProdutosPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilters, setSelectedFilters] = useState<{ [key: string]: string[] }>({})
  const filtersData: { [key: string]: string[] } = {
    "Tipo de Peça": ["Camisa", "Calça", "Vestido"],
    "Material": ["Algodão", "Linho", "Seda"],
    "Tamanho": ["P", "M", "G", "GG"],
    "Condição da Peça": ["Novo", "Usado"],
  }
  function toggleFilter(filterName: string, option: string) {
    setSelectedFilters(prev => {
      const currentOptions = prev[filterName] || []
      if (currentOptions.includes(option)) {
        const newOptions = currentOptions.filter(o => o !== option)
        if (newOptions.length === 0) {
          const { [filterName]: _, ...rest } = prev
          return rest
        }
        return { ...prev, [filterName]: newOptions }
      } else {
        return { ...prev, [filterName]: [...currentOptions, option] }
      }
    })
  }
function clearFilters() {
    setSelectedFilters({})
  }
  const filteredProducts = products.filter(product => {
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.seller.toLowerCase().includes(searchLower) ||
      (product.material?.toLowerCase().includes(searchLower) ?? false)
    if (!matchesSearch) return false
    for (const filterName in selectedFilters) {
      const selectedOptions = selectedFilters[filterName]
      if (selectedOptions.length === 0) continue
      if (filterName === "Tipo de Peça" && !selectedOptions.includes(product.type)) {
        return false
      }
      if (filterName === "Material" && !selectedOptions.includes(product.material)) {
        return false
      }
      if (filterName === "Tamanho" && !selectedOptions.includes(product.size)) {
        return false
      }
      if (filterName === "Condição da Peça" && !selectedOptions.includes(product.condition)) {
        return false
      }
    }
    return true
  })
  return (
    <div className="min-h-screen bg-[#FFF]">
      <HeaderProduto />
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#88a51d] rounded-full flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </button>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-[#0C3729] shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-6 border-b border-[#FFCC00]/20">
              <Image src="/Logo-landing.svg" alt="Wenove Logo" width={120} height={40} />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#FFCC00] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex flex-col p-6 space-y-6">
              <Link href="/" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Início</Link>
              <Link href="/sobre-nos" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Sobre nós</Link>
              <Link href="/produtos" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Produtos</Link>
              <Link href="/contato" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            </nav>
          </div>
        </div>
      )}
      <div
        className="mt-22 py-10 xl:py-15 text-center mb-8 xl:mt-35 xl:mb-20 bg-[#efe8db]"
        style={{ boxShadow: "0 -1px 4px 0 rgba(0,0,0,0.25), 0 1px 4px 0 rgba(0,0,0,0.25)" }}
      >
        <h1 className="text-3xl sm:text-3xl lg:text-4xl xl:text-5xl text-[#88a51d] mb-4 sm:mb-4 xl:mb-8" style={{ fontFamily: "Futura, sans-serif" }}>
          Explore Produtos
        </h1>
        <p className="text-[#993F3C] text-lg md:text-2xl font-dosis font-medium mb-4 leading-relaxed max-w-3xl mx-auto">
          Descubra peças únicas, feitas com propósito,
          <br />
          e escolha com consciência.
        </p>
        <div className="max-w-xs sm:max-w-md mx-auto relative">
          <Search className="absolute left-4 lg:left-20 xl:left-20 top-1/2 transform -translate-y-1/2 text-[#FFF] h-4 w-4 sm:h-6 sm:w-6" />
          <input
            type="text"
            placeholder="Busque por peças, marcas ou materiais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-10 lg:pl-28 xl:pl-30 pr-4 py-2 sm:py-3 rounded-[20px] border-2 border-[#0C3729] bg-[#B2CC57] focus:outline-none focus:border-[#0C3729] text-white placeholder-white font-dosis font-medium"
            style={{ boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)" }}
          />
        </div>
      </div>