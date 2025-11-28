'use client';

import { getBankrollHealthStatus } from '@/lib/session-api';

interface BankrollHealthCardProps {
  bankroll: number;
}

export default function BankrollHealthCard({ bankroll }: BankrollHealthCardProps) {
  const currentStakes = 'NL50';
  
  const health = getBankrollHealthStatus(bankroll, currentStakes);

  const statusColors = {
    safe: 'from-green-900/40 to-green-800/20 border-green-700',
    warning: 'from-yellow-900/40 to-yellow-800/20 border-yellow-700',
    danger: 'from-red-900/40 to-red-800/20 border-red-700',
  };

  const statusIcons = {
    safe: (
      <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    danger: (
      <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return (
    <div className={`bg-gradient-to-br ${statusColors[health.status]} border rounded-lg p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-white">Saúde do Bankroll</h3>
        <span className="text-3xl">{statusIcons[health.status]}</span>
      </div>

      <div className="space-y-3">
        <div>
          <p className="text-sm text-gray-400">Jogando em:</p>
          <p className="text-2xl font-bold text-white">{currentStakes}</p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Buy-ins restantes:</p>
          <p className="text-3xl font-bold text-white">{health.buyIns}</p>
        </div>

        <div className={`mt-4 p-3 rounded-lg ${
          health.status === 'safe' ? 'bg-green-900/30' :
          health.status === 'warning' ? 'bg-yellow-900/30' :
          'bg-red-900/30'
        }`}>
          <p className="text-sm font-medium text-white">{health.message}</p>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-600">
          <div className="flex items-start gap-2 mb-2">
            <svg className="w-4 h-4 text-blue-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-400">
              Regra dos 30 Buy-ins:
            </p>
          </div>
          <p className="text-sm text-gray-300">
            Para jogar com segurança, você precisa de pelo menos <strong>30 buy-ins</strong> do stake que está jogando.
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Recomendado para {currentStakes}: <strong className="text-white">R$ 1.500</strong> (30 × R$ 50)
          </p>
        </div>
      </div>
    </div>
  );
}
