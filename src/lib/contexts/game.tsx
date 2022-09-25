import { createContext, PropsWithChildren, useContext, useEffect } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import LoadingFull from "../../components/common/LoadingFull";
import { GameNotFound } from "../../components/game/GameNotFound";
import { gamesRef } from "../firebase";
import { Game } from "../types";

interface GameContextInterface {
  game: Game;
}

const GameContext = createContext({} as GameContextInterface);

export const useGame = () => useContext(GameContext);

type PropsType = {
  id: string;
};

export function GameProvider({ id, children }: PropsWithChildren<PropsType>) {
  const [gameVal, isLoading, error] = useObjectVal<Game>(gamesRef(id));
  const game = gameVal as Game;

  useEffect(() => {
    console.log("entering game", id);

    return () => {
      console.log("leaving game", id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <LoadingFull text="fetching game data..." />;
  if (error) throw error;
  if (!game) return <GameNotFound />;

  return (
    <GameContext.Provider value={{ game: game }}>
      {children}
    </GameContext.Provider>
  );
}
