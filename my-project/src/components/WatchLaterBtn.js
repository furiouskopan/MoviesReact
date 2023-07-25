import React, { useState } from 'react';

const WatchLaterBtn = ({ movie, isWatchLater, toggleWatchLater, isDetailPage }) => {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleClick = async () => {
    if (isWatchLater) {
      setIsRemoving(true);
      await toggleWatchLater(movie.imdbID);
      setIsRemoving(false);
    } else {
      toggleWatchLater(movie.imdbID);
    }
  };

  return (
    <>
      {isWatchLater ? (
        <div
          className={`${
            isDetailPage ? 'w-full' : 'absolute bottom-3 right-2'
          } p-2 bg-yellow-500 rounded-bl-lg rounded-br-lg text-white font-semibold ${
            isRemoving ? 'animate-slide-out' : 'animate-slide-in-out'
          } flex justify-center`}
          style={{ cursor: 'pointer' }}
          onClick={handleClick}
        >
          {isRemoving ? 'Removing' : 'Watch Later'}
        </div>
      ) : (
        <button
          className="absolute bottom-3 right-3 text-4xl rounded-tl-2xl bg-yellow-500 text-white flex justify-center"
          onClick={handleClick}
          style={{
            width: '50px',
            height: '45px',
          }}
        >
          +
        </button>
      )}
    </>
  );
};


export default WatchLaterBtn;