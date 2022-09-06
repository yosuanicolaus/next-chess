import { set } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game, TransformGame } from "../../types";
import { User } from "../../types";

export async function leaveGame(game: Game, user: User) {
  const newGame: TransformGame = game;

  if (game.state === "empty") {
    return;
  } else if (game.state === "waiting") {
    newGame.state = "empty";
    newGame.user0 = undefined;
  } else if (user.uid !== game.user0?.uid || user.uid !== game.user1?.uid) {
    return;
  } else if (game.state === "pending" || game.state === "ready") {
    newGame.state = "waiting";
    if (user.uid === game.user0?.uid) {
      newGame.user0 = game.user1;
      newGame.user1 = undefined;
    } else if (user.uid === game.user1?.uid) {
      newGame.user1 = undefined;
    }
  } else if (game.state === "playing" || game.state === "ended") {
    if (user.uid === game.pwhite.uid && newGame.pwhite) {
      newGame.pwhite.online = false;
    } else if (user.uid === game.pblack.uid && newGame.pblack) {
      newGame.pblack.online = false;
    }
  }
  set(gamesRef(game.id), newGame);
}
