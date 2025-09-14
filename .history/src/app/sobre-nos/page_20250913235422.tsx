import HeaderProduto from "@/components/HeaderProduto"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Sobre_nos() {

  return (
    <div className="min-h-screen">
      
      {/* Header */}
      <HeaderProduto />

      {/* Hero Section */}
      <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">

        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/img-sobre-nos.png')" }}
        />
      
      {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/60" />

      </section>


    {/* Main Content */}

    <div className="bg-[#FFF]">
      
    </div>
      
  )
}
