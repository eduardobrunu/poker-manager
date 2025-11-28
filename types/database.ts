// Tipos do banco de dados Supabase

export interface Database {
  public: {
    Tables: {
      poker_sessions: {
        Row: PokerSessionDB;
        Insert: PokerSessionInsert;
        Update: PokerSessionUpdate;
      };
    };
  };
}

export interface PokerSessionDB {
  id: string;
  user_id: string;
  date: string;
  buy_in: number;
  cash_out: number;
  profit: number;
  duration: number;
  hands_played: number | null;
  game_type: 'Cash Game' | 'Torneio' | 'Spin & Gold' | 'Flip & Go' | 'Mystery Bounty' | 'Rush & Cash' | 'Sit & Go';
  game_variant: 'Texas Holdem' | 'Omaha' | '6+ Short Deck' | 'All-In or Fold';
  stakes: string;
  currency: 'USD' | 'BRL';
  location: string;
  tournament_name: string | null;
  tournament_players: number | null;
  tournament_position: number | null;
  tournament_prize_pool: number | null;
  notes: string | null;
  created_at: string;
}

export interface PokerSessionInsert {
  user_id: string;
  date: string;
  buy_in: number;
  cash_out: number;
  profit: number;
  duration: number;
  hands_played?: number | null;
  game_type: 'Cash Game' | 'Torneio' | 'Spin & Gold' | 'Flip & Go' | 'Mystery Bounty' | 'Rush & Cash' | 'Sit & Go';
  game_variant: 'Texas Holdem' | 'Omaha' | '6+ Short Deck' | 'All-In or Fold';
  stakes: string;
  currency: 'USD' | 'BRL';
  location: string;
  tournament_name?: string | null;
  tournament_players?: number | null;
  tournament_position?: number | null;
  tournament_prize_pool?: number | null;
  notes?: string | null;
}

export interface PokerSessionUpdate {
  date?: string;
  buy_in?: number;
  cash_out?: number;
  profit?: number;
  duration?: number;
  hands_played?: number | null;
  game_type?: 'Cash Game' | 'Torneio' | 'Spin & Gold' | 'Flip & Go' | 'Mystery Bounty' | 'Rush & Cash' | 'Sit & Go';
  game_variant?: 'Texas Holdem' | 'Omaha' | '6+ Short Deck' | 'All-In or Fold';
  stakes?: string;
  currency?: 'USD' | 'BRL';
  location?: string;
  tournament_name?: string | null;
  tournament_players?: number | null;
  tournament_position?: number | null;
  tournament_prize_pool?: number | null;
  notes?: string | null;
}
