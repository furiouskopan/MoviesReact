import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import MovieList from './components/MovieList';
import WatchLaterMovies from './components/WatchLaterMovies';
import SearchBar from './components/SearchBar';
import MovieDetails from './components/MovieDetails';

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [showWatchLaterMovies, setShowWatchLaterMovies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const getSearchRequest = async () => {
    setLoading(true);
    const url = `http://www.omdbapi.com/?s=${search}&apikey=e6c0f54b`;
    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    } else {
      setMovies([]);
    }

    setLoading(false);
    setSearchPerformed(true);
  };

  useEffect(() => {
    if (search) {
      getSearchRequest();
    } else {
      setMovies([]);
      setSearchPerformed(false);
    }
  }, [search]);

  const handleWatchLaterClick = () => {
    setShowWatchLaterMovies(!showWatchLaterMovies);
  };

  return (
    <Router>
      <div className="bg-teal-950">
        <Link to="/"  >
          <h1 className="text-6xl font-bold text-emerald-500 ps-6 pt-6 cursor-pointer transition-colors duration-300 hover:text-emerald-600">
            WatchFlicks
          </h1>
        </Link>
        {!showWatchLaterMovies && (
          <Link
            to="/watch-later"
            className="absolute top-0 right-0 m-4 bg-green-500 text-white p-3 rounded"
          >
            Watch Later Movies
          </Link>
        )}
      </div>
      <div className="text-black">
        <SearchBar setSearch={setSearch} />
      </div>
      <div className="footer" />
      <Routes>
        <Route
          path="/"
          element={
            <>
              {showWatchLaterMovies ? (
                <WatchLaterMovies />
              ) : loading ? (
                <div className="text-gray-300 text-center text-xl">Loading...</div>
              ) : (
                <div className="bg-emerald-800 pt-5 mt-3 mx-3 bg-opacity-0">
                  {movies.length === 0  && searchPerformed ?  (
                    <div className="text-center text-gray-100 text-2xl">No movies or TV shows found.</div>
                  ) : (
                    <MovieList movies={movies}  searchPerformed={searchPerformed}/>
                  )}
                </div>
              )}
            </>
          }
        />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/watch-later" element={<WatchLaterMovies />} />
      </Routes>
    </Router>
  );
}

export default App;
