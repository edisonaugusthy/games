import { Game } from '../../models/Game';
import { Card, Space } from 'antd';
import { DeleteFilled } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
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
          <Button
            color="danger"
            shape="circle"
            icon={<DeleteFilled color="danger" />}
          />
        </Tooltip>
      </Card>
    </Space>
  );
};

export default GameCard;
