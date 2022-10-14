import { set } from "firebase/database";
import { BotAlgorithm } from "logichess-bots";
import { gamesRef } from "../../firebase";
import { Game, GameComplete, User } from "../../types";
import { generateID } from "../../utils";
import { createNewBotUser, createPlayer } from "../user";
import { defaultFen } from "./_data";

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
  const botFaction = flipped ? "b" : "w";

  const game: GameComplete = {
    id: generateID(10),
    chatID: generateID(12),
    timeControl,
    state: "playing",
    fen: defaultFen,
    pgn: "",
    user0: user,
    user1: botUser,
    pwhite: createPlayer(
      pwhiteUser,
      timeControl,
      true,
      botFaction === "w",
      botAlgorithm
    ),
    pblack: createPlayer(
      pblackUser,
      timeControl,
      false,
      botFaction === "b",
      botAlgorithm
    ),
  };
  await set(gamesRef(game.id), game);
  return game;
}
