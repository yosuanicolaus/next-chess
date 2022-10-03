import { RankFile } from "./utils";

export interface Move {
  from: {
    rank: RankFile;
    file: RankFile;
  };
  to: {
    rank: RankFile;
    file: RankFile;
  };
  piece?: string;
  faction?: string;
  san: string;
  lan: string;
  uci: string;
  fenResult: string;
  capture?: true;
}
