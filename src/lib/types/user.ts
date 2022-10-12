import { BotAlgorithm } from "logichess-bots";

export interface User {
  uid: string;
  name: string;
  elo: number;
  createdAt: string;
}

export interface BotUser extends User {
  algorithm: BotAlgorithm;
}

export type Role = "spectator" | "user0" | "user1" | "pwhite" | "pblack";
