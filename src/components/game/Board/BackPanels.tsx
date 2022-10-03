import Image from "next/image";
import { useBoard } from "../../../lib/contexts/board";
import { RankFile } from "../../../lib/types";
import { forAllRankFile } from "../../../lib/utils";

export default function BackPanels() {
  const { positions, size, panels, flipped } = useBoard();
  const panelSize = size / 8;
  const backPanels: JSX.Element[] = [];

  forAllRankFile((rank, file) => {
    if (panels[rank][file] < 2) return;
    const r = flipped ? ((7 - rank) as RankFile) : rank;
    const f = flipped ? ((7 - file) as RankFile) : file;
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
  <Image
    src={getSvgFromCode(code)}
    width={size}
    height={size}
    alt=""
    style={{
      position: "absolute",
      left: x,
      top: y,
    }}
    // TODO: try this later
    // className={`absolute left-[${x}px] top-[${y}px]`}
  />
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
