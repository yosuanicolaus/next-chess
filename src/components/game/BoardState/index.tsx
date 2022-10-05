import { useGame } from "../../../lib/contexts/game";
import { useSize } from "../../../lib/contexts/size";
import { Board } from "../Board";
import { BoardEmpty } from "./BoardEmpty";
import { BoardPending } from "./BoardPending";
import { BoardReady } from "./BoardReady";
import { BoardWaiting } from "./BoardWaiting";

export function BoardState() {
  const { game } = useGame();
  const { size } = useSize();

  if (game.state === "playing" || game.state === "ended") {
    return <Board />;
  }
  return (
    <div
      style={{ width: size, height: size }}
      className="flex border-4 border-slate-300 dark:border-slate-600"
    >
      {game.state === "empty" && <BoardEmpty />}
      {game.state === "waiting" && <BoardWaiting />}
      {game.state === "pending" && <BoardPending />}
      {game.state === "ready" && <BoardReady />}
    </div>
  );
}
