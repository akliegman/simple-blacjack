"use client";

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { LOCAL_STORAGE_DECK_KEY } from "@/constants";
import {
  type Card,
  type DealOrder,
  type Deck,
  type GameStatus,
  type Hand,
  type Player,
  type Score,
  type Winner,
} from "@/global";
import { calculateScore, determineWinner } from "@/utils/game";

type GameContextType = {
  deck: Deck;
  utils: {
    dealCard: (player: Player) => void;
    dealHand: () => void;
    setDealerHand: (hand: Card[]) => void;
    setPlayerHand: (hand: Card[]) => void;
    shuffleNewDeck: () => void;
    endHand: () => void;
    clearHands: () => void;
  };
  player: {
    hand: Hand;
    hasBlackjack: boolean;
    score: Score;
  };
  dealer: {
    hand: Hand;
    hasBlackjack: boolean;
    score: Score;
  };
  game: {
    loading: boolean;
    status: GameStatus;
    winner: Winner;
  };
} | null;

type DeckProviderProps = {
  children: ReactNode;
};

export const GameContext = createContext<GameContextType>(null);

export const DeckProvider = (props: DeckProviderProps) => {
  const { children } = props;

  const [deck, setDeck] = useState<Deck>(null);
  const [playerHand, setPlayerHand] = useState<Hand>([]);
  const [dealerHand, setDealerHand] = useState<Hand>([]);
  const [playerScore, setPlayerScore] = useState<Score>(0);
  const [dealerScore, setDealerScore] = useState<Score>(0);
  const [winner, setWinner] = useState<Winner>(null);
  const [gameLoading, setGameLoading] = useState<boolean>(true);
  const [gameStatus, setGameStatus] = useState<GameStatus>("not-started");

  const setDeckInLocalStorage = (deck: Deck) => {
    localStorage.setItem(LOCAL_STORAGE_DECK_KEY, JSON.stringify(deck));
  };

  const shuffleNewDeck = () => {
    const fetchDeck = async () => {
      const res = await fetch("/api/deck/new");
      const deck = await res.json();
      return deck;
    };

    setGameLoading(true);

    fetchDeck().then((newDeck) => {
      setDeck(newDeck);
      setDeckInLocalStorage(newDeck);
      setGameLoading(false);
    });
  };

  const fetchCard = async () => {
    if (deck) {
      const res = await fetch(`/api/deck/draw/${deck.deck_id}`);
      const data = await res.json();

      setDeck((prev) => {
        if (prev) {
          const newDeck = {
            ...prev,
            remaining: data.remaining,
          };
          setDeckInLocalStorage(newDeck);

          return newDeck;
        }
        return null;
      });

      return data;
    } else {
      throw new Error("No deck available");
    }
  };

  const dealCard = async (player: Player = "player") => {
    if (deck) {
      try {
        const newCardData = await fetchCard();
        const card = newCardData.cards[0];

        if (card) {
          if (player === "player") {
            setPlayerHand((prev) => [...prev, card]);
          } else {
            setDealerHand((prev) => [...prev, card]);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          alert(error?.message);
        } else {
          alert("There was an error.");
        }
      }
    } else {
      alert("There was an error.");
    }
  };

  const resetHands = () => {
    setPlayerHand([]);
    setDealerHand([]);
    setGameStatus("not-started");
    setWinner(null);

    // get new deck if less than 12 cards left
    if (deck && deck.remaining < 12) {
      shuffleNewDeck();
    }
  };

  const dealHand = async () => {
    resetHands();
    if (deck) {
      const whoToDeal: DealOrder = ["player", "dealer", "player", "dealer"];

      for (let i = 0; i < whoToDeal.length; i++) {
        try {
          await dealCard(whoToDeal[i]);
          setGameStatus("in-progress");
        } catch (error: unknown) {
          if (error instanceof Error) {
            alert(error?.message);
          } else {
            alert("There was an error.");
          }

          break;
        }
      }
    } else {
      alert("There was an error.");
    }
  };

  useEffect(() => {
    const localDeck = localStorage.getItem(LOCAL_STORAGE_DECK_KEY);
    if (localDeck) {
      setDeck(JSON.parse(localDeck));
      setGameLoading(false);
    } else {
      shuffleNewDeck();
    }
  }, []);

  useEffect(() => {
    setPlayerScore(calculateScore(playerHand));
    setDealerScore(calculateScore(dealerHand));
  }, [playerHand, dealerHand]);

  useEffect(() => {
    const isInitialDeal = playerHand.length === 2 && dealerHand.length === 2;
    const winner = determineWinner({
      playerScore,
      dealerScore,
      options: { isInitialDeal: isInitialDeal },
    });
    if (winner) {
      setGameStatus("complete");
      setWinner(winner);
    }
  }, [playerScore, dealerScore]);

  const endHand = () => {
    setGameStatus("complete");
    const winner = determineWinner({
      playerScore,
      dealerScore,
      options: { isHandComplete: true },
    });
    setWinner(winner);
  };

  const value = {
    deck,
    utils: {
      dealCard,
      dealHand,
      setPlayerHand,
      setDealerHand,
      shuffleNewDeck,
      endHand,
      clearHands: resetHands,
    },
    player: {
      hand: playerHand,
      score: playerScore,
      hasBlackjack: playerScore === 21 && playerHand.length === 2,
    },
    dealer: {
      hand: dealerHand,
      score: dealerScore,
      hasBlackjack: dealerScore === 21 && dealerHand.length === 2,
    },
    game: {
      winner,
      loading: gameLoading,
      status: gameStatus,
    },
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a DeckProvider");
  }

  return context;
};
