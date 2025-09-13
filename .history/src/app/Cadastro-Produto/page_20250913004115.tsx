"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Edit3 } from "lucide-react"
im

export default function CadastroProduto() {
  const [tags, setTags] = useState<string[]>(["Produto", "Venda", "Oferta"])
  const [newTag, setNewTag] = useState("")
  const [variations, setVariations] = useState([
    { name: "Cor", values: ["Azul", "Verde", "Preto"] },
    { name: "Tamanho", values: ["P", "M", "G"] },
  ])
  const [uploadedImages, setUploadedImages] = useState<File[]>([])

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const addVariation = () => {
    setVariations([...variations, { name: "", values: [] }])
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).slice(0, 5 - uploadedImages.length)
      setUploadedImages([...uploadedImages, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  return (
    <div className="min-h-screen font-dosis bg-gray-50">



      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Edit3 className="w-6 h-6 text-gray-600" />
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Cadastrar Novo Produto</h1>
          </div>
          <p className="text-gray-600">Preencha os campos abaixo para adicionar um produto ao marketplace.</p>
          <div className="flex space-x-2 mt-4">
            <Button size="sm" className="bg-[#88A51D] hover:bg-[#70A00D] text-[#0C3729] font-dosis font-semibold">
              Salvar Rascunho
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-[#0C3729] text-[#88A51D] hover:bg-[#0C1000] bg-[#0C3729] font-dosis font-semibold"
            >
              Publicar Agora
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          {/* 1. Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-dosis font-semibold">1. Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome-produto">Nome do Produto</Label>
                <Input id="nome-produto" placeholder="Ex: Jaqueta Eco Jeans" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">
                  SEO Friendly! Use um título claro, incluindo a principal benefício ou material.
                </p>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição Detalhada</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva os benefícios, especificações técnicas, instruções de uso, etc."
                  className="mt-1 min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <Input id="categoria" placeholder="Vestuário e Moda" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="marca">Marca (se aplicável)</Label>
                  <Input id="marca" placeholder="Ex: Levi's Jeans, C&A" className="mt-1" />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Palavras-chave / Tags</Label>
                <div className="mt-1 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#88A51D] text-[#F5F5F5] font-dosis font-semibold">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 hover:text-[#F5F5F5]">
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Digite uma tag e tecle Enter"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      className="flex-1"
                    />
                    <Button onClick={addTag} size="sm" variant="outline">
                      Adicionar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">Ajude os clientes a encontrarem seu produto na busca.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 2. Imagens e Mídias */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">2. Imagens e Mídias</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Imagens do Produto *</Label>
                <div className="mt-2">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                    disabled={uploadedImages.length >= 5}
                  />
                  <label
                    htmlFor="image-upload"
                    className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer block"
                  >
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-2">Arraste as imagens aqui ou clique para selecionar</p>
                    <p className="text-sm text-gray-500">PNG, JPG até 10MB</p>
                    <Button type="button" variant="outline" className="mt-4 bg-transparent pointer-events-none">
                      Selecionar Arquivos
                    </Button>
                  </label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {uploadedImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(image) || "/placeholder.svg"}
                          alt={`Upload ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-2">
                  * Máximo de 5 fotos ({uploadedImages.length}/5). Recomendamos fotos quadradas para melhor formatação.
                </p>
              </div>

              <div>
                <Label htmlFor="video">Vídeo demonstrativo (opcional)</Label>
                <Input id="video" placeholder="Cole aqui o link do YouTube ou Vimeo" className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* 3. Preço e Estoque */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">3. Preço e Estoque</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preco-venda">Preço de Venda</Label>
                  <Input id="preco-venda" placeholder="R$ 0,00" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="preco-promocional">Preço Promocional</Label>
                  <Input id="preco-promocional" placeholder="R$ 0,00" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="quantidade">Quantidade em Estoque</Label>
                  <Input id="quantidade" placeholder="0" type="number" className="mt-1" />
                </div>

                <div>
                  <Label htmlFor="sku">SKU (código interno)</Label>
                  <Input id="sku" placeholder="SKU-0340" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Entrega e Frete */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">4. Entrega e Frete</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="peso">Peso (kg)</Label>
                  <Input id="peso" placeholder="0,5" type="number" step="0.1" className="mt-1" />
                </div>

                <div>
                  <Label>Dimensões (CM)</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input placeholder="A" className="flex-1" />
                    <span className="text-gray-500 font-medium">x</span>
                    <Input placeholder="L" className="flex-1" />
                    <span className="text-gray-500 font-medium">x</span>
                    <Input placeholder="C" className="flex-1" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 5. Variações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">5. Variações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">
                Ex: uma camiseta pode ter P, M e G cores diferentes. Cada variação deve conter o estoque separadamente.
              </p>

              {variations.map((variation, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Opção {index + 1}</h4>
                    {index > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setVariations(variations.filter((_, i) => i !== index))}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Tipo (Ex: Cor)</Label>
                      <Input
                        placeholder="Tipo Ex: Cor"
                        value={variation.name}
                        onChange={(e) => {
                          const newVariations = [...variations]
                          newVariations[index].name = e.target.value
                          setVariations(newVariations)
                        }}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Valores (Ex: Azul, Verde, Preto)</Label>
                      <Input
                        placeholder="Valores (Ex: P, M, G)"
                        value={variation.values.join(", ")}
                        onChange={(e) => {
                          const newVariations = [...variations]
                          newVariations[index].values = e.target.value.split(",").map((v) => v.trim())
                          setVariations(newVariations)
                        }}
                        className="mt-1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button variant="outline" onClick={addVariation} className="w-full bg-transparent">
                <Plus className="w-4 h-4 mr-2" />
                Adicionar outra opção
              </Button>
            </CardContent>
          </Card>

          {/* 6. Regras e Políticas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">6. Regras e Políticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="politica-devolucao">Política de devolução</Label>
                <Textarea
                  id="politica-devolucao"
                  placeholder="Se defeito do produto do marketplace, devemos 30d"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="garantia">Garantia do produto (se houver)</Label>
                <Input id="garantia" placeholder="Ex: 12 meses, 1 ano" className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button className="bg-[#88A51D] hover:bg-[#70A00D] text-[#0C3729] font-dosis font-semibold">Salvar Rascunho</Button>
            <Button
              variant="outline"
              className="border-[#0C3729] text-[#88A51D] hover:bg-[#0C1000] bg-[#0C3729] font-dosis font-semibold"
            >
              Publicar Produto
            </Button>
          </div>
        </div>
      </main>


    </div>
  )
}
