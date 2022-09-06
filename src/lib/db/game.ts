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
    return;
  } else if (game.state === "playing" || game.state === "ended") {
    if (user.uid === game.pwhite?.uid) {
      game.pwhite.online = true;
    } else if (user.uid === game.pblack?.uid) {
      game.pblack.online = true;
    }
  }
  set(gamesRef(gameID), game);
}

export async function leaveGame(game: Game, user: User) {
  const newGame: TransformGame = game;

  if (game.state === "empty") {
    return;
  } else if (game.state === "waiting") {
    newGame.state = "empty";
    newGame.user0 = undefined;
  } else if (user.uid !== game.user0?.uid || user.uid !== game.user1?.uid) {
    return;
  } else if (game.state === "pending" || game.state === "ready") {
    newGame.state = "waiting";
    if (user.uid === game.user0?.uid) {
      newGame.user0 = game.user1;
      newGame.user1 = undefined;
    } else if (user.uid === game.user1?.uid) {
      newGame.user1 = undefined;
    }
  } else if (game.state === "playing" || game.state === "ended") {
    if (user.uid === game.pwhite.uid && newGame.pwhite) {
      newGame.pwhite.online = false;
    } else if (user.uid === game.pblack.uid && newGame.pblack) {
      newGame.pblack.online = false;
    }
  }
  set(gamesRef(game.id), newGame);
}

export async function toggleReady(game: Game) {
  const newGame: TransformGame = game;
  if (game.state === "pending") {
    newGame.state = "ready";
  } else if (game.state === "ready") {
    newGame.state = "pending";
  }
  set(gamesRef(game.id), newGame);
}
