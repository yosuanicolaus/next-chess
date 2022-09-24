import { NextApiRequest, NextApiResponse } from "next";
import { get } from "firebase/database";
import { dbRef } from "../../lib/firebase";
import { Chat, Game, User } from "../../lib/types";

type Data = {
  games: Game[];
  users: User[];
  chats: Chat[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const snapshot = await get(dbRef);
  const data = snapshot.val();
  res.status(200).json(data);
}
