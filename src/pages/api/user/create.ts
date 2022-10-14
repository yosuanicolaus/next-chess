import { NextApiRequest, NextApiResponse } from "next";
import { createNewUser } from "../../../lib/db/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { uid } = req.body;
  if (!uid) {
    return res.status(400).json("missing uid in req.body");
  }

  const data = await createNewUser(uid);
  res.status(201).json(data);
}
