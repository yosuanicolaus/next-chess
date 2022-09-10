import Loading from "./Loading";

export default function LoadingFull({ text }: { text: string }) {
  return (
    <div className="flex-grow flex justify-center items-center">
      <Loading text={text} />
    </div>
  );
}
