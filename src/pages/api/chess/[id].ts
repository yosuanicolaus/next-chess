import { Chess } from "logichess";
import { NextApiRequest, NextApiResponse } from "next";
import { getGameByID } from "../../../lib/db/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;

  const game = await getGameByID(id);
  if (!game) {
    return res.status(404).json("can't found game");
  } else if (game.state !== "playing" && game.state !== "ended") {
    return res.status(400).json("game hasn't started yet");
  }

  try {
    const chess = new Chess(game.fen);
    res.status(200).json(chess.data);
  } catch (error) {
    res.status(400).json(error);
  }
}
