"use client";

import { Actions, Container, Deck, Hands } from "@/components";
import { useGame } from "@/providers/game";

export const Game = () => {
  const { game } = useGame();
  const { loading } = game;

  return (
    <Container loading={loading}>
      <Deck />
      <Hands />
      <Actions />
    </Container>
  );
};
