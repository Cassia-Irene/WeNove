"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { Product, RelatedProduct, Review } from "@/lib/types"

interface Props {
  product: Product
}

export default function DetalhesProdutos({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)

  return (
    <main className="max-w-6xl lg:max-w-4xl xl:max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-40 lg:mb-20  xl:mt-50 xl:mb-30">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

        <div className="lg:col-span-2 flex flex-col items-start">
      
          {/* Título */}
          
          <h1 className="text-2xl sm:text-3xl lg:text-5xl text-[#0c3729] mb-10"
          style={{ fontFamily: "Futura, sans-serif" }}
          >
            {product.name}
          </h1>

          {/* Imagem Principal */}
          {/* Imagem */}
            
            <div className="w-full lg:w-[90%] mb-10 max-w-3xl flex items-start">
              <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="h-64 sm:h-80 lg:h-96 object-cover rounded-[20px] shadow-[-4px_-4px_6px_0_rgba(0,0,0,0.25),4px_4px_6px_0_rgba(0,0,0,0.25)]"
            />
            </div>
      
          {/* Miniaturas */}
          
          <div className="flex gap-2 mt-2 items-center overflow-x-auto">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-shadow ${
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

          {/* Sobre o produto */}

          <div className="lg:max-w-[90%] xl:max-w-[600] mt-8 sm:mt-12 grid grid-cols-1 gap-6 lg:gap-8 border-t border-gray-300 pt-8">
            <div className="h-full">
              
              <h2 className="text-xl sm:text-2xl xl:text-3xl text-[#0c3729] mb-5"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Sobre o produto</h2>
              
              <p className="text-sm sm:text-base xl:text-lg font-dosis font-medium text-[#0c3729] text-justify mb-6 leading-relaxed">
                {product.description}
              </p>

              <h3 className="text-lg font-dosis font-bold text-[#0c3729] mb-4">Detalhes do produto</h3>
              <ul className="space-y-2 text-sm sm:text-base font-dosis xl:text-lg">
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

              <h3 className="text-lg font-dosis font-bold text-[#0c3729] mb-4 mt-6">O que está incluído</h3>
              
              <ul className="space-y-2 text-sm sm:text-base xl:text-lg font-dosis">
                {product.included.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#88a51d] mr-2">•</span>
                    {item}
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-dosis font-bold text-[#0c3729] mb-4 mt-6">Por que escolher este produto</h3>
              <ul className="space-y-2 text-sm sm:text-base xl:text-lg font-dosis">
                {product.whyChoose.map((reason: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#88a51d] mr-2">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:w-[960px] xl:w-[1156px] h-[1px] bg-gray-300 border-gray-300 lg:mt-10 xl:mt-14"></div>

          {/* Opiniões do produto*/}
            <div className="lg:mt-10 xl:mt-14">
              <h2 className="text-xl sm:text-2xl xl:text-3xl text-[#0c3729] mb-6"
              style={{ fontFamily: "Futura, sans-serif" }}
              >Opiniões do produto</h2>
              
              <div className="space-y-6">
                {product.reviewsData.map((review: Review) => (
                  
                  <div key={review.id} className="border-b border-gray-200 pb-6">
                    
                    <div className="flex items-center justify-between mb-2">
                      
                      <div className="flex lg:mb-4 xl:mb-5">
                        {[...Array(review.rating)].map((_, i: number) => (
                            <Star
                            key={i}
                            size={20}
                            className="fill-[#FFCC00] stroke-none drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]"
                          />
                        ))}
                      </div>
                      
                      <span className="text-sm font-dosis text-[#0c3729] translate-y-[-4px]">{review.date}</span>
                    
                    </div>

                    {review.images && (
                      <div className="flex space-x-2 mb-3">
                        {review.images.map((image: string, index: number) => (
                          <Image
                            key={index}
                            src={image || "/placeholder.svg"}
                            alt={`Review image ${index + 1}`}
                            width={60}
                            height={60}
                            className="w-12 h-12 sm:w-15 sm:h-15 rounded object-cover"
                          />
                        ))}
                      </div>
                    )}

                    <p className="text-sm sm:text-base xl:text-lg font-dosis text-[#0c3729]">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
        </div>

        {/* Seção de Compra */}
        
        <div className="lg:col-span-1 w-full rounded-[20px] shadow-[-0.1px_0.1px_20px_0_rgba(0,0,0,0.1),0.1px_0.1px_20px_0_rgba(0,0,0,0.1)]">
          
          <Card className="border-none">
            
            <CardContent className="p-4 sm:p-6 py-0 lg:-my-6 xl:-my-8">
              <h2 className="text-lg sm:text-xl xl:text-2xl font-dosis font-semibold text-[#0c3729] mb-4">
                Comprar Produto
              </h2>

              <p className="text-m font-dosis text-[#0c3729] text-justify mb-4">{product.description_compra}</p>

              {/* Avaliação */}
              
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i: number) => (
                          <Star
                            key={i}
                            size={20}
                            className="fill-[#FFCC00] stroke-none drop-shadow-[0px_2px_0.5px_rgba(0,0,0,0.25)] rounded-[1px]"
                          />
                  ))}
                </div>
                <span className="ml-2 text-m font-dosis text-[#A66438] translate-y-[2px] inline-block">({product.reviews})</span>
              </div>

              {/* Preço */}
              
              <div className="text-2xl sm:text-3xl xl:text-4xl font-dosis font-light text-[#88A51D] mb-4">
                {product.price}
              </div>

              {/* Status de Estoque */}
              
              <p className="text-m font-dosis font-medium text-[#708943] mb-2">{product.status}</p>

              {/* Quantidade */}
              
              <div className="flex items-center mb-4">
                <span className="text-m font-dosis mr-2 text-[#0C3729]">Quantidade:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="border-none rounded px-2 py-1 font-dosis font-medium text-[#708943] text-m"
                >
                  {[...Array(Math.min(10, product.availableQuantity))].map(
                    (_, i: number) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} unidade{i > 0 ? "s" : ""}
                      </option>
                    )
                  )}
                </select>
                <span className="text-m font-dosis text-[#A66438] ml-2">
                  ({product.availableQuantity} disponíveis)
                </span>
              </div>

              {/* Botões de ação */}
              
              <div className="space-y-4">
                <Button className="w-full radius bg-[#88a51d] hover:bg-[#708943] text-white font-dosis xl:text-base xl:p-5 py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]">
                  Comprar agora
                </Button>
                
                <Button 
                variant="outline"
                className="w-full radius border-none !bg-[#E9EFD3] hover:!bg-[#88a51d] text-[#88a51d] hover:text-white font-dosis xl:text-base xl:p-5 py-2 sm:py-3 drop-shadow-[0px_4px_8px_rgba(0,0,0,0.25)]"
                >
                  Adicionar ao carrinho
                </Button>
              
              </div>

              {/* Informações sobre o Frete */}
              
              <div className=" w-[92%] mt-6 mb-4 p-2 bg-[#395C3E] text-white rounded-[5px] text-xs sm:text-sm shadow-[-4px_4px_10px_0_rgba(0,0,0,0.25),4px_4px_10px_0_rgba(0,0,0,0.25)]">
                
                <p className="font-dosis font-bold xl:text-[13px]">FRETE GRÁTIS PARA REGIÃO NORTE/NORDESTE</p>
              
              </div>

              {/* Garantias */}

              <div className="w-full space-y-3 font-dosis xl:text-sm">
                <p className="mt-1 text-[#A66438] font-bold">Entrega em até 15 dias úteis</p>
                
                <div className="flex items-start gap-2">

                  <p className="text-[#A66438] font-semibold">Devolução grátis.<span className="text-[#0C3729] font-medium"> Você tem 30 dias a partir da data de recebimento.</span></p>
                
                </div>
                
              </div>

            </CardContent>

            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl xl:text-2xl font-dosis font-semibold text-[#0c3729] mb-4">Sobre o Criador</h3>

              <div className="flex items-start space-x-3">
                <Image
                  src={product.seller.avatar || "/placeholder.svg"}
                  alt={product.seller.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                />
                <div>
                  
                  <h4 className="text-[#88A51D] xl:text-2xl"
                  style={{ fontFamily: "Futura, sans-serif" }}
                  >{product.seller.name}</h4>
                  
                  <p className="text-sm xl:font-semibold font-dosis text-[#8F3332]">{product.seller.role}</p>
                
                </div>
              </div>

                <p className="text-xs sm:text-sm xl:font-medium xl:text-[0.89rem] text-justify font-dosis text-[#0c3729] mt-3">{product.seller.description}</p>

              {/* Produtos do Criador(a) */}
              
              <div className="mt-6">
                
                <h4 className="font-dosis font-bold text-[#0c3729] mb-3">
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
                        className="w-12 h-12 rounded object-cover"
                      />
                      
                      <div className="flex-1">
                        <p className="text-sm xl:text-lg font-dosis font-semibold">{relatedProduct.name}</p>
                        <p className="text-sm xl:text-base font-dosis font-bold text-[#8f3332]">
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
  )
}
