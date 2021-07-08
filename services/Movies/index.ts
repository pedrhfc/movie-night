import { useEffect, useState } from "react";

export default function useMovies() {
  const [data, setData] = useState<{ movies: any }>({ movies: [] });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [options, setOptions] = useState<string>();
  
  const refresh = async () => {
    setLoading(true);
    await fetch(`https://yts.mx/api/v2/list_movies.json?${options}`)
      .then(async (response) => await response.json())
      .then(({ data }) => setData(data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
    async function fetchData(): Promise<void> {
      await refresh();
    }
  }, [options]);

  function urlParams(options: any): void {
    const params = [];
    for (let option in options) params.push(`${option}=${options[option]}`);

    const queryParams = params.join().replace(",", "&").replace(/ /g, "%20");
    setOptions(queryParams);
  }

  return { data, isLoading, refresh, urlParams };
}
