import { get, push } from "firebase/database";
import { chatsRef } from "../firebase";
import { Chat, Message, User } from "../types";

export function sendMessage(chatID: string, text: string, user: User) {
  const message: Message = {
    createdAt: new Date().toISOString(),
    text,
    name: user.name,
    uid: user.uid,
  };
  push(chatsRef(chatID), message);
}

export async function getChatByID(id: string) {
  const snapshot = await get(chatsRef(id));
  const chat: Chat | null = snapshot.val();
  return chat;
}
