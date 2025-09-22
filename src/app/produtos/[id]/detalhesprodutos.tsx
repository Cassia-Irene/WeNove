"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, X, Star, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { Product, RelatedProduct, Review } from "@/lib/types"

interface Props {
  product: Product
}

export default function DetalhesProdutos({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  return (

    <div className="min-h-screen bg-[#FFF]">
    
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

    <main className="max-w-6xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 mt-20 mb-20 lg:mt-40 lg:mb-20 xl:mt-40 xl:mb-30">
      
      <div className="grid grid-cols-1 lg:grid-cols-[5fr_4fr] xl:grid-cols-[2fr_1fr] gap-6 lg:gap-12 xl:gap-12 items-start">
        
        {/* Main product section */}
        <div className="flex flex-col items-start w-full xl:max-w-2xl">

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
            className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-[#0c3729] mb-6 sm:mb-8 lg:mb-10 w-full"
            style={{ fontFamily: "Futura, sans-serif" }}
          >
            {product.name}
          </h1>

          {/* Imagem Principal */}
          <div className="w-full mb-6 sm:mb-8 lg:mb-10 max-w-full flex items-start">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-80 sm:h-64 md:h-120 lg:h-96 xl:h-[400px] object-cover rounded-[20px] shadow-[-4px_-4px_6px_0_rgba(0,0,0,0.25),4px_4px_6px_0_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Miniaturas */}
          <div className="flex gap-2 sm:gap-3 mt-2 items-center overflow-x-auto w-full pb-2 mb-6 lg:mb-0">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-shadow ${
                  selectedImage === index ? "border-[#88a51d]" : "border-none"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <div className="w-full lg:hidden mb-4">
            
            <div className="rounded-[20px] shadow-[-0.1px_0.1px_20px_0_rgba(0,0,0,0.1),0.1px_0.1px_20px_0_rgba(0,0,0,0.1)]">
              
              <Card className="border-none">
                
                <CardContent className="p-4 sm:p-6 py-0 sm:-my-6">
                  <h2 className="text-lg sm:text-xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                    Comprar Produto
                  </h2>

                  <p className="text-m sm:text-base font-dosis text-[#0c3729] text-justify mb-3 sm:mb-4">
                    {product.description_compra}
                  </p>

                  {/* Avaliação */}
                  <div className="flex items-center mb-3 sm:mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i: number) => (
                        <Star
                          key={i}
                          size={16}
                          className="sm:w-5 sm:h-5 fill-[#FFCC00] stroke-none drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]"
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm sm:text-base font-dosis text-[#A66438] translate-y-[2px] inline-block">({product.reviews})</span>
                  </div>

                  {/* Preço */}
                  <div className="text-2xl sm:text-3xl lg:text-3xl xl:text-4xl font-dosis font-light text-[#88A51D] mb-3 sm:mb-4">
                    {product.price}
                  </div>

                  {/* Status de Estoque */}
                  <p className="text-sm sm:text-base font-dosis font-medium text-[#708943] mb-2">{product.status}</p>

                  {/* Quantidade */}
                  <div className="flex items-center mb-3 sm:mb-4 flex-wrap gap-2">
                    <span className="text-sm sm:text-base font-dosis text-[#0C3729]">Quantidade:</span>
                    <select
                      value={quantity}
                      onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                      className="border-none rounded px-2 py-1 font-dosis font-medium text-[#708943] text-sm sm:text-base"
                    >
                      {[...Array(Math.min(10, product.availableQuantity))].map((_, i: number) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} unidade{i > 0 ? "s" : ""}
                        </option>
                      ))}
                    </select>
                    <span className="text-xs sm:text-sm font-dosis text-[#A66438]">
                      ({product.availableQuantity} disponíveis)
                    </span>
                  </div>

                  {/* Botões de ação */}
                  <div className="space-y-3 sm:space-y-4">
                    <Button className="w-full bg-[#88a51d] hover:bg-[#708943] text-white font-dosis text-sm sm:text-base py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                      Comprar agora
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-none !bg-[#E9EFD3] hover:!bg-[#88a51d] text-[#88a51d] hover:text-white font-dosis text-sm sm:text-base py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] bg-transparent"
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

                <CardContent className="p-4 sm:p-6 border-t border-gray-100">
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                    Sobre o Criador
                  </h3>

                  <div className="flex items-start space-x-3">
                    <Image
                      src={product.seller.avatar || "/placeholder.svg"}
                      alt={product.seller.name}
                      width={50}
                      height={50}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4
                        className="text-[#88A51D] text-lg truncate"
                        style={{ fontFamily: "Futura, sans-serif" }}
                      >
                        {product.seller.name}
                      </h4>

                      <p className="text-base font-semibold font-dosis text-[#8F3332]">{product.seller.role}</p>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-justify font-dosis text-[#0c3729] mt-3">
                    {product.seller.description}
                  </p>

                  {/* Produtos do Criador(a) */}
                  <div className="mt-4 sm:mt-6">
                    <h4 className="font-dosis font-bold text-[#0c3729] mb-3 text-sm sm:text-base">
                      Mais produtos por {product.seller.name}
                    </h4>

                    <div className="space-y-3">
                      {product.relatedProducts.map((relatedProduct: RelatedProduct) => (
                        <div key={relatedProduct.id} className="flex items-center space-x-3">
                          <Image
                            src={relatedProduct.image || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            width={50}
                            height={50}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <p className="text-xs sm:text-sm font-dosis font-semibold truncate">
                              {relatedProduct.name}
                            </p>
                            <p className="text-xs sm:text-sm font-dosis font-bold text-[#8f3332]">
                              R$ {relatedProduct.price.toFixed(2)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sobre o produto */}
          <div className="w-full mt-6 sm:mt-8 md:mt-10 lg:mt-12 grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 border-t border-gray-300 pt-6 sm:pt-8">
            <div className="h-full">
              <h2
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0c3729] mb-4 sm:mb-5"
                style={{ fontFamily: "Futura, sans-serif" }}
              >
                Sobre o produto
              </h2>

              <p className="text-sm sm:text-base lg:text-lg font-dosis font-medium text-[#0c3729] text-justify mb-4 sm:mb-6 leading-relaxed">
                {product.description}
              </p>

              <h3 className="text-base sm:text-lg md:text-xl font-dosis font-bold text-[#0c3729] mb-3 sm:mb-4">
                Detalhes do produto
              </h3>
              
              <ul className="space-y-2 text-sm sm:text-base font-dosis lg:text-lg text-[#0c3729]">
                <li>
                  <span className="font-medium text-[#88a51d]">Material:</span> {product.details.material}
                </li>
                <li>
                  <span className="font-medium text-[#88a51d]">Origem:</span> {product.details.origin}
                </li>
                <li>
                  <span className="font-medium text-[#88a51d]">Acabamento:</span> {product.details.finishing}
                </li>
                <li>
                  <span className="font-medium text-[#88a51d]">Sustentabilidade:</span> {product.details.sustainability}
                </li>
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-dosis font-bold text-[#0c3729] mb-3 sm:mb-4 mt-4 sm:mt-6">
                O que está incluído
              </h3>

              <ul className="space-y-2 text-sm sm:text-base lg:text-lg font-dosis text-[#0c3729]">
                {product.included.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#88a51d] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-base sm:text-lg md:text-xl font-dosis font-bold text-[#0c3729] mb-3 sm:mb-4 mt-4 sm:mt-6">
                Por que escolher este produto
              </h3>
              <ul className="space-y-2 text-sm sm:text-base lg:text-lg font-dosis text-[#0c3729]">
                {product.whyChoose.map((reason: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#88a51d] mr-2">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Opiniões do produto*/}
          <div className="w-full mt-6 sm:mt-8 lg:mt-10 xl:mt-14 pt-6 sm:pt-8 border-t border-gray-300">
            <h2
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#0c3729] mb-4 sm:mb-6"
              style={{ fontFamily: "Futura, sans-serif" }}
            >
              Opiniões do produto
            </h2>

            <div className="space-y-4 sm:space-y-6">
              {product.reviewsData.map((review: Review) => (
                <div key={review.id} className="border-b border-gray-200 pb-4 sm:pb-6">
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                    <div className="flex mb-2 sm:mb-4">
                      {[...Array(review.rating)].map((_, i: number) => (
                        <Star
                          key={i}
                          size={16}
                          className="sm:w-5 sm:h-5 fill-[#FFCC00] stroke-none drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]"
                        />
                      ))}
                    </div>

                    <span className="text-xs sm:text-sm font-dosis text-[#0c3729]">{review.date}</span>
                  </div>

                  {review.images && (
                    <div className="flex space-x-2 mb-3 overflow-x-auto">
                      {review.images.map((image: string, index: number) => (
                        <Image
                          key={index}
                          src={image || "/placeholder.svg"}
                          alt={`Review image ${index + 1}`}
                          width={60}
                          height={60}
                          className="w-10 h-10 sm:w-12 sm:h-12 md:w-15 md:h-15 rounded object-cover flex-shrink-0"
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-sm sm:text-base lg:text-lg font-dosis text-[#0c3729]">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-full rounded-[20px] shadow-[-0.1px_0.1px_20px_0_rgba(0,0,0,0.1),0.1px_0.1px_20px_0_rgba(0,0,0,0.1)] sticky top-4">
          
          <Card className="border-none">
            
            <CardContent className="p-4 sm:p-6 lg:-my-6 xl:-my-8">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                Comprar Produto
              </h2>

              <p className="text-sm sm:text-base font-dosis text-[#0c3729] text-justify mb-3 sm:mb-4">
                {product.description_compra}
              </p>

              {/* Avaliação */}
              <div className="flex items-center mb-3 sm:mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i: number) => (
                    <Star
                      key={i}
                      size={16}
                      className="sm:w-5 sm:h-5 fill-[#FFCC00] stroke-none drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]"
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm sm:text-base font-dosis text-[#A66438] translate-y-[2px] inline-block">({product.reviews})</span>
              </div>

              {/* Preço */}
              <div className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-dosis font-light text-[#88A51D] mb-3 sm:mb-4">
                {product.price}
              </div>

              {/* Status de Estoque */}
              <p className="text-sm sm:text-base font-dosis font-medium text-[#708943] mb-2">{product.status}</p>

              {/* Quantidade */}
              <div className="flex items-center mb-3 sm:mb-4 flex-wrap gap-2">
                <span className="text-sm sm:text-base font-dosis text-[#0C3729]">Quantidade:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="border-none rounded px-2 py-1 font-dosis font-medium text-[#708943] text-sm sm:text-base"
                >
                  {[...Array(Math.min(10, product.availableQuantity))].map((_, i: number) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} unidade{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <span className="text-xs sm:text-sm font-dosis text-[#A66438]">
                  ({product.availableQuantity} disponíveis)
                </span>
              </div>

              {/* Botões de ação */}
              <div className="space-y-3 sm:space-y-4">
                <Button className="w-full bg-[#88a51d] hover:bg-[#708943] text-white font-dosis text-sm sm:text-base py-2 sm:py-3 lg:py-4 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                  Comprar agora
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-none !bg-[#E9EFD3] hover:!bg-[#88a51d] text-[#88a51d] hover:text-white font-dosis text-sm sm:text-base py-2 sm:py-3 lg:py-4 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)] bg-transparent"
                >
                  Adicionar ao carrinho
                </Button>
              </div>

              {/* Informações sobre o Frete */}
              <div className="w-full mt-4 sm:mt-6 mb-3 sm:mb-4 p-2 sm:p-3 bg-[#395C3E] text-white rounded-[5px] text-xs sm:text-sm shadow-[-4px_4px_10px_0_rgba(0,0,0,0.25),4px_4px_10px_0_rgba(0,0,0,0.25)]">
                <p className="font-dosis font-bold">FRETE GRÁTIS PARA REGIÃO NORTE/NORDESTE</p>
              </div>

              {/* Garantias */}
              <div className="w-full space-y-2 sm:space-y-3 font-dosis text-xs sm:text-sm lg:text-base">
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

            <CardContent className="p-4 sm:p-6 border-t border-gray-100">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-dosis font-semibold text-[#0c3729] mb-3 sm:mb-4">
                Sobre o Criador
              </h3>

              <div className="flex items-start space-x-3">
                <Image
                  src={product.seller.avatar || "/placeholder.svg"}
                  alt={product.seller.name}
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  
                  <h4
                    className="text-[#88A51D] text-base sm:text-lg lg:text-xl xl:text-2xl truncate"
                    style={{ fontFamily: "Futura, sans-serif" }}
                  >
                    {product.seller.name}
                  </h4>

                  <p className="text-xs sm:text-sm lg:text-base lg:font-semibold font-dosis text-[#8F3332]">{product.seller.role}</p>
                </div>
              </div>

              <p className="text-xs sm:text-sm lg:text-base lg:font-medium text-justify font-dosis text-[#0c3729] mt-3">
                {product.seller.description}
              </p>

              {/* Produtos do Criador(a) */}
              <div className="mt-4 sm:mt-6">
                <h4 className="font-dosis font-bold text-[#0c3729] mb-3 text-sm sm:text-base">
                  Mais produtos por {product.seller.name}
                </h4>

                <div className="space-y-3">
                  {product.relatedProducts.map((relatedProduct: RelatedProduct) => (
                    <div key={relatedProduct.id} className="flex items-center space-x-3">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={50}
                        height={50}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded object-cover flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm lg:text-base font-dosis font-semibold truncate">
                          {relatedProduct.name}
                        </p>
                        <p className="text-xs sm:text-sm lg:text-base font-dosis font-bold text-[#8f3332]">
                          R$ {relatedProduct.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
    </div>
  )
}