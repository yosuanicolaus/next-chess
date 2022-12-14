import Image from "next/image";

export function Background() {
  return (
    <div className="fixed top-0 left-0 -z-10 grid min-h-screen w-screen place-content-center bg-gradient-to-t from-slate-200 to-slate-50 dark:from-neutral-600 dark:to-neutral-800">
      <div className="block dark:hidden">
        <Image
          src={"/assets/nc-bg-light.svg"}
          alt={"logichess"}
          width={400}
          height={300}
          className="opacity-20"
        />
      </div>
      <div className="hidden dark:block">
        <Image
          src={"/assets/nc-bg-dark.svg"}
          alt={"logichess"}
          width={400}
          height={300}
          className="opacity-20"
        />
      </div>
    </div>
  );
}
