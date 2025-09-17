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
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0c3729] mb-6 sm:mb-8">{product.name}</h1>
      
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
              <h2 className="text-lg sm:text-xl font-bold text-[#0c3729] mb-4">Comprar Produto</h2>

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
              <div className="text-2xl sm:text-3xl font-bold text-[#0c3729] mb-4">{product.price}</div>

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
                  {[...Array(Math.min(10, product.availableQuantity))].map((_, i: number) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} unidade{i > 0 ? "s" : ""}
                    </option>
                  ))}
                </select>
                <span className="text-sm text-gray-500 ml-2">({product.availableQuantity} disponíveis)</span>
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
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Product Details, Reviews, etc */}
      <div>
        {product.included.map((item: string, index: number) => (
          <div key={index}>{item}</div>
        ))}

        {product.whyChoose.map((reason: string, index: number) => (
          <div key={index}>{reason}</div>
        ))}

        {product.relatedProducts.map((relatedProduct: RelatedProduct) => (
          <div key={relatedProduct.id}>{relatedProduct.name}</div>
        ))}

        {product.reviewsData.map((review: Review) => (
          <div key={review.id}>{review.comment}</div>
        ))}
      </div>
    </main>
  )
}
