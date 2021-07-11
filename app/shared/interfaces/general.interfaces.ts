type Cast = {
  name: string;
  character_name: string;
  url_small_image: string;
};

interface Movie {
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

export type { Movie };
