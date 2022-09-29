import { useUser } from "../../../lib/contexts/auth";
import { useGame } from "../../../lib/contexts/game";
import { joinGame } from "../../../lib/db/game";

export function BoardEmpty() {
  const { game } = useGame();
  const user = useUser();

  return (
    <>
      <div className="italic">Board is empty</div>
      <button
        className="rounded-xl border border-slate-300 text-sm shadow-md transition hover:bg-slate-600 hover:text-white"
        onClick={() => joinGame(game.id, user)}
      >
        Join Game
      </button>
    </>
  );
}
