import { useEffect, useRef } from "react";
import { useGame } from "../../../../lib/contexts/game";
import { GameComplete } from "../../../../lib/types";

export function PlayHistory() {
  const { game } = useGame<GameComplete>();
  if (game.state !== "playing" && game.state !== "ended")
    throw "invalid state in PlayHistory";
  const historyArray = createHistoryArray(game.history);
  const endTableRef = useRef<HTMLTableRowElement>(null);

  useEffect(() => {
    endTableRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [historyArray]);

  return (
    <section className="flex h-0 flex-grow overflow-y-auto text-center">
      <table className="my-auto mx-1 flex-grow">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">white</th>
            <th scope="col">black</th>
          </tr>
        </thead>
        <tbody>
          {historyArray.length === 0 ? (
            <tr>
              <td>1</td>
              <td></td>
              <td></td>
            </tr>
          ) : (
            <>
              {historyArray.map(({ turn, whiteSan, blackSan = "" }) => (
                <tr
                  key={`history-${turn}`}
                  className="hover:bg-slate-300 dark:hover:bg-slate-500"
                >
                  <td>{turn}</td>
                  <td>{whiteSan}</td>
                  <td>{blackSan}</td>
                </tr>
              ))}
            </>
          )}
          <tr ref={endTableRef} />
        </tbody>
      </table>
    </section>
  );
}

type HistoryArray = {
  turn: number;
  whiteSan: string;
  blackSan?: string;
}[];

function createHistoryArray(history?: string[]) {
  if (!history) history = [];
  const historyArray: HistoryArray = [];
  let turn = 1;

  for (let i = 0; i < history.length; i++) {
    if (i % 2 === 0) {
      const whiteSan = history[i];
      if (!whiteSan) throw "history index problem";
      historyArray.push({ turn, whiteSan });
    } else {
      const historyArrRef = historyArray[turn - 1];
      if (!historyArrRef) throw "history index problem";
      historyArrRef.blackSan = history[i];
      turn++;
    }
  }
  return historyArray;
}
