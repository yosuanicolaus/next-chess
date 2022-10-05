import Image from "next/image";
import { useBoard } from "../../../lib/contexts/board";
import { forAllRankFile } from "../../../lib/utils";
import { getFlippedRankFile } from "./utils";

export function BackPanels() {
  const { positions, size, panels, flipped } = useBoard();
  const panelSize = size / 8;
  const backPanels: JSX.Element[] = [];

  forAllRankFile((rank, file) => {
    if (panels[rank][file] < 2) return;
    const [r, f] = getFlippedRankFile(rank, file, flipped);
    const { x, y } = positions[r][f];
    const code = panels[rank][file];
    backPanels.push(
      <BackPanel
        x={x}
        y={y}
        size={panelSize}
        code={code}
        key={`backpanel-${r}-${f}`}
      />
    );
  });

  return <>{backPanels.map((panel) => panel)}</>;
}

type BackPanelProps = {
  x: number;
  y: number;
  size: number;
  code: number;
};

const BackPanel = ({ x, y, size, code }: BackPanelProps) => (
  <div
    style={{ width: size, height: size, left: x, top: y }}
    className="absolute"
  >
    <Image src={getSvgFromCode(code)} alt={`${code}`} layout="fill" />
  </div>
);

function getSvgFromCode(code: number) {
  const defaultMove = "/icons/clover.svg";
  const defaultCapture = "/icons/level-four.svg";
  const defaultPiece = "/icons/clover-spiked.svg";

  // TODO: implement save to localStorage:
  // back panel icon preferences
  switch (code) {
    case 2:
      return localStorage.getItem("icon-move") || defaultMove;
    case 3:
      return localStorage.getItem("icon-capture") || defaultCapture;
    default:
      return localStorage.getItem("icon-piece") || defaultPiece;
  }
}
