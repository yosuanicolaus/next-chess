import { useGame } from "../../../lib/contexts/game";
import { BoardEmpty } from "./BoardEmpty";
import { BoardWaiting } from "./BoardWaiting";

export function BoardState() {
  const { game } = useGame();

  switch (game.state) {
    case "empty":
      return <BoardEmpty />;
    case "waiting":
      return <BoardWaiting />;
    case "pending":
    case "ready":
    case "playing":
    case "ended":
    // TODO: create all other board states
    default:
      // TODO: when all state is done, throw error here
      // just for testing
      return <BoardEmpty />;
  }
}
