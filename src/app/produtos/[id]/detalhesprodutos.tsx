"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Star, ArrowLeft, MapPin, Phone, Mail, MessageCircle, Home, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ProductResponse, StoreResponse } from "@/lib/api.types"
import { randomInt, randomUUID } from "node:crypto"

interface Props {
  product: ProductResponse
  store: StoreResponse
  relatedProducts: ProductResponse[]
}

export default function DetalhesProdutos({ product, store, relatedProducts }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isImageZoomed, setIsImageZoomed] = useState(false)

  // Função para formatar preço
  const formatPrice = (price: number | undefined | null) => {
    if (price === undefined || price === null || isNaN(price)) {
      return 'Preço não disponível'
    }
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  // Função para calcular média de avaliações
  const getAverageRating = () => {
    if (!product.feedbacks || product.feedbacks.length === 0) return 0
    const sum = product.feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0)
    return sum / product.feedbacks.length
  }

  const averageRating = getAverageRating()
  const reviewCount = product.feedbacks?.length || 0

  const getProductCondition = (condition: ProductResponse['condition']) => {
    switch (condition) {
      case 'NEW':
        return 'Nova!'
      case 'REFURBISHED':
        return 'Upcycled'
      case 'DAMAGED':
        return 'Danificada'
      case 'USED':
        return 'Usada'
      default:
        return 'Condição desconhecida'
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF]">
      {/* Menu Mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#88a51d] rounded-full flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </button>

      {/* Menu do celular */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-[#0C3729] shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="flex items-center justify-between p-6 border-b border-[#FFCC00]/20">
              <Image
                src="/Logo-landing.svg"
                alt="Wenove Logo"
                height={30}
                width={30}
                className="w-30"
              />
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
              <Link href="/sobre-nos#contato" className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>Contato</Link>
            </nav>
          </div>
        </div>
      )}

      <main className="max-w-6xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-20 mb-20 lg:mt-40 lg:mb-20 xl:mt-40 xl:mb-30">
        <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] xl:grid-cols-[2fr_1fr] gap-6 lg:gap-12 xl:gap-12 items-start">

          {/* Seção principal do produto */}
          <div className="flex flex-col items-start w-full xl:max-w-2xl">
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4 lg:mb-6 font-dosis">
              <Link href="/" className="flex items-center hover:text-[#88a51d] transition-colors">
                <Home className="w-4 h-4 mr-1" />
                <span>Início</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link href="/produtos" className="hover:text-[#88a51d] transition-colors">
                Produtos
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#88a51d] font-medium truncate max-w-[200px]">
                {product.shortName}
              </span>
            </nav>

            {/* Botão voltar */}
            <div className="flex items-center justify-center w-8 h-8 mb-5 lg:mb-10">
              <Link
                href="/produtos"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-[#88a51d] hover:bg-[#708943] text-white transition-colors shadow-md"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </div>

            {/* Título */}
            <h1
              className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#0c3729] mb-6 sm:mb-8 lg:mb-10 w-full animate-slide-up animate-fade-in animate-delay-200"
              style={{ fontFamily: "Futura, sans-serif" }}
            >
              {product.longName || product.shortName}
            </h1>

            {/* Galeria de imagens */}
            <div className="w-full mb-6 sm:mb-8 lg:mb-10 max-w-full flex items-start relative animate-fade-in animate-delay-100">
              <div
                className="w-full cursor-zoom-in relative group"
                onClick={() => setIsImageZoomed(true)}
              >
                <Image
                  src={product.imageUrls?.[selectedImage] || "/placeholder.svg"}
                  alt={product.shortName || "Foto do produto"}
                  width={600}
                  height={400}
                  className="w-full h-80 sm:h-64 md:h-120 lg:h-96 xl:h-[400px] object-cover rounded-[20px] shadow-[-4px_-4px_6px_0_rgba(0,0,0,0.25),4px_4px_6px_0_rgba(0,0,0,0.25)] transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-[20px] flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/50 text-white px-3 py-1 rounded-full text-sm font-dosis">
                    Clique para ampliar
                  </div>
                </div>
              </div>

              {/* Navegação por setas */}
              {product.imageUrls && product.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={() => setSelectedImage(prev => prev > 0 ? prev - 1 : product.imageUrls!.length - 1)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setSelectedImage(prev => prev < product.imageUrls!.length - 1 ? prev + 1 : 0)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors z-10 rotate-180"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Modal de zoom da imagem */}
            {isImageZoomed && (
              <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in" onClick={() => setIsImageZoomed(false)}>
                <div className="relative max-w-4xl max-h-full animate-scale-in">
                  <Image
                    src={product.imageUrls?.[selectedImage] || "/placeholder.svg"}
                    alt={product.shortName || "Foto do produto"}
                    width={800}
                    height={600}
                    className="max-w-full max-h-full object-contain transition-transform duration-300"
                  />
                  <button
                    onClick={() => setIsImageZoomed(false)}
                    className="absolute top-4 right-4 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:bg-white hover:bg-opacity-20"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {/* Navegação no modal */}
                  {product.imageUrls && product.imageUrls.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImage(prev => prev > 0 ? prev - 1 : product.imageUrls!.length - 1)
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedImage(prev => prev < product.imageUrls!.length - 1 ? prev + 1 : 0)
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors rotate-180"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </button>
                    </>
                  )}
                  {/* Indicador de imagem */}
                  {product.imageUrls && product.imageUrls.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-dosis">
                      {selectedImage + 1} / {product.imageUrls.length}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Miniaturas */}
            {product.imageUrls && product.imageUrls.length > 1 && (
              <div className="flex gap-2 sm:gap-3 mt-2 items-center overflow-x-auto w-full pb-2 mb-6 lg:mb-0 animate-slide-up animate-delay-200">
                {product.imageUrls.map((image: string, index: number) => (
                  <button
                    key={`thumbnail-${index}`}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${selectedImage === index ? "border-[#88a51d] shadow-lg" : "border-gray-200 hover:border-[#88a51d]"
                      }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.shortName || "Foto do produto"} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Card de compra mobile */}
            <div className="w-full lg:hidden mb-4">
              <div className="rounded-[20px] shadow-[-0.1px_0.1px_20px_0_rgba(0,0,0,0.1),0.1px_0.1px_20px_0_rgba(0,0,0,0.1)]">
                <Card className="border-none">
                  <CardContent className="p-4 sm:p-6 py-0 sm:-my-6">
                    <h2 className="text-lg sm:text-xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                      Comprar Produto
                    </h2>

                    <p className="text-m sm:text-base font-dosis text-[#0c3729] text-justify mb-3 sm:mb-4">
                      {product.shortDescription}
                    </p>

                    {/* Avaliação */}
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i: number) => (
                          <Star
                            key={`mobile-rating-star-${i}`}
                            size={16}
                            className={`sm:w-5 sm:h-5 ${i < Math.floor(averageRating)
                                ? "fill-[#FFCC00] stroke-none"
                                : "fill-gray-200 stroke-none"
                              } drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm sm:text-base font-dosis text-[#A66438] translate-y-[2px] inline-block">({reviewCount})</span>
                    </div>

                    {/* Preço */}
                    <div className="mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-dosis font-light text-[#88A51D]">
                        {formatPrice(product.promotionalPrice || product.price)}
                      </div>
                      {product.promotionalPrice && product.promotionalPrice < product.price && (
                        <div className="text-lg text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </div>
                      )}
                    </div>

                    {/* Status de Estoque */}
                    <p className="text-sm sm:text-base font-dosis font-medium text-[#708943] mb-2">
                      {product.stock > 0 ? `${product.stock} em estoque` : "Fora de estoque"}
                    </p>

                    {/* Quantidade */}
                    <div className="flex items-center mb-3 sm:mb-4 flex-wrap gap-2">
                      <span className="text-sm sm:text-base font-dosis text-[#0C3729]">Quantidade:</span>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                        className="border-none rounded px-2 py-1 font-dosis font-medium text-[#708943] text-sm sm:text-base"
                        disabled={product.stock === 0}
                      >
                        {[...Array(Math.min(10, product.stock))].map((_, i: number) => (
                          <option key={`mobile-quantity-${i + 1}`} value={i + 1}>
                            {i + 1} unidade{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs sm:text-sm font-dosis text-[#A66438]">
                        ({product.stock} disponíveis)
                      </span>
                    </div>

                    {/* Botões de ação */}
                    <div className="space-y-3 sm:space-y-4 animate-fade-in animate-delay-300">
                      <Button
                        className="w-full bg-[#88a51d] hover:bg-[#708943] text-white font-dosis text-sm sm:text-base py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                        disabled={product.stock === 0}
                      >
                        {product.stock > 0 ? "Comprar agora" : "Fora de estoque"}
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-none !bg-[#E9EFD3] hover:!bg-[#88a51d] text-[#88a51d] hover:text-white font-dosis text-sm sm:text-base py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] bg-transparent transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
                        disabled={product.stock === 0}
                      >
                        Adicionar ao carrinho
                      </Button>
                    </div>

                    {/* Informações sobre o Frete */}
                    <div className="w-full mt-4 sm:mt-6 mb-3 sm:mb-4 p-2 sm:p-3 bg-[#395C3E] text-white rounded-[5px] text-xs sm:text-sm shadow-[-4px_4px_10px_0_rgba(0,0,0,0.25),4px_4px_10px_0_rgba(0,0,0,0.25)]">
                      <p className="font-dosis font-bold">FRETE GRÁTIS PARA REGIÃO NORTE/NORDESTE</p>
                    </div>

                    {/* Garantias */}
                    <div className="w-full space-y-2 sm:space-y-3 font-dosis text-xs sm:text-sm">
                      <p className="text-[#A66438] font-bold">Entrega em até 15 dias úteis</p>
                      <div className="flex items-start gap-2">
                        <p className="text-[#A66438] font-semibold">
                          Devolução grátis.
                          <span className="text-[#0C3729] font-medium">
                            {" "}
                            Você tem 30 dias a partir da data de recebimento.
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Seção da loja */}
                  <CardContent className="p-4 sm:p-6 border-t border-gray-100">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                      Sobre a Loja
                    </h3>

                    <div className="flex items-start space-x-3 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#88a51d] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {store.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-[#88A51D] text-lg truncate"
                          style={{ fontFamily: "Futura, sans-serif" }}
                        >
                          {store.name}
                        </h4>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={`mobile-store-rating-${star}`}
                                className={`w-4 h-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                  }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-600">(4.0)</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-600">{store.sells} vendas</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-justify font-dosis text-[#0c3729] mb-3">
                      {store.description || "Loja comprometida com qualidade e sustentabilidade."}
                    </p>

                    {/* Informações de contato */}
                    <div className="flex flex-wrap gap-3 text-sm mb-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>São Paulo, SP</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>(11) 99999-9999</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>contato@loja.com</span>
                      </div>
                    </div>

                    {/* Botões de ação da loja */}
                    <div className="flex gap-2 mb-4 animate-fade-in animate-delay-400">
                      <Button className="flex-1 bg-[#88a51d] hover:bg-[#6d8015] text-white font-dosis transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Conversar
                      </Button>
                      <Button variant="outline" className="flex-1 border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white font-dosis transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95">
                        Ver Loja
                      </Button>
                    </div>

                    {/* Produtos relacionados */}
                    {relatedProducts.length > 0 && (
                      <div className="mt-4 sm:mt-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-dosis font-bold text-[#0c3729] text-sm sm:text-base">
                            Mais produtos desta loja
                          </h4>
                          <Button variant="ghost" className="text-[#88a51d] hover:text-[#6d8015] text-sm p-0 h-auto font-dosis">
                            Ver todos
                          </Button>
                        </div>

                        <div className="space-y-3">
                          {relatedProducts.slice(0, 4).map((relatedProduct) => (
                            <Link
                              key={`mobile-related-${relatedProduct.uuid}`}
                              href={`/produtos/${relatedProduct.uuid}`}
                              className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors group"
                            >
                              <div className="relative">
                                <Image
                                  src={relatedProduct.imageUrls?.[0] || "/placeholder.svg"}
                                  alt={relatedProduct.shortName || "Foto do produto"}
                                  width={50}
                                  height={50}
                                  className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0 group-hover:scale-105 transition-transform"
                                />
                                {relatedProduct?.feedbacks && relatedProduct.feedbacks.length > 0 && (
                                  <div className="absolute -top-1 -right-1 bg-[#88a51d] text-white text-xs px-1 py-0.5 rounded-full flex items-center gap-1">
                                    <Star className="w-2 h-2 fill-white" />
                                    <span>{(relatedProduct.feedbacks.reduce((acc, f) => acc + (f?.rating || 0), 0) / relatedProduct.feedbacks.length).toFixed(1)}</span>
                                  </div>
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-dosis font-semibold truncate group-hover:text-[#88a51d] transition-colors">
                                  {relatedProduct?.shortName || 'Produto sem nome'}
                                </p>
                                <p className="text-xs sm:text-sm font-dosis font-bold text-[#8f3332]">
                                  {formatPrice(relatedProduct?.promotionalPrice || relatedProduct?.price)}
                                </p>
                                {relatedProduct?.feedbacks && relatedProduct.feedbacks.length > 0 && (
                                  <p className="text-xs text-gray-500">
                                    {relatedProduct.feedbacks.length} avaliações
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                        {relatedProducts.length > 4 && (
                          <div className="text-center mt-3">
                            <Button variant="outline" className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white font-dosis text-xs">
                              Ver mais produtos (+{relatedProducts.length - 4})
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sobre o produto */}
            <div className="w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 border-t border-gray-300 pt-6 sm:pt-8 animate-fade-in animate-delay-500">
              <div className="h-full">
                <h2
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0c3729] mb-4 sm:mb-5 animate-slide-up"
                  style={{ fontFamily: "Futura, sans-serif" }}
                >
                  Sobre o produto
                </h2>

                <p className="text-sm sm:text-base lg:text-lg font-dosis font-medium text-[#0c3729] text-justify mb-4 sm:mb-6 leading-relaxed">
                  {product.shortDescription}
                </p>

                <h3 className="text-base sm:text-lg md:text-xl font-dosis font-bold text-[#0c3729] mb-3 sm:mb-4">
                  Detalhes do produto
                </h3>

                <ul className="space-y-2 text-sm sm:text-base font-dosis lg:text-lg text-[#0c3729]">
                  <li>
                    <span className="font-medium text-[#88a51d]">Condição:</span> {getProductCondition(product.condition)}
                  </li>
                  <li>
                    <span className="font-medium text-[#88a51d]">Categoria:</span> {product.categoryName}
                  </li>
                  <li>
                    <span className="font-medium text-[#88a51d]">Estoque:</span> {product.stock} unidades
                  </li>
                  {product.materials && Object.keys(product.materials).length > 0 && (
                    <li>
                      <span className="font-medium text-[#88a51d]">Materiais:</span>
                      <ul className="ml-4 mt-1">
                        {Object.entries(product.materials).map(([material, percentage]) => (
                          <li key={material} className="text-sm">
                            • {material}: {percentage}%
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                </ul>

                {product.searchTags && product.searchTags.length > 0 && (
                  <>
                    <h3 className="text-base sm:text-lg md:text-xl font-dosis font-bold text-[#0c3729] mb-3 sm:mb-4 mt-4 sm:mt-6 animate-slide-up animate-delay-100">
                      Tags do produto
                    </h3>
                    <div className="flex flex-wrap gap-2 animate-fade-in animate-delay-200">
                      {product.searchTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#E9EFD3] text-[#88a51d] rounded-full text-sm font-dosis transition-all duration-200 hover:scale-105 hover:bg-[#88a51d] hover:text-white cursor-pointer"
                          style={{ animationDelay: `${index * 100}ms` }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Avaliações do produto */}
            {product.feedbacks && product.feedbacks.length > 0 && (
              <div className="w-full mt-6 sm:mt-8 lg:mt-10 xl:mt-14 pt-6 sm:pt-8 border-t border-gray-300">
                <h2
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0c3729] mb-4 sm:mb-6"
                  style={{ fontFamily: "Futura, sans-serif" }}
                >
                  Avaliações do produto
                </h2>

                <div className="space-y-4 sm:space-y-6">
                  {product.feedbacks.map((feedback, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 sm:pb-6">
                      <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                        <div className="flex mb-2 sm:mb-4">
                          {[...Array(5)].map((_, i: number) => (
                            <Star
                              key={i}
                              size={16}
                              className={`sm:w-5 sm:h-5 ${i < feedback.rating
                                  ? "fill-[#FFCC00] stroke-none"
                                  : "fill-gray-200 stroke-none"
                                } drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]`}
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm font-dosis text-[#0c3729]">
                          {new Date(feedback.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base font-dosis text-[#0c3729] text-justify">
                        {feedback.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar desktop - Card de compra */}
          <div className="hidden lg:block">
            <div className="sticky top-8">
              <div className="rounded-[20px] shadow-[-0.1px_0.1px_20px_0_rgba(0,0,0,0.1),0.1px_0.1px_20px_0_rgba(0,0,0,0.1)]">
                <Card className="border-none">
                  <CardContent className="p-4 sm:p-6">
                    <h2 className="text-lg sm:text-xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                      Comprar Produto
                    </h2>

                    <p className="text-m sm:text-base font-dosis text-[#0c3729] text-justify mb-3 sm:mb-4">
                      {product.shortDescription}
                    </p>

                    {/* Avaliação */}
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i: number) => (
                          <Star
                            key={`desktop-rating-star-${i}`}
                            size={16}
                            className={`sm:w-5 sm:h-5 ${i < Math.floor(averageRating)
                                ? "fill-[#FFCC00] stroke-none"
                                : "fill-gray-200 stroke-none"
                              } drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]`}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm sm:text-base font-dosis text-[#A66438] translate-y-[2px] inline-block">({reviewCount})</span>
                    </div>

                    {/* Preço */}
                    <div className="mb-3 sm:mb-4">
                      <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-dosis font-light text-[#88A51D]">
                        {formatPrice(product.promotionalPrice || product.price)}
                      </div>
                      {product.promotionalPrice && product.promotionalPrice < product.price && (
                        <div className="text-lg text-gray-500 line-through">
                          {formatPrice(product.price)}
                        </div>
                      )}
                    </div>

                    {/* Status de Estoque */}
                    <p className="text-sm sm:text-base font-dosis font-medium text-[#708943] mb-2">
                      {product.stock > 0 ? `${product.stock} em estoque` : "Fora de estoque"}
                    </p>

                    {/* Quantidade */}
                    <div className="flex items-center mb-3 sm:mb-4 flex-wrap gap-2">
                      <span className="text-sm sm:text-base font-dosis text-[#0C3729]">Quantidade:</span>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                        className="border-none rounded px-2 py-1 font-dosis font-medium text-[#708943] text-sm sm:text-base"
                        disabled={product.stock === 0}
                      >
                        {[...Array(Math.min(10, product.stock))].map((_, i: number) => (
                          <option key={`desktop-quantity-${i + 1}`} value={i + 1}>
                            {i + 1} unidade{i > 0 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                      <span className="text-xs sm:text-sm font-dosis text-[#A66438]">
                        ({product.stock} disponíveis)
                      </span>
                    </div>

                    {/* Botões de ação */}
                    <div className="space-y-3 sm:space-y-4">
                      <Button
                        className="w-full bg-[#88a51d] hover:bg-[#708943] text-white font-dosis text-sm sm:text-base py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                        disabled={product.stock === 0}
                      >
                        {product.stock > 0 ? "Comprar agora" : "Fora de estoque"}
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full border-none !bg-[#E9EFD3] hover:!bg-[#88a51d] text-[#88a51d] hover:text-white font-dosis text-sm sm:text-base py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] bg-transparent"
                        disabled={product.stock === 0}
                      >
                        Adicionar ao carrinho
                      </Button>
                    </div>

                    {/* Informações sobre o Frete */}
                    <div className="w-full mt-4 sm:mt-6 mb-3 sm:mb-4 p-2 sm:p-3 bg-[#395C3E] text-white rounded-[5px] text-xs sm:text-sm shadow-[-4px_4px_10px_0_rgba(0,0,0,0.25),4px_4px_10px_0_rgba(0,0,0,0.25)]">
                      <p className="font-dosis font-bold">FRETE GRÁTIS PARA REGIÃO NORTE/NORDESTE</p>
                    </div>

                    {/* Garantias */}
                    <div className="w-full space-y-2 sm:space-y-3 font-dosis text-xs sm:text-sm">
                      <p className="text-[#A66438] font-bold">Entrega em até 15 dias úteis</p>
                      <div className="flex items-start gap-2">
                        <p className="text-[#A66438] font-semibold">
                          Devolução grátis.
                          <span className="text-[#0C3729] font-medium">
                            {" "}
                            Você tem 30 dias a partir da data de recebimento.
                          </span>
                        </p>
                      </div>
                    </div>
                  </CardContent>

                  {/* Seção da loja */}
                  <CardContent className="p-4 sm:p-6 border-t border-gray-100">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                      Sobre a Loja
                    </h3>

                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#88a51d] flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">
                          {store.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4
                          className="text-[#88A51D] text-lg truncate"
                          style={{ fontFamily: "Futura, sans-serif" }}
                        >
                          {store.name}
                        </h4>
                        <p className="text-base font-semibold font-dosis text-[#8F3332]">
                          {store.sells} vendas realizadas
                        </p>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-justify font-dosis text-[#0c3729] mt-3">
                      {store.description || "Loja comprometida com qualidade e sustentabilidade."}
                    </p>

                    {/* Produtos relacionados */}
                    {relatedProducts.length > 0 && (
                      <div className="mt-4 sm:mt-6">
                        <h4 className="font-dosis font-bold text-[#0c3729] mb-3 text-sm sm:text-base">
                          Mais produtos desta loja
                        </h4>
                        <div className="space-y-3">
                          {relatedProducts.map((relatedProduct) => (
                            <Link
                              key={`desktop-related-${relatedProduct.uuid}`}
                              href={`/produtos/${relatedProduct.uuid}`}
                              className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded transition-colors"
                            >
                              <Image
                                src={relatedProduct.imageUrls?.[0] || "/placeholder.svg"}
                                alt={relatedProduct.shortName || "Foto do produto"}
                                width={50}
                                height={50}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-dosis font-semibold truncate">
                                  {relatedProduct?.shortName || 'Produto sem nome'}
                                </p>
                                <p className="text-xs sm:text-sm font-dosis font-bold text-[#8f3332]">
                                  {formatPrice(relatedProduct?.promotionalPrice || relatedProduct?.price)}
                                </p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}