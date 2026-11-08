import { useState, useEffect } from "react";

export const useEurostatData = (fetchFunction, country) => {
  const [result, setResult] = useState({
    country: null,
    fetchFunction: null,
    data: [],
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchFunction(country, controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) {
          setResult({
            country,
            fetchFunction,
            data,
            error: null,
          });
        }
      })
      .catch((err) => {
        if (!controller.signal.aborted && err.name !== "AbortError") {
          setResult({
            country,
            fetchFunction,
            data: [],
            error: err.message,
          });
        }
      });

    return () => {
      controller.abort();
    };
  }, [fetchFunction, country]);

  const isCurrent =
    result.country === country && result.fetchFunction === fetchFunction;

  return {
    data: isCurrent ? result.data : [],
    loading: !isCurrent,
    error: isCurrent ? result.error : null,
  };
};
