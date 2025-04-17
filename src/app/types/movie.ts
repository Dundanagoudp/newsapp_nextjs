export interface MovieDetails {
    Title: string;
    Year: string;
    Genre?: string; // Make Genre optional
    Runtime?: string; // Optional too, if applicable
    Director?: string;
    Writer?: string;
    Actors?: string;
    Language?: string;
    Country?: string;
    Awards?: string;
    Plot: string;
    Poster: string;
    imdbRating?: string;
    Ratings?: Rating[];
    BoxOffice?: string;
  }
  
  export interface Rating {
    Source: string;
    Value: string;
  }  