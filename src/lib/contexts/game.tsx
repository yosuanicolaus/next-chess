import { createContext, PropsWithChildren, useContext } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { LoadingFull } from "../../components/common/LoadingFull";
import { GameNotFound } from "../../components/game/GameNotFound";
import { getUserRole } from "../db/user";
import { gamesRef } from "../firebase";
import { useJoinLeaveGame } from "../hooks/join-leave-game";
import { Game, IdString, Role } from "../types";
import { useUser } from "./auth";

interface GameContextInterface {
  game: Game;
  role: Role;
}

const GameContext = createContext({} as GameContextInterface);

export const useGame = () => useContext(GameContext);

export function GameProvider({ id, children }: PropsWithChildren<IdString>) {
  const [gameVal, loading, error] = useObjectVal<Game>(gamesRef(id));
  const game = gameVal as Game | null | undefined;
  const user = useUser();

  if (error) throw error;
  if (loading) return <LoadingFull text="fetching game data..." />;
  if (!game) return <GameNotFound />;
  const role = getUserRole(user, game);

  return (
    <GameContext.Provider value={{ game, role }}>
      <JoinLeaveHandler>
        <>{children}</>
      </JoinLeaveHandler>
    </GameContext.Provider>
  );
}

function JoinLeaveHandler({ children }: PropsWithChildren) {
  const { game } = useGame();
  useJoinLeaveGame(game);
  return <>{children}</>;
}
