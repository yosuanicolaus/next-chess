import Link from "next/link";

export function GameNotFound() {
  return (
    <main className="flex flex-grow flex-col items-center justify-center gap-2 text-center">
      <h1 className="text-2xl">404 Game Not Found</h1>
      <div className="opacity-70">Please check your game ID</div>
      <Link href="/">
        <a className="grad-zinc hover-grad-zinc rounded border border-zinc-700 bg-gradient-to-t p-2 dark:border-zinc-100">
          Back to Home
        </a>
      </Link>
    </main>
  );
}
