import { Move } from "./move";

export type ChessData = {
  status: "normal" | "check" | "end";
  difference: number;
  turn: "w" | "b";
  fen: string;
  board: string[][];
  moves: Move[];
};
