export interface Card {
  [key: string]: any;
  affiliation_code: string;
  code: string;
  cost?: number;
  deck_limit: number;
  faction_code: string;
  flavor?: string;
  has_die: boolean;
  has_errata: boolean;
  health?: number;
  illustrator?: string;
  is_unique: boolean;
  name: string;
  points?: string;
  position: number;
  rarity_code: string;
  set_code: string;
  sides?: string[];
  subtitle?: string;
  subtypes?: string[];
  text: string;
  ttscardid: string;
  type_code: string;
}

export interface Format {
  code: string;
  data: {
    balance: { [name: string]: string };
    banned?: string[];
    errate?: string[];
    restricted: string[];
    restrictedPairs?: {
      [name: string]: string[];
    };
    sets: string[];
  };
  name: string;
}

export interface Deck {
  id: string;
  name: string;
  characters: Character[];
  battleField?: Card;
  plot?: Card;
  drawDeck: { card: Card; count: number }[];
  formatCode: string;
  notes?: string;
}

export interface DestinySet {
  cgdb_id_end?: number;
  cgdb_id_start?: number;
  code: string;
  cycle_code: string;
  date_release: string;
  name: string;
  position: number;
  project_name?: string;
  size: number;
}

export interface Character {
  card: Card;
  pointsArray: number[];
  count: number;
}

interface DeckStored {
  deck: Deck;
  isPublic: boolean;
}
