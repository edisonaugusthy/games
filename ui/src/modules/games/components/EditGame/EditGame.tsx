import React, { useEffect } from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';
import { Game } from '../../models/Game';

interface EditGameProps {
  game: Game;
  isModalOpen: boolean;
  onEdit: (updatedGame: Game) => void;
  handleCancel: () => void;
  isSubmitting?: boolean;
}

const EditGamePopup: React.FC<EditGameProps> = ({ game, onEdit, isModalOpen, handleCancel, isSubmitting = false }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (isModalOpen) {
      form.setFieldsValue({
        name: game.name,
        publisher: game.publisher,
        type: game.type
      });
    }
  }, [game, isModalOpen, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then(values => {
        const updatedGame: Game = {
          ...game,
          ...values
        };
        onEdit(updatedGame);
      })
      .catch(error => {
        console.error('Validation failed:', error);
      });
  };

  useEffect(() => {
    if (!isModalOpen) {
      form.resetFields();
    }
  }, [isModalOpen, form]);

  return (
    <Modal
      title="Edit Game"
      open={isModalOpen}
      onCancel={handleCancel}
      maskClosable={false}
      destroyOnClose={true}
      footer={[
        <Button
          key="cancel"
          onClick={handleCancel}
          disabled={isSubmitting}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isSubmitting}>
          Save Changes
        </Button>
      ]}>
      <Form
        form={form}
        layout="vertical"
        name="edit_game_form">
        <Form.Item
          name="name"
          label="Game Name"
          rules={[{ required: true, message: 'Please enter the game name' }]}>
          <Input placeholder="Enter game name" />
        </Form.Item>

        <Form.Item
          name="publisher"
          label="Publisher"
          rules={[{ required: true, message: 'Please enter the publisher' }]}>
          <Input placeholder="Enter publisher name" />
        </Form.Item>

        <Form.Item
          name="type"
          label="Game Type"
          rules={[{ required: true, message: 'Please select a game type' }]}>
          <Select placeholder="Select game type">
            <Select.Option value="BaseGame">Base Game</Select.Option>
            <Select.Option value="Expansion">Expansion</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditGamePopup;
