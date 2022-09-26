import { Loading } from "./Loading";

export function LoadingFull({ text }: { text: string }) {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Loading text={text} />
    </div>
  );
}
