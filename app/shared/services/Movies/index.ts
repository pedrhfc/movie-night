import fetcher from "config/swr";
import Movie from "shared/interfaces/general.interfaces";
import useSWR from "swr";

const YTS_API_URL = "https://yts.mx/api/v2/";

const DEFAULT_ENDPOINT = "list_movies";

interface Data {
  data: {
    movies?: Movie[];
    movie?: Movie;
  };
}

const serializeParams = (options: { [x: string]: any }) => {
  const params = [];
  for (let option in options) params.push(`${option}=${options[option]}`);
  const queryParams = params.join().replace(",", "&").replace(/ /g, "%20");

  return queryParams;
};

export function useMovies(params: any, endpoint?: string) {
  const options = serializeParams(params);

  const { data, error, mutate, isValidating } = useSWR<Data>(
    `${YTS_API_URL}${endpoint ?? DEFAULT_ENDPOINT}.json?${options}`,
    fetcher
  );

  return {
    movie: data?.data.movie,
    movies: data?.data.movies,
    isLoading: isValidating,
    mutate,
    error,
  };
}
