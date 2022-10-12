import { Chess } from "logichess";
import { Bot, BotAlgorithm } from "logichess-bots";
import { updateChessData } from "./db/game";
import { GameComplete, Move } from "./types";

export function createChessData(fen: string) {
  const chess = new Chess(fen);
  return chess.data;
}

export function playChessMove(game: GameComplete, move: Move) {
  const chess = new Chess(move.fenResult);
  updateChessData(game, chess.data, move);
}

export function playBotMove(game: GameComplete, algorithm: BotAlgorithm) {
  const chess = new Chess(game.fen);
  const bot = new Bot(chess, algorithm);
  chess.play(bot.move);
  updateChessData(game, chess.data, bot.move);
}
