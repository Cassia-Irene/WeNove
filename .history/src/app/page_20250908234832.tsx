import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Package, Scissors, RefreshCw, Recycle, Search, Users, RotateCcw } from "lucide-react"

export default function WenoveLanding() {
  return (
    
    <div className="min-h-screen">
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full h-24 bg-transparent z-10">
        
        <img src="/Logo-landing.svg" alt="Wenove Logo" className="absolute top-[30px] left-[30px]" />

        <div>
          {/* Retângulo atrás da nav */}
          <div
            className="absolute"
            style={{
              width: '500px',
              height: '50px',
              borderRadius: '30px',
              backgroundColor: 'rgba(205, 187, 167, 0.3)', // #CDBBA7 30%
              boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.25)',
              top: '30px',
              left: '36.8%',
            }}
          ></div>
        </div>

        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center gap-8 h">
          <a href="#" className="text-[#ffffff] hover:text-[#ffcc00] transition-colors">
            Início
          </a>
          <a href="#" className="text-[#ffffff] hover:text-[#ffcc00] transition-colors">
            Sobre nós
          </a>
          <a href="#" className="text-[#ffffff] hover:text-[#ffcc00] transition-colors">
            Produtos
          </a>
          <a href="#" className="text-[#ffffff] hover:text-[#ffcc00] transition-colors">
            Contato
          </a>
        </nav>

        <div className="absolute top-[30px] right-[30px]">
          <Button className="bg-[#ffcc00] text-[#000000] hover:bg-[#e5dc3c] font-semibold px-6 py-2 rounded-full">
            Sou Wenove
          </Button>
        </div>

      </header>

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center text-center px-6"
        style={{
          backgroundImage: `url('/denim-jeans-texture-background-dark-blue.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#3b2d24] bg-opacity-60"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-[#ffffff] mb-6 leading-tight">
            Renovar é mais do que vestir
            <br />
            diferente. É <span className="text-[#ffcc00]">pensar diferente</span>.
          </h1>

          <p className="text-lg md:text-xl text-[#ffffff] mb-8 max-w-2xl mx-auto leading-relaxed">
            Conectamos pessoas, marcas e cooperativas para dar uma nova
            <br />
            vida às peças. Aqui, moda, propósito e consciência se encontram.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button className="bg-[#8f3332] text-[#ffffff] hover:bg-[#8b3130] px-8 py-3 text-lg font-semibold">
              Como Funciona
            </Button>
            <Button className="bg-[#88a51d] text-[#ffffff] hover:bg-[#708943] px-8 py-3 text-lg font-semibold">
              Faça seu Cadastro
            </Button>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2">
            <div className="w-3 h-3 bg-[#ffcc00] rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffffff] bg-opacity-50 rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffffff] bg-opacity-50 rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffffff] bg-opacity-50 rounded-full"></div>
            <div className="w-3 h-3 bg-[#ffffff] bg-opacity-50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 bg-[#efe8db]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8f3332] text-center mb-12">
            Dando um novo propósito às suas roupas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-[#ffffff] border-2 border-[#8f3332] rounded-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#8f3332] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold text-[#8f3332] mb-3">COLETA</h3>
                <p className="text-[#3b2d24] text-sm leading-relaxed">
                  Agenda coleta de suas roupas usadas de forma rápida e prática.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#ffffff] border-2 border-[#8f3332] rounded-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#8f3332] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Scissors className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold text-[#8f3332] mb-3">TRIAGEM</h3>
                <p className="text-[#3b2d24] text-sm leading-relaxed">
                  Cada peça é analisada e separada para ganhar um novo propósito.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#ffffff] border-2 border-[#8f3332] rounded-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#8f3332] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold text-[#8f3332] mb-3">REAPROVEITAMENTO</h3>
                <p className="text-[#3b2d24] text-sm leading-relaxed">
                  Transformamos roupas e tecidos em novos produtos de valor.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#ffffff] border-2 border-[#8f3332] rounded-lg">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#8f3332] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Recycle className="w-8 h-8 text-[#ffffff]" />
                </div>
                <h3 className="text-xl font-bold text-[#8f3332] mb-3">RECICLAGEM</h3>
                <p className="text-[#3b2d24] text-sm leading-relaxed">
                  Materiais têxteis das reciclados reduzindo impacto ambiental.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section className="py-16 px-6 bg-[#ffffff]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#ffcc00] mb-6 leading-tight">
                Uma plataforma que
                <br />
                conecta e transforma
              </h2>
              <p className="text-[#3b2d24] text-lg leading-relaxed">
                Somos uma marketplace que aproxima consumidores, marcas e empreendedores responsáveis, criando
                oportunidades para dar uma nova vida às peças. Mais do que moda, promovemos consumo inteligente e
                impacto positivo.
              </p>
            </div>
            <div className="flex justify-center">
              <img src="/people-around-clothing-sustainable-fashion-illustr.jpg" alt="Platform illustration" className="w-full max-w-md" />
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 px-6 bg-[#0c3729]">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#ffffff] mb-4">Como funciona a Wenove</h2>
          <p className="text-[#ffcc00] text-lg mb-12">
            Transformamos roupas usadas em novas oportunidades. Veja como participar:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-transparent border-2 border-[#ffcc00] rounded-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-transparent border-2 border-[#ffcc00] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-[#ffcc00]" />
                </div>
                <h3 className="text-xl font-bold text-[#ffffff] mb-3">EXPLORE</h3>
                <p className="text-[#ffffff] text-sm leading-relaxed">
                  Explore estudos únicos e marcas que inspiram um novo consumo.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-2 border-[#ffcc00] rounded-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-transparent border-2 border-[#ffcc00] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#ffcc00]" />
                </div>
                <h3 className="text-xl font-bold text-[#ffffff] mb-3">CONECTE-SE</h3>
                <p className="text-[#ffffff] text-sm leading-relaxed">
                  Escolha, conecte e negocie de forma simples e segura.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-transparent border-2 border-[#ffcc00] rounded-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-transparent border-2 border-[#ffcc00] rounded-lg flex items-center justify-center mx-auto mb-4">
                  <RotateCcw className="w-8 h-8 text-[#ffcc00]" />
                </div>
                <h3 className="text-xl font-bold text-[#ffffff] mb-3">TRANSFORME</h3>
                <p className="text-[#ffffff] text-sm leading-relaxed">
                  Mude sua no consumo — e ajude a reduzir o desperdício.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 px-6 bg-[#efe8db]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-[#8f3332] text-center mb-12">
            Por que escolher a Wenove?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#88a51d] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] font-bold text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold text-[#88a51d] mb-3">Consumo inteligente</h3>
              <p className="text-[#3b2d24] text-sm leading-relaxed">Moda que faz sentido para você e para o planeta.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#88a51d] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] font-bold text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold text-[#88a51d] mb-3">Sustentabilidade real</h3>
              <p className="text-[#3b2d24] text-sm leading-relaxed">Menos descarte, mais responsabilidade.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#88a51d] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] font-bold text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold text-[#88a51d] mb-3">Conexões que importam</h3>
              <p className="text-[#3b2d24] text-sm leading-relaxed">Pessoas, marcas e empreendedores juntos.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-[#88a51d] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-[#ffffff] font-bold text-2xl">4</span>
              </div>
              <h3 className="text-xl font-bold text-[#88a51d] mb-3">Impacto positivo</h3>
              <p className="text-[#3b2d24] text-sm leading-relaxed">
                Cada peça tem uma nova proposta e muda o fim final.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#0c3729]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#ffffff] rounded-full flex items-center justify-center">
                  <span className="text-[#0c3729] font-bold text-sm">W</span>
                </div>
                <span className="text-[#ffffff] font-bold text-xl">Wenove</span>
              </div>
              <p className="text-[#ffffff] text-sm mb-4">Conectando pessoas através da moda sustentável.</p>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#ffffff] bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-[#ffffff] text-sm">f</span>
                </div>
                <div className="w-8 h-8 bg-[#ffffff] bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-[#ffffff] text-sm">@</span>
                </div>
                <div className="w-8 h-8 bg-[#ffffff] bg-opacity-20 rounded-full flex items-center justify-center">
                  <span className="text-[#ffffff] text-sm">in</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-[#ffffff] font-bold mb-4">Navegue</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-[#ffffff] font-bold mb-4">Para você</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Quero comprar roupas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] text-sm hover:text-[#ffcc00] transition-colors">
                    Quero vender roupas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
