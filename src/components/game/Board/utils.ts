import {
  BoardStringArray,
  PanelNumberArray,
  Positions,
} from "../../../lib/types";
import { forAllRankFile } from "../../../lib/utils";
import { defaultPanels, defaultPositions } from "./_default";

export const createBoardPanels = (board: BoardStringArray) => {
  const copyPanels = defaultPanels.map((arr) =>
    arr.slice()
  ) as PanelNumberArray;

  forAllRankFile((rank, file) => {
    if (board[rank][file] === ".") return;
    copyPanels[rank][file] = 1;
  });

  return copyPanels;
};

export function createPositions(size: number): Positions {
  const positions = defaultPositions.map((arr) => arr.slice()) as Positions;

  forAllRankFile((rank, file) => {
    const x = (file / 8) * size;
    const y = (rank / 8) * size;
    positions[rank][file] = { x, y };
  });

  return positions;
}
