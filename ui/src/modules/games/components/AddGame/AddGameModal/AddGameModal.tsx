import React, { useState } from 'react';
import { Modal, message } from 'antd';

import GameForm from '../GameForm/GameForm';
import { Game } from '../../../models/Game';
import { gameService } from '../../../services';

interface AddGameModalProps {
  isModalOpen: boolean;
  handleCancel: () => void;
  onSuccess: () => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ isModalOpen, handleCancel, onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (newGame: Partial<Game>) => {
    setIsSubmitting(true);
    try {
      const result = await gameService.createGame(newGame);

      if (result.isRight()) {
        message.success(`Game "${newGame.name}" created successfully`);
        onSuccess();
        handleCancel();
      } else {
        const error = 'Failed to create game';
        message.error(error);
      }
    } catch (error) {
      console.error('Error creating game:', error);
      message.error('An error occurred while creating the game');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      title="Add New Game"
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose={true}
      footer={null}
      width={600}>
      <GameForm
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitButtonText="Create Game"
      />
    </Modal>
  );
};

export default AddGameModal;
