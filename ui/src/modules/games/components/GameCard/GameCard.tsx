import { Game } from '../../models/Game';
import { Card, Space } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Tooltip, Popconfirm } from 'antd';

interface GameCardProps {
  game: Game;
  OnDelete: (game: Game) => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, OnDelete }) => {
  return (
    <Space
      direction="vertical"
      size={16}>
      <Card
        title={game.name}
        style={{ width: 300 }}>
        <p>Created by: {game.publisher}</p>
        <p>Published On :{game?.releaseYear.toString()}</p>
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
      </Card>
    </Space>
  );
};

export default GameCard;
