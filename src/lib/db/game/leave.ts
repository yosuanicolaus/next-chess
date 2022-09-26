import { get, update } from "firebase/database";
import { gamesRef } from "../../firebase";
import { Game, TransformGame } from "../../types";
import { User } from "../../types";

export async function leaveGame(gameID: string, user: User) {
  const gameSnapshot = await get(gamesRef(gameID));
  const game: Game = gameSnapshot.val();
  const newGame: TransformGame = Object.assign({}, game);

  if (game.state === "empty") {
    console.log("Denied: game is already empty");
    return;
  } else if (game.state === "waiting") {
    if (game.user0.uid === user.uid) {
      newGame.state = "empty";
      newGame.user0 = null;
    } else {
      console.log("Denied: user.uid !== game.user0.uid");
      return;
    }
  } else if (user.uid !== game.user0.uid && user.uid !== game.user1.uid) {
    console.log("Denied: user.uid !== game.user(0/1).uid");
    return;
  } else if (game.state === "pending" || game.state === "ready") {
    newGame.state = "waiting";
    if (user.uid === game.user0.uid) {
      newGame.user0 = game.user1;
      newGame.user1 = null;
    } else if (user.uid === game.user1.uid) {
      newGame.user1 = null;
    }
  } else if (game.state === "playing" || game.state === "ended") {
    if (user.uid === game.pwhite.uid && newGame.pwhite) {
      newGame.pwhite.online = false;
    } else if (user.uid === game.pblack.uid && newGame.pblack) {
      newGame.pblack.online = false;
    }
  }
  update(gamesRef(game.id), newGame);
}
