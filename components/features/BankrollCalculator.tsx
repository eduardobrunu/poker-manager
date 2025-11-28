'use client';

import { useState } from 'react';
import { calculatePlayableHands, extractBigBlind, GAME_FORMATS, USD_TO_BRL, getVolumeRecommendation } from '@/lib/bankroll-calculator';

interface BankrollCalculatorProps {
  initialBankrollUSD?: number;
}

export default function BankrollCalculator({ initialBankrollUSD = 100 }: BankrollCalculatorProps) {
  const [bankrollUSD, setBankrollUSD] = useState(initialBankrollUSD);
  const [stakes, setStakes] = useState('NL25');
  const [gameType, setGameType] = useState<keyof typeof GAME_FORMATS>('Cash Game');

  const bigBlind = extractBigBlind(stakes);
  const stats = calculatePlayableHands(bankrollUSD, bigBlind, gameType);
  const volume = getVolumeRecommendation(gameType, bankrollUSD, bigBlind);
  const bankrollBRL = bankrollUSD * USD_TO_BRL;

  const commonStakes = [
    { name: 'NL2', bb: 0.02 },
    { name: 'NL5', bb: 0.05 },
    { name: 'NL10', bb: 0.10 },
    { name: 'NL25', bb: 0.25 },
    { name: 'NL50', bb: 0.50 },
    { name: 'NL100', bb: 1.00 },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/70 border border-gray-700 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-4">
        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-xl font-bold text-white">Calculadora de Bankroll (USD)</h3>
      </div>

      <div className="space-y-4">
        {/* Input de Bankroll */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Seu Bankroll em Dólares:</label>
          <div className="flex gap-2 items-center">
            <span className="text-gray-400 text-lg">$</span>
            <input
              type="number"
              value={bankrollUSD}
              onChange={(e) => setBankrollUSD(Number(e.target.value))}
              className="flex-1 px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              step="10"
            />
            <span className="text-sm text-gray-500">
              ≈ R$ {bankrollBRL.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">Cotação: US$ 1,00 = R$ {USD_TO_BRL.toFixed(2)}</p>
        </div>

        {/* Tipo de Jogo */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Tipo de Jogo (Texas Hold'em):</label>
          <select
            value={gameType}
            onChange={(e) => setGameType(e.target.value as keyof typeof GAME_FORMATS)}
            className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Rush & Cash">⚡ Rush & Cash (200 mãos/h)</option>
            <option value="Cash Game">🃏 Cash Game (60 mãos/h)</option>
            <option value="Spin & Gold">🎰 Spin & Gold</option>
            <option value="Flip & Go">💥 Flip & Go</option>
            <option value="Mystery Bounty">🎁 Mystery Bounty</option>
            <option value="Sit & Go">🪑 Sit & Go</option>
            <option value="Torneio">🏆 Torneio</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">Todos os modos usam Texas Hold'em (2 cartas)</p>
        </div>

        {/* Stakes */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Stakes:</label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {commonStakes.map((stake) => {
              const buyIns = Math.floor(bankrollUSD / (stake.bb * 100));
              const isSafe = buyIns >= 30;
              
              return (
                <button
                  key={stake.name}
                  onClick={() => setStakes(stake.name)}
                  className={`px-3 py-2 rounded text-sm font-semibold transition-all ${
                    stakes === stake.name
                      ? 'bg-green-600 text-white ring-2 ring-green-400'
                      : isSafe
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-red-900/30 text-red-400 border border-red-700/50'
                  }`}
                >
                  <div>{stake.name}</div>
                  <div className="text-xs opacity-75">{buyIns} BI</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resultados */}
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xs text-gray-400">Buy-ins disponíveis:</p>
              <p className={`text-2xl font-bold ${stats.isSafe ? 'text-green-400' : stats.buyInsAvailable >= 20 ? 'text-yellow-400' : 'text-red-400'}`}>
                {stats.buyInsAvailable}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Buy-in:</p>
              <p className="text-2xl font-bold text-white">
                ${(bigBlind * 100).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Recomendação de Volume */}
          <div className="pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-2">Recomendação de Volume:</p>
            <div className="space-y-1 text-sm">
              <p className="text-green-400 font-medium">{volume.description}</p>
              {GAME_FORMATS[gameType].handsPerHour > 0 && (
                <>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Semanal:</span> {volume.weeklyHands.toLocaleString()} mãos
                  </p>
                  <p className="text-gray-300">
                    <span className="text-gray-400">Mensal:</span> {volume.monthlyHands.toLocaleString()} mãos
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Status */}
          <div className="mt-3 pt-3 border-t border-gray-700">
            <p className="text-xs text-gray-400 mb-1">Status:</p>
            {stats.isSafe ? (
              <div className="flex items-center gap-2 text-sm text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Seguro para jogar</span>
              </div>
            ) : stats.buyInsAvailable >= 20 ? (
              <div className="flex items-center gap-2 text-sm text-yellow-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span className="font-medium">Atenção - considere stakes menores</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-red-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">Risco alto - jogue stakes menores!</span>
              </div>
            )}
          </div>
        </div>

        {/* Dica de Mãos */}
        {GAME_FORMATS[gameType].handsPerHour > 0 && (
          <div className="text-xs text-gray-500 bg-gray-900/30 rounded p-3">
            <p className="font-semibold text-gray-400 mb-1">Sobre {gameType}:</p>
            <p>
              Velocidade: ~{GAME_FORMATS[gameType].handsPerHour} mãos/hora. 
              Para estatísticas confiáveis, jogue pelo menos {GAME_FORMATS[gameType].recommendedHands} mãos 
              (~{Math.ceil(GAME_FORMATS[gameType].recommendedHands / GAME_FORMATS[gameType].handsPerHour)}h de jogo).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
