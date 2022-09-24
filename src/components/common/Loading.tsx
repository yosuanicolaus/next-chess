import Image from "next/image";

export default function Loading({ text }: { text: string }) {
  return (
    <div className="text-md flex max-w-max animate-pulse items-center justify-center rounded-full bg-slate-700 p-3 text-neutral-200">
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
