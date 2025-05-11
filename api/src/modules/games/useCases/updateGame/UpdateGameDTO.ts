import { GameType } from '../../domain/game';

export interface UpdateGameDTO {
  id: string;
  name: string;
  type: GameType;
  publisher: string;
}
