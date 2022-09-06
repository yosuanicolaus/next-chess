import { set } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game } from "../../types";
import { defaultBoard, defaultFen, defaultMoves, defaultTurn } from "../data";
import { createPlayer } from "../user";

export function startGame(game: Game) {
  if (game.state !== "ready") return;
  const newGame: Game = {
    id: game.id,
    timeControl: game.timeControl,
    chatID: game.chatID,
    state: "playing",
    status: "normal",
    turn: defaultTurn,
    fen: defaultFen,
    board: defaultBoard,
    moves: defaultMoves,
    history: [],
    records: [],
    pgn: "",
    user0: game.user0,
    user1: game.user1,
    // TODO: Math.random() < 0.5 for pwhite/pblack
    pwhite: createPlayer(game.user0, game.timeControl),
    pblack: createPlayer(game.user1, game.timeControl),
  };
  set(gamesRef(game.id), newGame);
}
