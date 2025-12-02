'use client';

import { useState } from 'react';

interface QuickStatsProps {
  currentBankroll: number;
  currentStakes: string;
}

export default function QuickStats({ currentBankroll, currentStakes }: QuickStatsProps) {
  const [stakes, setStakes] = useState(currentStakes);
  const [customBuyIn, setCustomBuyIn] = useState(50);

  const stakeValue = parseInt(stakes.replace('NL', '')) * 100;
  const buyInsAvailable = Math.floor(currentBankroll / stakeValue);
  
  const recommendedStakes = [
    { name: 'NL10', buyIn: 10 },
    { name: 'NL25', buyIn: 25 },
    { name: 'NL50', buyIn: 50 },
    { name: 'NL100', buyIn: 100 },
    { name: 'NL200', buyIn: 200 },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-lg p-6">
      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Calculadora de Stakes
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Selecione o stake:</label>
          <div className="grid grid-cols-5 gap-2">
            {recommendedStakes.map((stake) => {
              const buyIns = Math.floor(currentBankroll / (stake.buyIn * 100));
              const isSafe = buyIns >= 30;
              
              return (
                <button
                  key={stake.name}
                  onClick={() => setStakes(stake.name)}
                  className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                    stakes === stake.name
                      ? 'bg-green-600 text-white'
                      : isSafe
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-red-900/30 text-red-400 border border-red-700'
                  }`}
                >
                  {stake.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-400">Buy-in:</p>
              <p className="text-xl font-bold text-white">
                R$ {parseInt(stakes.replace('NL', ''))}
              </p>
            </div>
            <div>
              <p className="text-gray-400">Buy-ins disponíveis:</p>
              <p className={`text-xl font-bold ${buyInsAvailable >= 30 ? 'text-green-400' : buyInsAvailable >= 20 ? 'text-yellow-400' : 'text-red-400'}`}>
                {buyInsAvailable}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Status:</p>
            {buyInsAvailable >= 30 ? (
              <p className="text-sm text-green-400 font-medium">Seguro para jogar</p>
            ) : buyInsAvailable >= 20 ? (
              <p className="text-sm text-yellow-400 font-medium">Atenção - considere stakes menores</p>
            ) : (
              <p className="text-sm text-red-400 font-medium">Risco alto - jogue stakes menores</p>
            )}
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-gray-900/30 rounded p-3">
          <p className="font-semibold text-gray-400 mb-1">Recomendação:</p>
          <p>Sempre mantenha 30+ buy-ins para o stake que está jogando. Isso garante que você sobreviva à variância normal do poker.</p>
        </div>
      </div>
    </div>
  );
}
