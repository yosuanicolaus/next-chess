import { NextApiRequest, NextApiResponse } from "next";
import { getGameByID, leaveGame } from "../../../../lib/db/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    throw new Error("id must be of type string");
  }
  const { user } = req.body;
  if (!user) {
    throw new Error("user must be defined in req.body");
  }
  const game = await getGameByID(id);
  if (!game) throw new Error("game not found");

  leaveGame(game, user);
  res.status(200).json("leaving game " + id);
}
