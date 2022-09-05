import { set } from "firebase/database";
import { usersRef } from "../firebase";
import { User } from "../types";
import { generateName } from "../utils";

export async function createNewUser(uid: string) {
  const user: User = {
    uid,
    elo: 800,
    name: generateName(),
    createdAt: new Date().toISOString(),
  };
  await set(usersRef(uid), user);
  return user;
}
