import { useUser } from "../../../../lib/contexts/auth";
import { GameComplete, Player } from "../../../../lib/types";
import { PlayerInfo } from "./PlayerInfo";
import { PlayHistory } from "./PlayHistory";

export type PlayerGameProps = {
  player: Player;
  game: GameComplete;
};

export function PlayInfo({ game }: { game: GameComplete }) {
  const { uid } = useUser();

  let playerBottom, playerTop;
  if (uid === game.pwhite.uid) {
    playerBottom = game.pwhite;
    playerTop = game.pblack;
  } else if (uid === game.pblack.uid) {
    playerBottom = game.pblack;
    playerTop = game.pwhite;
  } else {
    // TODO: implement viewer's perspective
    // idea: add flipped prop to game context
    throw new Error("Implement viewer's info perspective");
  }

  return (
    <section className="hidden sm:flex sm:flex-col">
      <PlayerInfo game={game} player={playerTop} />
      {/* TODO: create PlayerTimer */}
      <div>playertimer</div>
      {/* <div className="flex-grow">(playerhistory)</div> */}
      <PlayHistory />
      <div>playertimer</div>
      <PlayerInfo game={game} player={playerBottom} />
    </section>
  );
}
