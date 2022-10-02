import { GameComplete } from "../../../lib/types";

export function PlayInfo({ game }: { game: GameComplete }) {
  return (
    <section className="hidden flex-col sm:flex">
      <div>opponent</div>
      <div className="flex-grow">table here...</div>
      <div>me</div>
    </section>
  );
}
