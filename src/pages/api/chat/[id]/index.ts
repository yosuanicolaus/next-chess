import { NextApiRequest, NextApiResponse } from "next";
import { getChatByID } from "../../../../lib/db/chat";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  if (typeof id !== "string") {
    throw new Error("id must be of type string");
  }
  const chat = await getChatByID(id);
  if (!chat) throw new Error("chat not found");

  res.status(200).json(chat);
}
