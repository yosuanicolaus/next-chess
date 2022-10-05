import { useUser } from "../../../lib/contexts/auth";
import { useGame } from "../../../lib/contexts/game";
import { GamePending, GameReady, GameWaiting, User } from "../../../lib/types";
import { JoinButton } from "./common";

export function PreInfo() {
  const { game } = useGame<GameWaiting | GamePending | GameReady>();

  return (
    <section className="grad-slate hidden bg-gradient-to-b sm:grid">
      {game.state === "waiting" ? (
        <WaitingUserInfo />
      ) : (
        <PreUserInfo user={game.user1} />
      )}
      <PreUserInfo user={game.user0} />
    </section>
  );
}

const PreUserInfo = ({ user }: { user: User }) => (
  <div className="grid p-2 text-center italic">
    <div className="grid h-full w-full place-content-center border-2 border-slate-200 shadow-lg dark:border-slate-500/75">
      <>
        <div className="font-semibold">{user.name}</div>
        <div>- {user.elo} -</div>
      </>
    </div>
  </div>
);

function WaitingUserInfo() {
  const user = useUser();
  const { game } = useGame<GameWaiting>();
  const inGame = user.uid === game.user0.uid;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="px-5 text-center italic">
        waiting for another player to join...
      </div>
      {!inGame && <JoinButton gameID={game.id} user={user} />}
    </div>
  );
}
