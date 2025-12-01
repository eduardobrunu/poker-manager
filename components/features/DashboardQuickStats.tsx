'use client';

import { PokerSession } from '@/types/session';

interface QuickStatsProps {
  sessions: PokerSession[];
  totalProfit: number;
  totalSessions: number;
}

export default function DashboardQuickStats({ sessions, totalProfit, totalSessions }: QuickStatsProps) {
  // Calcula estatísticas
  const winningSessions = sessions.filter(s => (s.profit || 0) > 0).length;
  const winRate = totalSessions > 0 ? (winningSessions / totalSessions * 100).toFixed(0) : 0;
  
  const lastSession = sessions[0];
  const lastProfit = lastSession ? (lastSession.profit || 0) / 100 : 0; // converte de centavos

  // Converte totalProfit de centavos para dólares
  const totalProfitUSD = totalProfit / 100;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Lucro Total */}
      <div className={`rounded-2xl p-5 ${
        totalProfitUSD >= 0 
          ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30' 
          : 'bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30'
      }`}>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Lucro Total</span>
        <div className={`text-3xl font-bold mt-1 ${totalProfitUSD >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {totalProfitUSD >= 0 ? '+' : ''}{totalProfitUSD.toFixed(2)}
        </div>
        <span className="text-xs text-gray-500">USD</span>
      </div>

      {/* Sessões */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Sessões</span>
        <div className="text-3xl font-bold text-white mt-1">{totalSessions}</div>
        <span className="text-xs text-gray-500">jogadas</span>
      </div>

      {/* Win Rate */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-5">
        <span className="text-xs text-gray-400 uppercase tracking-wide">Taxa de Vitória</span>
        <div className="text-3xl font-bold text-white mt-1">{winRate}%</div>
        <span className="text-xs text-gray-500">{winningSessions} de {totalSessions}</span>
      </div>

      {/* Última Sessão */}
      <div className={`rounded-2xl p-5 ${
        lastProfit >= 0 
          ? 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30' 
          : 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30'
      }`}>
        <span className="text-xs text-gray-400 uppercase tracking-wide">Última Sessão</span>
        <div className={`text-3xl font-bold mt-1 ${lastProfit >= 0 ? 'text-blue-400' : 'text-orange-400'}`}>
          {lastSession ? `${lastProfit >= 0 ? '+' : ''}${lastProfit.toFixed(2)}` : '-'}
        </div>
        <span className="text-xs text-gray-500">{lastSession?.gameType || 'Nenhuma'}</span>
      </div>
    </div>
  );
}
