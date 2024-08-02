"use client";

import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { Card } from "@/components/Card";
import { type Hand as HandType, type Player, type Score } from "@/global";

type HandProps = {
  player: Player;
  hand: HandType;
  score: Score;
};

export const Hand = (props: HandProps) => {
  const { player, hand, score } = props;

  return (
    <div
      className={clsx(
        "flex",
        player === "dealer" ? "flex-col" : "flex-col-reverse",
        "items-center",
        "justify-start",
      )}
    >
      <div
        className={clsx("flex", "flex-row", "items-center", "justify-center")}
      >
        <h2
          className={clsx(
            "text-blue-500",
            "text-xl",
            "uppercase",
            "tracking-widest",
          )}
        >
          {player}
        </h2>
      </div>
      <span
        className={clsx(
          "flex",
          "items-center",
          "justify-center",
          "w-6",
          "h-6",
          "bg-blue-950",
          "rounded-full",
          "text-white",
          "text-xs",
          "font-semibold",
          "transition-opacity",
          score === 0 ? "opacity-0" : "opacity-100",
          player === "dealer" ? "mb-2 mt-1" : "mt-2 mb-1",
        )}
      >
        {score}
      </span>
      <div
        className={clsx(
          "relative",
          "flex",
          player === "dealer" ? "flex-col-reverse" : "flex-col",
          "items-center",
        )}
      >
        <div
          className={clsx(
            "flex",
            "flex-row-reverse",
            "items-center",
            "justify-center",
            "gap-2",
            // "min-w-[15.5rem]",
          )}
        >
          {hand.length > 0
            ? hand.map((card, index) => (
                <AnimatePresence key={index}>
                  <motion.div
                    initial={{ x: 0, y: -10, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    exit={{ x: 0, y: 0, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className={clsx("z-[--z-hand")}
                  >
                    <Card key={index} src={card?.image} alt={card?.code} />
                  </motion.div>
                </AnimatePresence>
              ))
            : Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={index}
                  className={clsx(
                    "flex-0",
                    "min-w-24",
                    "w-24",
                    "bg-blue-200",
                    "rounded-lg",
                    "aspect-[--card-aspect-ratio]",
                  )}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
