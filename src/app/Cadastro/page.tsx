import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function WeNoveCadastro() {
  return (
    <div className="min-h-screen bg-[#e9efd3] p-4 md:p-6 flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
        {/* Lado esquerdo - Formulário de inscrição */}
        <div className="bg-[#f5f1eb] rounded-3xl p-6 md:p-8 w-full md:max-w-md shadow-lg order-2 md:order-1">
          {/* Logotipo e Cabeçalho */}
          <div className="mb-6 md:mb-8">
            <div className="flex items-center gap-3 mb-4 md:mb-6 justify-center md:justify-start">
              <div className="w-8 h-8 md:w-10 md:h-10 relative">
                <svg viewBox="0 0 40 40" className="w-full h-full">
                  <circle cx="20" cy="20" r="18" fill="#8b3130" opacity="0.8" />
                  <path d="M12 15 L28 15 L25 25 L15 25 Z" fill="#8b3130" />
                  <circle cx="20" cy="20" r="3" fill="#ffffff" />
                  <path d="M8 12 Q20 8 32 12" stroke="#8b3130" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <h1 className="text-xl md:text-2xl font-futura-display font-bold text-[#8b3130]">WeNove</h1>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-futura-display font-bold text-[#88a51d] mb-2">Bem-Vindo!</h2>
              <p className="text-[#8b3130] font-futura-display text-sm">Cadastre-se na WeNove</p>
            </div>
          </div>

          {/* Formulário */}
          <form className="space-y-3 md:space-y-4">
            <Input
              placeholder="Digite seu nome"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] placeholder:text-[#0c3729]/70"
            />

            <Input
              placeholder="Sobrenome"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] placeholder:text-[#0c3729]/70"
            />

            <Input
              type="email"
              placeholder="Email"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] placeholder:text-[#0c3729]/70"
            />

            <Input
              type="password"
              placeholder="Senha"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] placeholder:text-[#0c3729]/70"
            />

            <Input
              type="password"
              placeholder="Confirme a senha"
              className="bg-transparent border-2 border-[#0c3729] rounded-xl px-4 py-3 text-[#0c3729] placeholder:text-[#0c3729]/70"
            />

            {/* Caixa de seleção de termos */}
            <div className="flex items-start gap-3 mt-4 md:mt-6">
              <Checkbox
                id="terms"
                className="mt-1 bg-[#88a51d] border-[#88a51d] data-[state=checked]:bg-[#88a51d] data-[state=checked]:border-[#88a51d] flex-shrink-0"
              />
              <label htmlFor="terms" className="text-xs font-futura-display text-[#0c3729] leading-relaxed">
                Ao clicar em "inscrever-se", você concorda com os da WeNove{" "}
                <span className="underline">Termos de Serviço</span> e a{" "}
                <span className="underline">Política de Privacidade</span>
              </label>
            </div>

            {/* Botão Enviar */}
            <Button
              type="submit"
              className="w-full bg-[#88a51d] hover:bg-[#256609] text-white font-semibold py-3 rounded-xl mt-4 md:mt-6"
            >
              Inscreva-se
            </Button>
          </form>
        </div>

        {/* Lado direito - Ilustração */}
        <div className="flex-1 flex justify-center items-center order-1 md:order-2 w-full md:w-auto">
          <div className="relative w-64 h-64 md:w-96 md:h-96">
            <img
              src="/cadastro.svg"
              alt="Shopping illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
