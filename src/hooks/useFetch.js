import { useState, useEffect } from "react";

export const useFetch = (url, formatFunction) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Request failed");
        }
        const json = await response.json();
        setData(formatFunction ? formatFunction(json) : json);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, formatFunction]);

  return { data, loading, error };
};
