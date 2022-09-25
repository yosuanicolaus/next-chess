import { GetServerSideProps } from "next";
import { useObjectVal } from "react-firebase-hooks/database";
import LoadingFull from "../../components/common/LoadingFull";
import { GameProvider } from "../../lib/contexts/game";
import { gamesRef } from "../../lib/firebase";
import { Game } from "../../lib/types";

type PropsType = {
  id: string;
};

export default function GamePage({ id }: PropsType) {
  const [game, isLoading, error] = useObjectVal<Game>(gamesRef(id));

  if (isLoading) return <LoadingFull text="loading game data..." />;
  if (error) return console.error(error);
  return (
    <GameProvider id={id}>
      <main className="flex-grow">
        <pre>{JSON.stringify(game, null, 4)}</pre>
        <hr />
      </main>
    </GameProvider>
  );
}

export const getServerSideProps: GetServerSideProps<PropsType> = async (
  context
) => {
  const { id } = context.query;
  if (typeof id !== "string") throw new Error("query's [id] is not string");
  return { props: { id } };
};
