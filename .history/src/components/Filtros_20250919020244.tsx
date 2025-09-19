"use client"

import { useState } from "react"
import { filterOptions } from "@/lib/filters"
import { Button } from "@/components/ui/button"
import { X, Sliders } from "lucide-react"

export default function Filtros({ selectedOptions, setSelectedOptions }) {
  const [activeFilter, setActiveFilter] = useState(null)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const toggleOption = (filter, option) => {
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
    <>
      {/* Botão mobile */}
      <div className="flex justify-center lg:flex xl:hidden mb-4">
        <Button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="bg-[#0c3729] text-white"
        >
          <Sliders className="w-5 h-5 mr-2" /> Filtros
        </Button>
      </div>

      {/* Sidebar mobile */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-80 bg-[#f9f9f9] shadow-xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold font-dosis text-[#0c3729]">Filtros</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="text-[#8f3332]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {(Object.keys(filterOptions)).map((filter) => (
              <div key={filter} className="mb-4">
                <Button
                  variant="outline"
                  className={`w-full bg-[#0c3729] text-white mb-2 ${
                    activeFilter === filter ? "ring-2 ring-[#88a51d]" : ""
                  }`}
                  onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
                >
                  {filter}
                </Button>

                {activeFilter === filter && (
                  <div className="p-2 bg-white rounded">
                    {filterOptions[filter].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer font-dosis py-1">
                        <input
                          type="checkbox"
                          checked={selectedOptions[filter].includes(option)}
                          onChange={() => toggleOption(filter, option)}
                          className="peer hidden"
                        />
                        <span className="w-5 h-5 flex items-center justify-center rounded border-2 border-[#8f3332] peer-checked:bg-[#8f3332] text-white">
                          {selectedOptions[filter].includes(option) ? "✔" : ""}
                        </span>
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Button className="bg-[#8f3332] text-white w-full mt-4" onClick={clearFilters}>
              Limpar Filtros
            </Button>
          </div>
        </div>
      )}

      {/* Sidebar desktop */}
      <div className="hidden xl:block w-64">
        <div className="flex flex-col gap-4 bg-[#f9f9f9] p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold font-dosis text-[#0c3729]">Filtros</h2>
          {(Object.keys(filterOptions)).map((filter) => (
            <div key={filter} className="flex flex-col">
              <Button
                variant="outline"
                className={`w-full bg-[#0c3729] text-white ${
                  activeFilter === filter ? "ring-2 ring-[#88a51d]" : ""
                }`}
                onClick={() => setActiveFilter(activeFilter === filter ? null : filter)}
              >
                {filter}
              </Button>
              {activeFilter === filter && (
                <div className="mt-2 p-2 bg-white rounded">
                  {filterOptions[filter].map((option) => (
                    <label key={option} className="flex items-center gap-2 cursor-pointer font-dosis py-1">
                      <input
                        type="checkbox"
                        checked={selectedOptions[filter].includes(option)}
                        onChange={() => toggleOption(filter, option)}
                        className="peer hidden"
                      />
                      <span className="w-5 h-5 flex items-center justify-center rounded border-2 border-[#8f3332] peer-checked:bg-[#8f3332] text-white">
                        {selectedOptions[filter].includes(option) ? "✔" : ""}
                      </span>
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Button className="bg-[#8f3332] text-white w-full mt-4" onClick={clearFilters}>
            Limpar Filtros
          </Button>
        </div>
      </div>
    </>
  )
}
