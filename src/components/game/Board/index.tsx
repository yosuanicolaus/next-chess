import { BoardProvider } from "../../../lib/contexts/board";
import { useSize } from "../../../lib/contexts/size";

export function Board() {
  const { size } = useSize();
  return (
    <main
      className={`relative bg-[url('/boards/blue.svg')] bg-no-repeat`}
      style={{ width: size, height: size }}
    >
      <BoardProvider>
        <div>test</div>
      </BoardProvider>
    </main>
  );
}
