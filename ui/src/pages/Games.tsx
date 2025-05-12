import { Layout } from '../shared/layout';
import Header from '../shared/components/header/Header';
import GameContainer from '../modules/games/components/GameContainer/GameContainer';
import { getGames } from '../modules/games/services/GetGames';
import { FullPageLoader } from '../shared/components/loader';
import { Game } from '../modules/games/models/Game';
import { gameService } from '../modules/games/services';
import { Empty } from 'antd';

const GamePage = () => {
  let { games, isLoading, isError, mutate } = getGames();
  const OnDelete = async (game: Game) => {
    const result = await gameService.deleteGameById(game);
    if (result.isRight()) {
      mutate();
    }
  };
  return (
    <Layout>
      <Header
        title="All games"
        subtitle=""
      />
      {isLoading && <FullPageLoader />}
      {isError && <p>Failed to load games. Please try again later.</p>}
      {!isLoading && !isError && games?.length === 0 && <Empty />}
      {!isLoading && !isError && games && games?.length > 0 && (
        <GameContainer
          games={games}
          OnDelete={OnDelete}
        />
      )}
    </Layout>
  );
};

export default GamePage;
