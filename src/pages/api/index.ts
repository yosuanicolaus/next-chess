import { NextApiRequest, NextApiResponse } from "next";
import { get } from "firebase/database";
import { dbRef } from "../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const snapshot = await get(dbRef);
  const data = snapshot.val();
  res.status(200).json(data);
}
