"use client";

import clsx from "clsx";

import { Button } from "@/components";
import { useGame } from "@/providers/game";

export const Actions = () => {
  const { game, utils } = useGame();
  const { status } = game;
  const { dealHand, dealCard, endHand } = utils;

  return (
    <div
      className={clsx(
        "bg-white",
        "p-4",
        "rounded-t-xl",
        "w-full",
        "shadow-lg",
        "max-w-screen-sm",
        "mx-auto",
        "min-h-[5rem]",
      )}
    >
      {status === "in-progress" ? (
        <div className={clsx("flex", "gap-4")}>
          <Button onClick={() => dealCard("player")}>Hit</Button>
          <Button onClick={() => endHand()}>Stand</Button>
        </div>
      ) : status === "not-started" ? (
        <Button onClick={() => dealHand()}>Deal</Button>
      ) : null}
    </div>
  );
};
