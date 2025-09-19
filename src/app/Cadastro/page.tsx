import Image from "next/image";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function WeNoveCadastro() {
  return (
    <div className="min-h-screen bg-[#CED7D4] p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        
        {/* Lado esquerdo - Formulário de inscrição */}
        <div className="bg-[#f5f1eb] rounded-3xl p-6 md:p-8 w-full md:max-w-md shadow-lg order-2 md:order-1">
          
          {/* Logo and Header */}
          <div className="mb-6 lg:mb-8">
            
            {/* --- SEÇÃO ALTERADA --- */}
            <div className="flex justify-center lg:justify-start-center mb-4 lg:mb-6">
              <Image  
                src="/Logo-vendedor.svg" 
                alt="WeNove Logo"
                width={192}
                height={50}
                className="h-10 sm:h-12" 
              />
            </div>
            
            {/* --- FIM DA SEÇÃO ALTERADA --- */}

            <div className="text-center lg:text-left">
              <h2 className="text-center text-2xl sm:text-3xl lg:text-5xl font-bold text-[#88a51d] mb-2"style={{ fontFamily: "Futura, sans-serif" }}>Bem-Vindo!</h2>
              <p className="text-center text-[#8b3130] font-dosis-medium text-sm sm:text-2xl ">Cadastre-se na WeNove</p>
            </div>
          </div>

          {/* Formulário */}
          <form className="space-y-3 md:space-y-4">
            <Input
              placeholder="Digite seu nome"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70"
            />

            <Input
              type="email"
              placeholder="Email"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70"
            />

            <Input
              type="password"
              placeholder="Senha"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70"
            />

            <Input
              type="password"
              placeholder="Confirme a senha"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] font-dosis placeholder:text-[#0c3729]/70"
            />

            {/* Caixa de seleção de termos */}
            <div className="flex items-start gap-3 mt-4 md:mt-6">
              <Checkbox
                id="terms"
                className="mt-1 bg-transparent border-[#88a51d] data-[state=checked]:bg-[#88a51d] data-[state=checked]:border-[#88a51d] flex-shrink-0"
              />
              <label htmlFor="terms" className="text-xs text-[#0c3729] font-dosis leading-relaxed">
                Ao clicar em &quot;inscrever-se&quot;, você concorda com os da WeNove{" "}
                <span className="underline">Termos de Serviço</span> e a{" "}
                <span className="underline">Política de Privacidade</span>
              </label>
            </div>

            {/* Botão Enviar */}
            <Button
              type="submit"
              className="w-full bg-[#88a51d] hover:bg-[#256609] text-white font-dosis-semibold py-3 rounded-xl mt-4 md:mt-6"
            >
              Inscreva-se
            </Button>
          </form>
        </div>

        {/* Lado direito - Ilustração */}
        <div className="flex-1 flex justify-center items-center order-1 md:order-2 w-full md:w-auto">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <Image 
              src="/cadastro.svg"
              alt="Ilustração vetorial mostrando duas pessoas em um ambiente de compras, uma segurando sacolas e outra escolhendo produtos"
              width={580}
              height={601}
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
