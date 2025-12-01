'use client';

import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface QuickSessionFormProps {
  onSessionSaved?: () => void;
}

const GAME_MODES = [
  { 
    id: 'rush', 
    name: 'Rush & Cash', 
    desc: 'Fast-fold - Jogue mais mãos!',
    icon: '⚡',
    color: 'from-yellow-500/20 to-orange-500/20 border-yellow-500/50',
    recommended: true
  },
  { 
    id: 'cash', 
    name: 'Cash Game', 
    desc: 'Jogo tradicional - Sem pressa',
    icon: '💵',
    color: 'from-green-500/20 to-emerald-500/20 border-green-500/50',
    recommended: false
  },
  { 
    id: 'spin', 
    name: 'Spin & Gold', 
    desc: 'Torneio rápido 3 jogadores',
    icon: '🎰',
    color: 'from-purple-500/20 to-pink-500/20 border-purple-500/50',
    recommended: false
  },
  { 
    id: 'torneio', 
    name: 'Torneio', 
    desc: 'MTT - Competição maior',
    icon: '🏆',
    color: 'from-blue-500/20 to-cyan-500/20 border-blue-500/50',
    recommended: false
  },
];

const STAKES_OPTIONS = [
  { value: 'NL2', label: 'NL2', buyIn: 2, desc: 'Micro - Para começar' },
  { value: 'NL5', label: 'NL5', buyIn: 5, desc: 'Micro - Aprendizado' },
  { value: 'NL10', label: 'NL10', buyIn: 10, desc: 'Micro - Transição' },
  { value: 'NL25', label: 'NL25', buyIn: 25, desc: 'Low Stakes' },
  { value: 'NL50', label: 'NL50', buyIn: 50, desc: 'Low Stakes' },
  { value: 'NL100', label: 'NL100', buyIn: 100, desc: 'Mid Stakes' },
];

export default function QuickSessionForm({ onSessionSaved }: QuickSessionFormProps) {
  const [step, setStep] = useState(1);
  const [gameMode, setGameMode] = useState('rush');
  const [stakes, setStakes] = useState('NL5');
  const [buyIn, setBuyIn] = useState('5');
  const [cashOut, setCashOut] = useState('');
  const [duration, setDuration] = useState('60');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const selectedMode = GAME_MODES.find(m => m.id === gameMode);
  const selectedStake = STAKES_OPTIONS.find(s => s.value === stakes);
  
  const profit = cashOut ? parseFloat(cashOut) - parseFloat(buyIn) : 0;
  const profitPercent = buyIn && cashOut ? ((parseFloat(cashOut) - parseFloat(buyIn)) / parseFloat(buyIn) * 100).toFixed(0) : 0;

  const handleStakeSelect = (stake: typeof STAKES_OPTIONS[0]) => {
    setStakes(stake.value);
    setBuyIn(stake.buyIn.toString());
  };

  const handleSubmit = async () => {
    if (!isSupabaseConfigured()) {
      alert('Supabase não configurado');
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        alert('Você precisa estar logado');
        return;
      }

      const sessionData = {
        user_id: user.id,
        date: new Date().toISOString().split('T')[0],
        game_type: selectedMode?.name || 'Cash Game',
        game_variant: 'Texas Holdem',
        stakes: stakes,
        location: 'GGPoker Online',
        buy_in_usd: parseFloat(buyIn),
        cash_out_usd: parseFloat(cashOut),
        duration_minutes: parseInt(duration),
        notes: `Sessão rápida - ${selectedMode?.name}`,
        currency: 'USD',
      };

      const { error } = await supabase
        .from('sessions')
        .insert([sessionData]);

      if (error) throw error;

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setCashOut('');
        onSessionSaved?.();
      }, 2000);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      alert('Erro ao salvar sessão');
    } finally {
      setSaving(false);
    }
  };

  if (success) {
    return (
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-2xl p-8 text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Sessão Salva!</h3>
        <p className="text-green-300">
          {profit >= 0 ? `Lucro de $${profit.toFixed(2)} 🎉` : `Prejuízo de $${Math.abs(profit).toFixed(2)} - Faz parte!`}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-gray-900/50 px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">Passo {step} de 3</span>
          <span className="text-sm text-green-400">{Math.round((step / 3) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all duration-300"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6">
        {/* Step 1: Tipo de Jogo */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">O que você jogou?</h2>
              <p className="text-gray-400">Escolha o tipo de jogo da sua sessão</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {GAME_MODES.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setGameMode(mode.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                    gameMode === mode.id 
                      ? `bg-gradient-to-br ${mode.color} border-opacity-100 scale-[1.02]` 
                      : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {mode.recommended && (
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Recomendado
                    </span>
                  )}
                  <span className="text-3xl mb-2 block">{mode.icon}</span>
                  <h3 className="font-bold text-white">{mode.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{mode.desc}</p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Continuar
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}

        {/* Step 2: Stakes e Buy-in */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Qual stake você jogou?</h2>
              <p className="text-gray-400">Selecione o nível da mesa</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {STAKES_OPTIONS.map((stake) => (
                <button
                  key={stake.value}
                  onClick={() => handleStakeSelect(stake)}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    stakes === stake.value 
                      ? 'bg-green-500/20 border-green-500' 
                      : 'bg-gray-900/50 border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <span className="text-xl font-bold text-white block">{stake.label}</span>
                  <span className="text-xs text-gray-400">${stake.buyIn}</span>
                </button>
              ))}
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Buy-in (quanto você entrou)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
                <input
                  type="number"
                  value={buyIn}
                  onChange={(e) => setBuyIn(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Dica: Um buy-in padrão é {selectedStake?.buyIn || 5} dólares para {stakes}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all"
              >
                Voltar
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 bg-green-600 hover:bg-green-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                Continuar
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Resultado */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Como foi a sessão?</h2>
              <p className="text-gray-400">Informe quanto você terminou e o tempo jogado</p>
            </div>

            <div className="bg-gray-900/50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cash-out (quanto você saiu)
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl">$</span>
                <input
                  type="number"
                  value={cashOut}
                  onChange={(e) => setCashOut(e.target.value)}
                  className="w-full pl-10 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="0.00"
                  autoFocus
                />
              </div>
            </div>

            {/* Resultado Preview */}
            {cashOut && (
              <div className={`rounded-xl p-4 text-center ${
                profit >= 0 
                  ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30' 
                  : 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30'
              }`}>
                <span className="text-sm text-gray-400 block mb-1">Resultado</span>
                <span className={`text-3xl font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {profit >= 0 ? '+' : ''}{profit.toFixed(2)} USD
                </span>
                <span className={`text-sm block mt-1 ${profit >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                  {profit >= 0 ? `+${profitPercent}% 🎉` : `${profitPercent}%`}
                </span>
              </div>
            )}

            <div className="bg-gray-900/50 rounded-xl p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Duração (minutos)
              </label>
              <div className="flex gap-2">
                {[30, 60, 90, 120].map((mins) => (
                  <button
                    key={mins}
                    onClick={() => setDuration(mins.toString())}
                    className={`flex-1 py-3 rounded-lg font-medium transition-all ${
                      duration === mins.toString()
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {mins}min
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-4 rounded-xl transition-all"
              >
                Voltar
              </button>
              <button
                onClick={handleSubmit}
                disabled={!cashOut || saving}
                className="flex-1 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Salvar Sessão
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
