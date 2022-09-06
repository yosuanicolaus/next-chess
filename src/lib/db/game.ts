import { get, set } from "firebase/database";
import { gamesRef } from "../firebase";
import { ChessData, Game, Move, TransformGame, User } from "../types";
import { generateID } from "../utils";
import { defaultBoard, defaultFen, defaultMoves, defaultTurn } from "./data";
import { createPlayer } from "./user";
import { createPgn, getLastRecordsDiff } from "./utils";

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

export function updateChessData(
  game: Game,
  chessData: ChessData,
  lastMove: Move
) {
  if (game.state !== "playing") return;
  const { status, difference, turn, fen, board, moves } = chessData;

  const {
    chatID,
    history,
    id,
    pblack,
    pwhite,
    user0,
    user1,
    pgn,
    records,
    timeControl,
    state,
  } = game;

  const newGame: Game = {
    state,
    status,
    turn,
    fen,
    board,
    moves,
    chatID,
    history,
    id,
    pblack,
    pwhite,
    pgn,
    records,
    timeControl,
    user0,
    user1,
  };

  newGame.history.push(lastMove.san);
  newGame.records.push(Date.now());
  newGame.pgn = createPgn(newGame.history);
  newGame.pwhite.active = turn === "w";
  newGame.pblack.active = turn === "b";

  const player = turn === "w" ? newGame.pblack : newGame.pwhite;
  const inc = Number(newGame.timeControl.split("+")[1]) * 1000;
  player.time += inc;
  const diff = getLastRecordsDiff(newGame.records);
  if (diff) {
    player.time -= diff;
  }

  if (status === "end") {
    newGame.state = "ended";
    newGame.pwhite.active = false;
    newGame.pblack.active = false;
  }

  set(gamesRef(game.id), newGame);
}
