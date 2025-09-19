import { useState } from "react"
import { filterOptions } from "@/lib/filters"

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

  return (
    <div>
      {/* Botões de filtros */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        {Object.keys(filterOptions).map((filter) => (
          <button
            key={filter}
            className={`bg-[#0c3729] text-white px-4 py-2 rounded ${
              activeFilter === filter ? "bg-[#88a51d]" : ""
            }`}
            onClick={() =>
              setActiveFilter(activeFilter === filter ? null : (filter as keyof typeof filterOptions))
            }
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Mostrar opções apenas do filtro ativo */}
      {activeFilter && (
        <div className="flex flex-col gap-2 mt-2 p-4 bg-[#EFE8DB] rounded shadow-md max-w-md mx-auto">
          {filterOptions[activeFilter].map((option) => (
            <label key={option} className="flex items-center gap-2 cursor-pointer">
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
