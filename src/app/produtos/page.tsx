"use client"

import Image from "next/image"
import { useState, useMemo, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Menu, X, Search, Loader2 } from "lucide-react"
import HeaderProduto from "@/components/HeaderProduto"
import Filtros from "@/components/Filtros"
import apiClient from "@/lib/api"
import { ProductResponse } from "@/lib/api.types"

export default function ProdutosPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const productPerPage = 6

  // Estados para API
  const [products, setProducts] = useState<ProductResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)

    const parseCondicao = (condition: string) => {
        switch (condition) {
          case 'NEW':
            return 'Novo'
          case 'USED':
            return 'Usado'
          case 'REFURBISHED':
            return 'Upcycle'
          case 'DAMAGED':
            return 'Danificado'
          default:
            return 'Desconhecida'
      }
    }
  
  // Estados para produtos recomendados
  const [recommendedProducts, setRecommendedProducts] = useState<ProductResponse[]>([])
  const [recommendedLoading, setRecommendedLoading] = useState(false)

  const [selectedOptions, setSelectedOptions] = useState({
    Material: [] as string[],
    "Tipo de peça": [] as string[],
    "Condição da peça": [] as string[],
    Tamanho: [] as string[],
  })

  // Função para carregar produtos da API
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiClient.getAllProducts()
      if (response.success && response.data) {
        setProducts(response.data)
      } else {
        setError(response.message || 'Erro ao carregar produtos')
      }
    } catch (err) {
      // Verificar se é "nenhum produto encontrado" vs erro real da API
      if (err instanceof Error && err.message.includes('Nenhum produto encontrado')) {
        setProducts([]) // Tratar como resultado vazio, não como erro
        setError(null)
      } else {
        setError('Erro ao conectar com o servidor')
        console.error('Erro ao carregar produtos:', err)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // Função para carregar produtos recomendados
  const loadRecommendedProducts = useCallback(async () => {
    try {
      setRecommendedLoading(true)
      const response = await apiClient.getAllProducts()
      if (response.success && response.data) {
        // Pegar 6 produtos aleatórios para recomendação
        const shuffled = [...response.data].sort(() => 0.5 - Math.random())
        setRecommendedProducts(shuffled.slice(0, 6))
      }
    } catch (err) {
      console.error('Erro ao carregar produtos recomendados:', err)
    } finally {
      setRecommendedLoading(false)
    }
  }, [])

  // Função para buscar produtos com debounce
  const searchProducts = useCallback(async (query: string) => {
    if (!query.trim()) {
      loadProducts()
      return
    }

    try {
      setSearchLoading(true)
      setError(null)
      const response = await apiClient.searchProducts(query)
      if (response.success && response.data) {
        setProducts(response.data)
      } else {
        setError(response.message || 'Erro na busca')
      }
    } catch (err) {
      // Verificar se é "nenhum produto encontrado" vs erro real da API
      if (err instanceof Error && err.message.includes('Nenhum produto encontrado')) {
        setProducts([]) // Tratar como resultado vazio, não como erro
        setError(null)
      } else if (err instanceof Error) {
        if (err.message === 'Network Error') {
          setError('Erro de conexão. Tente novamente.')
        } else {
          setError('Erro ao buscar produtos')
        }
      } else {
        setError('Erro ao buscar produtos')
      }
      console.error('Erro na busca:', err)
    } finally {
      setSearchLoading(false)
    }
  }, [loadProducts])

  // Debounce para busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      searchProducts(searchQuery)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchProducts])

  // Carregar produtos iniciais e recomendados
  useEffect(() => {
    loadProducts()
    loadRecommendedProducts()
  }, [loadProducts, loadRecommendedProducts])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Busca já é feita pela API, então não precisamos filtrar por searchQuery aqui

      const matchesMaterial =
        selectedOptions.Material.length === 0 ||
        selectedOptions.Material.some(material =>
          product.materials && Object.keys(product.materials).some(materialKey =>
            materialKey.toLowerCase().includes(material.toLowerCase())
          )
        )

      const matchesTipo =
        selectedOptions["Tipo de peça"].length === 0 ||
        selectedOptions["Tipo de peça"].some(tipo =>
          product.categoryName?.toLowerCase().includes(tipo.toLowerCase()) ||
          product.shortName?.toLowerCase().includes(tipo.toLowerCase()) ||
          product.longName?.toLowerCase().includes(tipo.toLowerCase())
        )

      const matchesCondicao =
        selectedOptions["Condição da peça"].length === 0 ||
        selectedOptions["Condição da peça"].some(condicao =>
          product.condition?.toLowerCase() === condicao.toLowerCase() ||
          parseCondicao(product.condition || '').toLowerCase() === condicao.toLowerCase()
        )

      const matchesTamanho =
        selectedOptions.Tamanho.length === 0 ||
        selectedOptions.Tamanho.some(tamanho =>
          product.shortDescription?.toLowerCase().includes(tamanho.toLowerCase())
        )

      return (
        matchesMaterial &&
        matchesTipo &&
        matchesCondicao &&
        matchesTamanho
      )
    })
  }, [products, selectedOptions])

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * productPerPage
    const end = start + productPerPage
    return filteredProducts.slice(start, end)
  }, [currentPage, filteredProducts])

  const totalPages = Math.ceil(filteredProducts.length / productPerPage)

  function getConditionPlaceholder(condition: string) {
    switch (condition) {
      case 'NEW':
        return 'Novo'
      case 'USED':
        return 'Usado'
      case 'REFURBISHED':
        return 'Upcycle'
      case 'DAMAGED':
        return 'Danificado'
      default:
        return 'Desconhecida'
    }
  }

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
        <div className="max-w-xs sm:max-w-md mx-auto relative animate-fade-in animate-delay-200">
          {searchLoading ? (
            <Loader2 className="absolute left-4 md:left-17 lg:left-20 xl:left-20 top-1/2 transform -translate-y-1/2 text-[#FFF] h-4 w-4 sm:h-6 sm:w-6 animate-spin" />
          ) : (
            <Search className="absolute left-4 md:left-17 lg:left-20 xl:left-20 top-1/2 transform -translate-y-1/2 text-[#FFF] h-4 w-4 sm:h-6 sm:w-6 transition-all duration-300" />
          )}

          <input
            type="text"
            placeholder="Busque por peças, marcas ou materiais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 sm:pl-10 md:pl-25 lg:pl-28 xl:pl-30 pr-4 py-2 sm:py-3 rounded-[20px] border-2 border-[#0C3729] bg-[#B2CC57] focus:outline-none focus:border-[#0C3729] text-white placeholder-white font-dosis font-medium search-input transition-all duration-300 focus:scale-105"
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
          <aside className="lg:hidden xl:block lg:col-span-1 animate-slide-in-left animate-delay-100">
            <Filtros
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </aside>

          {/* Grade de produtos */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 lg:mb-10 justify-items-center">
              {loading ? (
                <div className="col-span-full flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin" />
                  <span className="ml-2">Carregando produtos...</span>
                </div>
              ) : error ? (
                <div className="col-span-full text-center py-12">
                  <p className="text-red-600 font-dosis mb-4">{error}</p>
                  <Button onClick={loadProducts} variant="outline">
                    Tentar novamente
                  </Button>
                </div>
              ) : paginatedProducts.length === 0 ? (
                <>
                  {/* Mensagem "Nenhum produto encontrado" */}
                  <div className="col-span-full text-center py-12">
                    <div className="max-w-md mx-auto">
                      <div className="mb-6">
                        <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-[#0C3729] mb-2 font-dosis">
                          Nenhum produto encontrado
                        </h3>
                        <p className="text-[#A66438] text-lg font-dosis">
                          Não encontramos produtos que correspondam aos seus critérios de busca.
                        </p>
                      </div>
                      
                      {searchQuery && (
                        <Button
                          onClick={() => setSearchQuery('')}
                          variant="outline"
                          className="border-[#88a51d] text-white bg-[#88a51d] hover:bg-[#88a51d]"
                        >
                          Limpar busca
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Seção "Veja enquanto isso..." */}
                  <div className="col-span-full mt-8">
                    <div className="border-t border-gray-200 pt-8">
                      <h4 className="text-2xl font-bold text-[#0C3729] text-center mb-8 font-dosis">
                        Veja enquanto isso...
                      </h4>
                      
                      {recommendedLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin" />
                          <span className="ml-2 text-gray-600">Carregando recomendações...</span>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                          {recommendedProducts.map((product, index) => (
                            <Link
                              key={product.uuid}
                              href={`/produtos/${product.uuid}`}
                              className="w-full flex justify-center"
                            >
                              <Card className="rounded-lg border-none hover:shadow-lg w-full max-w-[280px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[300px] py-0 cursor-pointer card-animate hover-lift animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                                <div className="w-full h-[240px] overflow-hidden rounded-lg">
                                  <Image
                                    src={product.imageUrls?.[0] || "/placeholder.svg"}
                                    alt={product.shortName}
                                    width={300}
                                    height={240}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                  />
                                </div>

                                <CardContent className="p-2">
                                  <div className="flex items-center justify-between mb-2">
                                    <h3 className="font-dosis font-semibold text-[#0C3729] mb-0 text-sm sm:text-base md:text-base lg:text-base">
                                      {product.shortName}
                                    </h3>

                                    <span className="flex items-center justify-center w-[70px] h-[30px] rounded-[20px] bg-[#8B3130] text-white text-xs sm:text-sm font-dosis font-semibold">
                                      R$ {product.price.toFixed(2).replace('.', ',')}
                                    </span>
                                  </div>
                                  {product.condition && (
                                    <div className="mt-2">
                                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                        {getConditionPlaceholder(product.condition)}
                                      </span>
                                    </div>
                                  )}
                                </CardContent>
                              </Card>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                paginatedProducts.map((product, index) => (
                  <Link
                    key={product.uuid}
                    href={`/produtos/${product.uuid}`}
                    className="w-full flex justify-center"
                  >
                    <Card className="rounded-lg border-none hover:shadow-lg w-full max-w-[280px] sm:max-w-[200px] md:max-w-[220px] lg:max-w-[220px] xl:max-w-[300px] py-0 cursor-pointer card-animate hover-lift animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                      <div className="w-full h-[240px] overflow-hidden rounded-lg">
                        <Image
                          src={product.imageUrls?.[0] || "/placeholder.svg"}
                          alt={product.shortName}
                          width={300}
                          height={240}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      <CardContent className="p-2">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-dosis font-semibold text-[#0C3729] mb-0 text-sm sm:text-base md:text-base lg:text-base">
                            {product.shortName}
                          </h3>

                          {}
                          <span className="flex items-center justify-center w-[70px] h-[30px] rounded-[20px] bg-[#8B3130] text-white text-xs sm:text-sm font-dosis font-semibold">
                            R$ {product.price.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        {product.condition && (
                          <div className="mt-2">
                            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                              {getConditionPlaceholder(product.condition)}
                            </span>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Botões de paginação */}
        <div className="flex items-center justify-center space-x-6 mt-20 mb-20">
          <Button
            variant="outline"
            className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white bg-transparent"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            ←
          </Button>

          <Button className="bg-[#88a51d] text-white hover:bg-[#708943]"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          >
            Página seguinte →
          </Button>
          <div className="text-[#8f3332] font-dosis">
            Página <span className="font-bold">{currentPage}</span> de {totalPages}
          </div>
        </div>
      </main>
    </div>
  )
}