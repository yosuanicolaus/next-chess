export interface User {
  uid: string;
  name: string;
  elo: number;
  createdAt: string;
}

export type Role = "spectator" | "user0" | "user1" | "pwhite" | "pblack";
