import { GameType } from '../../domain/game';

export interface UpdateGameDTO {
  gameId: string;
  name: string;
  type: GameType;
  publisher: string;
}
