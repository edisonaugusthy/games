import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, InputNumber, Space, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Game, GameType } from '../../../models/Game';

interface GameFormProps {
  initialValues?: Partial<Game>;
  onSubmit: (game: Partial<Game>) => void;
  isSubmitting: boolean;
  submitButtonText?: string;
}

const GameForm: React.FC<GameFormProps> = ({ initialValues, onSubmit, isSubmitting, submitButtonText = 'Submit' }) => {
  const [form] = Form.useForm();
  const [hasRange, setHasRange] = useState(initialValues?.players && initialValues.players.max !== undefined);

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const gameData: Partial<Game> = {
        name: values.name,
        publisher: values.publisher,
        type: values.type,
        releaseYear: values.releaseYear ? values.releaseYear.toDate() : new Date(),
        players: values.playersMin
          ? {
              min: values.playersMin,
              ...(values.playersMax && { max: values.playersMax })
            }
          : null,
        expansions: values.expansions
      };

      onSubmit(gameData);
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="game_form"
      onFinish={handleSubmit}>
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
        name="releaseYear"
        label="Release Year"
        rules={[{ required: true, message: 'Please select the release year' }]}>
        <DatePicker
          picker="year"
          style={{ width: '100%' }}
          placeholder="Select release year"
        />
      </Form.Item>

      <Form.Item label="Number of Players">
        <Space align="baseline">
          <Form.Item
            name="playersMin"
            noStyle>
            <InputNumber
              min={1}
              placeholder="Min"
            />
          </Form.Item>

          {hasRange ? (
            <>
              <span>to</span>
              <Form.Item
                name="playersMax"
                noStyle>
                <InputNumber
                  min={1}
                  placeholder="Max"
                />
              </Form.Item>
              <Button
                type="link"
                onClick={() => {
                  form.setFieldsValue({ playersMax: undefined });
                  setHasRange(false);
                }}
                icon={<MinusCircleOutlined />}>
                Remove range
              </Button>
            </>
          ) : (
            <Button
              type="link"
              onClick={() => setHasRange(true)}
              icon={<PlusOutlined />}>
              Add range
            </Button>
          )}
        </Space>
        <div>Leave empty if player count is not applicable</div>
      </Form.Item>

      <Form.Item
        name="type"
        label="Game Type"
        rules={[{ required: true, message: 'Please select a game type' }]}
        initialValue={GameType.BaseGame}>
        <Select placeholder="Select game type">
          <Select.Option value={GameType.BaseGame}>Base Game</Select.Option>
          <Select.Option value={GameType.Expansion}>Expansion</Select.Option>
        </Select>
      </Form.Item>

      <Form.List name="expansions">
        {(fields, { add, remove }) => (
          <>
            <Divider orientation="left">Expansions</Divider>
            {fields.map(field => (
              <Space
                key={field.key}
                align="baseline"
                style={{ display: 'flex' }}>
                <Form.Item
                  {...field}
                  name={[field.name]}
                  rules={[{ required: true, message: 'Please enter expansion name or remove this field' }]}
                  style={{ width: '100%' }}>
                  <Input placeholder="Expansion name" />
                </Form.Item>
                <Button
                  type="text"
                  onClick={() => remove(field.name)}
                  icon={<MinusCircleOutlined />}
                />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add Expansion
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
          style={{ width: '100%' }}>
          {submitButtonText}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default GameForm;
