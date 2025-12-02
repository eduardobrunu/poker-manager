'use client';

import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import DashboardQuickStats from "@/components/features/DashboardQuickStats";
import RecentSessions from "@/components/features/RecentSessions";
import QuickActions from "@/components/features/QuickActions";
import BeginnerTips from "@/components/features/BeginnerTips";
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
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Olá, jogador!
        </h1>
        <p className="text-gray-400">
          Acompanhe seu progresso e melhore seu jogo
        </p>
      </div>

      {/* Quick Stats */}
      <div className="mb-8">
        <DashboardQuickStats 
          sessions={sessions}
          totalProfit={stats.totalProfit}
          totalSessions={stats.sessionsPlayed}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Sessões Recentes */}
          <RecentSessions sessions={sessions} />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Dicas */}
          <BeginnerTips />

          {/* Link Pro Dashboard Avançado */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
            <h3 className="font-bold text-white mb-3 flex items-center gap-2">
              <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Bankroll
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Lembre-se: sempre tenha pelo menos 30 buy-ins do stake que está jogando!
            </p>
            <div className="bg-gray-900/50 rounded-xl p-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm">Para NL5 ($5)</span>
                <span className="text-green-400 font-bold">$150 mínimo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
