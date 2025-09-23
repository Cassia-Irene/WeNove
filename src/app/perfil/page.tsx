"use client"

import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@/contexts/UserContext';
import { User, Store } from '@/lib/api.types';
import weNoveApi from '@/lib/api';
import HeaderProduto from '@/components/HeaderProduto';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Store as StoreIcon,
  Package,
  Edit3,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { randomInt } from 'crypto';

interface UserStores {
  stores: Store[];
  isStoreOwner: boolean;
}

export default function PerfilPage() {
  const { user, isAuthenticated, avatarUrl } = useUser();
  const router = useRouter();
  const [userStores, setUserStores] = useState<UserStores>({ stores: [], isStoreOwner: false });
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<Partial<User>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loadUserStores = async (userId: string) => {
    try {
      setError(null);
      const storesResponse = await weNoveApi.getStoresByOwner(userId);

      if (storesResponse.success) {
        setUserStores({
          stores: (storesResponse.data || []).map(store => ({
            ...store,
            completeName: store.name,
            address: {
              country: '',
              state: '',
              zipCode: '',
              addressLineOne: '',
              addressLineTwo: '',
              additionalInfo: '',
            },
            feedbackStars: 0,
            logoUrl: '',
            bannerUrl: '',
            sells: store.sells || 0,
            rating: 0,
            totalProducts: 0,
            proposal: '',
            products: [],
            badges: []
          })),
          isStoreOwner: (storesResponse.data || []).length > 0
        });
      } else {
        setUserStores({ stores: [], isStoreOwner: false });
      }
    } catch (error) {
      console.error('Erro ao carregar lojas do usuário:', error);
      setError('Erro ao carregar dados das lojas.');
      setUserStores({ stores: [], isStoreOwner: false });
    }
  };

  // Verificar autenticação e carregar dados uma única vez
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user?.id && userStores.stores.length === 0) {
      loadUserStores(user.id);
    }

    setIsLoading(false);
  }, [isAuthenticated, user?.id, userStores.stores.length, router]);

  // Se não estiver autenticado, não renderizar nada
  if (!isAuthenticated) {
    return null;
  }

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({
      name: user?.name || '',
      email: user?.email || '',
    });
  };

  const handleSave = async () => {
    if (!user?.id) return;

    try {
      setIsSaving(true);
      setError(null);

      // Aqui você implementaria a atualização do usuário via API
      // await weNoveApi.updateUser(user.id, editedUser);

      setIsEditing(false);
      // Recarregar dados após salvar
      await loadUserStores(user.id);
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      setError('Erro ao salvar alterações. Tente novamente.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser({});
    setError(null);
  };

  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FFF]">
        <HeaderProduto />
        <div className="pt-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-center animate-fade-in">
            <Loader2 className="w-8 h-8 animate-spin text-[#88a51d] mx-auto mb-4" />
            <p className="text-[#0c3729] font-dosis animate-pulse">Carregando perfil...</p>
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
            <h1 className="text-3xl sm:text-4xl font-bold text-[#88a51d] mb-2 animate-slide-up" style={{ fontFamily: 'Futura, sans-serif' }}>
              Meu Perfil
            </h1>
            <p className="text-[#993F3C] font-dosis text-lg animate-slide-up animate-delay-200">
              {userStores.isStoreOwner ? 'Perfil de Lojista' : 'Perfil de Usuário'}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake animate-fade-in">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          {/* Informações do Usuário */}
          <Card className="mb-8 animate-fade-in animate-delay-300 hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-[#0c3729] flex items-center">
                  <UserIcon className="w-5 h-5 mr-2" />
                  Informações Pessoais
                </h2>
                {!isEditing ? (
                  <Button
                    onClick={handleEdit}
                    variant="outline"
                    size="sm"
                    className="border-[#88a51d] text-white bg-[#88a51d] hover:bg-[#cfe090] hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2 animate-fade-in">
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      size="sm"
                      className="bg-[#88a51d] hover:bg-[#6d8016] text-white transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4 mr-2" />
                      )}
                      Salvar
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      size="sm"
                      className="border-gray-300 transition-all duration-200 hover:scale-105 hover:shadow-md"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancelar
                    </Button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Avatar */}
                <div className="flex flex-col items-center animate-scale-in animate-delay-400">
                  <div className="w-24 h-24 rounded-full mb-4 overflow-hidden border-4 border-[#88a51d] hover:scale-110 transition-transform duration-300">
                    {avatarUrl ? (
                      <Image
                        src={avatarUrl}
                        alt={`Avatar de ${user?.name}`}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                        unoptimized={true}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#88a51d] flex items-center justify-center">
                        <UserIcon className="w-12 h-12 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 text-center">
                    Avatar gerado automaticamente
                  </p>
                </div>

                {/* Informações */}
                <div className="md:col-span-2 space-y-4 animate-slide-up animate-delay-500">
                  <div>
                    <Label htmlFor="name" className="text-[#0c3729] font-medium">
                      Nome Completo
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        value={editedUser.name || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="mt-1 transition-all duration-200 focus:scale-105 focus:shadow-lg"
                      />
                    ) : (
                      <p className="mt-1 text-gray-700 flex items-center hover:text-[#88a51d] transition-colors duration-200">
                        <UserIcon className="w-4 h-4 mr-2 text-[#88a51d]" />
                        {user?.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[#0c3729] font-medium">
                      Email
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        type="email"
                        value={editedUser.email || ''}
                        onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                        className="mt-1 transition-all duration-200 focus:scale-105 focus:shadow-lg"
                      />
                    ) : (
                      <p className="mt-1 text-gray-700 flex items-center hover:text-[#88a51d] transition-colors duration-200">
                        <Mail className="w-4 h-4 mr-2 text-[#88a51d]" />
                        {user?.email}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Lojista */}
          {userStores.isStoreOwner && (
            <Card className="animate-fade-in animate-delay-600 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-[#0c3729] flex items-center mb-6 animate-slide-up animate-delay-700">
                  <StoreIcon className="w-5 h-5 mr-2" />
                  Minhas Lojas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {userStores.stores.map((store, index) => (
                    <Card key={store.uuid} className="border-[#88a51d]/20 animate-scale-in hover:shadow-md transition-all duration-300 hover:scale-105" style={{ animationDelay: `${800 + index * 100}ms` }}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-[#0c3729]">{store.name}</h3>
                          <div className="flex items-center text-xs">
                            <div className={`w-2 h-2 rounded-full mr-1 ${store.sells > 0 ? 'bg-green-500' : 'bg-gray-400'
                              }`} />
                            {store.sells > 0 ? 'Ativa' : 'Sem vendas'}
                          </div>
                        </div>

                        <p className="text-sm text-gray-600 mb-4">{store.description}</p>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Vendas realizadas:</span>
                            <span className="font-medium text-[#88a51d]">{store.sells}</span>
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">ID da Loja:</span>
                            <span className="font-mono text-xs text-gray-500">
                              {store.uuid.substring(0, 8)}...
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <Button
                            size="sm"
                            className="bg-[#88a51d] hover:bg-[#6d8016] text-white flex-1 transition-all duration-200 hover:scale-105 hover:shadow-md"
                            onClick={() => router.push(`/loja/${store.uuid}`)}
                          >
                            <StoreIcon className="w-4 h-4 mr-1" />
                            Gerenciar
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[#88a51d] text-[#88a51d] hover:bg-[#88a51d] hover:text-white flex-1 transition-all duration-200 hover:scale-105 hover:shadow-md"
                            onClick={() => router.push(`/produtos?store=${store.uuid}`)}
                          >
                            <Package className="w-4 h-4 mr-1" />
                            Produtos
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    className="bg-[#88a51d] hover:bg-[#6d8016] text-white transition-all duration-200 hover:scale-105 hover:shadow-lg animate-fade-in animate-delay-1000"
                  >
                    <StoreIcon className="w-4 h-4 mr-2" />
                    Criar Nova Loja
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Seção de Usuário Regular */}
          {!userStores.isStoreOwner && (
            <div className="space-y-6">
              {/* Ações Rápidas */}
              <Card className="animate-fade-in animate-delay-600 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#0c3729] flex items-center mb-6 animate-slide-up animate-delay-700">
                    <Package className="w-5 h-5 mr-2" />
                    Ações Rápidas
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Button
                      onClick={() => router.push('/produtos')}
                      variant="outline"
                      className="h-20 bg-[#88a51d]/5 flex-col border-[#88a51d]/20 hover:bg-[#cfe090]/2 transition-all duration-200 hover:scale-105 hover:shadow-md animate-scale-in animate-delay-800"
                    >
                      <Package className="w-6 h-6 text-[#88a51d] mb-2" />
                      <span className="text-[#0c3729]">Explorar Produtos</span>
                    </Button>

                    <Button
                      onClick={() => router.push('/favoritos')}
                      variant="outline"
                      className="h-20 bg-[#88a51d]/5 flex-col border-[#88a51d]/20 hover:bg-[#cfe090]/2 transition-all duration-200 hover:scale-105 hover:shadow-md animate-scale-in animate-delay-900"
                    >
                      <UserIcon className="w-6 h-6 text-[#88a51d] mb-2" />
                      <span className="text-[#0c3729]">Meus Favoritos</span>
                    </Button>

                    <Button
                      onClick={() => router.push('/pedidos')}
                      variant="outline"
                      className="h-20 bg-[#88a51d]/5 flex-col border-[#88a51d]/20 hover:bg-[#cfe090]/2 transition-all duration-200 hover:scale-105 hover:shadow-md animate-scale-in animate-delay-1000"
                    >
                      <StoreIcon className="w-6 h-6 text-[#88a51d] mb-2" />
                      <span className="text-[#0c3729]">Meus Pedidos</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Estatísticas do Usuário */}
              <Card className="animate-fade-in animate-delay-1100 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#0c3729] flex items-center mb-6 animate-slide-up animate-delay-1200">
                    <UserIcon className="w-5 h-5 mr-2" />
                    Resumo da Conta
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-[#88a51d]/5 rounded-lg hover:bg-[#88a51d]/10 transition-colors duration-200 animate-scale-in animate-delay-1300">
                      <div className="text-2xl font-bold text-[#88a51d] mb-1">0</div>
                      <div className="text-sm text-gray-600">Pedidos Realizados</div>
                    </div>

                    <div className="text-center p-4 bg-[#993F3C]/5 rounded-lg hover:bg-[#993F3C]/10 transition-colors duration-200 animate-scale-in animate-delay-1400">
                      <div className="text-2xl font-bold text-[#993F3C] mb-1">0</div>
                      <div className="text-sm text-gray-600">Produtos Favoritos</div>
                    </div>

                    <div className="text-center p-4 bg-[#0c3729]/5 rounded-lg hover:bg-[#0c3729]/10 transition-colors duration-200 animate-scale-in animate-delay-1500">
                      <div className="text-2xl font-bold text-[#0c3729] mb-1">R$ 0,00</div>
                      <div className="text-sm text-gray-600">Total Gasto</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Atividade Recente */}
              <Card className="animate-fade-in animate-delay-1600 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-[#0c3729] flex items-center mb-6 animate-slide-up animate-delay-1700">
                    <Package className="w-5 h-5 mr-2" />
                    Atividade Recente
                  </h2>

                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-scale-in animate-delay-1800" />
                    <h3 className="text-lg font-medium text-gray-600 mb-2 animate-slide-up animate-delay-1900">
                      Nenhuma atividade ainda
                    </h3>
                    <p className="text-gray-500 mb-6 animate-slide-up animate-delay-2000">
                      Comece a explorar nossos produtos e fazer pedidos!
                    </p>
                    <Button
                      onClick={() => router.push('/produtos')}
                      className="bg-[#88a51d] hover:bg-[#6d8016] text-white transition-all duration-200 hover:scale-105 hover:shadow-md animate-bounce-in animate-delay-2100"
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Explorar Produtos
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Interesse em Vender */}
              <Card className="border-[#88a51d]/20 animate-fade-in animate-delay-2200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="text-center">
                    <StoreIcon className="w-12 h-12 text-[#88a51d] mx-auto mb-4 animate-scale-in animate-delay-2300 hover:text-[#88a51d]/80 transition-colors duration-300" />
                    <h3 className="text-lg font-semibold text-[#0c3729] mb-2 animate-slide-up animate-delay-2400">
                      Interessado em vender?
                    </h3>
                    <p className="text-gray-600 mb-4 animate-slide-up animate-delay-2500">
                      Crie sua própria loja e comece a vender seus produtos na WeNove!
                    </p>
                    <Button
                      onClick={() => router.push('/criar-loja')}
                      className="bg-[#88a51d] hover:bg-[#6d8016] text-white transition-all duration-200 hover:scale-105 hover:shadow-md animate-bounce-in animate-delay-2600"
                    >
                      <StoreIcon className="w-4 h-4 mr-2" />
                      Criar Minha Loja
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}