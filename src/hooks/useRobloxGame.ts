import { useState, useEffect } from 'react';

export interface RobloxGameData {
  id: number;
  placeId: string;
  name: string;
  description: string;
  playing: number;
  visits: number;
  favoritedCount: number;
  rating: number;
  icon: string;
}

export function useRobloxGame(placeId: string) {
  const [data, setData] = useState<RobloxGameData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/api/roblox/game/${placeId}`);
        if (!response.ok) {
          const text = await response.text();
          console.error('API Error Response:', text);
          throw new Error(`Failed to fetch game data: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    
    // Refresh every 30 seconds for "live" feel
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, [placeId]);

  return { data, loading, error };
}
