import { Game } from '../game';
import { IDomainEvent } from '../../../../shared/domain/events/IDomainEvent';
import { UniqueEntityID } from '../../../../shared/domain/UniqueEntityID';

export class GameCreated implements IDomainEvent {
  public dateTimeOccurred: Date;
  public game: Game;

  constructor(user: Game) {
    this.dateTimeOccurred = new Date();
    this.game = user;
  }

  getAggregateId(): UniqueEntityID {
    return this.game.id;
  }
}
