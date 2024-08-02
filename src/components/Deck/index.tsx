"use client";

import clsx from "clsx";

import { Card } from "@/components";
import { useGame } from "@/providers/game";

import styles from "./index.module.scss";

export const Deck = () => {
  const { deck } = useGame();

  const remainingArray = Array.from({ length: deck?.remaining || 0 });

  return (
    <div
      className={clsx(
        "select-none",
        "aspect-[--card-aspect-ratio]",
        "w-24",
        "min-w-24",
        "absolute",
        "top-24",
        "right-16",
      )}
    >
      {remainingArray.length > 0 &&
        remainingArray.map((_, index) => (
          <Card
            className={clsx("absolute", styles["card"])}
            src="https://deckofcardsapi.com/static/img/back.png"
            alt="Card back"
            key={index}
          />
        ))}
    </div>
  );
};
