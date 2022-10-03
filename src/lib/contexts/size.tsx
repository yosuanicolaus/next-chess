import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SizeContextInterface {
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
}

const SizeContext = createContext({} as SizeContextInterface);

export const useSize = () => useContext(SizeContext);

export function SizeProvider({ children }: PropsWithChildren) {
  const [size, setSize] = useState(450);

  return (
    <SizeContext.Provider value={{ size, setSize }}>
      <>{children}</>
    </SizeContext.Provider>
  );
}
