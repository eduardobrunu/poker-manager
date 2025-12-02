'use client';

import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Força renderização dinâmica
export const dynamic = 'force-dynamic';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
  const router = useRouter();

  // Verificar se já está logado ao carregar a página
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          router.replace('/dashboard');
          return;
        }
      } catch {
        // Não está logado, continua na página de login
      }
      setCheckingAuth(false);
    };
    
    checkExistingSession();
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Verificar configuração do Supabase
    if (!isSupabaseConfigured()) {
      setMessage({ 
        type: 'error', 
        text: 'Sistema não configurado. Verifique as variáveis de ambiente.' 
      });
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        // Login
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim().toLowerCase(),
          password,
        });

        if (error) {
          // Traduzir erros comuns
          if (error.message.includes('Invalid login credentials')) {
            throw new Error('Email ou senha incorretos');
          }
          if (error.message.includes('Email not confirmed')) {
            throw new Error('Confirme seu email antes de fazer login');
          }
          throw error;
        }

        if (data.session) {
          // Aguardar um momento para a sessão persistir
          await new Promise(resolve => setTimeout(resolve, 100));
          router.replace('/dashboard');
        }
      } else {
        // Registro
        const { data, error } = await supabase.auth.signUp({
          email: email.trim().toLowerCase(),
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/dashboard`,
          }
        });

        if (error) {
          if (error.message.includes('already registered')) {
            throw new Error('Este email já está cadastrado');
          }
          throw error;
        }

        // Verificar se o usuário foi criado e já está autenticado
        if (data.session) {
          setMessage({ 
            type: 'success', 
            text: 'Conta criada com sucesso! Redirecionando...' 
          });
          await new Promise(resolve => setTimeout(resolve, 500));
          router.replace('/dashboard');
        } else if (data.user && !data.session) {
          // Precisa confirmar email
          setMessage({ 
            type: 'success', 
            text: 'Conta criada! Verifique seu email para confirmar.' 
          });
        } else {
          setMessage({ 
            type: 'success', 
            text: 'Conta criada! Faça login para continuar.' 
          });
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Erro ao processar sua solicitação' 
      });
    } finally {
      setLoading(false);
    }
  };

  // Mostrar loading enquanto verifica sessão existente
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Verificando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Poker Manager</h1>
          <p className="text-gray-400">Gerencie seu bankroll profissionalmente</p>
        </div>

        {/* Card de Login/Registro */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-8">
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                isLogin 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                !isLogin 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              Criar Conta
            </button>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
              {!isLogin && (
                <p className="text-xs text-gray-500 mt-1">Mínimo 6 caracteres</p>
              )}
            </div>

            {message && (
              <div className={`p-3 rounded-lg ${
                message.type === 'error' 
                  ? 'bg-red-900/20 border border-red-700 text-red-300' 
                  : 'bg-green-900/20 border border-green-700 text-green-300'
              }`}>
                <p className="text-sm">{message.text}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Criar Conta'}
            </button>
          </form>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-sm text-green-400 hover:text-green-300">
                Esqueceu a senha?
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {isLogin ? 'Novo por aqui?' : 'Já tem uma conta?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-green-400 hover:text-green-300 font-semibold"
          >
            {isLogin ? 'Criar conta grátis' : 'Fazer login'}
          </button>
        </p>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-700/50 rounded-lg">
          <p className="text-xs text-blue-300 text-center flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
            Seus dados são criptografados e armazenados com segurança no Supabase
          </p>
        </div>
      </div>
    </div>
  );
}
