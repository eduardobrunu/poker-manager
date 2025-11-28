// Cotação do dólar (pode ser atualizada manualmente)
export const USD_TO_BRL = 5.0; // R$ 5,00 por dólar

// Tipos de jogo e suas características
export const GAME_FORMATS = {
  'Cash Game': {
    handsPerHour: 60,
    recommendedHands: 1000, // mínimo para ter estatísticas confiáveis
    bbPer100: 5, // big blinds ganhos por 100 mãos (médio)
  },
  'Rush & Cash': {
    handsPerHour: 200, // muito mais rápido
    recommendedHands: 500,
    bbPer100: 3,
  },
  'Spin & Gold': {
    handsPerHour: 0, // torneio
    recommendedHands: 20, // número de torneios
    bbPer100: 0,
  },
  'Flip & Go': {
    handsPerHour: 100,
    recommendedHands: 50,
    bbPer100: 0,
  },
  'Torneio': {
    handsPerHour: 0,
    recommendedHands: 10,
    bbPer100: 0,
  },
  'Mystery Bounty': {
    handsPerHour: 0,
    recommendedHands: 10,
    bbPer100: 0,
  },
  'Sit & Go': {
    handsPerHour: 0,
    recommendedHands: 20,
    bbPer100: 0,
  },
};

export interface BankrollInUSD {
  usd: number;
  brl: number;
}

export function convertUSDtoBRL(usd: number): number {
  return usd * USD_TO_BRL;
}

export function convertBRLtoUSD(brl: number): number {
  return brl / USD_TO_BRL;
}

// Calcula quantas mãos/torneios o jogador pode jogar com segurança
export function calculatePlayableHands(
  bankrollUSD: number,
  stakesBB: number, // Big Blind em USD (ex: 0.25 para NL25)
  gameType: keyof typeof GAME_FORMATS
): {
  buyInsAvailable: number;
  recommendedSessions: number;
  handsPerSession: number;
  estimatedHours: number;
  isSafe: boolean;
} {
  const buyIn = stakesBB * 100; // 100BB é o buy-in padrão
  const buyInsAvailable = Math.floor(bankrollUSD / buyIn);
  const isSafe = buyInsAvailable >= 30;

  const format = GAME_FORMATS[gameType];
  const handsPerSession = format.handsPerHour > 0 ? format.recommendedHands : 1;
  const estimatedHours = format.handsPerHour > 0 
    ? format.recommendedHands / format.handsPerHour 
    : 2; // 2 horas para torneios

  // Recomenda jogar 1 sessão por dia se tiver 30+ buy-ins
  const recommendedSessions = isSafe ? 30 : Math.floor(buyInsAvailable / 2);

  return {
    buyInsAvailable,
    recommendedSessions,
    handsPerSession,
    estimatedHours,
    isSafe,
  };
}

// Calcula estatísticas de mãos
export function calculateHandStats(
  handsPlayed: number,
  profit: number, // em centavos BRL
  bigBlindUSD: number
): {
  bb100: number; // big blinds ganhos por 100 mãos
  vpip: number; // % de mãos jogadas (estimado)
  hourlyUSD: number;
  hourlyBRL: number;
} {
  const profitUSD = profit / 100 / USD_TO_BRL;
  const bb100 = handsPlayed > 0 ? (profitUSD / bigBlindUSD / handsPlayed) * 100 : 0;
  
  // Estimativa de VPIP baseado no tipo de jogo
  const vpip = 25; // valor médio padrão

  // Calcula ganho por hora baseado em mãos típicas
  const handsPerHour = 80; // média
  const hourlyUSD = (bb100 / 100) * bigBlindUSD * handsPerHour;
  const hourlyBRL = hourlyUSD * USD_TO_BRL;

  return {
    bb100: Math.round(bb100 * 100) / 100,
    vpip,
    hourlyUSD: Math.round(hourlyUSD * 100) / 100,
    hourlyBRL: Math.round(hourlyBRL * 100) / 100,
  };
}

// Extrai o valor do big blind de uma string de stakes
export function extractBigBlind(stakes: string): number {
  // Exemplos: "NL25" = $0.25, "NL50" = $0.50, "$1/$2" = $2
  const match = stakes.match(/(\d+)/);
  if (match) {
    const value = parseInt(match[1]);
    // Se for NL format (NL25, NL50), divide por 100
    if (stakes.includes('NL')) {
      return value / 100;
    }
    return value;
  }
  return 0.5; // padrão
}

// Recomendações de volume de jogo
export function getVolumeRecommendation(
  gameType: keyof typeof GAME_FORMATS,
  bankrollUSD: number,
  stakeBB: number
): {
  dailyHands: number;
  weeklyHands: number;
  monthlyHands: number;
  description: string;
} {
  const format = GAME_FORMATS[gameType];
  const buyIn = stakeBB * 100;
  const buyIns = Math.floor(bankrollUSD / buyIn);

  let multiplier = 1;
  if (buyIns >= 50) multiplier = 1.5;
  else if (buyIns >= 30) multiplier = 1;
  else multiplier = 0.5;

  const dailyHands = Math.floor(format.recommendedHands * multiplier);
  const weeklyHands = dailyHands * 5; // 5 dias por semana
  const monthlyHands = weeklyHands * 4;

  let description = '';
  if (format.handsPerHour > 0) {
    description = `Jogue ${dailyHands} mãos por dia (${Math.ceil(dailyHands / format.handsPerHour)}h de jogo)`;
  } else {
    description = `Jogue ${dailyHands} torneios por dia`;
  }

  return {
    dailyHands,
    weeklyHands,
    monthlyHands,
    description,
  };
}
