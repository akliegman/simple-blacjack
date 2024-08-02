export type Suit = "HEARTS" | "DIAMONDS" | "CLUBS" | "SPADES";

export type Rank =
  | "ACE"
  | "KING"
  | "QUEEN"
  | "JACK"
  | "10"
  | "9"
  | "8"
  | "7"
  | "6"
  | "5"
  | "4"
  | "3"
  | "2";

export type DeckId = string;

export type Deck = {
  success: boolean;
  deck_id: DeckId;
  shuffled: boolean;
  remaining: number;
} | null;

export type Card = {
  code: string;
  image: string; // url
  images: {
    svg: string; // url
    png: string; // url
  };
  value: string;
  suit: Suit;
  rank: Rank;
};

export type Hand = Card[] | [];

export type Score = number;

export type Player = "player" | "dealer";

export type Winner = Player | "draw" | null;

export type GameStatus = "not-started" | "in-progress" | "complete";

export type DealOrder = ["player", "dealer", "player", "dealer"];
