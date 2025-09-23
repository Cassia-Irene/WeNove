import { Instagram, Facebook, Mail, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@/contexts/UserContext"
import Image from "next/image"

const products = [
  {
    id: 1,
    name: "Bolsa Eco Jeans",
    price: "R$ 45,00",
    image: "/denim-handbag-upcycled-fashion.jpg",
    seller: "Ana Luiza",
    sellerAvatar: "/smiling-woman-with-dark-hair-professional-photo.jpg",
  },
  {
    id: 2,
    name: "Bucket Eco Jeans",
    price: "R$ 25,00",
    image: "/denim-bucket-hat-upcycled-fashion.jpg",
    seller: "Ana Luiza",
    sellerAvatar: "/smiling-woman-with-dark-hair-professional-photo.jpg",
  },
  {
    id: 3,
    name: "Calça Eco Jeans",
    price: "R$ 50,00",
    image: "/denim-pants-upcycled-fashion.jpg",
    seller: "Ana Luiza",
    sellerAvatar: "/smiling-woman-with-dark-hair-professional-photo.jpg",
  },
  {
    id: 4,
    name: "Jaqueta Eco Jeans",
    price: "R$ 45,00",
    image: "/denim-jacket-upcycled-fashion.jpg",
    seller: "Ana Luiza",
    sellerAvatar: "/smiling-woman-with-dark-hair-professional-photo.jpg",
  },
]

const getProductData = (id: number) => {
  const baseProduct = products.find((p) => p.id === id)
  if (!baseProduct) return null

  return {
    ...baseProduct,
    priceNumber: Number.parseFloat(baseProduct.price.replace("R$ ", "").replace(",", ".")),
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
        price: Number.parseFloat(p.price.replace("R$ ", "").replace(",", ".")),
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

export default function WeNovePage() {
  const { user, avatarUrl } = useUser();

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Profile Section */}
        <div className="bg-[#e6e3d6] rounded-2xl p-4 md:p-8 mb-12 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden flex-shrink-0 mx-auto md:mx-0">
              <Image
                src={avatarUrl || "/smiling-woman-with-dark-hair-professional-photo.jpg"}
                alt={user?.name || "Ana Luiza"}
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized={true}
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-[#0c3729] text-2xl md:text-3xl font-bold mb-2">{user?.name || "Ana Luiza"}</h1>
              <p className="text-[#88a51d] text-lg font-medium mb-4">Artesã Upcycle</p>
              <p className="text-[#993f3c] text-sm leading-relaxed">
                Para mim, um retalho de jeans não é o fim, é o começo, apaixonada por dar uma nova vida ao que seria
                descartado. Com tesoura, linha e criatividade, transformo jeans esquecidos em peças de moda exclusivas -
                de bolsas a shorts e camisas que carregam uma nova história. Cada costura é um ato de amor e um
                manifesto contra o desperdício.
              </p>
            </div>

            <div className="flex gap-3 mx-auto md:mx-0">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-[#1877f2] rounded-full flex items-center justify-center">
                <Facebook className="w-5 h-5 text-white" />
              </div>
              <div className="w-10 h-10 bg-[#e65c4f] rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <section>
          <h2 className="text-[#88a51d] text-2xl md:text-3xl font-bold mb-8">Peças do/a (Nome da loja)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((product) => (
              <div key={product.id} className="bg-[#c1c0b6] rounded-2xl p-4 shadow-sm">
                <div className="aspect-square bg-[#c1c0b6] rounded-2xl mb-4 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-[#0c3729] font-medium text-sm">{product.name}</h3>
                  <div className="bg-[#993f3c] text-white text-xs px-2 py-1 rounded-full">{product.price}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="outline"
              className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white bg-transparent order-2 sm:order-1"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
            </Button>

            <div className="text-[#993f3c] text-sm order-3 sm:order-2">
              Página <span className="font-medium">1</span> de 10
            </div>

            <Button className="bg-[#88a51d] hover:bg-[#88a51d]/90 text-white order-1 sm:order-3">
              Página seguinte
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </section>
      </main>
}
