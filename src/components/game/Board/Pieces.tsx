import Image from "next/image";
import { GameComplete, RankFile } from "../../../lib/types";
import { useGame } from "../../../lib/contexts/game";
import { useBoard } from "../../../lib/contexts/board";
import { forAllRankFile } from "../../../lib/utils";

export default function Pieces() {
  const { game } = useGame<GameComplete>();
  const { positions, size, flipped } = useBoard();
  const pieceSize = size / 8;
  const board = game.board;
  const pieces: JSX.Element[] = [];

  forAllRankFile((rank, file) => {
    const r = flipped ? ((7 - rank) as RankFile) : rank;
    const f = flipped ? ((7 - file) as RankFile) : file;
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
    <Image
      src={`/pieces/${svgCode}.svg`}
      alt={svgCode}
      width={size}
      height={size}
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
    />
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
