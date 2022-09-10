import LoadingFull from "../components/common/LoadingFull";

export default function Home() {
  return (
    <main className="flex flex-col flex-grow">
      <div>hello world</div>

      <LoadingFull text="test full loading!" />
    </main>
  );
}
