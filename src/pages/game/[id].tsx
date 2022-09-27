import { GetServerSideProps } from "next";
import { BoardWidget } from "../../components/game/BoardWidget";
import { ButtonWidget } from "../../components/game/ButtonWidget";
import { ChatWidget } from "../../components/game/ChatWidget";
import { InfoWidget } from "../../components/game/InfoWidget";
import { GameProvider } from "../../lib/contexts/game";
import { IdString } from "../../lib/types";

export default function GamePage({ id }: IdString) {
  return (
    <GameProvider id={id}>
      <main className="flex flex-grow flex-col sm:grid sm:grid-cols-3 lg:grid-cols-5">
        <BoardWidget />
        <ChatWidget />
        <InfoWidget />
        <ButtonWidget />
      </main>
    </GameProvider>
  );
}

export const getServerSideProps: GetServerSideProps<IdString> = async (
  context
) => {
  const { id } = context.query;
  if (typeof id !== "string") throw new Error("query's [id] is not string");
  return { props: { id } };
};
