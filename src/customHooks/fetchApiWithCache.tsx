import { useState, useRef, useEffect } from "react";
const apiCache: { [key: string]: { data: any; timestamp: number } } = {};

const useFetchWithCache = (
  url: string,
  options: { enabled: boolean; cacheTime: number } = {
    enabled: true,
    cacheTime: 5 * 50 * 60,
  }
) => {
  const { enabled, cacheTime } = options;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const abortRef = useRef(null);

  const fetchData = async (forceRefresh: boolean = false) => {
    if (!url || !enabled) return;
    const now = Date.now();
    const cachedData = apiCache[url];
    if (!forceRefresh && cachedData && now - cachedData.timestamp < cacheTime) {
      //   return cachedData.data;
      setData(cachedData.data);
      setError(null);
      setLoading(false);
      return;
    }
    if (abortRef.current) {
      // @ts-ignore
      abortRef.current.abort();
    }

    const controller = new AbortController();
    // @ts-ignore
    abortRef.current = controller;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, { signal: controller.signal });
      console.log("response: ", response);
      if (!response.ok)
        throw new Error(`Request failed with status: ${response.status}`);

      const result = await response.json();

      apiCache[url] = {
        data: result,
        timestamp: Date.now(),
      };
      setData(result);
    } catch (err) {
      // @ts-ignore
      if (err?.name !== "AbortError") {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      // @ts-ignore
      if (abortRef.current) abortRef.current.abort();
    };
  }, []);

  const refetch = () => fetchData(true);

  return { data, loading, error, refetch };
};

export default useFetchWithCache;
