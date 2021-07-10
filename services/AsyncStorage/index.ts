//Simulates a db storage just to retrieve local data
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "types";

const STORAGE_KEY = "@movie_night";

type Data = Movie;

const storeData = async (value: Data): Promise<void> => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem(STORAGE_KEY, jsonValue).catch((error) => error);
};

const getData = async () => {
  await AsyncStorage.getItem(STORAGE_KEY)
    .then((jsonValue) => (jsonValue != null ? JSON.parse(jsonValue) : null))
    .catch((error) => error);
};

export default { storeData, getData };
