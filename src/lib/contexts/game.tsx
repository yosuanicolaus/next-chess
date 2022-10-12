import { createContext, PropsWithChildren, useContext } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { LoadingFull } from "../../components/common/Loading";
import { GameNotFound } from "../../components/game/GameNotFound";
import { playBotMove, playChessMove } from "../chess";
import { startGame, toggleReady } from "../db/game";
import { getUserRole } from "../db/user";
import { gamesRef } from "../firebase";
import { useJoinLeaveGame } from "../hooks/join-leave-game";
import { Game, IdString, Move, Role } from "../types";
import { useUser } from "./auth";

interface GameContextInterface {
  game: Game;
  role: Role;
  myTurn: boolean;
  toggleReady: () => void;
  startGame: () => void;
  playMove: (move: Move) => void;
  playBot: () => void;
}

const GameContext = createContext({} as GameContextInterface);

export function useGame<GameState extends Game = Game>() {
  return useContext(GameContext) as GameContextInterface & { game: GameState };
}

export function GameProvider({ id, children }: PropsWithChildren<IdString>) {
  const [gameVal, loading, error] = useObjectVal<Game>(gamesRef(id));
  const game = gameVal as Game | null | undefined;
  const user = useUser();

  if (error) throw error;
  if (loading) return <LoadingFull text="fetching game data..." />;
  if (!game) return <GameNotFound />;
  const role = getUserRole(user, game);

  const contextValue: GameContextInterface = {
    game,
    role,
    myTurn:
      game.state === "playing" &&
      ((game.turn === "w" && role === "pwhite") ||
        (game.turn === "b" && role === "pblack")),
    toggleReady: () => toggleReady(game),
    startGame: () => startGame(game),
    playMove: (move: Move) => playChessMove(game, move),
    playBot: () => playBotMove(game, "random"),
  };

  return (
    <GameContext.Provider value={contextValue}>
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
