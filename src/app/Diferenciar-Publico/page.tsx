import { ShoppingBag, Store } from "lucide-react"

export default function DoferenciarPublico() {
  return (
    <div className="min-h-screen bg-gray-50 relative overflow-hidden">
      {/* Linhas pontilhadas decorativas */}
      <div className="absolute top-0 right-0 w-64 h-32 opacity-30">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <pattern id="dots1" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="#dc2626" />
            </pattern>
          </defs>
          <path d="M0,50 Q50,0 100,50 T200,50" stroke="url(#dots1)" strokeWidth="2" fill="none" strokeDasharray="2,2" />
        </svg>
      </div>

      <div className="absolute bottom-0 left-0 w-64 h-32 opacity-30">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <defs>
            <pattern id="dots2" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="0.5" fill="#16a34a" />
            </pattern>
          </defs>
          <path
            d="M0,50 Q50,100 100,50 T200,50"
            stroke="url(#dots2)"
            strokeWidth="2"
            fill="none"
            strokeDasharray="2,2"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Logo */}
        <div className="mb-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </div>
            <span className="text-2xl font-bold text-green-600">WeLove</span>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Título principal */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 mb-8 text-balance">
            Como você quer participar da Wenove?
          </h1>

          {/* Subtíulo */}
          <p className="text-lg md:text-xl text-yellow-500 mb-16 text-balance">
            Escolha o seu papel e aproveite tudo que a<br />
            nossa plataforma oferece.
          </p>

          {/* Cartões */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Cartão do Consumidor */}
            <div className="bg-white rounded-3xl border-4 border-green-500 p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-green-600 mb-2">Quero Comprar</h2>
              <p className="text-lg text-green-600 mb-4 font-medium">(Consumidor)</p>

              <p className="text-gray-600 text-sm leading-relaxed">
                Descubra produtos exclusivos, feitos com
                <br />
                materiais sustentáveis e design único.
              </p>
            </div>

            {/* Cartão do Vendedor */}
            <div className="bg-white rounded-3xl border-4 border-red-600 p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-bold text-red-600 mb-2">Quero Vender</h2>
              <p className="text-lg text-red-600 mb-4 font-medium">(Empreendedor)</p>

              <p className="text-gray-600 text-sm leading-relaxed">
                Cadastre seus produtos, alcance novos clientes
                <br />e faça parte da nossa rede de criadores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
