// lib/movieApi.ts
interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string;
  }
  
  interface ApiResponse {
    Search?: Movie[];
    totalResults?: string;
    Response: string;
    Error?: string;
    [key: string]: any;
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
  
  export const fetchMovieById = async (imdbID: string): Promise<Movie & Record<string, any>> => {
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
  
      return data;
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