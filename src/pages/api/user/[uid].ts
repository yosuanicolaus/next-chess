import { NextApiRequest, NextApiResponse } from "next";
import { getUserByUID } from "../../../lib/db/user";
import { User } from "../../../lib/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  const { uid } = req.query;
  if (typeof uid !== "string") {
    throw new Error("uid must be of type string");
  }

  const data = await getUserByUID(uid);
  res.status(200).json(data);
}
