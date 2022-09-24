import { LeftWidget } from "../components/home/LeftWidget";
import { RightWidget } from "../components/home/RightWidget";

export default function Home() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center">
      <div className="container grid grid-cols-2 gap-8">
        <LeftWidget />
        <RightWidget />
      </div>
    </main>
  );
}
