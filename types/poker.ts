// Tipos de ações possíveis
export type Action = 'raise' | 'call' | 'fold' | '3bet';

// Posições na mesa
export type Position = 'EP' | 'MP' | 'CO' | 'BTN' | 'SB' | 'BB';

// Carta individual (rank + suit)
export interface Card {
  rank: string;
  suit?: 's' | 'o'; // suited ou offsuit
}

// Range de mãos para uma posição
export interface PositionRange {
  position: Position;
  raiseRange: string[];
  callRange: string[];
  threeBetRange: string[];
}
