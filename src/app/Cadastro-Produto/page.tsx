import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SellerRegistration() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 text-balance">
            Abra sua Loja e Venda Conosco
          </h1>
          <p className="text-base sm:text-lg text-gray-600 text-pretty">
            Siga as etapas para configurar sua conta de vendedor. É rápido e fácil!
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6 lg:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 mb-6 sm:mb-8">
            <div className="flex items-center gap-2">
              <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">1</span>
              <span className="font-semibold text-gray-900 border-b-2 border-green-500 pb-1">Conta</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">2</span>
              <span className="text-gray-600">Dados</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">3</span>
              <span className="text-gray-600">Pagamentos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">4</span>
              <span className="text-gray-600">Documentos</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">5</span>
              <span className="text-gray-600">Loja</span>
            </div>
          </div>

          {/* Form Section */}
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">1. Informações da Conta</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                  Nome completo ou Razão Social <span className="text-red-500">*</span>
                </Label>
                <Input id="fullName" type="text" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeName" className="text-sm font-medium text-gray-700">
                  Nome da Loja <span className="text-red-500">*</span>
                </Label>
                <Input id="storeName" type="text" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  E-mail <span className="text-red-500">*</span>
                </Label>
                <Input id="email" type="email" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                  Telefone (WhatsApp) <span className="text-red-500">*</span>
                </Label>
                <Input id="phone" type="tel" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Senha <span className="text-red-500">*</span>
                </Label>
                <Input id="password" type="password" placeholder="xxxxxxxxx" className="w-full" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirmar Senha <span className="text-red-500">*</span>
                </Label>
                <Input id="confirmPassword" type="password" placeholder="xxxxxxxxx" className="w-full" />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-3 sm:gap-0 mt-6 sm:mt-8">
              <Button
                variant="outline"
                className="bg-green-100 text-green-700 border-green-200 hover:bg-green-200 w-full sm:w-auto"
              >
                Salvar Rascunho
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto">Publicar Produto</Button>
            </div>
          </div>
        </div>
      </main>

      
    </div>
  )
}
