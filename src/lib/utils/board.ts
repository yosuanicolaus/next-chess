import { RankFile } from "logichess/dist/types";
import { BoardStringArray, PanelNumberArray, Positions } from "../types";
import { forAllRankFile } from ".";
import { defaultPanels, defaultPositions } from "../default";

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

export function getFlippedRankFile(
  rank: RankFile,
  file: RankFile,
  flipped: boolean
) {
  const r = flipped ? ((7 - rank) as RankFile) : rank;
  const f = flipped ? ((7 - file) as RankFile) : file;
  const fRF: [RankFile, RankFile] = [r, f];
  return fRF;
}
