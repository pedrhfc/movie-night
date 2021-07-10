type Cast = {
  name: string;
  character_name: string;
  url_small_image: string;
};
export interface Movie {
  synopsis?: string;
  genres?: string[];
  language?: string;
  cast?: Cast[];
  description_intro?: string;
  large_cover_image?: string;
  year?: number;
  rating?: number;
  title?: string;
  id?: number;
}

export type RootStackParamList = {
  Root: undefined;
  MovieInfo: Movie;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  HomeScreen: undefined;
};

export type TabTwoParamList = {
  ProfileScreen: undefined;
};
