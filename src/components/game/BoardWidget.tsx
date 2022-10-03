import { PropsWithChildren, useRef } from "react";
import { SizeProvider, useSize } from "../../lib/contexts/size";
import { useDimensions } from "../../lib/hooks/dimensions";
import { BoardState } from "./BoardState";
import { SizeContoller } from "./SizeContoller";

export function BoardWidget() {
  const boardContainer = useRef<HTMLDivElement>(null);
  const dim = useDimensions(boardContainer);

  return (
    <section className="row-span-1 flex flex-grow flex-col border-white dark:border-slate-400 sm:col-span-2 sm:row-span-2 sm:border-l-2 lg:col-span-3 lg:row-span-1 lg:border-r-2">
      <SizeProvider>
        <div
          ref={boardContainer}
          className="flex flex-grow items-center justify-center text-center"
        >
          <BoardSizeControl>
            <BoardState />
          </BoardSizeControl>
        </div>
        <SizeContoller dim={dim} />
      </SizeProvider>
    </section>
  );
}

function BoardSizeControl({ children }: PropsWithChildren) {
  const { size } = useSize();
  return (
    <div
      className="flex border-4 border-slate-300 dark:border-slate-600"
      style={{ width: size, height: size }}
    >
      <>{children}</>
    </div>
  );
}
