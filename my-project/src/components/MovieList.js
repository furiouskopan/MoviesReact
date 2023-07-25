import React, { useRef, useState, useEffect } from 'react';
import WatchLaterBtn from './WatchLaterBtn';
import { Link } from 'react-router-dom';

const MovieList = (props) => {
  const scrollContainerRef = useRef(null);
  const lastMovieIndex = props.movies.length - 1;

  const [watchLaterList, setWatchLaterList] = useState(
    JSON.parse(localStorage.getItem('watchLaterList')) || []
  );

  // Function to add/remove movie from the "Watch Later" list
  const toggleWatchLater = (imdbID) => {
    if (watchLaterList.includes(imdbID)) {
      setWatchLaterList(watchLaterList.filter((id) => id !== imdbID));
    } else {
      setWatchLaterList([...watchLaterList, imdbID]);
    }
  };

  // Save the "Watch Later" list to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
  }, [watchLaterList]);

  const handleScrollLeft = () => {
    scrollContainerRef.current.scrollLeft -= 350;
  };

  const handleScrollRight = () => {
    scrollContainerRef.current.scrollLeft += 350;
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const scrollStep = 200; 
    if (e.deltaY > 0) {
      scrollContainerRef.current.scrollLeft += scrollStep;
    } else {
      scrollContainerRef.current.scrollLeft -= scrollStep;
    }
  };

  return (
    <div className="relative text-gray-300">
      <div
        ref={scrollContainerRef}
        className="flex pb-5 hide-scrollbar overflow-x-hidden relative scroll-smooth"
        onWheel={handleScroll}
      >
        {
          props.movies.map((movie) => (
            <div key={movie.imdbID} className="inline-block px-3 py-4">
              <div className="w-64 relative">
                <div className="w-full h-96 relative">
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      className="w-full h-full object-cover movie-poster"
                    />
                  </Link>
                  <WatchLaterBtn
                    movie={movie}
                    isWatchLater={watchLaterList.includes(movie.imdbID)}
                    toggleWatchLater={toggleWatchLater}
                    isDetailPage={false}
                  />
                </div>
                <h2 className="mt-2 text-lg">{movie.Title}</h2>
                <p className="text-sm text-gray-400">{movie.Year}</p>
              </div>
            </div>
          ))
        }
      </div>
      {props.movies.length > 0 && (
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <button
            onClick={handleScrollLeft}
            className="bg-emerald-900 hover:bg-emerald-500 rounded-l p-3 py-4 mx-2"
          >
            &lt;
          </button>
          <button
            onClick={handleScrollRight}
            className="bg-emerald-900 hover:bg-emerald-500 rounded-r p-3 py-4 mx-2"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
      }  
export default MovieList;
