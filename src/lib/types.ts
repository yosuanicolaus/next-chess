export interface User {
  uid: string;
  name: string;
  elo: number;
  createdAt: string;
}

export interface Message {
  id: string;
  text: string;
  name: string;
  uid: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  messages: Message[];
  createdAt: string;
}

export interface Player {
  uid: string;
  name: string;
  elo: number;
  active: boolean;
  online: boolean;
  time: number;
}

export interface Move {
  from: {
    rank: number;
    file: number;
  };
  to: {
    rank: number;
    file: number;
  };
  piece: string;
  faction: string;
  san: string;
  lan: string;
  uci: string;
  fenResult: string;
  capture?: true;
}

interface BaseGame {
  id: string;
  timeControl: string;
  chatID: string;
}

interface GameEmpty extends BaseGame {
  state: "empty";
}

interface GameWaiting extends BaseGame {
  state: "waiting";
  user0: User;
}

interface GamePending extends BaseGame {
  state: "pending";
  user0: User;
  user1: User;
}

interface GameReady extends BaseGame {
  state: "ready";
  user0: User;
  user1: User;
}

interface GameComplete extends BaseGame {
  state: "playing" | "ended";
  status: "normal" | "check" | "end";
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

export type Game =
  | GameEmpty
  | GameWaiting
  | GameReady
  | GamePending
  | GameComplete;

export interface TransformGame extends BaseGame {
  state?: "empty" | "waiting" | "pending" | "ready" | "playing" | "ended";
  status?: "normal" | "check" | "end";
  turn?: "w" | "b";
  fen?: string;
  board?: string[][];
  moves?: Move[];
  history?: string[];
  records?: number[];
  pgn?: string;
  pwhite?: Player;
  pblack?: Player;
  user0?: User;
  user1?: User;
}

export type ChessData = {
  status: "normal" | "check" | "end";
  difference: number;
  turn: "w" | "b";
  fen: string;
  board: string[][];
  moves: Move[];
};
