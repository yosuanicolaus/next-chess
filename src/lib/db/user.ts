import { get, set } from "firebase/database";
import { BotAlgorithm } from "logichess-bots";
import { usersRef } from "../firebase";
import { BotUser, Game, Player, Role } from "../types";
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

export function createNewBotUser(algorithm: BotAlgorithm) {
  const botNumber = ("00" + Math.floor(Math.random() * 1000)).slice(-3);
  const botName = `BOT-${algorithm.toUpperCase()}-${botNumber}`;
  const botUser: BotUser = {
    algorithm,
    elo: 800,
    name: botName,
    uid: botName,
    createdAt: new Date().toISOString(),
  };
  return botUser;
}

export function createPlayer(user: User, timeControl: string, active = false) {
  const tcMinutes = Number(timeControl.split("+")[0]);
  const player: Player = {
    uid: user.uid,
    name: user.name,
    elo: user.elo,
    active: active,
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

export function getUserRole(user: User, game: Game) {
  let role: Role = "spectator";

  if (game.state === "empty") return role;
  else if (game.state === "waiting") {
    if (game.user0.uid === user.uid) role = "user0";
  } else if (game.state === "pending" || game.state === "ready") {
    if (game.user0.uid === user.uid) role = "user0";
    else if (game.user1.uid === user.uid) role = "user1";
  } else {
    if (game.pwhite.uid === user.uid) role = "pwhite";
    else if (game.pblack.uid === user.uid) role = "pblack";
  }
  return role;
}
