import { NextApiRequest, NextApiResponse } from "next";
import { getGameByID, leaveGame } from "../../../../lib/db/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const { user } = req.body;
  if (!user) return res.status(400).json("missing user in req.body");
  const game = await getGameByID(id);
  if (!game) return res.status(400).json("game not found");

  leaveGame(game.id, user);
  res.status(200).json("left game " + id);
}
