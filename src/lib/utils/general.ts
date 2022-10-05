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

// https://www.codegrepper.com/code-examples/javascript/copy+text+to+clipboard+with+javascript+mobile
// enables clipboard copy for mobile
export function copyToClipboard(text: string) {
  const elem = document.createElement("textarea");
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);
}
