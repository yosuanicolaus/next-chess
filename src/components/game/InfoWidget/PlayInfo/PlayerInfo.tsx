import { PlayerGameProps } from "./index";

export function PlayerInfo({ player, game }: PlayerGameProps) {
  const playerTheme =
    player.uid === game.pwhite.uid
      ? "bg-gradient-to-br from-white dark:from-slate-600"
      : "bg-gradient-to-br from-slate-400 dark:from-slate-800";
  const onlineStatus = player.active ? (
    <span>online</span>
  ) : (
    <span className="text-neutral-500">offline</span>
  );
  const turnStatus =
    player.uid === game.pwhite.uid && game.turn === "w" ? (
      <span className="text-green-600">active</span>
    ) : (
      <span className="text-neutral-300">waiting</span>
    );

  return (
    <div className={playerTheme + " p-1"}>
      <div className="font-medium">{player.name}</div>
      <div className="text-sm italic">
        {onlineStatus}, {turnStatus}
      </div>
    </div>
  );
}
