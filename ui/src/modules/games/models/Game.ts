export enum GameType {
  BaseGame = 'BaseGame',
  Expansion = 'Expansion'
}

export interface PlayersRange {
  min: number;
  max?: number;
}

export interface Game {
  gameId: string;
  name: string;
  releaseYear: Date;
  players?: PlayersRange;
  publisher: string;
  expansions?: string[];
  type: GameType;
}
