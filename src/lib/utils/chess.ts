export function getTurn(fen: string) {
  const fens = fen.split(" ");
  const turn = fens[1] as "w" | "b";
  return turn;
}
