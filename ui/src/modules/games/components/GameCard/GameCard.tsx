import { Game } from '../../models/Game';
import { Card, Space } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Button, Tooltip, Popconfirm, Flex } from 'antd';

interface GameCardProps {
  game: Game;
  OnDelete: (game: Game) => void;
  handleEdit: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, OnDelete, handleEdit }) => {
  return (
    <Space
      direction="vertical"
      size={16}>
      <Card
        title={game.name}
        style={{ width: 300 }}>
        <p>Created by: {game.publisher}</p>
        <p>Published On :{game?.releaseYear.toString()}</p>
        <Flex
          gap="middle"
          justify="space-between">
          <Tooltip title="delete">
            <Popconfirm
              onConfirm={() => OnDelete(game)}
              title="Delete the Game"
              description="Are you sure to delete this Game?"
              okText="Yes"
              cancelText="No">
              <Button
                danger
                shape="circle"
                icon={<DeleteFilled color="danger" />}></Button>
            </Popconfirm>
          </Tooltip>

          <Tooltip title="edit">
            <Button
              onClick={() => handleEdit(game)}
              shape="circle"
              icon={<EditFilled />}></Button>
          </Tooltip>
        </Flex>
      </Card>
    </Space>
  );
};

export default GameCard;
