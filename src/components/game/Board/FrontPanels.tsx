import { useBoard } from "../../../lib/contexts/board";
import { RankFile } from "../../../lib/types";
import { forAllRankFile } from "../../../lib/utils";
import { getFlippedRankFile } from "./utils";

export function FrontPanels() {
  const { panels, positions, size, flipped } = useBoard();
  const panelSize = size / 8;
  const frontPanels: JSX.Element[] = [];

  forAllRankFile((rank, file) => {
    let panel;
    const [r, f] = getFlippedRankFile(rank, file, flipped);
    const { x, y } = positions[r][f];
    const key = `front-panel-${r}-${f}`;
    switch (panels[rank][file]) {
      case 0:
        panel = <NormalPanel x={x} y={y} size={panelSize} key={key} />;
        break;
      case 1:
        panel = (
          <PiecePanel
            x={x}
            y={y}
            size={panelSize}
            rank={rank}
            file={file}
            key={key}
          />
        );
        break;
      case 2:
      case 3:
        panel = (
          <MovePanel
            x={x}
            y={y}
            size={panelSize}
            rank={rank}
            file={file}
            key={key}
          />
        );
        break;
      default:
        panel = (
          <PiecePanel
            x={x}
            y={y}
            size={panelSize}
            rank={rank}
            file={file}
            key={key}
          />
        );
    }
    frontPanels.push(panel);
  });

  return <>{frontPanels.map((panel) => panel)}</>;
}

interface NormalPanelInterface {
  x: number;
  y: number;
  size: number;
}

function NormalPanel({ x, y, size }: NormalPanelInterface) {
  const { removeFocus } = useBoard();

  return <Panel x={x} y={y} size={size} onClick={removeFocus} />;
}

interface RFPanelInterface extends NormalPanelInterface {
  rank: RankFile;
  file: RankFile;
}

function PiecePanel({ x, y, size, rank, file }: RFPanelInterface) {
  const { setMovesFromRankFile } = useBoard();

  const handleClick = () => {
    setMovesFromRankFile(rank, file);
  };

  return <Panel x={x} y={y} size={size} onClick={handleClick} />;
}

function MovePanel({ x, y, size, rank, file }: RFPanelInterface) {
  const { playRankFile } = useBoard();

  const handleClick = () => {
    playRankFile(rank, file);
  };

  return <Panel x={x} y={y} size={size} onClick={handleClick} />;
}

interface ClickPanelInterface extends NormalPanelInterface {
  onClick: () => void;
}

function Panel({ x, y, size, onClick }: ClickPanelInterface) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
      }}
      onClick={onClick}
    />
  );
}
