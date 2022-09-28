import Image from "next/image";

type LoadingProps = {
  text?: string;
};

export function LoadingFull({ text }: LoadingProps) {
  return (
    <div className="flex flex-grow items-center justify-center">
      <Loading text={text} />
    </div>
  );
}

export function Loading({ text }: LoadingProps) {
  return (
    <div className="text-md bg-grad-to-r flex max-w-max animate-pulse items-center justify-center rounded-full border border-slate-500/30 from-zinc-300 to-zinc-100 p-3 shadow-lg dark:border-slate-200/50 dark:bg-zinc-600">
      <Image
        src={"/assets/loading.svg"}
        className="animate-spin"
        alt="*"
        width={20}
        height={20}
      />
      {text && <div className="mx-2">{text}</div>}
    </div>
  );
}
