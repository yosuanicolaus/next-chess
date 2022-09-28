import { useUser } from "../../lib/contexts/auth";
import { useGame } from "../../lib/contexts/game";
import { joinGame } from "../../lib/db/game";
import {
  GameComplete,
  GameEmpty,
  GamePending,
  GameReady,
  GameWaiting,
  User,
} from "../../lib/types";

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

function EmptyInfo({ game }: { game: GameEmpty }) {
  const user = useUser();
  return (
    <section className="hidden place-content-center gap-3 sm:grid">
      <div className="italic">Game is empty</div>
      <button
        className="rounded-xl border border-slate-300 text-sm shadow-md transition hover:bg-slate-600 hover:text-white"
        onClick={() => joinGame(game.id, user)}
      >
        Join Game
      </button>
    </section>
  );
}

function PreInfo({ game }: { game: GameWaiting | GamePending | GameReady }) {
  const PreUserInfo = ({ user }: { user?: User }) => (
    <div className="grid p-2 text-center italic">
      <div className="grid h-full w-full place-content-center border-2 border-slate-200 shadow-lg dark:border-slate-500/75">
        {user ? (
          <>
            <div className="font-semibold">{user.name}</div>
            <div>- {user.elo} -</div>
          </>
        ) : (
          <div className="p-4">waiting for another player to join...</div>
        )}
      </div>
    </div>
  );

  return (
    <section className="grad-slate hidden bg-gradient-to-b sm:grid">
      {game.state === "waiting" ? (
        <PreUserInfo />
      ) : (
        <PreUserInfo user={game.user1} />
      )}
      <PreUserInfo user={game.user0} />
    </section>
  );
}

function PlayInfo({ game }: { game: GameComplete }) {
  return (
    <section className="hidden flex-col sm:flex">
      <div>opponent</div>
      <div className="flex-grow">
        table here... {JSON.stringify(game, null, 2)}
      </div>
      <div>me</div>
    </section>
  );
}
