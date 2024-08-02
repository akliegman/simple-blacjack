import { type Score } from "@/global";

type DetermineWinnerProps = {
  playerScore: Score;
  dealerScore: Score;
  options: {
    isInitialDeal?: boolean;
    isHandComplete?: boolean;
  };
};

export const determineWinner = (props: DetermineWinnerProps) => {
  const { playerScore, dealerScore, options } = props;
  const { isInitialDeal = false, isHandComplete = false } = options;

  if (isInitialDeal) {
    if (playerScore === 21 && dealerScore === 21) {
      return "draw";
    } else if (playerScore === 21) {
      return "player";
    } else if (dealerScore === 21) {
      return "dealer";
    } else {
      return null;
    }
  } else {
    if (playerScore > 21) {
      return "dealer";
    }
  }

  if (isHandComplete) {
    if (playerScore > dealerScore) {
      return "player";
    } else if (dealerScore > playerScore) {
      return "dealer";
    } else {
      return "draw";
    }
  }

  return null;
};
