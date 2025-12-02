'use client';

import { useState } from 'react';

interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
}

const TIPS: Tip[] = [
  {
    id: '1',
    category: 'Fundamento',
    title: 'Posição é fundamental',
    content: 'Jogar no Button é significativamente mais lucrativo que UTG. Você age por último e tem mais informação.',
  },
  {
    id: '2',
    category: 'Bankroll',
    title: 'Gestão de Banca',
    content: 'Mantenha no mínimo 30 buy-ins do stake atual. Para NL5, isso significa $150 de bankroll.',
  },
  {
    id: '3',
    category: 'Estratégia',
    title: 'Seleção de mãos',
    content: 'Jogue menos mãos, mas jogue-as de forma agressiva. Foco em qualidade, não quantidade.',
  },
  {
    id: '4',
    category: 'Mental',
    title: 'Controle emocional',
    content: 'Após uma bad beat, faça uma pausa. Jogar em tilt é a principal causa de perdas evitáveis.',
  },
  {
    id: '5',
    category: 'Formato',
    title: 'Rush & Cash',
    content: 'Formato ideal para estudo: alto volume de mãos permite coletar dados e identificar leaks rapidamente.',
  },
  {
    id: '6',
    category: 'Estudo',
    title: 'Análise de sessão',
    content: 'Revise suas mãos após cada sessão. Use o histórico do GGPoker para identificar erros recorrentes.',
  },
];

export default function BeginnerTips() {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-white">Conceitos Importantes</h2>

      <div className="space-y-2">
        {TIPS.map((tip) => (
          <div
            key={tip.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg overflow-hidden cursor-pointer transition-colors hover:bg-gray-800/70"
            onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
          >
            <div className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-500 uppercase tracking-wide">{tip.category}</span>
                  <h3 className="font-medium text-white text-sm">{tip.title}</h3>
                </div>
                <svg 
                  className={`w-4 h-4 text-gray-500 transition-transform ${expandedTip === tip.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {expandedTip === tip.id && (
                <p className="mt-2 text-gray-400 text-sm leading-relaxed">
                  {tip.content}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}