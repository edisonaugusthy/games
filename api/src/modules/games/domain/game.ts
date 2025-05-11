import { UniqueEntityID } from '../../../shared/domain/UniqueEntityID';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';
import { AggregateRoot } from '../../../shared/domain/AggregateRoot';
import { GameId } from './gameId';
import { GameName } from './gameName';
import { GamePublisherName } from './gamePublisher';
import { GameCreated } from './events/gameCreated';

export enum GameType {
  BaseGame = 'BaseGame',
  Expansion = 'Expansion'
}

export interface PlayersRange {
  min: number;
  max?: number;
}
interface GameProps {
  name: GameName;
  releaseYear: Date;
  players?: PlayersRange;
  publisher: GamePublisherName;
  expansions?: string[];
  type: GameType;
  isDeleted?: boolean;
}

export class Game extends AggregateRoot<GameProps> {
  get gameId(): GameId {
    return GameId.create(this._id).getValue();
  }

  get name(): GameName {
    return this.props.name;
  }

  get releaseYear(): Date {
    return this.props.releaseYear;
  }

  get players(): PlayersRange | undefined {
    return this.props.players;
  }

  get publisher(): GamePublisherName {
    return this.props.publisher;
  }

  get expansions(): string[] | undefined {
    return this.props.expansions;
  }

  get type(): GameType {
    return this.props.type;
  }

  get isDeleted(): boolean | undefined {
    return this.props.isDeleted;
  }

  public updateName(name: GameName) {
    this.props.name = name;
  }
  public updateType(type: GameType) {
    this.props.type = type;
  }
  public updatePublisher(publisher: GamePublisherName) {
    this.props.publisher = publisher;
  }

  public delete() {
    if (!this.props.isDeleted) {
      this.props.isDeleted = true;
    }
  }
  private constructor(props: GameProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: GameProps, id?: UniqueEntityID): Result<Game> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'gameName' },
      { argument: props.publisher, argumentName: 'publisher' }
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Game>(guardResult.getErrorValue());
    }

    const isNewGame = !!id === false;
    const user = new Game(
      {
        ...props,
        isDeleted: props.isDeleted ? props.isDeleted : false
      },
      id
    );

    if (isNewGame) {
      user.addDomainEvent(new GameCreated(user));
    }

    return Result.ok<Game>(user);
  }
}
