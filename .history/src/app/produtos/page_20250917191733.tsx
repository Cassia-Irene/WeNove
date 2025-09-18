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