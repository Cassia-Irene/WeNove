"use client"

import Image from "next/image";
import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Plus, Edit3, Menu } from "lucide-react"
import Link from "next/link"

import HeaderVendendor from "@/components/HeaderVendedor"

export default function CadastroProduto() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const allowedCategories = [
    "Camisas",
    "Camisetas",
    "Blusas",
    "Jaquetas",
    "Calças",
    "Saias",
    "Jeans",
    "Bucket",
    "Sapatos",
    "Bolsas",
  ]

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

      <HeaderVendendor />

      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="sm:hidden absolute top-6 left-4 w-8 h-8 z-20 bg-[#8B3130] rounded-full flex items-center justify-center"
      >
        <Menu className="w-6 h-6 text-white drop-shadow-md" />
      </button>

      {/* Menu do celular */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 sm:hidden">

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />

          {/* Sidebar */}
          <div className="absolute left-0 top-0 h-full w-80 bg-[#8B3130] shadow-xl transform transition-transform duration-300 ease-in-out">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#FFCC00]/20">
              <Image
                src="/Logo-landing.svg"
                alt="Wenove Logo"
                height={30}
                width={30}
                className="w-30" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-white hover:text-[#FFCC00] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col p-6 space-y-6">
              <Link
                href="/"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Início
              </Link>

              <Link
                href="/sobre-nos"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sobre nós
              </Link>

              <Link
                href="/produtos"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Produtos
              </Link>

              <Link
                href="/contato"
                className="text-white text-lg font-dosis hover:text-[#FFCC00] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contato
              </Link>
            </nav>

          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <Edit3 className="w-6 h-6 text-gray-600" />
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">Cadastrar Novo Produto</h1>
          </div>
          <p className="text-gray-600">Preencha os campos abaixo para adicionar um produto ao marketplace.</p>
        </div>

        <div className="space-y-6">

          {/* 1. Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-dosis font-semibold">1. Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="nome-produto">Nome Curto do Produto</Label>
                <Input id="nome-produto" placeholder="Ex: Jaqueta Eco Jeans" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">
                  SEO Friendly! Use um título claro, incluindo a principal benefício ou material.
                </p>
              </div>

              <div>
                <Label htmlFor="nome-produto">Nome Longo do Produto</Label>
                <Input id="nome-produto" placeholder="Ex: Jaqueta Eco Jeans" className="mt-1" />
                <p className="text-xs text-gray-500 mt-1">
                  Um novo descritivo para melhor indexação nas pesquisas dentro da plataforma.
                </p>
              </div>

              <div>
                <Label htmlFor="descricao">Descrição Detalhada</Label>
                <Textarea
                  id="descricao"
                  placeholder="Descreva os benefícios, especificações técnicas, instruções de uso, etc."
                  className="mt-1 min-h-[100px]"
                />
                <span>
                  <p className="text-xs text-gray-500 mt-1">
                    Uma descrição detalhada do produto, incluindo benefícios, especificações técnicas, instruções de uso, etc.
                  </p>
                  <p className="text-[#c24832] mt-1 text-xs">
                    Não inclua códigos HTML e nem BBCode.
                  </p>
                </span>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="categoria">Categoria</Label>
                  <div className="relative mt-1">
                    <select
                      id="categoria"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <option value="">Selecione uma categoria</option>
                      {allowedCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Palavras-chave / Tags</Label>
                <div className="mt-1 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="bg-[#88A51D] text-[#F5F5F5] font-dosis font-semibold">
                        {tag}
                        <button onClick={() => removeTag(tag)} className="ml-1 bg-[#88A51D] hover:text-[#F5F5F5]">
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
                      disabled={tags.length >= 12}
                    />
                    <Button
                      onClick={addTag}
                      size="sm"
                      variant="outline"
                      disabled={tags.length >= 12}
                      className="bg-[#88A51D] text-[#F5F5F5] font-dosis font-semibold hover:bg-[#4a571b]"
                    >
                      Adicionar
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500">
                    Ajude os clientes a encontrarem seu produto na busca. Máximo de 12 tags ({tags.length}/12).
                  </p>
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
                <Label>Links das Imagens do Produto *</Label>
                <div className="mt-2">
                  <Input
                    placeholder="Cole o link da imagem e pressione Enter"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const value = (e.target as HTMLInputElement).value.trim();
                        if (value && uploadedImages.length < 7) {
                          setUploadedImages([...uploadedImages, new File([value], 'image.jpg', { type: 'image/jpeg' })]);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }
                    }}
                    className="mb-2"
                    disabled={uploadedImages.length >= 7}
                  />

                  <p className="text-sm text-gray-500 mb-4">Adicione links de imagens PNG, JPG</p>

                  {uploadedImages.length > 0 && (
                    <>
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {uploadedImages.map((imageUrl, index) => (
                          <div key={index} className="relative group cursor-pointer">
                            <Image
                              src={typeof imageUrl === 'string' ? imageUrl : URL.createObjectURL(imageUrl)}
                              alt={`Image ${index + 1}`}
                              width={200}
                              height={200}
                              className="w-full h-24 object-cover rounded-lg border"
                              onClick={() => {
                                const modal = document.getElementById(`modal-${index}`);
                                if (modal) modal.showModal();
                              }}
                            />
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(index);
                              }}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="w-3 h-3" />
                            </button>

                            {/* Image Preview Modal */}
                            <dialog
                              id={`modal-${index}`}
                              className="modal fixed inset-0 w-full h-full bg-transparent p-0"
                              onClick={(e) => {
                                const dialog = e.target as HTMLDialogElement;
                                if (dialog.tagName === 'DIALOG') {
                                  dialog.close();
                                }
                              }}
                            >
                              <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
                              <div className="fixed inset-0 flex items-center justify-center p-4">
                                <div className="relative bg-white rounded-lg max-w-3xl max-h-[90vh] w-full">
                                  <Image
                                    src={typeof imageUrl === 'string' ? imageUrl : URL.createObjectURL(imageUrl)}
                                    alt={`Image ${index + 1} Preview`}
                                    width={800}
                                    height={800}
                                    className="w-full h-full object-contain rounded-lg"
                                  />
                                  <button
                                    onClick={() => {
                                      const modal = document.getElementById(`modal-${index}`);
                                      if (modal) modal.close();
                                    }}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </dialog>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  <p className="text-xs text-gray-500 mt-2">
                    * Máximo de 7 fotos ({uploadedImages.length}/7). Recomendamos fotos quadradas para melhor formatação.
                  </p>
                </div>
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

                {/*                 <div>
                  <Label htmlFor="sku">SKU (código interno)</Label>
                  <Input id="sku" placeholder="SKU-0340" className="mt-1" />
                </div> */}
              </div>
            </CardContent>
          </Card>

          {/* 5. Variações */}
          {/*           <Card>
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
          </Card> */}

          {/* 6. Regras e Políticas */}
          {/*           <Card>
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
          </Card> */}

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              size="sm"
              variant="outline"
              className="border-[#0C3729] text-white bg-[#88A51D] hover:bg-[#4a571b] font-dosis font-semibold"
            >
              Publicar Agora
            </Button>
          </div>
        </div>
      </main>


    </div>
  )
}
