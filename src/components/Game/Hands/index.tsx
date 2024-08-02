"use client";

import clsx from "clsx";

import { Hand } from "@/components";
import { useGame } from "@/providers/game";

export const Hands = () => {
  const { player, dealer } = useGame();
  const { hand: playerHand, score: playerScore } = player;
  const { hand: dealerHand, score: dealerScore } = dealer;

  return (
    <div
      className={clsx(
        "flex",
        "gap-8",
        "flex-col",
        "grow",
        "overflow-y-auto",
        "w-full",
        "py-8",
        "px-16",
        "justify-between",
      )}
    >
      <Hand hand={dealerHand} score={dealerScore} player="dealer" />
      <Hand hand={playerHand} score={playerScore} player="player" />
    </div>
  );
};
