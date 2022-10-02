import { useUser } from "../../../lib/contexts/auth";
import { joinGame } from "../../../lib/db/game";
import { GameEmpty } from "../../../lib/types";

export function EmptyInfo({ game }: { game: GameEmpty }) {
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
