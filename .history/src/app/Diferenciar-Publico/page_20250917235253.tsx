import Image from "next/image";
import { ShoppingBag, Store } from "lucide-react"

export default function DiferenciarPublico() {
  return (
    <div className="min-h-screen bg-[#fff] relative overflow-hidden">
      {/* Linhas pontilhadas decorativas */}
      <div className="z-10 absolute top-0 right-0 w-64 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <circle
            cx="140"
            cy="10"
            r="50"
            fill="none"
            stroke="#8F3332"
            strokeWidth="2"
            strokeDasharray="6,4"
          />
        </svg>
      </div>

      <div className="z-10 absolute bottom-0 left-0 w-64 h-32">
         <svg viewBox="0 0 100 100" className="w-full h-full">
           <circle
            cx="-40"
            cy="90"
            r="50"
            fill="none"
            stroke="#328f46ff"
            strokeWidth="2"
            strokeDasharray="6,4"
          />
        </svg>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Logo */}
        <div className="mb-16">
          <Image  
          src="/logo-produto.svg" 
          alt="Logo" 
          className="h-12 w-auto"/>
        </div>

        {/* Conteúdo principal */}
        <div className="max-w-4xl mx-auto text-center">
          {/* Título principal */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-regular text-[#0C3729] mb-8 text-balance"style={{ fontFamily: "Futura, sans-serif" }}>
            Como você quer participar da Wenove?
          </h1>

          {/* Subtíulo */}
          <p className="text-lg md:text-xl font-dosis font-semibold text-[#FFCC00] mb-16 text-balance">
            Escolha o seu papel e aproveite tudo que a<br />
            nossa plataforma oferece.
          </p>

          {/* Cartões */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Cartão do Consumidor */}
            <div className="bg-white rounded-3xl border-4 border-green-500 p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-regular text-green-600 mb-2" style={{ fontFamily: "Futura, sans-serif" }} >Quero Comprar</h2>
              <p className="text-lg text-green-600 mb-4 font-regular" style={{ fontFamily: "Futura, sans-serif" }} >(Consumidor)</p>

              <p className="text-gray-600 font-dosis font-semibold text-sm leading-relaxed">
                Descubra produtos exclusivos, feitos com
                <br />
                materiais sustentáveis e design único.
              </p>
            </div>

            {/* Cartão do Vendedor */}
            <div className="bg-white rounded-3xl border-4 border-red-600 p-8 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8 text-white" />
              </div>

              <h2 className="text-2xl font-regular text-red-600 mb-2" style={{ fontFamily: "Futura, sans-serif" }} >Quero Vender</h2>
              <p className="text-lg text-red-600 mb-4 font-regular" style={{ fontFamily: "Futura, sans-serif" }} >(Empreendedor)</p>

              <p className="text-gray-600 font-dosis font-semibold text-sm leading-relaxed">
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
