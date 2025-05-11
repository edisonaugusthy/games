import { GameType, PlayersRange } from '../domain/game';

export interface GameDTO {
  gameId: string;
  name: string;
  releaseYear: Date;
  players?: PlayersRange;
  publisher: string;
  expansions?: string[];
  type: GameType;
}
