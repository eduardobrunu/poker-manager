'use client';

import { useState } from 'react';

interface Tip {
  id: string;
  category: string;
  title: string;
  content: string;
  icon: string;
  color: string;
}

const BEGINNER_TIPS: Tip[] = [
  {
    id: '1',
    category: 'Fundamento',
    title: 'Posição é TUDO',
    content: 'Jogar no botão (BTN) é muito mais fácil que jogar UTG. No BTN você age por último e vê o que todos fizeram antes de decidir!',
    icon: '🎯',
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/30',
  },
  {
    id: '2',
    category: 'Bankroll',
    title: 'Regra dos 30 Buy-ins',
    content: 'NUNCA jogue com menos de 30 buy-ins do seu stake. Ex: Para NL5 ($5 buy-in), tenha no mínimo $150 de bankroll.',
    icon: '💰',
    color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30',
  },
  {
    id: '3',
    category: 'Estratégia',
    title: 'Tight is Right',
    content: 'Iniciantes devem jogar MENOS mãos, mas jogar BEM as que jogam. Qualidade > Quantidade!',
    icon: '🔒',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  },
  {
    id: '4',
    category: 'Mental',
    title: 'Evite o Tilt',
    content: 'Perdeu uma mão difícil? Respire, levante da mesa 5 minutos. Nunca jogue irritado - você vai perder mais!',
    icon: '🧘',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30',
  },
  {
    id: '5',
    category: 'GGPoker',
    title: 'Rush & Cash é ótimo!',
    content: 'Para iniciantes, Rush & Cash é perfeito: você joga mais mãos, aprende mais rápido e pode foldar as mãos ruins instantaneamente!',
    icon: '⚡',
    color: 'from-orange-500/20 to-red-500/20 border-orange-500/30',
  },
  {
    id: '6',
    category: 'Prática',
    title: 'Estude suas mãos',
    content: 'Depois de jogar, revise as mãos difíceis. O GGPoker tem replay de mãos - use!',
    icon: '📚',
    color: 'from-indigo-500/20 to-violet-500/20 border-indigo-500/30',
  },
];

export default function BeginnerTips() {
  const [expandedTip, setExpandedTip] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
        </svg>
        Dicas para Iniciantes
      </h2>

      <div className="grid gap-3">
        {BEGINNER_TIPS.map((tip) => (
          <div
            key={tip.id}
            className={`bg-gradient-to-r ${tip.color} border rounded-xl overflow-hidden cursor-pointer transition-all hover:scale-[1.01]`}
            onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
          >
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-wide">{tip.category}</span>
                    <h3 className="font-bold text-white">{tip.title}</h3>
                  </div>
                </div>
                <svg 
                  className={`w-5 h-5 text-gray-400 transition-transform ${expandedTip === tip.id ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              
              {expandedTip === tip.id && (
                <p className="mt-3 text-gray-300 text-sm leading-relaxed">
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
