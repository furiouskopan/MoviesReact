import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WatchLaterBtn from './WatchLaterBtn';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [watchLaterList, setWatchLaterList] = useState(
    JSON.parse(localStorage.getItem('watchLaterList')) || []
  );

  const toggleWatchLater = (imdbID) => {
    if (watchLaterList.includes(imdbID)) {
      setWatchLaterList(watchLaterList.filter((id) => id !== imdbID));
    } else {
      setWatchLaterList([...watchLaterList, imdbID]);
    }
  };

  useEffect(() => {
    localStorage.setItem('watchLaterList', JSON.stringify(watchLaterList));
  }, [watchLaterList]);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`http://www.omdbapi.com/?i=${id}&plot=full&apikey=e6c0f54b`);
        const movie = await response.json();
        if (movie.Response === 'True') {
          setMovie(movie);
        } else {
          setError(movie.Error);
        }
      } catch (e) {
        setError(e.toString());
      }
    };
    fetchMovie();
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    movie ? (
      <div className="text-gray-300 p-10 absolute">
        <div className="grid grid-cols-5 gap-4">
          <div className="col-span-1">
            <div className="relative w-94"> 
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="w-full h-128 object-cover"
              />
              <WatchLaterBtn
                movie={movie}
                isWatchLater={watchLaterList.includes(movie.imdbID)}
                toggleWatchLater={toggleWatchLater}
                isDetailPage={true}
              />
            </div>
          </div>
          <div className="col-span-4">
            <h2 className="text-6xl font-bold pb-4 text-gray-100">{movie.Title}</h2>
            <div className="grid grid-cols-2 gap-4 text-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-bold">Release Date:</p>
                  <p>{movie.Released}</p>
                </div>
                <div>
                  <p className="font-bold">Runtime:</p>
                  <p>{movie.Runtime}</p>
                </div>
                <div>
                  <p className="font-bold">Director:</p>
                  <p>{movie.Director}</p>
                </div>
                <div>
                  <p className="font-bold">IMDb Rating:</p>
                  <p>{movie.imdbRating}</p>
                </div>
              </div>
              <div className="col-span-2 pt-2">
                <p className="font-bold">Genre:</p>
                <p>{movie.Genre}</p>
              </div>
              <div className="col-span-2 pt-2">
                <p className="font-bold">Actors:</p>
                <p>{movie.Actors}</p>
              </div>
              <div className="col-span-1 pt-2">
                <p className="font-bold">Plot:</p>
                <p>{movie.Plot}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : <p className="text-gray-300 text-2xl p-5">Loading...</p>
  );
};


export default MovieDetail;
