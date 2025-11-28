'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
      setLoading(false);
    };

    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="text-2xl font-bold text-green-400">Poker Manager</Link>
            <div className="flex gap-4">
              {user ? (
                <>
                  <Link href="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Dashboard
                  </Link>
                  <Link href="/ranges" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Hand Ranges
                  </Link>
                  <Link href="/sessions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md">
                    Sessões
                  </Link>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      router.push('/login');
                    }}
                    className="text-red-400 hover:text-red-300 px-3 py-2 rounded-md"
                  >
                    Sair
                  </button>
                </>
              ) : (
                <Link href="/login" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-semibold">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Gerencie seu Bankroll como um Pro
          </h2>
          <p className="text-xl text-gray-400">
            Acompanhe suas sessões, estude ranges e maximize seus lucros
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/dashboard" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Dashboard</h3>
              <svg className="w-6 h-6 text-green-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              Acompanhe evolução do bankroll, estatísticas e desempenho
            </p>
          </Link>

          <Link href="/ranges" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Hand Ranges</h3>
              <svg className="w-6 h-6 text-green-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              Tabela de ranges por posição e estratégias recomendadas
            </p>
          </Link>

          <Link href="/sessions" className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6 hover:border-green-500 hover:bg-gray-800/70 transition-all">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-white">Sessões</h3>
              <svg className="w-6 h-6 text-green-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">
              Registre suas sessões e acompanhe resultados detalhados
            </p>
          </Link>
        </div>

        <div className="mt-12 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border border-blue-700/50 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-white mb-2">Regra dos 30 Buy-ins</h3>
              <p className="text-gray-300 text-sm mb-3">
                Para jogar com segurança e sobreviver à variância, mantenha pelo menos <strong className="text-blue-400">30 buy-ins</strong> do stake que está jogando.
              </p>
              <div className="bg-gray-900/50 rounded p-3 border border-gray-700">
                <p className="text-xs text-gray-400 mb-1">Exemplo prático:</p>
                <p className="text-sm text-gray-300 font-mono">
                  NL50 = R$ 50 por buy-in × 30 = <span className="text-green-400 font-bold">R$ 1.500 mínimo</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
