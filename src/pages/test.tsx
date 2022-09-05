import { useState } from "react";
import { dbRef } from "../lib/firebase";
import { useObjectVal } from "react-firebase-hooks/database";
import { createNewUser } from "../lib/db/user";

export default function Test() {
  const [inputText, setInputText] = useState("");
  const [value, loading, error] = useObjectVal(dbRef);

  return (
    <>
      <main className="container p-4 min-h-screen mx-auto bg-slate-100 border-x-4">
        <h1 className="text-3xl">Test Page</h1>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const user = await createNewUser("testuid1234");
            console.log(user);
          }}
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button>test firebase</button>
        </form>

        {loading && <div>loading...</div>}
        {error && <div>{error.message}</div>}
        {value && (
          <>
            <hr />
            <textarea
              className="text-sm"
              name="json"
              id="json"
              cols={30}
              rows={5}
              readOnly
              value={JSON.stringify(value, null, 4)}
            ></textarea>
          </>
        )}
      </main>
    </>
  );
}
