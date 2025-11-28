'use client';

import { BankrollStats } from '@/types/session';
import { formatCurrency } from '@/lib/session-api';

interface StatsCardsProps {
  stats: BankrollStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Bankroll Atual */}
      <div className="bg-gradient-to-br from-green-900/40 to-green-800/20 border border-green-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-green-300">Bankroll Atual</h3>
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-3xl font-bold text-white">
          {formatCurrency(stats.currentBankroll)}
        </p>
        <p className="text-xs text-green-400 mt-1">
          +{formatCurrency(stats.totalProfit)} no total
        </p>
      </div>

      {/* Win Rate */}
      <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-blue-300">Win Rate</h3>
          <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <p className="text-3xl font-bold text-white">
          {stats.winRate.toFixed(1)}%
        </p>
        <p className="text-xs text-blue-400 mt-1">
          {Math.round(stats.winRate)}% - {Math.round(stats.sessionsPlayed * (stats.winRate / 100))} de {stats.sessionsPlayed} sessões
        </p>
      </div>

      {/* Hourly Rate */}
      <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/20 border border-purple-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-purple-300">Hourly Rate</h3>
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-3xl font-bold text-white">
          {formatCurrency(stats.hourlyRate)}/h
        </p>
        <p className="text-xs text-purple-400 mt-1">
          Ganho médio por hora
        </p>
      </div>

      {/* Sessões Jogadas */}
      <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/20 border border-orange-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-orange-300">Sessões</h3>
          <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p className="text-3xl font-bold text-white">
          {stats.sessionsPlayed}
        </p>
        <p className="text-xs text-orange-400 mt-1">
          Total jogadas
        </p>
      </div>
    </div>
  );
}
