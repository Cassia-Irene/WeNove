import Link from "next/link";

export default function Footer() {
  return (
      <footer className="py-8 sm:py-12 px-4 sm:px-6 bg-[#0c3729]">
        
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="sm:col-span-2 lg:col-span-1">
              
              {/* Logo */}
              <img
                src="/Logo-footer.svg"
                alt="Wenove Logo"
                className="mb-4 sm:mb-6 justify-center mx-auto w-32 sm:w-auto"
              />

              <p className="text-[#ffffff] font-dosis text-sm sm:text-base text-center mb-4 sm:mb-6 mx-auto max-w-[200px]">© 2025 WeNove. Todos direitos reservados.</p>
              
              <div className="group flex gap-3 sm:gap-4 justify-center">
                
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[transparent] border-2 border-[#ffcc00] bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#ffcc00]">
                  <img src="/footer-zap.svg" alt="Facebook" className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>

                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[transparent] border-2 border-[#ffcc00] bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#ffcc00]">
                  <img src="/footer-email.svg" alt="Email" className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[transparent] border-2 border-[#ffcc00] bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#ffcc00]">
                  <img src="/footer-instagram.svg" alt="Instagram" className="w-5 h-5 sm:w-7 sm:h-7" />
                </div>
              </div>
            </div>

            <div>

              <h4 className="text-[#ffffff] font-dosis text-base sm:text-lg font-bold mb-2 text-center">Navegue</h4>

              <div className="w-[150px] sm:w-[200px] h-[1px] bg-[#EFE8DB] mx-auto mb-2" />
              
              <ul className="space-y-1 sm:space-y-2 text-center">
                <li>
                  <Link href="/" className="text-[#ffffff] font-dosis text-sm sm:text-base hover:text-[#ffcc00] transition-colors">
                    Início
                  </Link>
                </li>
                <li>
                  <Link href="/sobre-nos" className="text-[#ffffff] font-dosis text-sm sm:text-base hover:text-[#ffcc00] transition-colors">
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link href="/produtos" className="text-[#ffffff] font-dosis text-sm sm:text-base hover:text-[#ffcc00] transition-colors">
                    Produtos
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#ffffff] font-dosis text-sm sm:text-base hover:text-[#ffcc00] transition-colors">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              
              <h4 className="text-[#ffffff] font-dosis text-lg font-bold mb-2 text-center">Para você</h4>
              
              <div className="w-[200px] h-[1px] bg-[#EFE8DB] mx-auto mb-2" />
              
              <ul className="space-y-2 text-center">
                <li>
                  <Link href="#" className="text-[#ffffff] font-dosis text-m hover:text-[#ffcc00] transition-colors">
                    Quero comprar roupas
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#ffffff] font-dosis text-s hover:text-[#ffcc00] transition-colors">
                    Quero vender roupas
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
}