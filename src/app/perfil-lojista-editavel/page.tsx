"use client"

import type React from "react"

import { Instagram, Facebook, Mail, ChevronLeft, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"
import { useState, useRef } from "react"

export default function WeNoveProfile() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Bolsa Eco Jeans",
      price: "R$ 45,00",
      image: "/denim-bag-upcycled.jpg",
    },
    {
      id: 2,
      name: "Bucket Eco Jeans",
      price: "R$ 25,00",
      image: "/denim-bucket-hat.jpg",
    },
    {
      id: 3,
      name: "Calça Eco Jeans",
      price: "R$ 150,00",
      image: "/upcycled-denim-pants.jpg",
    },
    {
      id: 4,
      name: "Jaqueta Eco Jeans",
      price: "R$ 145,00",
      image: "/upcycled-denim-jacket.png",
    },
  ])

  const [profileData, setProfileData] = useState({
    name: "Ana Luiza",
    role: "Artesã Upcycle",
    cnpj: "CNPJ: 00.000.000/0001-00",
    bio: "Para mim, um retalho de jeans não é o fim, é o começo, apaixonada por dar uma nova vida ao que seria descartado. Com tesoura, linha e criatividade, transformo jeans esquecidos em peças de moda exclusivas - de bolsas a shorts e camisas que carregam uma nova história. Cada costura é um ato de amor e um manifesto contra o desperdício.",
    profileImage: "/woman-artisan-profile.jpg",
    socialLinks: {
      instagram: "#",
      facebook: "#",
      email: "#",
    },
  })

  const [showAddProductModal, setShowAddProductModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showEditLinkModal, setShowEditLinkModal] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [editingLink, setEditingLink] = useState<{ platform: string; current: string } | null>(null)
  const [newProduct, setNewProduct] = useState({ name: "", price: "", image: "" })
  const [newLink, setNewLink] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const EditableText = ({
    value,
    onChange,
    className = "",
    multiline = false,
    placeholder = "",
  }: {
    value: string
    onChange: (value: string) => void
    className?: string
    multiline?: boolean
    placeholder?: string
  }) => {
    const [isEditing, setIsEditing] = useState(false)
    const [tempValue, setTempValue] = useState(value)

    const handleSave = () => {
      onChange(tempValue)
      setIsEditing(false)
    }

    const handleCancel = () => {
      setTempValue(value)
      setIsEditing(false)
    }

    if (isEditing) {
      return multiline ? (
        <textarea
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Escape") handleCancel()
          }}
          className={`${className} w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500`}
          rows={4}
          autoFocus
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSave()
            if (e.key === "Escape") handleCancel()
          }}
          className={`${className} w-full p-2 border rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500`}
          autoFocus
          placeholder={placeholder}
        />
      )
    }

    return (
      <div className="group relative inline-flex items-center gap-2 cursor-pointer" onClick={() => setIsEditing(true)}>
        <span className={className}>{value}</span>
        <Edit className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    )
  }

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault()
    if (newProduct.name && newProduct.price && newProduct.image) {
      setProducts([
        ...products,
        {
          id: Date.now(),
          name: newProduct.name,
          price: newProduct.price,
          image: newProduct.image,
        },
      ])
      setNewProduct({ name: "", price: "", image: "" })
      setShowAddProductModal(false)
    }
  }

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((p) => p.id !== id))
    setShowDeleteModal(false)
    setProductToDelete(null)
  }

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileData({ ...profileData, profileImage: e.target?.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleEditLink = (platform: string) => {
    const current = profileData.socialLinks[platform as keyof typeof profileData.socialLinks]
    setEditingLink({ platform, current })
    setNewLink(current === "#" ? "" : current)
    setShowEditLinkModal(true)
  }

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault()
    if (editingLink) {
      let finalUrl = newLink.trim()
      if (editingLink.platform === "email" && finalUrl && !finalUrl.startsWith("mailto:")) {
        finalUrl = `mailto:${finalUrl}`
      } else if (!finalUrl) {
        finalUrl = "#"
      }

      setProfileData({
        ...profileData,
        socialLinks: {
          ...profileData.socialLinks,
          [editingLink.platform]: finalUrl,
        },
      })
    }
    setShowEditLinkModal(false)
    setEditingLink(null)
    setNewLink("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}

      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">

        {/* Profile Section */}
        <section className="bg-white rounded-lg shadow-md p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 mb-12 border border-gray-200">
          <div className="relative cursor-pointer group" onClick={() => fileInputRef.current?.click()}>
            <Avatar className="w-36 h-36">
              <AvatarImage src={profileData.profileImage || "/placeholder.svg"} />
              <AvatarFallback>Ana</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-2 right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
              <Edit className="h-4 w-4 text-gray-600" />
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
            />
          </div>

          <div className="flex-1 w-full">
            <div className="flex flex-col md:flex-row justify-between items-start">
              <div className="w-full md:w-auto flex flex-col items-center md:items-start">
                <EditableText
                  value={profileData.name}
                  onChange={(value) => setProfileData({ ...profileData, name: value })}
                  className="text-3xl font-bold text-gray-900"
                />
                <EditableText
                  value={profileData.role}
                  onChange={(value) => setProfileData({ ...profileData, role: value })}
                  className="text-lg font-medium text-green-700 mt-1"
                />
                <EditableText
                  value={profileData.cnpj}
                  onChange={(value) => setProfileData({ ...profileData, cnpj: value })}
                  className="text-sm text-gray-500 font-medium mt-2"
                />
              </div>

              <div className="w-full md:w-auto flex justify-center md:justify-end items-center space-x-3 mt-4 md:mt-0">
                <div className="relative group cursor-pointer" onClick={() => handleEditLink("instagram")}>
                  <Instagram className="w-8 h-8 text-pink-500" />
                  <Edit className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative group cursor-pointer" onClick={() => handleEditLink("facebook")}>
                  <Facebook className="w-8 h-8 text-blue-600" />
                  <Edit className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="relative group cursor-pointer" onClick={() => handleEditLink("email")}>
                  <Mail className="w-8 h-8 text-red-500" />
                  <Edit className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full p-0.5 shadow-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>

            <div className="mt-4 text-center md:text-left">
              <EditableText
                value={profileData.bio}
                onChange={(value) => setProfileData({ ...profileData, bio: value })}
                className="text-gray-600 max-w-2xl"
                multiline={true}
              />
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section>
          <div className="flex flex-col sm:flex-row justify-center items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-center text-green-700">Peças do/a (Nome da loja)</h2>
            <Button
              onClick={() => setShowAddProductModal(true)}
              className="bg-green-600 text-white font-bold py-2 px-4 rounded-full hover:bg-green-700 transition-colors"
            >
              + Adicionar Peça
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden group relative"
              >
                <div className="aspect-square relative">
                  <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <EditableText
                    value={product.name}
                    onChange={(value) =>
                      setProducts(products.map((p) => (p.id === product.id ? { ...p, name: value } : p)))
                    }
                    className="font-semibold text-gray-700"
                  />
                  <div className="mt-2">
                    <EditableText
                      value={product.price}
                      onChange={(value) =>
                        setProducts(products.map((p) => (p.id === product.id ? { ...p, price: value } : p)))
                      }
                      className="bg-red-600 text-white text-sm font-bold py-1 px-3 rounded-md inline-block"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    setProductToDelete(product.id)
                    setShowDeleteModal(true)
                  }}
                  className="absolute top-2 right-2 bg-red-600 text-white w-8 h-8 rounded-full hidden group-hover:flex items-center justify-center font-bold"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <section className="flex justify-center items-center gap-4 mt-12">
          <Button
            variant="outline"
            size="sm"
            className="border-green-600 text-green-600 hover:bg-green-50 bg-transparent"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">Página seguinte →</Button>
          <div className="text-sm text-gray-600">
            Página <span className="font-semibold">1</span> de 10
          </div>
        </section>
      </main>

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">Adicionar Nova Peça</h3>
            <form onSubmit={handleAddProduct}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Nome da Peça</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">Preço (Ex: R$ 99,00)</label>
                <input
                  type="text"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">URL da Imagem</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setShowAddProductModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Adicionar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl text-center w-full max-w-sm">
            <h3 className="text-xl font-bold mb-4">Confirmar Exclusão</h3>
            <p className="text-gray-600 mb-6">Tem certeza que deseja excluir esta peça?</p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-700"
                onClick={() => productToDelete && handleDeleteProduct(productToDelete)}
              >
                Excluir
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Social Link Modal */}
      {showEditLinkModal && editingLink && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
            <h3 className="text-2xl font-bold mb-6">
              Editar Link do{" "}
              {editingLink.platform === "instagram"
                ? "Instagram"
                : editingLink.platform === "facebook"
                  ? "Facebook"
                  : "E-mail"}
            </h3>
            <form onSubmit={handleSaveLink}>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  {editingLink.platform === "email" ? "E-mail" : "URL"}
                </label>
                <input
                  type="text"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder={
                    editingLink.platform === "email"
                      ? "seu-email@exemplo.com"
                      : `https://www.${editingLink.platform}.com/seuperfil`
                  }
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <Button type="button" variant="outline" onClick={() => setShowEditLinkModal(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="bg-green-600 hover:bg-green-700">
                  Salvar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
