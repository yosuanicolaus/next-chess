import { useGame } from "../../../lib/contexts/game";
import { EmptyInfo } from "./EmptyInfo";
import { PlayInfo } from "./PlayInfo";
import { PreInfo } from "./PreInfo";

export function InfoWidget() {
  const { game } = useGame();
  if (game.state === "empty") {
    return <EmptyInfo game={game} />;
  } else if (
    game.state === "waiting" ||
    game.state === "pending" ||
    game.state === "ready"
  ) {
    return <PreInfo game={game} />;
  } else if (game.state === "playing" || game.state === "ended") {
    return <PlayInfo game={game} />;
  } else {
    throw new Error("invalid game.state (InfoWidget)");
  }
}
