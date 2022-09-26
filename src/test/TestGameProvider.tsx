import { useGame } from "../lib/contexts/game";

export function TestGameProvider() {
  const { game } = useGame();

  return <pre>{JSON.stringify(game, null, 4)}</pre>;
}
