import Image from "next/image";

export default function Loading({ text }: { text: string }) {
  return (
    <div className="flex bg-slate-700 text-neutral-200 text-md justify-center items-center max-w-max rounded-full p-3 animate-pulse">
      <Image
        src={"/assets/loading.svg"}
        className="animate-spin"
        alt="*"
        width={20}
        height={20}
      />
      <div className="mx-2">{text}</div>
    </div>
  );
}
