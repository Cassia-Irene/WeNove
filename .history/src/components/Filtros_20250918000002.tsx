"use client"

import { useState } from "react"
import { filterOptions } from "@/lib/filters"
import { Button } from "@/components/ui/button"

export default function Filtros() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({})

  const toggleOption = (filter: string, option: string) => {
    setSelectedOptions((prev) => {
      const prevOptions = prev[filter] || []
      if (prevOptions.includes(option)) {
        return { ...prev, [filter]: prevOptions.filter((o) => o !== option) }
      } else {
        return { ...prev, [filter]: [...prevOptions, option] }
      }
    })
  }

  const clearFilters = () => setSelectedOptions({})

  return (
    <div className="mb-10 xl:mb-20">
      {/* Botões de filtros */}
      <div className="flex flex-wrap justify-center gap-4 lg:gap-6 mb-4">
        {Object.keys(filterOptions).map((filter) => (
          <Button
            key={filter}
            onClick={() =>
              setActiveFilter(activeFilter === filter ? null : filter)
            }
            className="bg-[#0c3729] text-white font-dosis font-semibold rounded"
          >
            {filter}
          </Button>
        ))}

        <Button
          onClick={clearFilters}
          className="bg-[#8f3332] text-white font-dosis font-semibold rounded"
        >
          Limpar Filtros
        </Button>
      </div>

      {/* Mostrar opções apenas do filtro ativo */}
      {activeFilter && (
        <div className="flex flex-col gap-2 mt-2 p-4 bg-[#EFE8DB] rounded shadow-md max-w-md mx-auto">
          {filterOptions[activeFilter].map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedOptions[activeFilter]?.includes(option) || false}
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
