"use client"

import { useState } from "react"
import { filterOptions } from "@/lib/filters"
import { Button } from "@/components/ui/button"

export default function Filtros() {
  const [activeFilter, setActiveFilter] = useState<keyof typeof filterOptions | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<keyof typeof filterOptions, string[]>>({
    Material: [],
    "Tipo de peça": [],
    "Condição da peça": [],
    Tamanho: [],
  })

  const toggleOption = (filter: keyof typeof filterOptions, option: string) => {
    setSelectedOptions((prev) => {
      const prevOptions = prev[filter] || []
      if (prevOptions.includes(option)) {
        return { ...prev, [filter]: prevOptions.filter((o) => o !== option) }
      } else {
        return { ...prev, [filter]: [...prevOptions, option] }
      }
    })
  }

  const clearFilters = () => {
    setSelectedOptions({
      Material: [],
      "Tipo de peça": [],
      "Condição da peça": [],
      Tamanho: [],
    })
    setActiveFilter(null)
  }

  return (
    <div className="flex w-full gap-6">
      
      {/* Botões de filtro */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
         <div className="w-64 flex flex-col gap-4 bg-[#f9f9f9] p-4 rounded-lg shadow-md">



          
         </div>


      </div>
    </div>
  )
}
