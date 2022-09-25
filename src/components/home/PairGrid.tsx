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
    <button className="grad-zinc hover-grad-zinc grid aspect-square place-content-center rounded-md border-2 border-slate-600 bg-gradient-to-br font-mono text-xl  transition hover:font-bold hover:text-teal-700 dark:border-slate-200/50 dark:hover:text-teal-300">
      <div>{timeControl}</div>
    </button>
  );
}
