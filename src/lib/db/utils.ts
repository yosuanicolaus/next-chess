export function createPgn(history: string[]) {
  let turn = 1;
  let half = true;
  const pgn: string[] = [];

  history.forEach((san) => {
    if (half) {
      pgn.push(`${turn}.`, san);
    } else {
      pgn.push(san);
      turn++;
    }
    half = !half;
  });

  return pgn.join(" ");
}

export function getLastRecordsDiff(records: number[]) {
  const copyRecord = [...records];
  const d1 = copyRecord.pop();
  const d2 = copyRecord.pop();
  if (!d1 || !d2) return;
  const diff = d1 - d2;
  return diff;
}
