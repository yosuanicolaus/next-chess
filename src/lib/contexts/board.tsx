import { Chess } from "logichess";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { defaultPanels } from "../default";
import {
  ChessData,
  GameComplete,
  Move,
  PanelNumberArray,
  Positions,
  RankFile,
  RankFileObject,
} from "../types";
import { getTurn, createBoardPanels, createPositions } from "../utils";
import { useUser } from "./auth";
import { useGame } from "./game";
import { useSize } from "./size";

interface BoardContextInterface {
  data: ChessData;
  positions: Positions;
  flipped: boolean;
  size: number;
  panels: PanelNumberArray;
  activeMoves: Move[];
  activeRF: RankFileObject | null;
  removeFocus: () => void;
  setMovesFromRankFile: (rank: RankFile, file: RankFile) => void;
  playRankFile: (toRank: RankFile, toFile: RankFile) => void;
}

const BoardContext = createContext({} as BoardContextInterface);

export const useBoard = () => useContext(BoardContext);

export function BoardProvider({ children }: PropsWithChildren) {
  const { size } = useSize();
  const { uid } = useUser();
  const { game, playMove } = useGame<GameComplete>();
  const { data } = useMemo(() => new Chess(game.fen), [game.fen]);
  const positions = createPositions(size);

  const [flipped, setFlipped] = useState(uid === game.pblack.uid);
  const [panels, setPanels] = useState(defaultPanels);
  const [activeMoves, setActiveMoves] = useState<Move[]>([]);
  const [activeRF, setActiveRF] = useState<RankFileObject | null>(null);
  const myTurn =
    (data.turn === "w" && game.pwhite.uid === uid) ||
    (data.turn === "b" && game.pblack.uid === uid);

  const setMovesFromRankFile = (rank: RankFile, file: RankFile) => {
    if (activeRF && activeRF.rank === rank && activeRF.file === file) {
      return removeFocus();
    }

    setActiveRF({ rank, file });
    if (myTurn) {
      const moves = data.moves.filter(
        (move) => move.from.rank === rank && move.from.file === file
      );
      setActiveMoves(moves);
      configurePanels(moves, rank, file);
    }
  };

  const configurePanels = (moves: Move[], rank: RankFile, file: RankFile) => {
    const copyPanels = createBoardPanels(data.board);

    moves.forEach((move) => {
      const { rank, file } = move.to;
      if (move.capture) {
        copyPanels[rank][file] = 3;
      } else {
        copyPanels[rank][file] = 2;
      }
    });

    if (rank >= 0) copyPanels[rank][file] = 11;
    setPanels(copyPanels);
  };

  const playRankFile = (toRank: RankFile, toFile: RankFile) => {
    let move: Move;
    console.log("playing", toRank, toFile);
    const moves = activeMoves.filter(
      (activeMove) =>
        activeMove.to.rank === toRank && activeMove.to.file === toFile
    );
    if (moves.length === 4) {
      // TODO: select 1 out of 4 possible promotion move using modal
      console.log("promotion move");
      move = moves[0] as Move;
    } else if (moves.length === 1) {
      move = moves[0] as Move;
    } else throw new Error("move length is not 1/4?!");
    if (!move) throw new Error("can't find move!");
    playMove(move);
  };

  const removeFocus = () => {
    setActiveRF(null);
    setActiveMoves([]);
    setPanels(createBoardPanels(data.board));
  };

  useEffect(() => {
    setPanels(createBoardPanels(data.board));
  }, [data.board]);

  useEffect(() => {
    // flip board by pressing "F" key
    document.onkeydown = (e) => {
      if (e.key.toLowerCase() === "f") {
        setFlipped((v) => !v);
      }
    };
  }, []);

  return (
    <BoardContext.Provider
      value={{
        data: data,
        positions,
        flipped,
        size,
        panels,
        activeMoves,
        activeRF,
        playRankFile,
        removeFocus,
        setMovesFromRankFile,
      }}
    >
      <BotHandler>
        <>{children}</>
      </BotHandler>
    </BoardContext.Provider>
  );
}

function BotHandler({ children }: PropsWithChildren) {
  const { game, playBot } = useGame<GameComplete>();

  useEffect(() => {
    const currentPlayer = getTurn(game.fen) === "w" ? game.pwhite : game.pblack;
    if (currentPlayer.algorithm) {
      // current player is a bot
      playBot(currentPlayer.algorithm);
    }
  }, [game.fen, game.pwhite, game.pblack, playBot]);

  return <>{children}</>;
}
