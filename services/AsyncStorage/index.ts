//Simulates a db storage just to retrieve local data
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "types";

const STORAGE_KEY = "@movie_night";

let data: Movie[] = [];

const storeData = async (value: Movie): Promise<void> => {
  const favorites = await getFavorites();

  data = favorites ?? [];

  const index = data.findIndex((movie) => movie.id === value.id);

  if (index > -1) data.splice(index, 1);
  else data.push(value);

  const jsonValue = JSON.stringify(data);
  await AsyncStorage.setItem(`${STORAGE_KEY}:favorites`, jsonValue).catch(
    (error) => error
  );
};

const getFavorites = async () => {
  try {
    const favorites = await AsyncStorage.getItem(`${STORAGE_KEY}:favorites`);
    if (favorites !== null) return JSON.parse(favorites);
  } catch (error) {
    return error;
  }
};

const clearStorage = async () =>
  await AsyncStorage.removeItem(`${STORAGE_KEY}:favorites`);

export { storeData, getFavorites, clearStorage };
