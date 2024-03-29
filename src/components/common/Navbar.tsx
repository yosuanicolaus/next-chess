import Link from "next/link";
import { useState } from "react";
import { useUser } from "../../lib/contexts/auth";
import { DarkToggleButton } from "./DarkToggleButton";

export function Navbar() {
  const user = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex bg-gray-300 p-5 text-neutral-700 dark:bg-zinc-700 dark:text-neutral-100">
      {/* for large screen */}
      <div className="hidden flex-grow items-center gap-5 sm:flex">
        <NavLink href="/" text="LogiChess" className="text-2xl" />
        <DarkToggleButton />
        <NavLink href={`/user/${user.name}`} text={user.name} />
      </div>

      {/* for small screen */}
      <div className="flex flex-grow flex-col sm:hidden">
        <div className="flex gap-5">
          <NavLink href="/" text="LogiChess" className="text-2xl" />
          <DarkToggleButton />
          <button
            className="rounded-lg text-2xl hover:text-cyan-700 dark:hover:text-green-300"
            onClick={() => setOpen((val) => !val)}
          >
            &#9776;
          </button>
        </div>
        {/* when button is click, show these items */}
        <div className={open ? "flex flex-col gap-1" : "hidden"}>
          <NavLink href={`/user/${user.name}`} text={user.name} />
        </div>
      </div>
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  text: string;
  className?: string;
};

function NavLink({ href, text, className }: NavLinkProps) {
  return (
    <Link href={href}>
      <a
        className={
          "transition hover:text-cyan-700 dark:hover:text-green-300 " +
          className
        }
      >
        {text}
      </a>
    </Link>
  );
}
