import { Move } from "./move";
import { Player } from "./player";
import { User } from "./user";
import { Nullable } from "./utils";

interface BaseGame {
  id: string;
  timeControl: string;
  chatID: string;
}
interface CompleteGame extends BaseGame {
  status: "normal" | "check" | "end";
  difference: number;
  turn: "w" | "b";
  fen: string;
  board: string[][];
  moves: Move[];
  history: string[];
  records: number[];
  pgn: string;
  pwhite: Player;
  pblack: Player;
  user0: User;
  user1: User;
}

export interface GameEmpty extends BaseGame {
  state: "empty";
}
export interface GameWaiting extends BaseGame {
  state: "waiting";
  user0: User;
}
export interface GamePending extends BaseGame {
  state: "pending";
  user0: User;
  user1: User;
}
export interface GameReady extends BaseGame {
  state: "ready";
  user0: User;
  user1: User;
}
export interface GameComplete extends CompleteGame {
  state: "playing" | "ended";
}

export type Game =
  | GameEmpty
  | GameWaiting
  | GameReady
  | GamePending
  | GameComplete;

export interface TransformGame extends Nullable<Partial<CompleteGame>> {
  state: "empty" | "waiting" | "pending" | "ready" | "playing" | "ended";
}
