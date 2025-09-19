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

            <h2 className="text-lg font-semibold font-dosis text-[#0c3729]">Filtros</h2>

            {(Object.keys(filterOptions) as (keyof typeof filterOptions)[]).map((filter) => (
              <div key={filter} className="flex flex-col">
                <Button
                  variant="outline"
                  className={`w-full bg-[#0c3729] font-dosis font-semibold text-white border-[#0c3729] rounded shadow-md ${
                    activeFilter === filter ? "ring-2 ring-[#88a51d]" : ""
                  }`}
                  onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                >
                  {filter}
                </Button>

                {activeFilter === filter && (
                  <div className="mt-2 p-2 bg-white rounded w-full">
                    {filterOptions[filter].map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 cursor-pointer font-dosis font-medium py-1"
                      >
                        <input
                          type="checkbox"
                          checked={selectedOptions[filter].includes(option)}
                          onChange={() => toggleOption(filter, option)}
                        />

                        
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button
              variant="outline"
              className="bg-[#8f3332] text-white border-[#8f3332] rounded shadow-md"
              onClick={clearFilters}
            >
              Limpar Filtros
            </Button>
        </div>
      </div>
    </div>
  )
}
