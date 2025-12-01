'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const handleUnauthenticated = useCallback(() => {
    setUser(null);
    setLoading(false);
    router.replace('/login');
  }, [router]);

  useEffect(() => {
    // Verificar configuração
    if (!isSupabaseConfigured()) {
      console.warn('Supabase não configurado');
      setLoading(false);
      return;
    }

    let mounted = true;

    const checkAuth = async () => {
      try {
        // Usar getUser() que valida o token com o servidor
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (!mounted) return;

        if (error || !user) {
          handleUnauthenticated();
          return;
        }
        
        setUser(user);
        setLoading(false);
      } catch (err) {
        console.error('Erro na verificação de auth:', err);
        if (mounted) {
          handleUnauthenticated();
        }
      }
    };

    checkAuth();

    // Listener para mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        if (event === 'SIGNED_OUT' || !session?.user) {
          handleUnauthenticated();
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setUser(session.user);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router, handleUnauthenticated]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
