import { useRouter } from "next/router";

export function RightWidget() {
  return (
    <div className="grid gap-4">
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
      className="rounded-xl border-2 border-neutral-700 bg-gradient-to-bl from-zinc-300 to-zinc-100 text-center transition hover:from-zinc-400 hover:to-zinc-200 hover:font-bold hover:text-emerald-800 dark:border-neutral-300 dark:from-zinc-800 dark:to-zinc-600 dark:hover:from-zinc-700 dark:hover:to-zinc-500 dark:hover:text-emerald-400"
      onClick={() => router.push(href)}
    >
      {text}
    </button>
  );
}
