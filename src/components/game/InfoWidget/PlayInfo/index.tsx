import { useUser } from "../../../../lib/contexts/auth";
import { useGame } from "../../../../lib/contexts/game";
import { GameComplete } from "../../../../lib/types";
import { PlayerInfo } from "./PlayerInfo";
import { PlayerTimer } from "./PlayerTimer";
import { PlayHistory } from "./PlayHistory";

export function PlayInfo() {
  const { game } = useGame<GameComplete>();
  const { uid } = useUser();

  let playerBottom, playerTop;
  if (uid === game.pblack.uid) {
    playerTop = game.pwhite;
    playerBottom = game.pblack;
  } else {
    playerTop = game.pblack;
    playerBottom = game.pwhite;
  }

  return (
    <section className="hidden sm:flex sm:flex-col">
      <PlayerInfo player={playerTop} />
      <PlayerTimer />
      <PlayHistory />
      <PlayerTimer />
      <PlayerInfo player={playerBottom} />
    </section>
  );
}
