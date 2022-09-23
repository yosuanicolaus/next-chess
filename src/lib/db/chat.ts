import { get, push, set } from "firebase/database";
import { chatsRef } from "../firebase";
import { Chat, Message, User } from "../types";

export async function createNewChat(chatID: string) {
  const chat: Chat = {
    id: chatID,
    createdAt: new Date().toString(),
    messages: [],
  };
  await set(chatsRef(chatID), chat);
  return chat;
}

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
