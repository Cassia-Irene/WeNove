"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [agreed, setAgreed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Login attempt:", { email, password, agreed })
  }

  return (
    <Card className="w-full max-w-sm sm:max-w-md bg-[#EFE8DC] border-0 shadow-lg">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        {/* Logo and Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
               <Image  
                src="/Logo-vendedor.svg" 
                alt="WeNove Logo"
                width={192}
                height={50}
                className="h-10 sm:h-12" 
                />
          </div>
        </div>

        {/* Login Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h2 className="text-3xl sm:text-4xl text-[#88A51D] mb-2" style={{ fontFamily: "Futura, sans-serif" }} >Login</h2>
          <p className="text-sm sm:text-base font-dosis text-[#8B3130]">Entre na sua conta</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-400 rounded-lg bg-transparent font-dosis placeholder:text-[#0C3729] focus:border-green-600 focus:ring-0 text-sm sm:text-base"
              required
            />
          </div>

          <div>
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 sm:px-4 sm:py-3 border-2 border-gray-400 rounded-lg bg-transparent font-dosis placeholder:text-[#0C3729] focus:border-green-600 focus:ring-0 text-sm sm:text-base"
              required
            />
          </div>

          {/* Terms Agreement */}
          <div className="flex items-start space-x-2 sm:space-x-3 py-2">
            <Checkbox
              id="terms"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
              className="mt-0.5 sm:mt-1 border-2 border-gray-400 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 flex-shrink-0"
            />
            <label htmlFor="terms" className="text-xs sm:text-sm font-dosis text-[#8B3130] leading-relaxed">
              Ao clicar em &quot;Faça login&quot;, você concorda com os{" "}
              <span className="text-[#0C3729] underline cursor-pointer">Termos de Serviço</span> e a{" "}
              <span className="text-[#0C3729] underline cursor-pointer">Política de Privacidade</span> da WeNove.
            </label>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            className="w-full bg-[#88A51D] hover:bg-[#0C3729] text-white font-dosis font-semibold py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg text-base sm:text-lg mt-4 sm:mt-6"
            disabled={!agreed}
          >
            Faça login
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8" style={{ backgroundColor: "#CED7D4" }}>
      <LoginPage />
    </div>
  )
}
