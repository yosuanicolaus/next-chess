import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { createNewUser, getUserByUID } from "../db/user";
import { auth } from "../firebase";
import { User } from "../types";
import LoadingFull from "../../components/common/LoadingFull";

const AuthContext = createContext<User>({} as User);

export const useUser = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const uid = authUser.uid;
        const userDB = await getUserByUID(uid);

        if (userDB) {
          setUser(userDB);
        } else {
          const newUser = await createNewUser(uid);
          setUser(newUser);
        }
      } else {
        signInAnonymously(auth);
      }
    });

    return unsubscribe;
  }, []);

  if (!user) return <LoadingFull text="signing in..." />;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}
