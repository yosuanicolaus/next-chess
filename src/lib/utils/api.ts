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
  type ResponseType = { name: string };
  return fetchApi<ResponseType>("/api/test", { id: "asdfID123" });
}
