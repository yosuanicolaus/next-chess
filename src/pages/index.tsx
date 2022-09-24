import { LeftWidget } from "../components/home/LeftWidget";

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <div className="container grid grid-cols-2 gap-8">
        <LeftWidget />
        <div>hello word2</div>
      </div>
    </main>
  );
}
