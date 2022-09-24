export function PairGrid() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <PairCell timeControl="1+0" />
      <PairCell timeControl="3+2" />
      <PairCell timeControl="5+3" />
      <PairCell timeControl="10+5" />
      <PairCell timeControl="15+10" />
      <PairCell timeControl="30+15" />
    </div>
  );
}

function PairCell({ timeControl }: { timeControl: string }) {
  return (
    <button className="grid aspect-square place-content-center rounded-md border-2 border-slate-600 bg-gradient-to-br from-zinc-300 to-zinc-100 font-mono text-xl transition hover:from-zinc-400 hover:to-zinc-200 hover:font-bold hover:text-teal-700 dark:border-slate-200/50 dark:from-zinc-600 dark:to-zinc-800 dark:hover:from-zinc-400 dark:hover:to-zinc-600 dark:hover:text-teal-300">
      <div>{timeControl}</div>
    </button>
  );
}
