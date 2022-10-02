import { GamePending, GameReady, GameWaiting, User } from "../../../lib/types";

export function PreInfo({
  game,
}: {
  game: GameWaiting | GamePending | GameReady;
}) {
  const PreUserInfo = ({ user }: { user?: User }) => (
    <div className="grid p-2 text-center italic">
      <div className="grid h-full w-full place-content-center border-2 border-slate-200 shadow-lg dark:border-slate-500/75">
        {user ? (
          <>
            <div className="font-semibold">{user.name}</div>
            <div>- {user.elo} -</div>
          </>
        ) : (
          <div className="p-4">waiting for another player to join...</div>
        )}
      </div>
    </div>
  );

  return (
    <section className="grad-slate hidden bg-gradient-to-b sm:grid">
      {game.state === "waiting" ? (
        <PreUserInfo />
      ) : (
        <PreUserInfo user={game.user1} />
      )}
      <PreUserInfo user={game.user0} />
    </section>
  );
}
