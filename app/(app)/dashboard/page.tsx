'use client';

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import StatsCards from "@/components/features/StatsCards";
import SessionHistory from "@/components/features/SessionHistory";
import BankrollHealthCard from "@/components/features/BankrollHealthCard";
import QuickStats from "@/components/features/QuickStats";
import BankrollCalculator from "@/components/features/BankrollCalculator";
import { fetchUserSessions, calculateStats } from "@/lib/session-api";
import { PokerSession } from "@/types/session";

// Força renderização dinâmica (não faz pre-render durante build)
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  const [sessions, setSessions] = useState<PokerSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSessions = useCallback(async () => {
    try {
      setError(null);
      const userSessions = await fetchUserSessions();
      setSessions(userSessions);
    } catch (err) {
      console.error('Erro ao carregar sessões:', err);
      setError('Erro ao carregar sessões. Tente novamente.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
  }, [loadSessions]);

  const stats = calculateStats(sessions);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Carregando suas sessões...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button 
            onClick={loadSessions}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>
          </div>
          <p className="text-gray-400">
            Acompanhe sua evolução e estatísticas de poker
          </p>
        </div>

        {/* Cards de Estatísticas */}
        <div className="mb-8">
          <StatsCards stats={stats} />
        </div>

        {/* Saúde do Bankroll + Gráfico */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-1 space-y-6">
            <BankrollHealthCard bankroll={stats.currentBankroll} />
            <QuickStats currentBankroll={stats.currentBankroll} currentStakes="NL50" />
            <BankrollCalculator initialBankrollUSD={stats.currentBankroll / 500} />
          </div>
          
          <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Evolução do Bankroll</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-gray-700 rounded-lg">
              <div className="text-center">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
                <p className="text-gray-500 font-medium">Gráfico em desenvolvimento</p>
                <p className="text-sm text-gray-600 mt-2">Integre Chart.js ou Recharts para visualização</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dicas - Removido SessionHistory duplicado */}

        {/* Dicas */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border border-blue-700/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <h3 className="text-lg font-bold text-blue-300">Fundamentos</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Poker é 30% skill, 70% sorte no curto prazo</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>No longo prazo, o skill vence</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Variância é normal - prepare-se mentalmente</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>Nunca jogue com medo de perder</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-800/10 border border-green-700/50 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-lg font-bold text-green-300">Estratégia</h3>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Quando ganhar: ganhe muito</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Quando perder: perca pouco</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Use stop-loss: pare após perder 3 buy-ins</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-0.5">•</span>
                <span>Estude ranges - veja a página Hand Ranges</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Histórico de Sessões */}
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold text-white mb-4">Histórico de Sessões</h3>
          {sessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">Nenhuma sessão registrada ainda</p>
              <Link href="/sessions" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold">
                Registrar Primeira Sessão
              </Link>
            </div>
          ) : (
            <SessionHistory sessions={sessions} />
          )}
        </div>
      </main>
  );
}
