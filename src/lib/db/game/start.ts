import { update } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game } from "../../types";
import { defaultFen } from "../../default";
import { createPlayer } from "../user";

export async function startGame(game: Game) {
  if (game.state !== "ready") return;
  const flipped = Math.random() < 0.5;
  const pwhiteUser = flipped ? game.user1 : game.user0;
  const pblackUser = flipped ? game.user0 : game.user1;
  const { id, timeControl, chatID, user0, user1 } = game;
  const newGame: Game = {
    id,
    timeControl,
    chatID,
    state: "playing",
    fen: defaultFen,
    pgn: "",
    user0,
    user1,
    pwhite: createPlayer(pwhiteUser, timeControl, true),
    pblack: createPlayer(pblackUser, timeControl),
  };
  await update(gamesRef(id), newGame);
}
