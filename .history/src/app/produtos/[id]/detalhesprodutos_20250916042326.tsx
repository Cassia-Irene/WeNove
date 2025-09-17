// DetalhesProdutos.tsx
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Product, RelatedProduct, Review } from "@/lib/types"

interface Props {
  product: Product
}

export default function DetalhesProdutos({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const [selectedImage, setSelectedImage] = useState<number>(0)

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Product Title */}
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0c3729] mb-6 sm:mb-8">
        {product.name}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Product Images */}
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="bg-white rounded-lg p-4 mb-4">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-2 sm:space-x-4 overflow-x-auto">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? "border-[#88a51d]" : "border-gray-200"
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
        </div>

        {/* Purchase Section */}
        <div className="lg:col-span-1">
          <Card className="bg-[#e5dc3c] bg-opacity-20 border-none">
            <CardContent className="p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold text-[#0c3729] mb-4">
                Comprar Produto
              </h2>

              <p className="text-sm text-gray-600 mb-4">{product.description}</p>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i: number) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
              </div>

              {/* Price */}
              <div className="text-2xl sm:text-3xl font-bold text-[#0c3729] mb-4">
                {product.price}
              </div>

              {/* Stock Status */}
              <p className="text-sm text-green-600 mb-2">{product.status}</p>

              {/* Quantity */}
              <div className="flex items-center mb-4">
                <span className="text-sm mr-4">Quantidade:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
                  className="border rounded px-2 py-1 text-sm"
                >
                  {[...Array(Math.min(10, product.availableQuantity))].map(
                    (_, i: number) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} unidade{i > 0 ? "s" : ""}
                      </option>
                    )
                  )}
                </select>
                <span className="text-sm text-gray-500 ml-2">
                  ({product.availableQuantity} disponíveis)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-[#88a51d] hover:bg-[#708943] text-white py-2 sm:py-3">
                  Comprar agora
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white py-2 sm:py-3 bg-transparent"
                >
                  Adicionar ao carrinho
                </Button>
              </div>

              {/* Shipping Info */}
              <div className="mt-4 p-3 bg-[#0c3729] text-white rounded text-xs sm:text-sm">
                <p className="font-semibold">FRETE GRÁTIS PARA REGIÃO NORTE/NORDESTE</p>
                <p className="mt-1">Entrega em até 15 dias úteis</p>
                <p>Consulte prazos. Veja lista de 30 dias a partir da data de vencimento.</p>
              </div>
            </CardContent>
          </Card>

          {/* Seller Info */}
          <Card className="mt-6 border-none bg-white">
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-lg font-bold text-[#0c3729] mb-4">Sobre o Criador</h3>

              <div className="flex items-start space-x-3">
                <Image
                  src={product.seller.avatar || "/placeholder.svg"}
                  alt={product.seller.name}
                  width={50}
                  height={50}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-[#0c3729]">{product.seller.name}</h4>
                  <p className="text-sm text-gray-600">{product.seller.role}</p>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2">{product.seller.description}</p>
                </div>
              </div>

              {/* Related Products */}
              <div className="mt-6">
                <h4 className="font-bold text-[#0c3729] mb-3">
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
                        <p className="text-sm font-medium">{relatedProduct.name}</p>
                        <p className="text-sm font-bold text-[#8f3332]">
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

      {/* Product Details & Reviews */}
      <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0c3729] mb-6">Sobre o produto</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-6 leading-relaxed">
            {product.description}
          </p>

          <h3 className="text-lg font-bold text-[#0c3729] mb-4">Detalhes do produto</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            <li>
              <span className="font-semibold text-[#88a51d]">Material:</span> {product.details.material}
            </li>
            <li>
              <span className="font-semibold text-[#88a51d]">Origem:</span> {product.details.origin}
            </li>
            <li>
              <span className="font-semibold text-[#88a51d]">Acabamento:</span> {product.details.finishing}
            </li>
            <li>
              <span className="font-semibold text-[#88a51d]">Sustentabilidade:</span> {product.details.sustainability}
            </li>
          </ul>

          <h3 className="text-lg font-bold text-[#0c3729] mb-4 mt-6">O que está incluído</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {product.included.map((item: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#88a51d] mr-2">•</span>
                {item}
              </li>
            ))}
          </ul>

          <h3 className="text-lg font-bold text-[#0c3729] mb-4 mt-6">Por que escolher este produto</h3>
          <ul className="space-y-2 text-sm sm:text-base">
            {product.whyChoose.map((reason: string, index: number) => (
              <li key={index} className="flex items-start">
                <span className="text-[#88a51d] mr-2">•</span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#0c3729] mb-6">Opiniões do produto</h2>
          <div className="space-y-6">
            {product.reviewsData.map((review: Review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex text-yellow-400">
                    {[...Array(review.rating)].map((_, i: number) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
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

                <p className="text-sm sm:text-base text-gray-700">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
