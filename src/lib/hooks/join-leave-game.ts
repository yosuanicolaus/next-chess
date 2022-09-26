import { Router } from "next/router";
import { useEffect } from "react";
import { useUser } from "../contexts/auth";
import { joinGame, leaveGame } from "../db/game";
import { Game } from "../types";

export function useJoinLeaveGame(game: Game) {
  const id = game.id;
  const user = useUser();

  useEffect(() => {
    const handleLeave = () => leaveGame(id, user);

    console.log(`[joining game ${id}]`);
    joinGame(id, user);

    window.addEventListener("beforeunload", handleLeave);
    Router.events.on("beforeHistoryChange", handleLeave);

    return () => {
      console.log(`[leaving game ${id}]`);
      window.removeEventListener("beforeunload", handleLeave);
      Router.events.off("beforeHistoryChange", handleLeave);
    };
  }, [id, user]);
}
