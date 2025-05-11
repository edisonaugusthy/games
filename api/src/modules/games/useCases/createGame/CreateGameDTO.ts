import { GameType, PlayersRange } from '../../domain/game';

export interface CreateGameDTO {
  id: string;
  name: string;
  year: string;
  type: GameType;
  publisher: string;
  standalone: boolean;
  expansions: string[];
  baseGame: number;
  players: PlayersRange;
}
