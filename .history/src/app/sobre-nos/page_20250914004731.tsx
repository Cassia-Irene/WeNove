import HeaderProduto from "@/components/HeaderProduto"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Sobre_nos() {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div>
      
        {/* Header */}
        <HeaderProduto logoSrc="/Logo-landing.svg" cartColor="text-white" />

        {/* Hero Section */}
        <section className="relative w-full h-screen overflow-hidden flex items-center justify-center">

          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/img-sobre-nos.png')" }}
          />
        
        {/* Overlay escuro */}
          <div className="absolute h-full inset-0 bg-black/40" />

        {/* Conteúdo central opcional */}
          <div className="relative top-[20%] z-10 text-white text-center">
            <h1 className=" text-3xl md:text-5xl font-bold">Sobre Nós</h1>
          </div>

        </section>


      {/* Main Content */}

      <div className="bg-[#FFF]">
        <main className="px-4 md:px-8 py-12 md:py-16 max-w-4xl mx-auto">
        <div className="space-y-6 text-gray-700 leading-relaxed text-center">
          <p className="text-sm md:text-base">
            Nós somos estudantes de tecnologia do Centro Universitário Dom Bosco (UNDB) de São Luís - MA. Para nós, a
            sustentabilidade não deve ser apenas uma meta, mas também um compromisso diário. Motivados a aplicar o que
            aprendemos para construir um futuro mais sustentável, criamos a WeNove: uma startup maranhense dedicada a
            transformar a maneira como a moda é consumida.
          </p>

          <p className="text-sm md:text-base">
            Nosso propósito é aproximar pessoas comuns da sustentabilidade, de forma que ela deixe de ser algo futuro e
            passe a estar cada vez mais presente no cotidiano de todos. No contexto atual de fast fashion,{" "}
            <strong>nós acreditamos que cada peça de roupa tem valor e pode ter uma nova vida nas mãos certas</strong>.
          </p>

          <p className="text-sm md:text-base">
            Desse modo, ao tornar a moda sustentável mais acessível e prática, esperamos contribuir para a redução do
            impacto ambiental do lixo têxtil, transformando o que seria desperdício em oportunidade.
          </p>
        </div>
      </main>

      {/* Contact Section */}
      <section id="contato" className="px-4 md:px-8 py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Contact Info */}
            <div className="text-center">
              <h2 className="text-yellow-600 text-3xl md:text-4xl font-bold mb-6 md:mb-8">Contato</h2>
              <p className="text-gray-700 mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
                A WeNove está sempre disponível para você. Para dúvidas, sugestões, reclamações e elogios, fale conosco!
              </p>

              {/* Contact Icons */}
              <div className="flex justify-center space-x-4 md:space-x-6">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
              </div>
            </div>

            {/* 3D Illustration */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/svg-sobre-nos.svg"
                  alt="Recycling illustration"
                  className="w-60 h-60 md:w-80 md:h-80 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section> 
    </div>
    </div>
  )
}
