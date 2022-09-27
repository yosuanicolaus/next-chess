import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoadingFull } from "../../components/common/LoadingFull";
import { Theme } from "../types";

type DarkThemeContextInterface = {
  theme: Theme;
  flipTheme: () => void;
};

const DarkThemeContext = createContext({} as DarkThemeContextInterface);

export const useDarkTheme = () => useContext(DarkThemeContext);

export function DarkThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState<Theme>("light");

  const flipTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const lsTheme = localStorage.getItem("theme") as Theme | null;
    if (!lsTheme) {
      const defaultColor =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      localStorage.setItem("theme", defaultColor);
      setTheme(defaultColor);
    } else {
      setTheme(lsTheme);
    }

    const setNewTheme = (event: MediaQueryListEvent): void => {
      const newTheme: Theme = event.matches ? "dark" : "light";
      setTheme(newTheme);
      localStorage.setItem("theme", newTheme);
    };

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", setNewTheme);

    return () => {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .removeEventListener("change", setNewTheme);
    };
  }, [setTheme]);

  if (!theme) return <LoadingFull text="getting user preferred theme..." />;

  return (
    <DarkThemeContext.Provider value={{ theme, flipTheme }}>
      <>{children}</>
    </DarkThemeContext.Provider>
  );
}
