'use client';

import { useState } from 'react';

interface Position {
  id: string;
  name: string;
  shortName: string;
  description: string;
  rangeSize: string;
}

const POSITIONS: Position[] = [
  { 
    id: 'utg', 
    name: 'Under The Gun', 
    shortName: 'UTG',
    description: 'Primeira posição - Range mais tight',
    rangeSize: '~10%',
  },
  { 
    id: 'mp', 
    name: 'Middle Position', 
    shortName: 'MP',
    description: 'Posição intermediária',
    rangeSize: '~15%',
  },
  { 
    id: 'co', 
    name: 'Cutoff', 
    shortName: 'CO',
    description: 'Posição de steal',
    rangeSize: '~25%',
  },
  { 
    id: 'btn', 
    name: 'Button', 
    shortName: 'BTN',
    description: 'Melhor posição - Range mais amplo',
    rangeSize: '~40%',
  },
  { 
    id: 'sb', 
    name: 'Small Blind', 
    shortName: 'SB',
    description: 'Fora de posição pós-flop',
    rangeSize: '~30%',
  },
  { 
    id: 'bb', 
    name: 'Big Blind', 
    shortName: 'BB',
    description: 'Defesa de blind',
    rangeSize: '~40%',
  },
];

interface HandDecision {
  hand: string;
  display: string;
  action: 'raise' | 'call' | 'fold' | '3bet';
  strength: number; // 1-5
  tip?: string;
}

const HANDS_BY_POSITION: Record<string, HandDecision[]> = {
  utg: [
    { hand: 'AA', display: 'AA', action: 'raise', strength: 5, tip: 'Premium - Sempre raise' },
    { hand: 'KK', display: 'KK', action: 'raise', strength: 5, tip: 'Premium - Sempre raise' },
    { hand: 'QQ', display: 'QQ', action: 'raise', strength: 5, tip: 'Premium' },
    { hand: 'JJ', display: 'JJ', action: 'raise', strength: 4, tip: 'Forte, atenção a overcards' },
    { hand: 'TT', display: 'TT', action: 'raise', strength: 4 },
    { hand: 'AKs', display: 'AKs', action: 'raise', strength: 5, tip: 'Premium suited' },
    { hand: 'AKo', display: 'AKo', action: 'raise', strength: 4 },
    { hand: 'AQs', display: 'AQs', action: 'raise', strength: 4 },
    { hand: '99', display: '99', action: 'raise', strength: 3 },
    { hand: 'AJs', display: 'AJs', action: 'raise', strength: 3 },
  ],
  btn: [
    { hand: 'AA-22', display: 'Todos pares', action: 'raise', strength: 4, tip: 'Pares lucrativos em posição' },
    { hand: 'AXs', display: 'AXs', action: 'raise', strength: 3, tip: 'Ás suited jogável' },
    { hand: 'KQo', display: 'KQo', action: 'raise', strength: 3 },
    { hand: 'QJs', display: 'QJs', action: 'raise', strength: 3 },
    { hand: 'JTs', display: 'JTs', action: 'raise', strength: 3, tip: 'Bom potencial de straights' },
    { hand: 'T9s', display: 'T9s', action: 'raise', strength: 2 },
    { hand: '98s', display: '98s', action: 'raise', strength: 2, tip: 'Suited connector' },
    { hand: '87s', display: '87s', action: 'raise', strength: 2 },
    { hand: 'K9s', display: 'K9s', action: 'raise', strength: 2 },
    { hand: 'Q9s', display: 'Q9s', action: 'raise', strength: 2 },
  ],
  bb: [
    { hand: 'AA-JJ', display: 'AA-JJ', action: '3bet', strength: 5, tip: '3-bet for value' },
    { hand: 'TT-77', display: 'TT-77', action: 'call', strength: 3, tip: 'Set mining' },
    { hand: '66-22', display: '66-22', action: 'call', strength: 2, tip: 'Call se odds boas' },
    { hand: 'AKs/AKo', display: 'AK', action: '3bet', strength: 5, tip: '3-bet sempre' },
    { hand: 'AQs-ATs', display: 'AQs-ATs', action: 'call', strength: 3 },
    { hand: 'KQs', display: 'KQs', action: 'call', strength: 3 },
    { hand: 'Suited connectors', display: '98s, 87s', action: 'call', strength: 2, tip: 'Implied odds' },
  ],
};

export default function SimpleRangeHelper() {
  const [selectedPosition, setSelectedPosition] = useState<Position>(POSITIONS[3]); // BTN default
  const [showTip, setShowTip] = useState<string | null>(null);

  const hands = HANDS_BY_POSITION[selectedPosition.id] || HANDS_BY_POSITION.btn;

  const getActionColor = (action: string) => {
    switch (action) {
      case 'raise': return 'bg-green-500/20 border-green-500 text-green-400';
      case '3bet': return 'bg-red-500/20 border-red-500 text-red-400';
      case 'call': return 'bg-blue-500/20 border-blue-500 text-blue-400';
      default: return 'bg-gray-500/20 border-gray-500 text-gray-400';
    }
  };

  const getStrengthBars = (strength: number) => {
    return Array(5).fill(0).map((_, i) => (
      <div 
        key={i} 
        className={`w-2 h-4 rounded-sm ${i < strength ? 'bg-green-500' : 'bg-gray-700'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Position Selector */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">Posição na Mesa</h2>

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {POSITIONS.map((pos) => (
            <button
              key={pos.id}
              onClick={() => setSelectedPosition(pos)}
              className={`p-3 rounded-lg border transition-all text-center ${
                selectedPosition.id === pos.id
                  ? 'bg-green-500/20 border-green-500'
                  : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
              }`}
            >
              <span className="font-bold text-white text-sm">{pos.shortName}</span>
              <span className="text-xs text-gray-500 block">{pos.rangeSize}</span>
            </button>
          ))}
        </div>

        {/* Position Info */}
        <div className="mt-4 bg-gray-900/50 rounded-lg p-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-white">{selectedPosition.name}</h3>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                {selectedPosition.rangeSize}
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1">{selectedPosition.description}</p>
          </div>
        </div>
      </div>

      {/* Hands to Play */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Range para {selectedPosition.shortName}
        </h2>

        <div className="space-y-3">
          {hands.map((hand, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${getActionColor(hand.action)}`}
              onClick={() => setShowTip(showTip === hand.hand ? null : hand.hand)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-2xl font-bold text-white font-mono">{hand.display}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getActionColor(hand.action)}`}>
                    {hand.action}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {getStrengthBars(hand.strength)}
                </div>
              </div>
              
              {showTip === hand.hand && hand.tip && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <svg className="w-4 h-4 text-yellow-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                    {hand.tip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Legend */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
        <h3 className="font-bold text-white mb-3">Legenda Rápida</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-300"><strong>Raise</strong> - Apostar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-300"><strong>3-bet</strong> - Re-raise</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
            <span className="text-sm text-gray-300"><strong>Call</strong> - Pagar</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-gray-500"></span>
            <span className="text-sm text-gray-300"><strong>Fold</strong> - Descartar</span>
          </div>
        </div>
      </div>
    </div>
  );
}
