import { PairGrid } from "./PairGrid";

export function LeftWidget() {
  return (
    <div className="border-2 border-slate-400 bg-slate-200 shadow dark:bg-neutral-700">
      <h2 className="bg-slate-50 p-2 text-lg dark:bg-neutral-600">
        Quick Pairing
      </h2>
      <div className="p-4">
        <PairGrid />
      </div>
    </div>
  );
}
