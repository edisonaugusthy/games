export const fetcher = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.status} ${response.statusText}`);
  }

  return response.json();
};
