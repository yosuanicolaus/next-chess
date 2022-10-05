import { joinGame } from "../../../lib/db/game";
import { User } from "../../../lib/types";

type JoinButtonProps = {
  gameID: string;
  user: User;
};

export const JoinButton = ({ gameID, user }: JoinButtonProps) => (
  <button
    className="rounded-xl border border-slate-300 p-2 text-sm shadow-md transition hover:bg-slate-600 hover:text-white"
    onClick={() => joinGame(gameID, user)}
  >
    Join Game
  </button>
);
