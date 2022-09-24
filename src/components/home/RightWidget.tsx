import { useRouter } from "next/router";

export function RightWidget() {
  return (
    <div className="grid">
      <LinkButton href="game/join" text="Join Room" />
      <LinkButton href="game/create" text="Create Room" />
      <LinkButton href="game/computer" text="Play with Computer" />
    </div>
  );
}

type LinkType = {
  href: string;
  text: string;
};

function LinkButton({ href, text }: LinkType) {
  const router = useRouter();

  return (
    <button
      className="m-4 rounded-xl border-2 border-neutral-700 bg-gradient-to-bl from-zinc-300 to-zinc-100 text-center"
      onClick={() => router.push(href)}
    >
      {text}
    </button>
  );
}
