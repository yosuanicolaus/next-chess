import { useRouter } from "next/router";

export function RightWidget() {
  return (
    <div className="grid gap-4">
      <LinkButton href="game/join" text="Join Room" />
      <LinkButton href="game/create" text="Create Room" />
      <LinkButton href="game/bot" text="Play with Bot" />
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
      className="grad-zinc hover-grad-zinc rounded-xl border-2 border-neutral-700 bg-gradient-to-bl py-4 text-center transition hover:font-bold hover:text-emerald-800 dark:border-neutral-300 dark:hover:text-emerald-400"
      onClick={() => router.push(href)}
    >
      {text}
    </button>
  );
}
