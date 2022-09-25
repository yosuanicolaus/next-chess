import { Chat, Game, User } from "../types";

async function fetchApi<ResponseData = void>(
  path: string,
  bodyData?: Record<string, unknown>
) {
  try {
    let res: Response;
    if (bodyData) {
      res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });
    } else {
      res = await fetch(path);
    }
    const data: ResponseData = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export function apiTest() {
  type ApiTestData = { name: string };
  return fetchApi<ApiTestData>("/api/test", { id: "asdfID123" });
}

export function apiIndex() {
  type AllDbData = {
    games: Game[];
    users: User[];
    chats: Chat[];
  };
  return fetchApi<AllDbData>("/api/");
}

export function apiUserCreate(uid: string) {
  return fetchApi<User>("/api/user/create", { uid });
}

export function apiUserUid(uid: string) {
  return fetchApi<User>(`/api/user/${uid}`);
}

export function apiGameId(id: string) {
  return fetchApi<Game>(`/api/game/${id}`);
}

export function apiGameIdLeave(id: string, user: User) {
  return fetchApi(`/api/game/${id}/leave`, { user });
}
