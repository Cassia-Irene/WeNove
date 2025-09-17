import DetalhesProdutos from "./detalhesprodutos"
import HeaderProduto from "@/components/HeaderProduto"
import products from "@/lib/products"
import { notFound } from "next/navigation"

// Função síncrona para buscar produto
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
    description: `${baseProduct.name} — sustentável e exclusiva, feita com retalhos reaproveitados, unindo design moderno e consumo consciente.`,
    seller: {
      name: baseProduct.seller,
      role: "Moda Upcycle",
      avatar: baseProduct.sellerAvatar,
      description: `Transformo retalhos esquecidos em peças exclusivas, unindo criatividade, moda e sustentabilidade.`,
    },
    details: {
      material: "100% fibras recicladas de alta qualidade",
      origin: "Produzido por empreendedores locais",
      finishing: "Costura reforçada e design minimalista",
      sustainability: "Redução de até 70% no descarte têxtil",
    },
    included: [
      "1 peça exclusiva, produzida com matéria-prima sustentável",
      "Embalagem reciclável e ecológica",
      "Certificação de reaproveitamento do material",
    ],
    whyChoose: [
      "Contribui para a redução do impacto ambiental",
      "Incentiva o consumo consciente e a moda sustentável",
      "Apoia empreendedores e pequenos produtores",
    ],
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
      {
        id: 1,
        rating: 5,
        date: "20 mar 2025",
        comment: `O produto é lindo, resistente e combina com tudo! Adorei saber que é sustentável!`,
        images: [baseProduct.image, baseProduct.image],
      },
      {
        id: 2,
        rating: 5,
        date: "25 jan 2025",
        comment: "Produto maravilhoso, chegou rápido e a qualidade é incrível.",
      },
    ],
  }
}

// ⚠️ Sem "use client", Server Component
export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductData(Number(params.id))

  if (!product) {
    // Lança 404
    notFound()
  }

  return (
    <div className="min-h-screen bg-[#efe8db]">
      <HeaderProduto />
      <DetalhesProdutos product={product} />
    </div>
  )
}