import { useObjectVal } from "react-firebase-hooks/database";
import { useGame } from "../../lib/contexts/game";
import { chatsRef } from "../../lib/firebase";
import { Chat } from "../../lib/types";
import { LoadingFull } from "../common/LoadingFull";

export function ChatWidget() {
  const { game } = useGame();
  const [chatVal, loading, error] = useObjectVal<Chat>(chatsRef(game.chatID));
  const chat = chatVal as Chat | null | undefined;

  if (error) throw error;
  if (loading) return <LoadingFull text="fetching chat data..." />;

  return (
    <section className="hidden flex-col border border-cyan-400 sm:order-first sm:flex">
      <div>test</div>
      <div className="flex-grow">{JSON.stringify(chat, null, 2)}</div>
      <div>send message</div>
    </section>
  );
}
