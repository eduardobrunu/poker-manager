'use client';

import { useState } from 'react';
import { Position } from '@/types/poker';
import { POSITION_RANGES, getRecommendedAction } from '@/lib/poker-ranges';

const POSITIONS: Position[] = ['EP', 'MP', 'CO', 'BTN', 'SB', 'BB'];

// Grid simplificado das principais mãos
const HAND_GRID = [
  ['AA', 'AKs', 'AQs', 'AJs', 'ATs', 'A9s', 'A8s', 'A7s', 'A6s', 'A5s', 'A4s', 'A3s', 'A2s'],
  ['AKo', 'KK', 'KQs', 'KJs', 'KTs', 'K9s', 'K8s', 'K7s', 'K6s', 'K5s', 'K4s', 'K3s', 'K2s'],
  ['AQo', 'KQo', 'QQ', 'QJs', 'QTs', 'Q9s', 'Q8s', 'Q7s', 'Q6s', 'Q5s', 'Q4s', 'Q3s', 'Q2s'],
  ['AJo', 'KJo', 'QJo', 'JJ', 'JTs', 'J9s', 'J8s', 'J7s', 'J6s', 'J5s', 'J4s', 'J3s', 'J2s'],
  ['ATo', 'KTo', 'QTo', 'JTo', 'TT', 'T9s', 'T8s', 'T7s', 'T6s', 'T5s', 'T4s', 'T3s', 'T2s'],
  ['A9o', 'K9o', 'Q9o', 'J9o', 'T9o', '99', '98s', '97s', '96s', '95s', '94s', '93s', '92s'],
  ['A8o', 'K8o', 'Q8o', 'J8o', 'T8o', '98o', '88', '87s', '86s', '85s', '84s', '83s', '82s'],
  ['A7o', 'K7o', 'Q7o', 'J7o', 'T7o', '97o', '87o', '77', '76s', '75s', '74s', '73s', '72s'],
  ['A6o', 'K6o', 'Q6o', 'J6o', 'T6o', '96o', '86o', '76o', '66', '65s', '64s', '63s', '62s'],
  ['A5o', 'K5o', 'Q5o', 'J5o', 'T5o', '95o', '85o', '75o', '65o', '55', '54s', '53s', '52s'],
  ['A4o', 'K4o', 'Q4o', 'J4o', 'T4o', '94o', '84o', '74o', '64o', '54o', '44', '43s', '42s'],
  ['A3o', 'K3o', 'Q3o', 'J3o', 'T3o', '93o', '83o', '73o', '63o', '53o', '43o', '33', '32s'],
  ['A2o', 'K2o', 'Q2o', 'J2o', 'T2o', '92o', '82o', '72o', '62o', '52o', '42o', '32o', '22'],
];

export default function HandRangeGrid() {
  const [selectedPosition, setSelectedPosition] = useState<Position>('BTN');
  const [hoveredHand, setHoveredHand] = useState<string | null>(null);

  const getActionColor = (hand: string) => {
    const action = getRecommendedAction(hand, selectedPosition);
    
    switch (action) {
      case '3-bet':
        return 'bg-red-600 hover:bg-red-500';
      case 'raise':
        return 'bg-green-600 hover:bg-green-500';
      case 'call':
        return 'bg-blue-600 hover:bg-blue-500';
      default:
        return 'bg-gray-700 hover:bg-gray-600';
    }
  };

  const positionData = POSITION_RANGES.find(r => r.position === selectedPosition);

  return (
    <div className="space-y-6">
      {/* Seletor de Posição */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-3">Selecione a Posição:</h3>
        <div className="flex gap-2 flex-wrap">
          {POSITIONS.map((position) => (
            <button
              key={position}
              onClick={() => setSelectedPosition(position)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                selectedPosition === position
                  ? 'bg-green-600 text-white scale-105'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {position}
            </button>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex gap-4 flex-wrap text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <span className="text-gray-300">3-bet ({positionData?.threeBetRange.length || 0} mãos)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-600 rounded"></div>
          <span className="text-gray-300">Raise ({positionData?.raiseRange.length || 0} mãos)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-600 rounded"></div>
          <span className="text-gray-300">Call ({positionData?.callRange.length || 0} mãos)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-700 rounded"></div>
          <span className="text-gray-300">Fold</span>
        </div>
      </div>

      {/* Grid de Mãos */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
        <div className="overflow-x-auto">
          <div className="inline-grid grid-cols-13 gap-1 min-w-max">
            {HAND_GRID.map((row, rowIndex) => (
              row.map((hand, colIndex) => (
                <button
                  key={`${rowIndex}-${colIndex}`}
                  onMouseEnter={() => setHoveredHand(hand)}
                  onMouseLeave={() => setHoveredHand(null)}
                  className={`w-12 h-12 rounded text-xs font-bold text-white transition-all ${getActionColor(hand)} ${
                    hoveredHand === hand ? 'scale-110 ring-2 ring-white' : ''
                  }`}
                  title={`${hand} - ${getRecommendedAction(hand, selectedPosition)}`}
                >
                  {hand}
                </button>
              ))
            ))}
          </div>
        </div>
      </div>

      {/* Informação da mão selecionada */}
      {hoveredHand && (
        <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700 rounded-lg p-4">
          <h4 className="text-lg font-semibold text-white mb-2">
            {hoveredHand} na posição {selectedPosition}
          </h4>
          <p className="text-green-400 text-xl font-bold">
            Ação: {getRecommendedAction(hoveredHand, selectedPosition).toUpperCase()}
          </p>
          <p className="text-gray-400 text-sm mt-2">
            {hoveredHand.includes('s') && !hoveredHand.includes('o') && hoveredHand.length === 3
              ? 'Suited (mesmo naipe)'
              : hoveredHand.includes('o')
              ? 'Offsuit (naipes diferentes)'
              : 'Pocket Pair (par)'}
          </p>
        </div>
      )}

      {/* Descrição da Posição */}
      <div className="bg-blue-900/20 border border-blue-700 rounded-lg p-4">
        <h4 className="text-lg font-semibold text-blue-300 mb-2">
          Sobre a posição {selectedPosition}:
        </h4>
        <p className="text-gray-300 text-sm">
          {selectedPosition === 'BTN' && 'Botão - Melhor posição! Você age por último após o flop. Pode abrir com muitas mãos.'}
          {selectedPosition === 'CO' && 'Cutoff - Segunda melhor posição. Pode roubar os blinds com frequência.'}
          {selectedPosition === 'MP' && 'Middle Position - Posição intermediária. Seja mais seletivo com as mãos.'}
          {selectedPosition === 'EP' && 'Early Position - Posição inicial. Jogue apenas mãos premium, você age primeiro.'}
          {selectedPosition === 'SB' && 'Small Blind - Posição difícil. Você age primeiro pós-flop e já investiu meio blind.'}
          {selectedPosition === 'BB' && 'Big Blind - Você já investiu 1 blind. Pode defender contra roubos com mais mãos.'}
        </p>
      </div>
    </div>
  );
}
