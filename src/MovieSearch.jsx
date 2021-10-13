import React, { useState } from "react";
import "./MovieSearch.css";

const TOKEN = process.env.REACT_APP_API_KEY;

function MovieSearch({ displayMovies }) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    async function searchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TOKEN}&query=${encodeURIComponent(value)}`
      );
      const json = await response.json();
      const data = await json.results;
      await displayMovies(data);
      console.log(data)
    }
    searchMovies(value);
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div className="search-movie">
      <input
        type="text"
        name="movie"
        value={value}
        placeholder="Search"
        className="search-input border"
        onBlur={() => handleSearch}
        onChange={handleChange}
      />
      <button className="search-btn border" onClick={handleSearch}>
        <span>G</span>
      </button>
    </div>
  );
}

export default MovieSearch;
