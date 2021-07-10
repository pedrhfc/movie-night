import { useEffect, useState } from "react";
import { Movie } from "types";

const YTS_API_URL = "https://yts.mx/api/v2/";

const DEFAULT_ENDPOINT = "list_movies";

interface Data {
  movies?: Movie[];
  movie?: Movie;
}

const serializeParams = (options: { [x: string]: any }) => {
  const params = [];
  for (let option in options) params.push(`${option}=${options[option]}`);
  const queryParams = params.join().replace(",", "&").replace(/ /g, "%20");

  return queryParams;
};

export function useMovies() {
  const [data, setData] = useState<Data>({
    movies: [],
    movie: {},
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [options, setOptions] = useState<string>();

  const refresh = async () => {
    setLoading(true);
    await fetch(`${YTS_API_URL}${DEFAULT_ENDPOINT}.json?${options}`)
      .then(async (response) => await response.json())
      .then(({ data }) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    async function fetchData(): Promise<void> {
      await refresh();
    }
  }, [options]);

  const urlParams = (options: any) => setOptions(serializeParams(options));

  return { data, isLoading, error, refresh, urlParams };
}

export function useLazyMovies() {
  const [data, setData] = useState<Data>({ movies: [] });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const getData = async (params: any, endpoint?: string) => {
    const options = serializeParams(params);

    setLoading(true);
    await fetch(`${YTS_API_URL}${endpoint ?? DEFAULT_ENDPOINT}.json?${options}`)
      .then(async (response) => await response.json())
      .then(({ data }) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return { data, isLoading, error, getData };
}
