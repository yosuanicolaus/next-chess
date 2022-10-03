import {
  BoardStringArray,
  PanelNumberArray,
  Positions,
  RankFile,
} from "../../../lib/types";
import { defaultPanels, defaultPositions } from "./_default";

export const createBoardPanels = (board: BoardStringArray) => {
  const copyPanels = defaultPanels.map((arr) =>
    arr.slice()
  ) as PanelNumberArray;

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const r: RankFile = rank as RankFile;
      const f: RankFile = file as RankFile;
      if (board[r][r] === ".") continue;
      copyPanels[r][f] = 1;
    }
  }
  return copyPanels;
};

export function createPositions(size: number): Positions {
  const positions = defaultPositions.map((arr) => arr.slice()) as Positions;

  for (let rank = 0; rank < 8; rank++) {
    for (let file = 0; file < 8; file++) {
      const x = (file / 8) * size;
      const y = (rank / 8) * size;
      const r = rank as RankFile;
      const f = file as RankFile;
      positions[r][f] = { x, y };
    }
  }
  return positions;
}
