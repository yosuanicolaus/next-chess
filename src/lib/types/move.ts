export interface Move {
  from: {
    rank: number;
    file: number;
  };
  to: {
    rank: number;
    file: number;
  };
  piece?: string;
  faction?: string;
  san: string;
  lan: string;
  uci: string;
  fenResult: string;
  capture?: true;
}
