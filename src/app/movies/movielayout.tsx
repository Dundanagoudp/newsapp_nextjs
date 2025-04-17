'use client'

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import {
  fetchEnglishMovies,
  fetchKannadaMovies,
  fetchHindiMovies,
  fetchSportsMovies
} from "@/services/moviesApi"

interface Movie {
  Title: string
  Year: string
  imdbID: string
  Poster: string
}

interface MoviesLayoutProps {
  searchTerm?: string
}

export const MoviesLayout = ({ searchTerm = '' }: MoviesLayoutProps) => {
  const [englishMovies, setEnglishMovies] = useState<Movie[]>([])
  const [kannadaMovies, setKannadaMovies] = useState<Movie[]>([])
  const [hindiMovies, setHindiMovies] = useState<Movie[]>([])
  const [sportsMovies, setSportsMovies] = useState<Movie[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const englishCardContainerRef = useRef<HTMLDivElement | null>(null)
  const kannadaCardContainerRef = useRef<HTMLDivElement | null>(null)
  const hindiCardContainerRef = useRef<HTMLDivElement | null>(null)
  const sportsCardContainerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const [english, kannada, hindi, sports] = await Promise.all([
          fetchEnglishMovies(),
          fetchKannadaMovies(),
          fetchHindiMovies(),
          fetchSportsMovies()
        ])

        setEnglishMovies(english)
        setKannadaMovies(kannada)
        setHindiMovies(hindi)
        setSportsMovies(sports)
      } catch (error) {
        console.error("Error fetching movies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const filterMovies = (movies: Movie[]) => {
    if (!searchTerm) return movies
    return movies.filter((movie) =>
      movie.Title && movie.Title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const scrollLeft = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollLeft -= 300
    }
  }

  const scrollRight = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollLeft += 300
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen py-8">
        <div className="max-w-7xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="mb-12 px-4">
              <div className="h-8 w-64 bg-gray-200 rounded mb-6 animate-pulse mx-auto sm:mx-0"></div>
              <div className="flex justify-center sm:justify-start">
                <div className="flex space-x-4">
                  {[...Array(6)].map((_, j) => (
                    <div key={j} className="flex-shrink-0 w-40 h-56 bg-gray-100 rounded-lg overflow-hidden animate-pulse">
                      <div className="w-full h-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-shimmer"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMovieSection = (
    title: string,
    movies: Movie[],
    ref: React.RefObject<HTMLDivElement | null>,
    showControls = false
  ) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 px-4">{title}</h2>
      <div className="relative">
        {showControls && (
          <>
            <button
              onClick={() => scrollLeft(ref)}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <AiOutlineLeft className="text-gray-700 text-xl" />
            </button>
            <button
              onClick={() => scrollRight(ref)}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition"
            >
              <AiOutlineRight className="text-gray-700 text-xl" />
            </button>
          </>
        )}

        <div
          ref={ref}
          className="flex space-x-4 px-4 overflow-x-auto scrollbar-hide scroll-smooth py-2"
        >
          {filterMovies(movies).length > 0 ? (
            filterMovies(movies).map((movie) => (
              <Link
                href={`/movies/${movie.imdbID}`}
                key={movie.imdbID}
                className="flex-shrink-0 w-40 group"
              >
                <div className="relative overflow-hidden rounded-lg h-56 bg-gray-100 shadow-md transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={movie.Poster !== 'N/A' ? movie.Poster : '/placeholder-movie.png'}
                    alt={movie.Title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-movie.png'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3 className="text-white font-semibold text-sm truncate">{movie.Title}</h3>
                    <p className="text-gray-200 text-xs">{movie.Year}</p>
                    <button className="mt-2 bg-white text-gray-800 py-1 px-3 rounded text-xs font-medium hover:bg-gray-100 transition">
                      View Details
                    </button>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 px-4">
              No movies found matching &quot;{searchTerm}&quot;
            </p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto">
        {renderMovieSection("Recommended for You (English)", englishMovies, englishCardContainerRef, true)}
        {renderMovieSection("Kannada Movies", kannadaMovies, kannadaCardContainerRef)}
        {renderMovieSection("Hindi Movies", hindiMovies, hindiCardContainerRef)}
        {renderMovieSection("Sports News", sportsMovies, sportsCardContainerRef)}
      </div>
    </div>
  )
}
