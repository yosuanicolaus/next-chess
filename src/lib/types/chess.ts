import { Move } from "./move";
import { BoardStringArray } from "./utils";

export type ChessData = {
  status: "normal" | "check" | "end";
  difference: number;
  turn: "w" | "b";
  fen: string;
  board: BoardStringArray;
  moves: Move[];
};
