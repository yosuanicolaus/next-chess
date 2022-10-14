import { NextApiRequest, NextApiResponse } from "next";
import { getGameByID } from "../../../../lib/db/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const game = await getGameByID(id);
  if (!game) return res.status(400).json("game not found");

  res.status(200).json(game);
}
