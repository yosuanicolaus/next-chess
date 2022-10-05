import { BoardProvider } from "../../../lib/contexts/board";
import { useSize } from "../../../lib/contexts/size";
import { BackPanels } from "./BackPanels";
import { FrontPanels } from "./FrontPanels";
import { Pieces } from "./Pieces";

export function Board() {
  const { size } = useSize();
  return (
    <main
      className="relative bg-[url('/boards/blue.svg')] bg-no-repeat"
      style={{ width: size, height: size }}
    >
      <BoardProvider>
        <BackPanels />
        <Pieces />
        <FrontPanels />
      </BoardProvider>
    </main>
  );
}
