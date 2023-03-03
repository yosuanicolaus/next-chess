import { PairGrid } from "./PairGrid";

export function LeftWidget() {
  return (
    <div className="rounded-xl border-2 border-slate-800 bg-slate-200 shadow dark:border-slate-200 dark:bg-neutral-700">
      <h2 className="rounded-t-xl bg-slate-50 p-2 text-lg dark:bg-neutral-600">
        Quick Pairing
      </h2>
      <div className="p-4 pb-0">
        <PairGrid />
      </div>
      <div className="text-center">* this feature is under construction</div>
    </div>
  );
}
