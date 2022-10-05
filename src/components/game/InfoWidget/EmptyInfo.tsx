import { useUser } from "../../../lib/contexts/auth";
import { useGame } from "../../../lib/contexts/game";
import { GameEmpty } from "../../../lib/types";
import { JoinButton } from "./common";

export function EmptyInfo() {
  const { game } = useGame<GameEmpty>();
  const user = useUser();

  return (
    <section className="hidden place-content-center gap-3 sm:grid">
      <div className="italic">Game is empty</div>
      <JoinButton gameID={game.id} user={user} />
    </section>
  );
}
