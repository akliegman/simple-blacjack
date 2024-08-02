"use client";

import clsx from "clsx";

import { Modal } from "@/components";
import { type Winner } from "@/global";
import { useGame } from "@/providers/game";

export const WinnerIndicator = () => {
  const { game, utils, player, dealer } = useGame();

  const { winner, status } = game;
  const { hasBlackjack: playerHasBlackjack } = player;
  const { hasBlackjack: dealerHasBlackjack } = dealer;
  const { clearHands } = utils;

  const modalMessage = (winner: Winner) => {
    switch (winner) {
      case "player":
        return "Player wins!";
      case "dealer":
        return "Dealer wins!";
      default:
        return "It's a draw!";
    }
  };

  const onClose = () => {
    clearHands();
  };

  return (
    <Modal isOpen={status === "complete"} onClose={onClose}>
      <div className={clsx("text-2xl")}>
        {playerHasBlackjack && "Player has Blackjack!"}
        {dealerHasBlackjack && "Dealer has Blackjack!"}
        {modalMessage(winner)}
      </div>
    </Modal>
  );
};
