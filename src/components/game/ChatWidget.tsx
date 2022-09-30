import { useEffect, useRef, useState } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { useUser } from "../../lib/contexts/auth";
import { useGame } from "../../lib/contexts/game";
import { sendMessage } from "../../lib/db/chat";
import { chatsRef } from "../../lib/firebase";
import { Chat, Message } from "../../lib/types";
import { LoadingFull } from "../common/Loading";

export function ChatWidget() {
  const { game } = useGame();
  const { chatID } = game;
  const [chatVal, loading, error] = useObjectVal<Chat>(chatsRef(chatID));
  const chat = chatVal as Chat | null | undefined;
  const user = useUser();
  const [textInput, setTextInput] = useState("");
  const endMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  if (error) throw error;
  if (loading) return <LoadingFull text="fetching chat data..." />;

  return (
    <section className="hidden flex-col sm:order-first sm:flex">
      <h3 className="border-b-2 border-white bg-slate-200 p-2 text-xl dark:border-slate-400 dark:bg-zinc-600">
        Chat
      </h3>
      <div className="h-0 flex-grow overflow-y-auto">
        {!chat ? (
          <div>no messages</div>
        ) : (
          <>
            {Object.values(chat).map((message) => (
              <ChatMessage message={message} key={message.createdAt} />
            ))}
            <div ref={endMessageRef}></div>
          </>
        )}
      </div>
      <form
        className="flex gap-1 border-t-2 border-white bg-slate-300/50 py-2 px-1 dark:border-slate-400 dark:bg-slate-600"
        onSubmit={(e) => {
          e.preventDefault();
          if (textInput.trim() === "") return;
          sendMessage(chatID, textInput, user);
          setTextInput("");
        }}
      >
        <input
          type="text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="w-full rounded-lg dark:bg-zinc-700"
        />
        <button className="rounded-lg border border-white bg-zinc-200 p-1 transition hover:bg-zinc-100 dark:border-slate-400 dark:bg-zinc-700 dark:hover:bg-zinc-600">
          send
        </button>
      </form>
    </section>
  );
}

function ChatMessage({ message }: { message: Message }) {
  const { uid } = useUser();
  const isMe = message.uid === uid;
  const date = new Date(message.createdAt);
  const time = date.toLocaleTimeString();

  return (
    <div className="m-2 grid rounded-xl border border-neutral-500 bg-zinc-50 p-1 shadow dark:bg-slate-600/75">
      <div className="text-sm font-semibold">{isMe ? "You" : message.name}</div>
      <div>{message.text}</div>
      <div className="text-xs opacity-50">{time}</div>
    </div>
  );
}
