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
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Botões de filtro */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {(Object.keys(filterOptions) as (keyof typeof filterOptions)[]).map((filter) => (
          <Button
            key={filter}
            variant="outline"
            className={`bg-[#0c3729] font-dosis font-semibold text-white border-[#0c3729] rounded shadow-md ${
              activeFilter === filter ? "ring-2 ring-[#88a51d]" : ""
            }`}
            style={{ boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)" }}
            onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
          >
            {filter}
          </Button>
        ))}

        {/* Botão Limpar Filtros */}
        <Button
          variant="outline"
          className="bg-[#8f3332] text-white border-[#8f3332] rounded shadow-md"
          style={{ boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)" }}
          onClick={clearFilters}
        >
          Limpar Filtros
        </Button>
      </div>

      {/* Opções do filtro ativo */}
      {activeFilter && (
        <div className="flex flex-col gap-2 mt-2 p-4 bg-[transparent] rounded  max-w-md w-full">
          {filterOptions[activeFilter].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer font-dosis"
            >
              <input
                type="checkbox"
                checked={selectedOptions[activeFilter].includes(option)}
                onChange={() => toggleOption(activeFilter, option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
