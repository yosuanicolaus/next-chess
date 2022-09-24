import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function JoinGamePage() {
  const router = useRouter();
  const [gameId, setGameId] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (gameId === "") return;
    router.push(`/game/${gameId}`);
  };

  return (
    <main className="flex flex-grow flex-col items-center justify-center text-center">
      <form className="container max-w-sm" onSubmit={handleSubmit}>
        <h1 className="text-3xl">Join Room</h1>

        <input
          type="text"
          placeholder="insert game ID here..."
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          className="my-4 w-full rounded-xl border-2 border-slate-600 bg-slate-100 p-2 text-center dark:border-slate-300 dark:bg-slate-700"
        />

        <button className="w-36 rounded-xl border-2 border-slate-600 bg-slate-100 p-2 dark:border-slate-300 dark:bg-slate-700">
          Join Game
        </button>
      </form>
    </main>
  );
}
