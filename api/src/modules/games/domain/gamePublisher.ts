import { Result } from '../../../shared/core/Result';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { Guard } from '../../../shared/core/Guard';

interface GamePublisherNameProps {
  name: string;
}

export class GamePublisherName extends ValueObject<GamePublisherNameProps> {
  public static maxLength: number = 100;
  public static minLength: number = 2;

  get value(): string {
    return this.props.name;
  }

  private constructor(props: GamePublisherNameProps) {
    super(props);
  }

  public static create(props: GamePublisherNameProps): Result<GamePublisherName> {
    const publisherNameResult = Guard.againstNullOrUndefined(props.name, 'publisherName');
    if (publisherNameResult.isFailure) {
      return Result.fail<GamePublisherName>(publisherNameResult.getErrorValue());
    }

    const minLengthResult = Guard.againstAtLeast(this.minLength, props.name);
    if (minLengthResult.isFailure) {
      return Result.fail<GamePublisherName>(minLengthResult.getErrorValue());
    }

    const maxLengthResult = Guard.againstAtMost(this.maxLength, props.name);
    if (maxLengthResult.isFailure) {
      return Result.fail<GamePublisherName>(minLengthResult.getErrorValue());
    }

    return Result.ok<GamePublisherName>(new GamePublisherName(props));
  }
}
