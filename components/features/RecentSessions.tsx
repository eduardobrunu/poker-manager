'use client';

import { PokerSession } from '@/types/session';

interface RecentSessionsProps {
  sessions: PokerSession[];
}

export default function RecentSessions({ sessions }: RecentSessionsProps) {
  const recentSessions = sessions.slice(0, 5);

  if (recentSessions.length === 0) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white mb-2">Nenhuma sessão ainda</h3>
        <p className="text-gray-400 text-sm mb-4">
          Registre sua primeira sessão de poker para começar a acompanhar seu progresso!
        </p>
        <a
          href="/sessions"
          className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-xl transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Registrar Primeira Sessão
        </a>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h3 className="font-bold text-white">Sessões Recentes</h3>
      </div>
      
      <div className="divide-y divide-gray-700">
        {recentSessions.map((session) => {
          const profit = (session.profit || 0) / 100; // converte de centavos para dólares
          const date = new Date(session.date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
          });

          return (
            <div key={session.id} className="p-4 flex items-center justify-between hover:bg-gray-700/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  profit >= 0 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-red-500/20 text-red-400'
                }`}>
                  {profit >= 0 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="font-medium text-white block">{session.gameType}</span>
                  <span className="text-xs text-gray-400">{date} • {session.stakes}</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                </span>
                <span className="text-xs text-gray-500 block">USD</span>
              </div>
            </div>
          );
        })}
      </div>

      <a 
        href="/sessions" 
        className="block p-4 text-center text-green-400 hover:bg-gray-700/30 transition-colors font-medium"
      >
        + Nova Sessão
      </a>
    </div>
  );
}
