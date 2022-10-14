import { Chess } from "logichess";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const fen = req.body.fen as string;
  try {
    const chess = new Chess(fen);
    res.status(200).json(chess.data);
  } catch (error) {
    res.status(400).json(error);
  }
}
