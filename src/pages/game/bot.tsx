import { BotAlgorithm } from "logichess-bots";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../lib/contexts/auth";
import { createNewGameWithBot } from "../../lib/db/game";

const selectOption: BotAlgorithm[] = [
  "random",
  "alphabet",
  "longest",
  "shortest",
];

export default function GameBotPage() {
  const router = useRouter();
  const user = useUser();
  const [selected, setSelected] = useState<BotAlgorithm>("random");

  return (
    <main className="flex flex-grow flex-col items-center justify-center text-center">
      <form
        className="container flex max-w-sm flex-col gap-[2px]"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(selected);
          const game = await createNewGameWithBot(user, selected);
          router.push(`/game/${game.id}`);
        }}
      >
        {/* TODO: timeControl input */}
        <h1 className="mb-2 text-3xl">Play with Bot</h1>
        <label htmlFor="algorithm">Choose bot algorithm to play with</label>
        <br />
        <select
          className="rounded-lg border-2 border-slate-600 bg-white py-2 text-center dark:border-slate-300 dark:bg-slate-800"
          name="algorithm"
          value={selected}
          onChange={(e) => setSelected(e.target.value as BotAlgorithm)}
        >
          {selectOption.map((botAlgorithm) => (
            // TODO: on hover, show bot explanation
            <option value={botAlgorithm} key={botAlgorithm}>
              {botAlgorithm}
            </option>
          ))}
        </select>
        <br />
        <button className="mx-auto w-36 rounded-xl border-2 border-slate-600 bg-slate-100 py-1 hover:bg-slate-200 dark:border-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600">
          Play
        </button>
      </form>
    </main>
  );
}
