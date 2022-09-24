import LoadingFull from "../components/common/LoadingFull";

export default function Home() {
  return (
    <main className="flex flex-grow flex-col">
      <div>hello world</div>

      <LoadingFull text="test full loading!" />
    </main>
  );
}
