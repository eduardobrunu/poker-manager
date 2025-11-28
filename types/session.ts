export interface PokerSession {
  id: string;
  date: Date;
  buyIn: number; // em centavos
  cashOut: number; // em centavos
  profit: number; // em centavos (cashOut - buyIn)
  duration: number; // em minutos
  handsPlayed?: number; // número de mãos jogadas
  gameType: 'Cash Game' | 'Torneio' | 'Spin & Gold' | 'Flip & Go' | 'Mystery Bounty' | 'Rush & Cash' | 'Sit & Go';
  gameVariant: 'Texas Holdem' | 'Omaha' | '6+ Short Deck' | 'All-In or Fold';
  stakes: string; // ex: "NL50", "NL100"
  currency: 'USD' | 'BRL'; // moeda do buy-in
  location: string; // "GGPoker Online" | "GGPoker Live"
  tournament?: {
    name: string; // ex: "GGMasters", "WSOP Online"
    players: number;
    position: number; // colocação final
    prizePool: number;
  };
  notes?: string;
}

export interface BankrollStats {
  currentBankroll: number;
  totalProfit: number;
  sessionsPlayed: number;
  winRate: number; // porcentagem
  hourlyRate: number; // em centavos por hora
  biggestWin: number;
  biggestLoss: number;
  variance: number;
}
