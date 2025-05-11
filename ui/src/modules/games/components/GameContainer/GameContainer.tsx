import { Game } from '../../models/Game';
import GameCard from '../GameCard/GameCard';
import './GameContainer.scss';
interface GameContainerProps {
  games: Game[];
}

const GameContainer: React.FC<GameContainerProps> = ({ games }) => {
  return (
    <>
      {games.length === 0 ? (
        <p>No games available</p>
      ) : (
        <div className="games-list">
          {games.map(game => (
            <GameCard game={game} />
          ))}
        </div>
      )}
    </>
  );
};

export default GameContainer;
