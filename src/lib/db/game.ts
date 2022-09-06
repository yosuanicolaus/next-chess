import { get, set } from "firebase/database";
import { gamesRef } from "../firebase";
import { Game, TransformGame, User } from "../types";
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

export async function joinGame(gameID: string, user: User) {
  const gameSnapshot = await get(gamesRef(gameID));
  const game: TransformGame = gameSnapshot.val();

  if (game.state === "empty") {
    game.state = "waiting";
    game.user0 = user;
  } else if (game.state === "waiting") {
    game.state = "pending";
    game.user1 = user;
  } else if (game.state === "pending" || game.state === "ready") {
    return null;
  } else if (game.state === "playing" || game.state === "ended") {
    if (user.uid === game.pwhite?.uid) {
      game.pwhite.online = true;
    } else if (user.uid === game.pblack?.uid) {
      game.pblack.online = true;
    }
  }
  await set(gamesRef(gameID), game);
  return game;
}
