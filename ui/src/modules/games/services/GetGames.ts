import useSWR from 'swr';
import { apiConfig } from '../../../config/api';
import { fetcher } from '../../../shared/utils/fetcher';
import { Game } from '../models/Game';

export function getGames() {
  const { data, error, isLoading } = useSWR<{ games: Game[] }>(`${apiConfig.baseUrl}/game`, fetcher);
  return {
    games: data?.games,
    isLoading,
    isError: error
  };
}
