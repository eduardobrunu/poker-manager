import { PokerSession, BankrollStats } from '@/types/session';

// Mock data para demonstração - GGPoker
export const MOCK_SESSIONS: PokerSession[] = [
  {
    id: '1',
    date: new Date('2025-11-27'),
    buyIn: 10000, // R$ 100
    cashOut: 15000, // R$ 150
    profit: 5000, // R$ 50
    duration: 180, // 3 horas
    handsPlayed: 540, // Rush & Cash = 200 mãos/hora * 3h = 600, jogou um pouco menos
    gameType: 'Rush & Cash',
    gameVariant: 'Texas Holdem',
    stakes: 'NL50',
    currency: 'BRL',
    location: 'GGPoker Online',
  },
  {
    id: '2',
    date: new Date('2025-11-25'),
    buyIn: 5000,
    cashOut: 12000,
    profit: 7000, // R$ 70
    duration: 45,
    handsPlayed: 150, // Torneio, contou as mãos manualmente
    gameType: 'Spin & Gold',
    gameVariant: 'Texas Holdem',
    stakes: 'R$50',
    currency: 'BRL',
    location: 'GGPoker Online',
    tournament: {
      name: 'Spin & Gold',
      players: 3,
      position: 1,
      prizePool: 15000,
    },
  },
  {
    id: '3',
    date: new Date('2025-11-23'),
    buyIn: 10000,
    cashOut: 18500,
    profit: 8500, // R$ 85
    duration: 240, // 4 horas
    handsPlayed: 220, // Cash Game = 60 mãos/hora * 4h = 240, jogou um pouco menos
    gameType: 'Cash Game',
    gameVariant: 'Texas Holdem',
    stakes: 'NL50',
    currency: 'BRL',
    location: 'GGPoker Online',
  },
  {
    id: '4',
    date: new Date('2025-11-20'),
    buyIn: 10000,
    cashOut: 0,
    profit: -10000, // -R$ 100
    duration: 180,
    handsPlayed: 287, // Torneio, estimativa manual
    gameType: 'Torneio',
    gameVariant: 'Texas Holdem',
    stakes: 'R$100',
    currency: 'BRL',
    location: 'GGPoker Online',
    tournament: {
      name: 'GGMasters',
      players: 1234,
      position: 156,
      prizePool: 0,
    },
  },
  {
    id: '5',
    date: new Date('2025-11-18'),
    buyIn: 10000,
    cashOut: 13000,
    profit: 3000, // R$ 30
    duration: 150, // 2.5 horas
    handsPlayed: 140, // Cash Game = 60 mãos/hora * 2.5h = 150
    gameType: 'Cash Game',
    gameVariant: 'Texas Holdem',
    stakes: 'NL50',
    currency: 'BRL',
    location: 'GGPoker Online',
  },
];

export function calculateStats(sessions: PokerSession[]): BankrollStats {
  if (sessions.length === 0) {
    return {
      currentBankroll: 0,
      totalProfit: 0,
      sessionsPlayed: 0,
      winRate: 0,
      hourlyRate: 0,
      biggestWin: 0,
      biggestLoss: 0,
      variance: 0,
    };
  }

  const totalProfit = sessions.reduce((sum, s) => sum + s.profit, 0);
  const totalMinutes = sessions.reduce((sum, s) => sum + s.duration, 0);
  const totalHours = totalMinutes / 60;
  
  const profits = sessions.map(s => s.profit);
  const biggestWin = Math.max(...profits);
  const biggestLoss = Math.min(...profits);
  
  const winningSessions = sessions.filter(s => s.profit > 0).length;
  const winRate = (winningSessions / sessions.length) * 100;
  
  const hourlyRate = totalHours > 0 ? totalProfit / totalHours : 0;
  
  // Variância simplificada (desvio padrão)
  const mean = totalProfit / sessions.length;
  const squaredDiffs = profits.map(p => Math.pow(p - mean, 2));
  const variance = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / sessions.length);

  return {
    currentBankroll: 150000, // R$ 1.500 (mock - seria calculado com saldo inicial)
    totalProfit,
    sessionsPlayed: sessions.length,
    winRate,
    hourlyRate,
    biggestWin,
    biggestLoss,
    variance,
  };
}

export function formatCurrency(cents: number): string {
  const reais = cents / 100;
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(reais);
}

export function getBankrollHealthStatus(bankroll: number, stakes: string): {
  status: 'safe' | 'warning' | 'danger';
  message: string;
  buyInsRemaining: number;
} {
  // Extrair o valor do buy-in do stakes (ex: "NL50" = 50 reais = 5000 centavos)
  const stakeValue = parseInt(stakes.replace('NL', '')) * 100;
  const buyInsRemaining = bankroll / stakeValue;

  if (buyInsRemaining >= 30) {
    return {
      status: 'safe',
      message: 'Bankroll saudável para este stake',
      buyInsRemaining: Math.floor(buyInsRemaining),
    };
  } else if (buyInsRemaining >= 20) {
    return {
      status: 'warning',
      message: 'Atenção: Considere jogar stakes mais baixos',
      buyInsRemaining: Math.floor(buyInsRemaining),
    };
  } else {
    return {
      status: 'danger',
      message: 'Risco alto! Jogue stakes mais baixos',
      buyInsRemaining: Math.floor(buyInsRemaining),
    };
  }
}
