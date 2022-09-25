import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { createNewGame } from "../../lib/db/game";

const minutesPerSide = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 30,
  40, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180,
];
const incrementsInSeconds = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25,
  30, 40, 45, 60, 90, 120, 150, 180,
];
const DEFAULT_MINUTE = 10;
const DEFAULT_INCREMENT = 5;

export default function CreateGamePage() {
  const router = useRouter();
  const [customMinutes, setCustomMinutes] = useState(DEFAULT_MINUTE);
  const [customIncrement, setCustomIncrement] = useState(DEFAULT_INCREMENT);
  const timeControl = `${customMinutes}+${customIncrement}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const game = await createNewGame(timeControl);
    router.push(`/game/${game.id}`);
  };

  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <h1 className="mb-6 text-3xl">Create Room</h1>

      <form className="container grid max-w-sm gap-4" onSubmit={handleSubmit}>
        <div className="grad-slate rounded-xl border-2 border-gray-500 bg-gradient-to-br p-4 shadow dark:border-gray-300">
          <label htmlFor="inputMinutes">
            Minutes per side: <strong>{customMinutes}</strong>
          </label>
          <br />
          <input
            className="w-full"
            type="range"
            id="inputMinutes"
            min={0}
            max={minutesPerSide.length - 1}
            defaultValue={minutesPerSide.indexOf(DEFAULT_MINUTE)}
            onChange={(e) =>
              setCustomMinutes(minutesPerSide[Number(e.target.value)] as number)
            }
          />
          <hr className="border-1 my-2 border-gray-400" />
          <label htmlFor="inputIncrement">
            Increment in seconds: <strong>{customIncrement}</strong>
          </label>
          <br />
          <input
            className="w-full"
            type="range"
            id="inputIncrement"
            min={0}
            max={incrementsInSeconds.length - 1}
            defaultValue={incrementsInSeconds.indexOf(DEFAULT_INCREMENT)}
            onChange={(e) =>
              setCustomIncrement(
                incrementsInSeconds[Number(e.target.value)] as number
              )
            }
          />
        </div>
        <button className="grad-slate hover-grad-slate rounded-xl border-2 border-gray-500 bg-gradient-to-t p-1 text-center transition  dark:border-gray-300 ">
          <div className="text-lg">
            <strong>{timeControl}</strong>
          </div>
          <div>Create Game</div>
        </button>
      </form>
    </main>
  );
}
