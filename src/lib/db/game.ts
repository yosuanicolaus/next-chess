import { set } from "firebase/database";
import { gamesRef } from "../firebase";
import { Game } from "../types";
import { generateID } from "../utils";

export async function createNewGame(timeControl = "10+5") {
  const id = generateID(10);
  const chatID = generateID(12);
  const game: Game = {
    state: "empty",
    id,
    chatID,
    timeControl,
  };
  await set(gamesRef(id), game);
  return game;
}
