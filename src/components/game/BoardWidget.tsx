import { PropsWithChildren } from "react";
import { BoardState } from "./BoardState";

export function BoardWidget() {
  return (
    <section className="row-span-1 flex flex-grow flex-col border-white dark:border-slate-400 sm:col-span-2 sm:row-span-2 sm:border-l-2 lg:col-span-3 lg:row-span-1 lg:border-r-2">
      <div className="flex flex-grow items-center justify-center text-center">
        <BoardSquare>
          <BoardState />
        </BoardSquare>
      </div>
      <SizeContoller />
    </section>
  );
}

function BoardSquare({ children }: PropsWithChildren) {
  // TODO: const {size} = useSize()
  // set size as div's w & h
  return (
    <div>
      <>{children}</>
    </div>
  );
}

function SizeContoller() {
  return <div>Resize Board!</div>;
}
