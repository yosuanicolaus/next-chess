import { Chess } from "logichess";
import { Bot, BotAlgorithm } from "logichess-bots";
import { updateChessData } from "./db/game";
import { Game, Move } from "./types";

export function playChessMove(game: Game, move: Move) {
  if (game.state !== "playing") throw "invalid game state";
  const chess = new Chess(move.fenResult);
  updateChessData(game, chess.data, move);
}

export function playBotMove(game: Game, algorithm: BotAlgorithm) {
  if (game.state !== "playing") return;
  const chess = new Chess(game.fen);
  const bot = new Bot(chess, algorithm);
  chess.play(bot.move);
  updateChessData(game, chess.data, bot.move);
}
