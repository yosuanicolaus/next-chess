import { set } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game, TransformGame } from "../../types";

export async function toggleReady(game: Game) {
  const newGame: TransformGame = game;
  if (game.state === "pending") {
    newGame.state = "ready";
  } else if (game.state === "ready") {
    newGame.state = "pending";
  }
  set(gamesRef(game.id), newGame);
}
