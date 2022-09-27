import { useDarkTheme } from "../lib/contexts/dark-theme";

const Demo = () => {
  const { theme, flipTheme } = useDarkTheme();

  return (
    <div>
      <button onClick={flipTheme}>{theme}</button>
    </div>
  );
};

export default Demo;
