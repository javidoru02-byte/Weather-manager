import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { geoApi, apiKey } from "../constant/WeatherApi";

const MIN_QUERY_LENGTH = 2;
const DEBOUNCE_MS = 400;

/**
 * @param {string} query
 * @param {boolean} skip
 * @returns {{ suggestions: object[], isLoading: boolean }}
 */
export function useCitySuggestions(query, skip = false) {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (skip || trimmedQuery.length < MIN_QUERY_LENGTH) {
      // eslint-disable-next-line
      setSuggestions([]);
      setIsLoading(false);
      return undefined;
    }

    const timerId = setTimeout(async () => {
      abortControllerRef.current?.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsLoading(true);
      try {
        const { data } = await axios.get(geoApi, {
          params: { q: trimmedQuery, limit: 5, appid: apiKey },
          signal: controller.signal,
        });
        setSuggestions(Array.isArray(data) ? data : []);
        setIsLoading(false);
      } catch (error) {
        if (axios.isCancel(error) || error.code === "ERR_CANCELED") {
          return;
        }
        setSuggestions([]);
        setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timerId);

      abortControllerRef.current?.abort();
    };
  }, [query, skip]);

  return { suggestions, isLoading };
}
