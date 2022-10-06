import { PropsWithChildren } from "react";

export function ButtonWidget() {
  return (
    <section className="grid grid-cols-3 gap-1 bg-slate-300 p-1 dark:bg-slate-600 sm:hidden">
      <GameButton>Chat</GameButton>
      <GameButton>Game</GameButton>
      <GameButton>Info</GameButton>
    </section>
  );
}

function GameButton({ children }: PropsWithChildren) {
  return (
    <button className="grad-slate hover-grad-slate rounded-lg border border-neutral-500 bg-gradient-to-tr dark:border-slate-300/50">
      <>{children}</>
    </button>
  );
}
