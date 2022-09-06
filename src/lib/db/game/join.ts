import { get, set } from "firebase/database";
import { gamesRef } from "../../firebase";
import { TransformGame } from "../../types";
import { User } from "../../types";

export async function joinGame(gameID: string, user: User) {
  const gameSnapshot = await get(gamesRef(gameID));
  const game: TransformGame = gameSnapshot.val();

  if (game.state === "empty") {
    game.state = "waiting";
    game.user0 = user;
  } else if (game.state === "waiting") {
    game.state = "pending";
    game.user1 = user;
  } else if (game.state === "pending" || game.state === "ready") {
    return;
  } else if (game.state === "playing" || game.state === "ended") {
    if (user.uid === game.pwhite?.uid) {
      game.pwhite.online = true;
    } else if (user.uid === game.pblack?.uid) {
      game.pblack.online = true;
    }
  }
  set(gamesRef(gameID), game);
}
