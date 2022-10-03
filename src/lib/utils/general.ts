import { RankFile } from "../types";

export function forAllRankFile(
  callback: (rank: RankFile, file: RankFile) => void
) {
  for (let r = 0; r < 8; r++) {
    for (let f = 0; f < 8; f++) {
      const rank = r as RankFile;
      const file = f as RankFile;
      callback(rank, file);
    }
  }
}
