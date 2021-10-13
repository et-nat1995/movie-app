import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./MovieSearch.css";

const TOKEN = process.env.REACT_APP_API_KEY;

function MovieSearch({ displayMovies }) {
  const [value, setValue] = useState("");

  const handleSearch = (e) => {
    async function searchMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TOKEN}&query=${encodeURIComponent(value)}`
      );
      const json = await response.json();
      const data = await json.results;
      await displayMovies(data);
    }
    e.preventDefault()
    searchMovies(value);
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <form className="search-movie" onSubmit={handleSearch}>
      <input
        type="text"
        name="movie"
        value={value}
        placeholder="Search"
        className="search-input border"
        onChange={handleChange}
      />
      <button className="search-btn border" onClick={handleSearch}>
        <FaSearch color="white" />
      </button>
    </form>
  );
}

export default MovieSearch;
