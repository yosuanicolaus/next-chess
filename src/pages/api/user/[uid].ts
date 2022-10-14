import { NextApiRequest, NextApiResponse } from "next";
import { getUserByUID } from "../../../lib/db/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uid = req.query.uid as string;
  const data = await getUserByUID(uid);
  res.status(200).json(data);
}
