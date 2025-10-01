'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useUser } from '@/contexts/UserContext';
import apiClient from '@/lib/api';
import HeaderProduto from '@/components/HeaderProduto';
import {
  StoreIcon,
  Package,
  MapPin,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Users,
  ShoppingBag,
  Calendar,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { StoreResponse } from '@/lib/api.types';

interface StoreData {
  uuid: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  sells: number;
  createdAt: string;
  ownerUUID: string;
}



export default function PerfilEmpresaPage() {
  const { user } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [storeData, setStoreData] = useState<StoreResponse | null>(null);
  const [showStoreExistsMessage, setShowStoreExistsMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    // Verificar se foi redirecionado por já ter loja
    const message = searchParams.get('message');
    if (message === 'store-exists') {
      setShowStoreExistsMessage(true);
      // Remover o parâmetro da URL após 5 segundos
      setTimeout(() => {
        setShowStoreExistsMessage(false);
        router.replace('/perfil-empresa');
      }, 5000);
    }

    if (user) {
      fetchStoreData();
    }
  }, [user, router, searchParams]);

  const fetchStoreData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await apiClient.getStoresByOwner(user?.id || '');
      
      if (response.data && response.success && Array.isArray(response.data) && response.data.length > 0) {
        const store = response.data[0]; // Pega apenas a primeira loja
        setStoreData(store);
      } else {
        setError('Nenhuma loja encontrada para este usuário.');
      }
    } catch (err) {
      console.error('Erro ao buscar dados da loja:', err);
      setError('Erro ao carregar informações da loja.');
    } finally {
      setLoading(false);
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF]">
        <HeaderProduto />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in">
            <Loader2 className="w-8 h-8 animate-spin text-[#88a51d] mx-auto mb-4" />
            <p className="text-[#0c3729] font-dosis animate-pulse">Carregando informações da empresa...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFF]">
        <HeaderProduto />
        <div className="pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md mx-auto animate-fade-in">
              <CardContent className="p-6 text-center">
                <StoreIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Erro</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Button onClick={() => router.push('/perfil')} className="bg-[#88a51d] hover:bg-[#6d8016]">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar ao Perfil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (!storeData) {
    return (
      <div className="min-h-screen bg-[#FFF]">
        <HeaderProduto />
        <div className="pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md mx-auto animate-fade-in">
              <CardContent className="p-6 text-center">
                <StoreIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Nenhuma Loja Encontrada</h2>
                <p className="text-gray-600 mb-4">Você ainda não possui uma loja cadastrada.</p>
                <Button onClick={() => router.push('/criar-loja')} className="bg-[#88a51d] hover:bg-[#6d8016]">
                  <StoreIcon className="w-4 h-4 mr-2" />
                  Criar Loja
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF]">
      <HeaderProduto />
      
      <div className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header do Perfil */}
          <div className="text-center mb-8 animate-fade-in animate-delay-100">
            <Button
              onClick={() => router.push('/perfil')}
              variant="outline"
              className="mb-4 border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar ao Perfil
            </Button>
            
            <h1 className="text-3xl sm:text-4xl font-bold text-[#88a51d] mb-2 animate-slide-up" style={{ fontFamily: 'Futura, sans-serif' }}>
              Perfil da Empresa
            </h1>
            <p className="text-[#993F3C] font-dosis text-lg animate-slide-up animate-delay-200">
              Visualize as informações da sua loja
            </p>
          </div>

          {/* Mensagem de loja já existente */}
          {showStoreExistsMessage && (
            <div className="mb-6 animate-fade-in">
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <StoreIcon className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Atenção:</strong> Você já possui uma loja cadastrada. Cada usuário pode ter apenas uma loja no sistema.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Informações da Loja */}
          <Card className="mb-8 animate-fade-in animate-delay-300 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-[#0c3729] flex items-center mb-6">
                <StoreIcon className="w-5 h-5 mr-2" />
                Informações da Loja
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Loja
                    </label>
                    <p className="text-lg font-semibold text-[#0c3729]">{storeData.name || 'Não informado'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Descrição
                    </label>
                    <p className="text-gray-600">{storeData.description || 'Não informado'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Mail className="w-4 h-4 inline mr-1" />
                      E-mail
                    </label>
                    <p className="text-gray-600">{storeData.email || 'Não informado'}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <MapPin className="w-4 h-4 inline mr-1" />
                      Endereço
                    </label>
                    <p className="text-gray-600">
                      {storeData.address ? 
                        `${storeData.address.addressLineOne || ''}, ${storeData.address.addressLineTwo || ''} - ${storeData.address.zipCode || ''}`.replace(/^, |, $|^- |- $/g, '') || 'Não informado'
                        : 'Não informado'
                      }
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4 inline mr-1" />
                      WhatsApp
                    </label>
                    <p className="text-gray-600">{storeData.whatsapp || 'Não informado'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Media Tag
                    </label>
                    <p className="text-gray-600">
                      {storeData.mainMediaTag ? (
                        <a href={storeData.mainMediaTag} target="_blank" rel="noopener noreferrer" className="text-[#88a51d] hover:underline">
                          {storeData.mainMediaTag}
                        </a>
                      ) : (
                        'Não informado'
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="space-y-6">
            {/* Resumo de Vendas */}
            <Card className="animate-fade-in animate-delay-400 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0c3729] flex items-center mb-4">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Resumo de Vendas
                </h3>
                
                <div className="space-y-4">
                  <div className="text-center p-4 bg-[#88a51d]/5 rounded-lg">
                    <div className="text-3xl font-bold text-[#88a51d] mb-1">{storeData.sells}</div>
                    <div className="text-sm text-gray-600">Vendas Realizadas</div>
                  </div>
                  
                  <div className="text-center p-4 bg-[#0c3729]/5 rounded-lg">
                    <div className="text-2xl font-bold text-[#0c3729] mb-1">R$ 0,00</div>
                    <div className="text-sm text-gray-600">Faturamento Total</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Informações da Conta */}
            <Card className="animate-fade-in animate-delay-500 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0c3729] flex items-center mb-4">
                  <Calendar className="w-5 h-5 mr-2" />
                  Informações da Conta
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
  <span className="text-sm text-gray-600">ID da Loja:</span>
  <button
    onClick={() => {
      if (storeData?.uuid) {
        navigator.clipboard.writeText(storeData.uuid)
        alert("ID copiado!")
      }
    }}
    className="font-mono text-xs text-gray-500 hover:text-gray-700 transition cursor-pointer"
  >
    {storeData?.uuid ? `${storeData.uuid.substring(0, 8)}...` : "N/A"}
  </button>
</div>

                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Criada em:</span>
                    <span className="text-sm font-medium">
                      &quot;Há alguns minutos&quot;
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Status:</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                      storeData.sells > 0 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {storeData.sells > 0 ? 'Ativa' : 'Sem vendas'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card className="animate-fade-in animate-delay-600 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-[#0c3729] flex items-center mb-4">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ações Rápidas
                </h3>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push(`/produtos?store=${storeData.uuid}`)}
                    className="w-full bg-[#88a51d] hover:bg-[#6d8016] text-white"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Ver Produtos
                  </Button>
                  
                  <Button
                    onClick={() => router.push('/novo-produto')}
                    variant="outline"
                    className="w-full border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Adicionar Produto
                  </Button>
                  
                  <Button
                    onClick={() => router.push(`/loja/${storeData.uuid}`)}
                    variant="outline"
                    className="w-full border-[#0c3729] text-[#0c3729] hover:bg-[#0c3729] hover:text-white"
                  >
                    <StoreIcon className="w-4 h-4 mr-2" />
                    Ver Loja Pública
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}