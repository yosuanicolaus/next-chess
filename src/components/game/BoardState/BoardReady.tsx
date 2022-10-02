import { useState } from "react";
import { useUser } from "../../../lib/contexts/auth";
import { useGame } from "../../../lib/contexts/game";
import { Loading } from "../../common/Loading";

export function BoardReady() {
  const { uid } = useUser();
  const { game } = useGame();
  if (game.state !== "ready")
    throw "game state should be ready inside BoardReady";
  const owner = uid === game.user0.uid;
  const challenger = uid === game.user1.uid;

  return (
    <main className="flex flex-grow flex-col">
      <div className="grid flex-grow grid-cols-2">
        <div className="grad-slate grid place-content-center border-r-2 border-white/50 bg-gradient-to-t dark:border-slate-500/50">
          <div className="text-sm italic">owner {owner && "(you)"}</div>
          <div>{game.user0.name}</div>
          <div className="text-sm">- {game.user0.elo} -</div>
        </div>
        <div className="grad-slate grid place-content-center border-l-2 border-white/50 bg-opacity-50 bg-gradient-to-b dark:border-slate-500/50">
          <div className="text-sm italic">
            challenger {challenger && "(you)"}
          </div>
          <div>{game.user1.name}</div>
          <div className="text-sm">- {game.user1.elo} -</div>
        </div>
      </div>
      {owner && <ControlOwner />}
      {challenger && <ControlChallenger />}
    </main>
  );
}

function ControlOwner() {
  const { startGame } = useGame();
  const [loading, setLoading] = useState(false);

  return (
    <div className="grad-slate border-white-50 flex flex-col border-t-2 bg-gradient-to-r px-4 pt-2 pb-1 dark:border-slate-500/50">
      <button
        disabled={loading}
        className="flex-grow rounded-xl border-2 border-white transition hover:border-green-400 hover:bg-slate-600 hover:text-white dark:hover:bg-slate-200 dark:hover:text-black"
        onClick={() => {
          setLoading(true);
          startGame();
        }}
      >
        Start game
      </button>
      <div className="text-sm opacity-75">
        Challenger is ready. You can start the game.
      </div>
    </div>
  );
}

function ControlChallenger() {
  const { toggleReady } = useGame();
  const [loading, setLoading] = useState(false);

  return (
    <div className="grad-slate border-white-50 flex flex-col border-t-2 bg-gradient-to-r px-4 pt-2 pb-1 dark:border-slate-500/50">
      <button
        disabled={loading}
        className="flex-grow rounded-xl border-2 border-white bg-white opacity-70 transition hover:bg-neutral-200 hover:opacity-100 dark:bg-slate-700 dark:hover:bg-slate-500"
        onClick={() => {
          setLoading(true);
          toggleReady();
        }}
      >
        Ready {loading && <Loading />}
      </button>
      <div className="text-sm opacity-75">
        Waiting for owner to start the game
      </div>
    </div>
  );
}
