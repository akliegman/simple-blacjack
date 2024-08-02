import { type Card, type Hand } from "@/global";

export const calculateScore = (hand: Hand) => {
  let score = 0;
  let aceCount = 0;

  if (hand?.length > 0) {
    hand?.forEach((card: Card) => {
      if (card) {
        if (card.value === "ACE") {
          aceCount++;
        } else if (
          card.value === "KING" ||
          card.value === "QUEEN" ||
          card.value === "JACK"
        ) {
          score += 10;
        } else {
          score += parseInt(card.value);
        }
      }
    });

    while (aceCount > 0) {
      if (score + 11 <= 21) {
        score += 11;
      } else {
        score += 1;
      }
      aceCount--;
    }
  }

  return score;
};
