import { GameType, PlayersRange } from '../../domain/game';

export interface CreateGameDTO {
  name: string;
  year: string;
  type: GameType;
  publisher: string;
  standalone: boolean;
  baseGame: number;
  players: PlayersRange;
}
