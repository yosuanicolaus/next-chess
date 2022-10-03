import { Game } from "./game";

// Makes every object property Nullable (Deeply)
// https://typeofnan.dev/making-every-object-property-nullable-in-typescript/
export type Nullable<T> = {
  [K in keyof T]: Nullable<T[K]> | null;
};

export type IdString = { id: string };

export type GameGame = { game: Game };

export type Theme = "light" | "dark";

type Array8x8<T> = [
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T],
  [T, T, T, T, T, T, T, T]
];

export type BoardStringArray = Array8x8<string>;

export type RankFile = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type PanelNumberArray = Array8x8<number>;

export type Position = { x: number; y: number };

export type Positions = Array8x8<Position>;
