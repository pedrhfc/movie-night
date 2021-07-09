import { useEffect, useState } from "react";

const YTS_API_URL = "https://yts.mx/api/v2/list_movies.json?";

const serializeParams = (options: any) => {
  const params = [];
  for (let option in options) params.push(`${option}=${options[option]}`);
  const queryParams = params.join().replace(",", "&").replace(/ /g, "%20");

  return queryParams;
};

export function useMovies() {
  const [data, setData] = useState<{ movies: any }>({ movies: [] });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();
  const [options, setOptions] = useState<string>();

  const refresh = async () => {
    setLoading(true);
    await fetch(`${YTS_API_URL}${options}`)
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
  const [data, setData] = useState<{ movies: any }>({ movies: [] });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState();

  const getData = async (params: any) => {
    const options = serializeParams(params);
    setLoading(true);
    await fetch(`${YTS_API_URL}${options}`)
      .then(async (response) => await response.json())
      .then(({ data }) => setData(data))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return { data, isLoading, error, getData };
}
