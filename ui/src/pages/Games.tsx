import { Layout } from '../shared/layout';
import Header from '../shared/components/header/Header';
import GameContainer from '../modules/games/components/GameContainer/GameContainer';
import { getGames } from '../modules/games/services/GetGames';
import { FullPageLoader } from '../shared/components/loader';
import { Game } from '../modules/games/models/Game';
import { gameService } from '../modules/games/services';
import { Empty, message, Button, Col, Row } from 'antd';
import EditGamePopup from '../modules/games/components/EditGame/EditGame';
import { useState } from 'react';
import AddGameModal from '../modules/games/components/AddGame/AddGameModal/AddGameModal';

const GamePage = () => {
  let { games, isLoading, isError, mutate } = getGames();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const OnDelete = async (game: Game) => {
    try {
      const result = await gameService.deleteGameById(game);
      if (result.isRight()) {
        message.success(`Game "${game.name}" delete successfully`);
        mutate();
      } else {
        message.error('Failed to delete game');
      }
    } catch (error) {
      message.error('An error occurred while deleting the game');
    }
  };

  const handleEditSubmit = async (updatedGame: Game) => {
    setIsSubmitting(true);
    try {
      const result = await gameService.updateGame(updatedGame);
      if (result.isRight()) {
        message.success(`Game "${updatedGame.name}" updated successfully`);
        mutate();
        setIsEditModalOpen(false);
      } else {
        message.error('Failed to update game');
      }
    } catch (error) {
      message.error('An error occurred while updating the game');
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleEdit = (game: Game) => {
    setSelectedGame(game);
    setIsEditModalOpen(true);
  };
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
    setSelectedGame(null);
  };
  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleAddSuccess = () => {
    mutate();
  };

  return (
    <Layout>
      <Header
        title="All games"
        subtitle=""
      />
      <Row>
        <Col span={21}></Col>
        <Col span={2}>
          <Button
            type="primary"
            onClick={handleOpenAddModal}>
            Add New Game
          </Button>
        </Col>
      </Row>

      {isLoading && <FullPageLoader />}
      {isError && <p>Failed to load games. Please try again later.</p>}
      {!isLoading && !isError && games?.length === 0 && <Empty />}
      {!isLoading && !isError && games && games?.length > 0 && (
        <GameContainer
          handleEdit={handleEdit}
          games={games}
          OnDelete={OnDelete}
        />
      )}
      {selectedGame && (
        <EditGamePopup
          game={selectedGame}
          isModalOpen={isEditModalOpen}
          onEdit={handleEditSubmit}
          handleCancel={handleCancelEdit}
          isSubmitting={isSubmitting}
        />
      )}
      <AddGameModal
        isModalOpen={isAddModalOpen}
        handleCancel={handleCancelAdd}
        onSuccess={handleAddSuccess}
      />
    </Layout>
  );
};

export default GamePage;
