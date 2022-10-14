import { NextApiRequest, NextApiResponse } from "next";
import { getChatByID } from "../../../../lib/db/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const chat = await getChatByID(id);
  if (!chat) return res.status(400).json("chat not found");

  res.status(200).json(chat);
}
