import { Layout } from '../shared/layout';
import Header from '../shared/components/header/Header';
import GameContainer from '../modules/games/components/GameContainer/GameContainer';
import { getGames } from '../modules/games/services/GetGames';
import { FullPageLoader } from '../shared/components/loader';

const GamePage = () => {
  const { games, isLoading, isError } = getGames();
  return (
    <Layout>
      <div className="header-container flex flex-row flex-center flex-even">
        <Header
          title="All games"
          subtitle=""
        />
      </div>
      {isLoading && <FullPageLoader />}
      {isError && (
        <div className="error-container">
          <p className="error-message">Failed to load games. Please try again later.</p>
        </div>
      )}
      {!isLoading && !isError && games?.length === 0 && (
        <div className="empty-state">
          <p>No games available in the collection.</p>
        </div>
      )}
      {!isLoading && !isError && games && games?.length > 0 && <GameContainer games={games} />}
    </Layout>
  );
};

export default GamePage;
