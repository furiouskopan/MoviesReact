import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in v6
import React, {  useState } from 'react';

const SearchBar = ({ setSearch }) => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate(); // Get the navigate function

  const handleSearch = () => {
    setSearch(searchInput);
    navigate('/'); // Navigate to home page
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      <input
        type="text"
        value={searchInput}
        onChange={(event) => setSearchInput(event.target.value)}
        placeholder="Search movies..."
        className="px-4 py-2 rounded-l w-64 bg-white focus:outline-none"
        onKeyPress={handleKeyPress}
      />
      <button
        className="px-4 py-2 bg-emerald-800 text-white rounded-r hover:bg-emerald-500"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
