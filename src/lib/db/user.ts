import { get, set } from "firebase/database";
import { usersRef } from "../firebase";
import { Player } from "../types";
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

export function createPlayer(user: User, timeControl: string) {
  const tcMinutes = Number(timeControl.split("+")[0]);
  const player: Player = {
    uid: user.uid,
    name: user.name,
    elo: user.elo,
    active: true,
    online: true,
    time: tcMinutes * 60_000,
  };
  return player;
}

export async function getUserByUID(uid: string) {
  const snapshot = await get(usersRef(uid));
  const user: User | null = snapshot.val();
  return user;
}
