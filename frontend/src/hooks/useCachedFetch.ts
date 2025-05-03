import { useState, useEffect } from "react";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

type CachedData<T> = {
  data: T[];
  loading: boolean;
  error: string;
};

const useCachedFetch = <T>(key: string, url: string): CachedData<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData: T[] = await response.json();

        setData(fetchedData);
        setLoading(false);

        // Store in localStorage with timestamp
        localStorage.setItem(
          key,
          JSON.stringify({ data: fetchedData, timestamp: Date.now() })
        );
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to fetch data");
        }
        setLoading(false);
      }
    };

    // Check local storage for cached data
    const cachedDataString = localStorage.getItem(key);
    if (cachedDataString) {
      const { data, timestamp } = JSON.parse(cachedDataString);
      const now = Date.now();

      // If cache is valid, use it
      if (now - timestamp < CACHE_DURATION) {
        setData(data as T[]);
        setLoading(false);
        return;
      }
    }

    // Fetch new data if cache is expired or missing
    fetchData();
  }, [key, url]);

  return { data, loading, error };
};

export default useCachedFetch;
