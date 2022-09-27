import { Chess } from "logichess";

export function createChessData(fen: string) {
  const chess = new Chess(fen);
  return chess.data;
}
