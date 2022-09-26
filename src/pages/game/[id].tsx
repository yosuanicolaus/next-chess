import { GetServerSideProps } from "next";
import { GameProvider } from "../../lib/contexts/game";
import { IdString } from "../../lib/types";
import { TestGameProvider } from "../../test/TestGameProvider";

export default function GamePage({ id }: IdString) {
  return (
    <GameProvider id={id}>
      <main className="flex-grow">
        <TestGameProvider />
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
