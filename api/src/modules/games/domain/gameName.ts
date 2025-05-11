import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { Guard } from '../../../shared/core/Guard';

interface GameNameProps {
  name: string;
}

export class GameName extends ValueObject<GameNameProps> {
  public static maxLength: number = 100;
  public static minLength: number = 1;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: GameNameProps) {
    super(props);
  }

  public static create(props: GameNameProps): Result<GameName> {
    const gameNameResult = Guard.againstNullOrUndefined(props.name, 'gameName');
    if (gameNameResult.isFailure) {
      return Result.fail<GameName>(gameNameResult.getErrorValue());
    }
    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (minLengthResult.isFailure) {
      return Result.fail<GameName>(minLengthResult.getErrorValue());
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (maxLengthResult.isFailure) {
      return Result.fail<GameName>(minLengthResult.getErrorValue());
    }

    return Result.ok<GameName>(new GameName(props));
  }
}
