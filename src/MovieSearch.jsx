import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./MovieSearch.css";

const TOKEN = process.env.REACT_APP_API_KEY;

function MovieSearch({ displayMovies }) {
  const [value, setValue] = useState("");
  const [movieData, setMovieData] = useState();
  const [suggestions, setSuggestions] = useState();

  const handleSearch = (e) => {
    async function searchMovies() {
      displayMovies(movieData);
      setSuggestions('');
    }
    e.preventDefault();
    searchMovies(value);
  };

  useEffect(() => {
    async function search() {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TOKEN}&query=${encodeURIComponent(
          value
        )}`
      );
      const json = await response.json();
      const data = await json.results;
      await setMovieData(data);
      const suggestionList =
        data &&
        (await setSuggestions(
          data.map((movie) => {
            return movie.title;
          })
        ));

      suggestionList && setSuggestions(suggestionList);
    }
    search();
  }, [value]);

  const handleChange = (event) => setValue(event.target.value);

  const handleClick = (suggestion) => {
    setValue(suggestion)
    setSuggestions('');
  }

  return (
    <>
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
      {suggestions && (
        <ul className="suggestion-list">
          {suggestions.map((suggestion, key) => {
            return (
              <li className="suggestion-item" key={key} onClick={() => handleClick(suggestion)}>
                {suggestion}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

export default MovieSearch;
