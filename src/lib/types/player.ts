import { BotAlgorithm } from "logichess-bots";

export interface Player {
  uid: string;
  name: string;
  elo: number;
  active: boolean;
  online: boolean;
  time: number;
  algorithm?: BotAlgorithm;
}
