import { NextApiRequest, NextApiResponse } from "next";
import { getGameByID } from "../../../../lib/db/game";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    throw new Error("id must be of type string");
  }
  const game = await getGameByID(id);
  if (!game) throw new Error("game not found");

  res.status(200).json(game);
}
