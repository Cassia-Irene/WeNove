"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header_Produto from "@/components/Header-produto"
import Footer from "@/components/Footer"


export default function Sobre_nos_Page() {

  return (
    <div className="min-h-screen bg-[#FFF]">
      
      {/* Header */}
      <Header_Produto />
    {/* Footer */}
        <Footer />
    </div>
  )
}