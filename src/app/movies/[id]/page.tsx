import MovieImage from "@/components/MovieImage";
import { fetchMovieById } from "@/services/moviesApi";
import { StarIcon, CalendarIcon, ClockIcon, FilmIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import Loading from "./loading";

interface MovieDetailsPageProps {
  params: {
    id: string;
  };
}

export default async function MovieDetailsPage({ params }: MovieDetailsPageProps) {
  const movie = await fetchMovieById(params.id);

  const getImageSrc = () => {
    if (movie.Poster && movie.Poster !== 'N/A') {
      return movie.Poster;
    }
    return '/placeholder-movie.png';
  };

  const formatRuntime = (minutes: string) => {
    const mins = parseInt(minutes);
    const hours = Math.floor(mins / 60);
    const remainingMins = mins % 60;
    return `${hours}h ${remainingMins}m`;
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="min-h-screen bg-white text-gray-900 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster Section */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="sticky top-4">
                <MovieImage 
                  src={getImageSrc()} 
                  alt={movie.Title}
                  className="rounded-lg shadow-lg w-full h-auto border border-gray-200"
                />
                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                  <div className="mt-4 bg-yellow-400 text-gray-900 rounded-lg p-3 flex items-center justify-center shadow-sm">
                    <StarIcon className="h-6 w-6 mr-2" />
                    <span className="font-bold text-xl">{movie.imdbRating}/10</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Movie Details Section */}
            <div className="md:w-2/3 lg:w-3/4">
              <h1 className="text-4xl font-bold mb-2">{movie.Title}</h1>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {movie.Year && (
                  <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-600" />
                    {movie.Year}
                  </span>
                )}
                {movie.Runtime && movie.Runtime !== 'N/A' && (
                  <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    <ClockIcon className="h-4 w-4 mr-1 text-gray-600" />
                    {formatRuntime(movie.Runtime)}
                  </span>
                )}
                {movie.Genre && (
                  <span className="flex items-center bg-gray-100 px-3 py-1 rounded-full border border-gray-200">
                    <FilmIcon className="h-4 w-4 mr-1 text-gray-600" />
                    {movie.Genre}
                  </span>
                )}
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-3 border-b border-gray-200 pb-2">Overview</h2>
                <p className="text-gray-700 leading-relaxed">{movie.Plot}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {movie.Director && movie.Director !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">Director</h3>
                    <p className="text-gray-800">{movie.Director}</p>
                  </div>
                )}
                
                {movie.Writer && movie.Writer !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">Writer</h3>
                    <p className="text-gray-800">{movie.Writer}</p>
                  </div>
                )}
                
                {movie.Actors && movie.Actors !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">Cast</h3>
                    <p className="text-gray-800">{movie.Actors}</p>
                  </div>
                )}
                
                {movie.Language && movie.Language !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">Language</h3>
                    <p className="text-gray-800">{movie.Language}</p>
                  </div>
                )}
                
                {movie.Country && movie.Country !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">Country</h3>
                    <p className="text-gray-800">{movie.Country}</p>
                  </div>
                )}
                
                {movie.Awards && movie.Awards !== 'N/A' && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-600">Awards</h3>
                    <p className="text-gray-800">{movie.Awards}</p>
                  </div>
                )}
              </div>
              
              {movie.Ratings && movie.Ratings.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">Ratings</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {movie.Ratings.map((rating: any, index: number) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h3 className="font-medium text-yellow-600">{rating.Source}</h3>
                        <p className="text-xl text-gray-800">{rating.Value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8 border border-gray-200">
                  <h2 className="text-2xl font-semibold mb-2">Box Office</h2>
                  <p className="text-3xl font-bold text-gray-900">{movie.BoxOffice}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}