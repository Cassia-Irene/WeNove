import DetalhesProdutos from "./detalhesprodutos"
import HeaderProduto from "@/components/HeaderProduto"
import products from "@/lib/products"
import { notFound } from "next/navigation"

// Função síncrona
const getProductData = (id: number) => {
  const baseProduct = products.find((p) => p.id === id)
  if (!baseProduct) return null

  return {
    ...baseProduct,
    priceNumber: Number(baseProduct.price.replace("R$ ", "").replace(",", ".")),
    rating: 5,
    reviews: Math.floor(Math.random() * 30) + 10,
    status: "Estoque disponível",
    quantity: 1,
    availableQuantity: Math.floor(Math.random() * 20) + 5,
    images: [baseProduct.image, baseProduct.image, baseProduct.image, baseProduct.image],
    description: `${baseProduct.name} — sustentável e exclusiva.`,
    seller: {
      name: baseProduct.seller,
      role: "Moda Upcycle",
      avatar: baseProduct.sellerAvatar,
      description: `Transformo retalhos esquecidos em peças exclusivas.`,
    },
    details: {
      material: "100% fibras recicladas",
      origin: "Produzido localmente",
      finishing: "Costura reforçada",
      sustainability: "Redução de 70% no descarte",
    },
    included: ["1 peça sustentável", "Embalagem reciclável"],
    whyChoose: ["Reduz impacto ambiental", "Moda consciente"],
    relatedProducts: products
      .filter((p) => p.id !== id)
      .slice(0, 3)
      .map((p) => ({
        id: p.id,
        name: p.name,
        price: Number(p.price.replace("R$ ", "").replace(",", ".")),
        image: p.image,
      })),
    reviewsData: [
      { id: 1, rating: 5, date: "20 mar 2025", comment: "Produto lindo!" },
      { id: 2, rating: 5, date: "25 jan 2025", comment: "Chegou rápido!" },
    ],
  }
}

// ⚠️ Sem async desnecessário
export default function ProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id) // ⬅️ transforma string em number
  const product = getProductData(id)

  if (!product) {
    notFound() // renderiza 404
  }

  return (
    <div className="min-h-screen bg-[#efe8db]">
      <HeaderProduto />
      <DetalhesProdutos product={product} />
    </div>
  )
}
