import React from "react";
      <footer className="py-12 px-6 bg-[#0c3729]">
        
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div>
              {/* Logo */}
              <img
                src="/Logo-footer.svg"
                alt="Wenove Logo"
                className="mb-6 justify-center mx-auto"
              />

              <p className="text-[#ffffff] font-dosis text-m text-center mb-6 mx-auto max-w-[200px]">© 2025 WeNove. Todos direitos reservados.</p>
              
              <div className=" group flex gap-4 justify-center">
                <div className="w-10 h-10 bg-[transparent] border-2 border-[#ffcc00] bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#ffcc00]">
                  <img src="/footer-zap.svg" alt="Facebook" className="w-6 h-6" />
                </div>

                <div className="w-10 h-10 bg-[transparent] border-2 border-[#ffcc00] bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#ffcc00]">
                  <img src="/footer-email.svg" alt="Email" className="w-5 h-5" />
                </div>

                <div className="w-10 h-10 bg-[transparent] border-2 border-[#ffcc00] bg-opacity-20 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-[#ffcc00]">
                  <img src="/footer-instagram.svg" alt="Instagram" className="w-7 h-7" />
                </div>
              </div>
            </div>

            <div>

              <h4 className="text-[#ffffff] font-dosis text-lg font-bold mb-2 text-center">Navegue</h4>

              <div className="w-[200px] h-[1px] bg-[#EFE8DB] mx-auto mb-2" />
              
              <ul className="space-y-2 text-center">
                <li>
                  <a href="#" className="text-[#ffffff] font-dosis text-m hover:text-[#ffcc00] transition-colors">
                    Início
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] font-dosis text-m hover:text-[#ffcc00] transition-colors">
                    Sobre nós
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] font-dosis text-m hover:text-[#ffcc00] transition-colors">
                    Produtos
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] font-dosis text-m hover:text-[#ffcc00] transition-colors">
                    Contato
                  </a>
                </li>
              </ul>
            </div>

            <div>
              
              <h4 className="text-[#ffffff] font-dosis text-lg font-bold mb-2 text-center">Para você</h4>
              
              <div className="w-[200px] h-[1px] bg-[#EFE8DB] mx-auto mb-2" />
              
              <ul className="space-y-2 text-center">
                <li>
                  <a href="#" className="text-[#ffffff] font-dosis text-m hover:text-[#ffcc00] transition-colors">
                    Quero comprar roupas
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#ffffff] font-dosis text-s hover:text-[#ffcc00] transition-colors">
                    Quero vender roupas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>