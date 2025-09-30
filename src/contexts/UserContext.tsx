"use client"

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback, useRef } from 'react';
import { User } from '@/lib/api.types';
import { generateWeNoveAvatar } from '@/lib/avatar';

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  avatarUrl: string | null;
  resetSessionTimer: () => void;
  isLoggingOut: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());
  
  // Constante para timeout da sessão (15 minutos em millisegundos)
  const SESSION_TIMEOUT = 15 * 60 * 1000;

  // Função para limpar timer de sessão
  const clearSessionTimer = useCallback(() => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
  }, []);

  // Função para logout automático
  const autoLogout = useCallback(() => {
    console.log('Sessão expirada - logout automático');
    setUser(null);
    localStorage.removeItem('wenove_user');
    localStorage.removeItem('wenove_last_activity');
    clearSessionTimer();
    window.location.href = '/login';
  }, [clearSessionTimer]);

  // Função para iniciar/resetar timer de sessão
  const resetSessionTimer = useCallback(() => {
    clearSessionTimer();
    lastActivityRef.current = Date.now();
    localStorage.setItem('wenove_last_activity', lastActivityRef.current.toString());
    
    sessionTimerRef.current = setTimeout(() => {
      autoLogout();
    }, SESSION_TIMEOUT);
  }, [clearSessionTimer, autoLogout]);

  // Verificar validade da sessão
  const checkSessionValidity = useCallback(() => {
    const storedActivity = localStorage.getItem('wenove_last_activity');
    if (storedActivity) {
      const lastActivity = parseInt(storedActivity);
      const now = Date.now();
      if (now - lastActivity > SESSION_TIMEOUT) {
        // Sessão expirada
        autoLogout();
        return false;
      }
    }
    return true;
  }, [autoLogout]);

  useEffect(() => {
    // Verificar se há dados do usuário no localStorage ao inicializar
    const storedUser = localStorage.getItem('wenove_user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        // Verificar se a sessão ainda é válida
        if (checkSessionValidity()) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Erro ao carregar dados do usuário:', error);
        localStorage.removeItem('wenove_user');
        localStorage.removeItem('wenove_last_activity');
      }
    }
    setIsLoading(false);
  }, [checkSessionValidity]);

  // Detecção de atividade do usuário
  useEffect(() => {
    if (!user) return;

    let debounceTimer: NodeJS.Timeout;
    
    const handleUserActivity = () => {
      // Debounce para evitar muitas chamadas
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        resetSessionTimer();
      }, 1000); // 1 segundo de debounce
    };

    // Eventos que indicam atividade do usuário
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    
    // Adicionar listeners
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Iniciar timer quando usuário está logado
    resetSessionTimer();

    // Cleanup
    return () => {
      clearTimeout(debounceTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
    };
  }, [user]);

  const handleSetUser = (userData: User | null) => {
    setUser(userData);
    resetSessionTimer();
    if (userData) {
      localStorage.setItem('wenove_user', JSON.stringify(userData));
      resetSessionTimer();
    } else {
      localStorage.removeItem('wenove_user');
      localStorage.removeItem('wenove_last_activity');
      clearSessionTimer();
    }
  };

  // Gerar URL do avatar baseado no nome do usuário
  const avatarUrl = useMemo(() => {
    return user ? generateWeNoveAvatar(user.name) : null;
  }, [user?.name]);

  const logout = () => {
    setIsLoggingOut(true);
    setUser(null);
    localStorage.removeItem('wenove_user');
    localStorage.removeItem('wenove_last_activity');
    clearSessionTimer();
    
    // Redirecionar para a página de login
    setTimeout(() => {
      window.location.href = '/login';
    }, 100);
  };

  const value = {
    user,
    setUser: handleSetUser,
    isAuthenticated: !!user,
    logout,
    avatarUrl,
    resetSessionTimer,
    isLoggingOut,
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#ced7d4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-[#88a51d] rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
          </div>
          <p className="text-[#0c3729] font-dosis">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};