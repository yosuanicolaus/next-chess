import { Game } from "./game";

// Makes every object property Nullable (Deeply)
// https://typeofnan.dev/making-every-object-property-nullable-in-typescript/
export type Nullable<T> = {
  [K in keyof T]: Nullable<T[K]> | null;
};

export type IdString = { id: string };

export type GameGame = { game: Game };
