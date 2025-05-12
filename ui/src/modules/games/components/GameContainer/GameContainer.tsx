import { Game } from '../../models/Game';
import GameCard from '../GameCard/GameCard';
import './GameContainer.scss';
interface GameContainerProps {
  games: Game[];
  OnDelete: (game: Game) => void;
  handleEdit: (game: Game) => void;
}

const GameContainer: React.FC<GameContainerProps> = ({ games, OnDelete, handleEdit }) => {
  return (
    <div className="games-list">
      {games.map(game => (
        <GameCard
          game={game}
          OnDelete={OnDelete}
          handleEdit={handleEdit}
        />
      ))}
    </div>
  );
};

export default GameContainer;
