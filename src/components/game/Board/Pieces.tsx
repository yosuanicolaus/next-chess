import Image from "next/image";
import { useBoard } from "../../../lib/contexts/board";
import { forAllRankFile, getFlippedRankFile } from "../../../lib/utils";

export function Pieces() {
  const { game } = useGame<GameComplete>();
  const { positions, size, flipped } = useBoard();
  const pieceSize = size / 8;
  const board = game.board;
  const pieces: JSX.Element[] = [];

  forAllRankFile((rank, file) => {
    const [r, f] = getFlippedRankFile(rank, file, flipped);
    const boardCode = board[r][f];
    if (boardCode === ".") return;
    const { x, y } = positions[rank][file];
    pieces.push(
      <Piece
        boardCode={boardCode}
        x={x}
        y={y}
        size={pieceSize}
        key={`${boardCode}-${rank}-${file}`}
      />
    );
  });

  return <>{pieces.map((piece) => piece)}</>;
}

type PieceProps = {
  boardCode: string;
  x: number;
  y: number;
  size: number;
};

function Piece({ boardCode, x, y, size }: PieceProps) {
  const svgCode = getPieceSvgCode(boardCode);
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
      }}
    >
      <Image src={`/pieces/${svgCode}.svg`} alt={svgCode} layout="fill" />
    </div>
  );
}

function getPieceSvgCode(code: string) {
  let svgCode;
  if (code.toUpperCase() === code) {
    svgCode = "w" + code;
  } else {
    svgCode = "b" + code.toUpperCase();
  }
  return svgCode;
}
