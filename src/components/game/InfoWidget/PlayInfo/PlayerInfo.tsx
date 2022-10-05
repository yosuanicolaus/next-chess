import { useGame } from "../../../../lib/contexts/game";
import { GameComplete, Player } from "../../../../lib/types";

export function PlayerInfo({ player }: { player: Player }) {
  const { game } = useGame<GameComplete>();
  const playerTheme =
    player.uid === game.pwhite.uid
      ? "bg-gradient-to-br from-white dark:from-slate-600"
      : "bg-gradient-to-br from-slate-400 dark:from-slate-800";

  const OnlineStatus = () => (
    <>
      {player.online && <span>online</span>}
      {!player.online && <span className="opacity-50">offline</span>}
    </>
  );
  const TurnStatus = () => (
    <>
      {player.active && <span className="text-green-600">active</span>}
      {!player.active && <span className="opacity-50">waiting</span>}
    </>
  );

  return (
    <div className={playerTheme + " p-1"}>
      <div className="font-medium">{player.name}</div>
      <div className="text-sm italic">
        <OnlineStatus />, <TurnStatus />
      </div>
    </div>
  );
}
