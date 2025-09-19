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
