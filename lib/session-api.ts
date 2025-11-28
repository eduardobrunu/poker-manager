import { supabase } from './supabase';
import { PokerSessionDB, PokerSessionInsert } from '@/types/database';
import { PokerSession, BankrollStats } from '@/types/session';

// Converter sessão do banco para o formato do app
export function dbToSession(dbSession: PokerSessionDB): PokerSession {
  return {
    id: dbSession.id,
    date: new Date(dbSession.date),
    buyIn: dbSession.buy_in,
    cashOut: dbSession.cash_out,
    profit: dbSession.profit,
    duration: dbSession.duration,
    handsPlayed: dbSession.hands_played || undefined,
    gameType: dbSession.game_type,
    gameVariant: dbSession.game_variant,
    stakes: dbSession.stakes,
    currency: dbSession.currency,
    location: dbSession.location,
    tournament: dbSession.tournament_name ? {
      name: dbSession.tournament_name,
      players: dbSession.tournament_players || 0,
      position: dbSession.tournament_position || 0,
      prizePool: dbSession.tournament_prize_pool || 0,
    } : undefined,
    notes: dbSession.notes || undefined,
  };
}

// Buscar todas as sessões do usuário logado
export async function fetchUserSessions(): Promise<PokerSession[]> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('poker_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  if (error) {
    console.error('Erro ao buscar sessões:', error);
    throw error;
  }

  return (data || []).map(dbToSession);
}

// Criar nova sessão
export async function createSession(session: Omit<PokerSession, 'id'>): Promise<PokerSession> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error('Usuário não autenticado');
  }

  const insertData: PokerSessionInsert = {
    user_id: user.id,
    date: session.date.toISOString(),
    buy_in: session.buyIn,
    cash_out: session.cashOut,
    profit: session.profit,
    duration: session.duration,
    hands_played: session.handsPlayed || null,
    game_type: session.gameType,
    game_variant: session.gameVariant,
    stakes: session.stakes,
    currency: session.currency,
    location: session.location,
    tournament_name: session.tournament?.name || null,
    tournament_players: session.tournament?.players || null,
    tournament_position: session.tournament?.position || null,
    tournament_prize_pool: session.tournament?.prizePool || null,
    notes: session.notes || null,
  };

  const { data, error } = await supabase
    .from('poker_sessions')
    .insert(insertData)
    .select()
    .single();

  if (error) {
    console.error('Erro ao criar sessão:', error);
    throw error;
  }

  return dbToSession(data);
}

// Deletar sessão
export async function deleteSession(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('poker_sessions')
    .delete()
    .eq('id', sessionId);

  if (error) {
    console.error('Erro ao deletar sessão:', error);
    throw error;
  }
}

// Calcular estatísticas a partir das sessões
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
  
  const winningSession = sessions.filter(s => s.profit > 0).length;
  const winRate = (winningSession / sessions.length) * 100;
  
  const hourlyRate = totalHours > 0 ? totalProfit / totalHours : 0;
  
  const profits = sessions.map(s => s.profit);
  const biggestWin = Math.max(...profits, 0);
  const biggestLoss = Math.min(...profits, 0);
  
  // Variância simples (desvio padrão dos lucros)
  const mean = totalProfit / sessions.length;
  const squaredDiffs = profits.map(p => Math.pow(p - mean, 2));
  const variance = Math.sqrt(squaredDiffs.reduce((a, b) => a + b, 0) / sessions.length);
  
  // Bankroll atual = soma de todos os lucros (assumindo que começou do zero)
  const currentBankroll = totalProfit;
  
  return {
    currentBankroll,
    totalProfit,
    sessionsPlayed: sessions.length,
    winRate,
    hourlyRate,
    biggestWin,
    biggestLoss,
    variance,
  };
}

// Formatar valor em centavos para moeda
export function formatCurrency(cents: number, currency: 'USD' | 'BRL' = 'BRL'): string {
  const value = cents / 100;
  
  if (currency === 'USD') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

// Avaliar saúde do bankroll
export function getBankrollHealthStatus(bankroll: number, currentStakes: string): {
  status: 'safe' | 'warning' | 'danger';
  message: string;
  buyIns: number;
} {
  // Extrair big blind do stakes (ex: "NL50" -> 0.50)
  const bb = parseFloat(currentStakes.replace(/[^0-9.]/g, '')) / 100;
  const buyIn = bb * 100; // 100bb = 1 buy-in
  const buyIns = Math.floor(bankroll / buyIn);
  
  if (buyIns >= 30) {
    return {
      status: 'safe',
      message: `Excelente! Você tem ${buyIns} buy-ins.`,
      buyIns,
    };
  } else if (buyIns >= 20) {
    return {
      status: 'warning',
      message: `Atenção! Você tem apenas ${buyIns} buy-ins.`,
      buyIns,
    };
  } else {
    return {
      status: 'danger',
      message: `Risco alto! Você tem apenas ${buyIns} buy-ins. Considere descer de stake.`,
      buyIns,
    };
  }
}
