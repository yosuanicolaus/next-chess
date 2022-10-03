import { useUser } from "../../../lib/contexts/auth";
import { GameComplete, Player } from "../../../lib/types";

type PlayerGame = {
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
      <div>playertimer</div>
      <div className="flex-grow">(playerhistory)</div>
      <div>playertimer</div>
      <PlayerInfo game={game} player={playerBottom} />
    </section>
  );
}

// function PlayerHistory({ player, game }: PlayerGame) {}

function PlayerInfo({ player, game }: PlayerGame) {
  const playerTheme =
    player.uid === game.pwhite.uid
      ? "text-black bg-white dark:bg-zinc-300"
      : "text-white bg-zinc-500 dark:bg-zinc-800";
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

// function PlayerTimer({ player, game }: PlayerGame) {}
