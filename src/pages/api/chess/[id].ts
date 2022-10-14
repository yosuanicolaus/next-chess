import { Chess } from "logichess";
import { NextApiRequest, NextApiResponse } from "next";
import { getGameByID } from "../../../lib/db/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;
  if (typeof id !== "string") {
    throw "id must be of type string";
  }

  const game = await getGameByID(id);
  if (!game) {
    throw "can't found game";
  } else if (game.state !== "playing" && game.state !== "ended") {
    throw "game.state must be playing/ended";
  }

  try {
    const chess = new Chess(game.fen);
    res.status(200).json(chess.data);
  } catch (error) {
    res.status(400).json(error);
  }
}
