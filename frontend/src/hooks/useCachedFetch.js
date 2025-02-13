import { useState, useEffect } from "react";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useCachedFetch = (key, url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedData = await response.json();

        setData(fetchedData);
        setLoading(false);

        // Store in localStorage with timestamp
        localStorage.setItem(
          key,
          JSON.stringify({ data: fetchedData, timestamp: Date.now() })
        );
      } catch (err) {
        setError(err.message);
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
        setData(data);
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
