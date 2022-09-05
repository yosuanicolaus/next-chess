import { ref, set } from "firebase/database";
import { useState } from "react";
import { db, dbRef } from "../utils/firebase";
import { useObjectVal } from "react-firebase-hooks/database";

export default function Test() {
  const [inputText, setInputText] = useState("");
  const [value, loading, error] = useObjectVal(dbRef);

  return (
    <>
      <main className="container p-4 min-h-screen mx-auto bg-slate-100 border-x-4">
        <h1 className="text-3xl">Test Page</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            set(ref(db, inputText), {});
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
