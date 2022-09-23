import { get } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game } from "../../types";

export async function getGameByID(id: string) {
  const snapshot = await get(gamesRef(id));
  const game: Game | null = snapshot.val();
  return game;
}
