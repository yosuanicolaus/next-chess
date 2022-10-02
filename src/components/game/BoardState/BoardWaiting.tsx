import { useEffect, useState } from "react";

export function BoardWaiting() {
  const [gameLink, setGameLink] = useState("game link");

  useEffect(() => {
    setGameLink(window.location.href);
  }, []);

  return (
    <main className="flex flex-grow flex-col items-center justify-center gap-2 bg-gradient-to-t from-neutral-100 to-neutral-50/50 italic dark:from-zinc-700">
      <div>
        <div>waiting for another player to join...</div>
        <div>invite your friends!</div>
      </div>
      <div className="container flex max-w-sm gap-1 rounded bg-neutral-400/40 p-1">
        <input
          type="text"
          readOnly
          value={gameLink}
          className="w-100 flex-grow overflow-hidden rounded text-center text-xs dark:bg-neutral-700"
        />
        <button
          className="rounded border bg-slate-200 px-1 transition hover:bg-slate-100 dark:bg-slate-700 dark:hover:bg-slate-500"
          onClick={() => navigator.clipboard.writeText(gameLink)}
        >
          copy
        </button>
      </div>
    </main>
  );
}
