import { set } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game } from "../../types";
import { ChessData } from "../../types";
import { Move } from "../../types";
import { createPgn, getLastRecordsDiff } from "./_utils";

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
    difference,
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
