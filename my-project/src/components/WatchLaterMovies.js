import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const WatchLaterMovies = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [movies, setMovies] = useState([]);
  const [sortCriteria, setSortCriteria] = useState('added'); 
  const [loading, setLoading] = useState(true); 

  // Load the "Watch Later" list from local storage when the component mounts
  useEffect(() => {
    const storedList = JSON.parse(localStorage.getItem('watchLaterList'));
    if (storedList) {
      setWatchLaterList(storedList);
    }
  }, []);

  // Fetch movie details whenever the watchLaterList changes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      const moviesData = await Promise.all(
        watchLaterList.map(async (id) => {
          const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=e6c0f54b`);
          const movie = await response.json();
          return {
            ...movie,
            createdAt: watchLaterList.indexOf(id), 
          };
        })
      );

      // Sort the movies based on the selected criteria
      const sortedMovies = moviesData.sort((a, b) => {
        if (sortCriteria === 'added') {
          return b.createdAt - a.createdAt; 
        } else if (sortCriteria === 'year') {
          return a.Year.localeCompare(b.Year);
        } else if (sortCriteria === 'rating') {
          return b.imdbRating - a.imdbRating;
        }
        return 0;
      });

      setMovies(sortedMovies);
      setLoading(false);
    };
    fetchMovies();
  }, [watchLaterList, sortCriteria]);

  return (
    <div className="text-gray-300">
      <h2 className="text-5xl font-bold p-4 flex justify-center">Watch Later Movies</h2>
      <div className="flex justify-center p-4">
        <button
          onClick={() => setSortCriteria('year')}
          className={`px-4 py-2 mx-2 rounded ${
            sortCriteria === 'year' ? 'bg-emerald-500 text-white' : 'bg-gray-600 text-emerald-500'
          }`}
        >
          Sort by Year
        </button>
        <button
          onClick={() => setSortCriteria('rating')}
          className={`px-4 py-2 mx-2 rounded ${
            sortCriteria === 'rating' ? 'bg-emerald-500 text-white' : 'bg-gray-600 text-emerald-500'
          }`}
        >
          Sort by IMDb Rating
        </button>
      </div>
      <div className="flex justify-center p-4">
        {loading ? (
          <div className="text-gray-300 text-center text-2xl">Loading movies...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-4 mx-auto">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="mb-4">
                <div className="w-64 relative">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <div className="w-full h-96 relative">
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-full h-full object-cover movie-poster"
                      />
                    </div>
                    <h2 className="mt-2 text-lg text-center">{movie.Title}</h2>
                  </Link>
                  <p className="text-sm text-gray-400 text-center">{movie.Year}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchLaterMovies;
