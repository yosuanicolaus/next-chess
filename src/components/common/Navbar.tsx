import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../../lib/contexts/auth";

export default function Navbar() {
  const user = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex bg-zinc-700 text-neutral-100 p-5">
      {/* for large screen */}
      <div className="flex-grow sm:flex hidden items-center gap-5">
        <Link href="/">
          <a className="text-2xl hover:text-green-300 transition">LogiChess</a>
        </Link>
        <Link href="/game">
          <a className="hover:text-green-300 transition">Game</a>
        </Link>
        <Link href={`user/${user.name}`}>
          <a className="ml-auto hover:text-green-300 transition-colors">
            {user.name}
          </a>
        </Link>
      </div>

      {/* for small screen */}
      <div className="flex-grow sm:hidden flex flex-col">
        <div className="flex">
          <Link href="/">
            <a className="text-2xl hover:text-green-300 transition">
              LogiChess
            </a>
          </Link>
          <button
            className="ml-auto rounded-lg"
            onClick={() => setOpen((val) => !val)}
          >
            <Image
              src={"/assets/navbar.svg"}
              alt="menu"
              width={32}
              height={32}
              className="hover:bg-zinc-600"
            />
          </button>
        </div>
        {/* when button is click, show these items */}
        <div className={open ? "flex flex-col gap-1" : "hidden"}>
          <Link href={"/game"}>
            <a className="hover:text-green-300">Game</a>
          </Link>
          <Link href={`user/${user.name}`}>
            <a className="hover:text-green-300">{user.name}</a>
          </Link>
        </div>
      </div>
    </nav>
  );
}
