import { NextApiRequest, NextApiResponse } from "next";
import { createNewUser } from "../../../lib/db/user";
import { User } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { uid } = req.body;
  if (!uid) {
    throw new Error("missing uid in body");
  }

  const data = await createNewUser(uid);
  res.status(201).json(data);
}
