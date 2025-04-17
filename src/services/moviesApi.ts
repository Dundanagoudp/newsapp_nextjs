interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

interface Rating {
  Source: string;
  Value: string;
}

interface MovieDetails extends Movie {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Ratings?: Rating[];
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

interface ApiResponse {
  Search?: Movie[];
  totalResults?: string;
  Response: string;
  Error?: string;
}

const API_KEY = '2e7a0e13';
const BASE_URL = 'https://www.omdbapi.com/';

export const fetchMoviesBySearch = async (searchTerm: string, page: number = 1): Promise<Movie[]> => {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}&type=movie`;
  
  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      if (data.Response === 'False') {
          throw new Error(data.Error || 'Unknown error from API');
      }

      return data.Search || [];
  } catch (error) {
      console.error('API request failed:', error);
      throw error;
  }
};

export const fetchMovieById = async (imdbID: string): Promise<MovieDetails> => {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${imdbID}&plot=full`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.Response === 'False') {
      throw new Error(data.Error || 'Unknown error from API');
    }

    return data as MovieDetails;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};


export const fetchEnglishMovies = async (): Promise<Movie[]> => {
  return fetchMoviesBySearch('movie');
};

export const fetchKannadaMovies = async (): Promise<Movie[]> => {
  return fetchMoviesBySearch('kannada');
};

export const fetchHindiMovies = async (): Promise<Movie[]> => {
  return fetchMoviesBySearch('hindi');
};

export const fetchSportsMovies = async (): Promise<Movie[]> => {
  return fetchMoviesBySearch('sport');
};