import { set } from "firebase/database";
import { BotAlgorithm } from "logichess-bots";
import { gamesRef } from "../../firebase";
import { Game, GameComplete, User } from "../../types";
import { generateID } from "../../utils";
import { createNewBotUser, createPlayer } from "../user";
import { defaultBoard, defaultFen, defaultMoves } from "./_data";

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

export async function createNewGameWithBot(
  user: User,
  botAlgorithm: BotAlgorithm,
  timeControl = "10+5"
) {
  const botUser = createNewBotUser(botAlgorithm);
  const flipped = Math.random() < 0.5;
  const pwhiteUser = flipped ? user : botUser;
  const pblackUser = flipped ? botUser : user;

  const game: GameComplete = {
    id: generateID(10),
    chatID: generateID(12),
    timeControl,
    state: "playing",
    status: "normal",
    difference: 0,
    turn: "w",
    fen: defaultFen,
    board: defaultBoard,
    moves: defaultMoves,
    pgn: "",
    user0: user,
    user1: botUser,
    pwhite: createPlayer(pwhiteUser, timeControl, true),
    pblack: createPlayer(pblackUser, timeControl),
  };
  await set(gamesRef(game.id), game);
  return game;
}
