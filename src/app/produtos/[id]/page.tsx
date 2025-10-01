"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import HeaderProduto from '@/components/HeaderProduto'
import DetalhesProdutos from "./detalhesprodutos"
import { getProductById, getProductsByStore } from "@/lib/api"
import type { ProductResponse, StoreResponse } from "@/lib/api.types"
import { Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import apiClient from "@/lib/api"

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  
  const [product, setProduct] = useState<ProductResponse | null>(null)
  const [store, setStore] = useState<StoreResponse>()
  const [relatedProducts, setRelatedProducts] = useState<ProductResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Buscar produto
      const productData = await getProductById(productId)
      if (!productData) {
        setError('Produto não encontrado')
        return
      }
      
      setProduct(productData)
      
      // Buscar loja
      const storeData = await apiClient.getStoreByName(productData.storeName)
      if (storeData.success) {
        setStore(storeData.data)
        
        // Buscar produtos relacionados da mesma loja
        const relatedData = await getProductsByStore(productData.storeName)
        if (relatedData) {
          // Filtrar o produto atual da lista
          const filtered = relatedData.filter(p => p.uuid !== productId)
          setRelatedProducts(filtered)
        }
      } else {
        // Criar loja padrão se não encontrar
        setStore({
          uuid: 'default',
          name: 'Loja Padrão',
          completeName: 'Loja Padrão LTDA',
          description: 'Descrição não disponível',
          sells: 0,
          products: [],
          address: {
            country: '',
            state: '',
            zipCode: '',
            addressLineOne: '',
            addressLineTwo: '',
            additionalInfo: '',
          },
          logoUrl: '',
          bannerUrl: '',
          proposal: '',
          badges: [],
          ownerUUID: '',
          cnpj: '65041828312',
          whatsapp: '11987654321',
          mainCategory: 'Todas',
          mainMediaTag: '@lojapadrao',
          email: 'lojapadrao@wnv.org',
        })
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      setError('Erro ao carregar os dados do produto')
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    fetchData()
  }, [productId])

  // Estado de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderProduto />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#88a51d] mx-auto mb-4" />
            <p className="text-gray-600 font-dosis">Carregando detalhes do produto...</p>
          </div>
        </div>
      </div>
    )
  }
  
  // Estado de erro
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderProduto />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center max-w-md mx-auto px-4">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2 font-dosis">Ops! Algo deu errado</h2>
            <p className="text-gray-600 mb-6 font-dosis">{error}</p>
            <div className="space-y-3">
              <Button 
                onClick={fetchData}
                className="w-full bg-[#88a51d] hover:bg-[#6d8015] text-white font-dosis"
              >
                Tentar novamente
              </Button>
              <Button 
                variant="outline" 
                onClick={() => window.history.back()}
                className="w-full border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white font-dosis"
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  // Estado de sucesso
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <HeaderProduto />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <AlertCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-600 font-dosis">Produto não encontrado</p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderProduto />
      <DetalhesProdutos 
        product={product} 
        store={store!}
        relatedProducts={relatedProducts}
      />
    </div>
  )
}
