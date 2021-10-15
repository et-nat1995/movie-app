import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Card from "./Card";
import MovieSearch from "./MovieSearch";

const TOKEN = process.env.REACT_APP_API_KEY;

function Homepage() {
  const [movieData, setMovieData] = useState();
  const [navIndex, setNavIndex] = useState(2);

  useEffect(() => {
    async function getPopularMovies() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${TOKEN}`
      );
      const json = await response.json();
      const data = await json.results;
      await setMovieData(data);
    }
    getPopularMovies();
  }, []);

  async function getMovies(movieType) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieType}?api_key=${TOKEN}`
    );
    const json = await response.json();
    const data = await json.results;
    await setMovieData(data);
  }

  const selectedTab = (index) => {
    return navIndex === index ? "selected" : "";
  };

  const handleClick = (index) => {
    setNavIndex(index);
    const movieType = index === 1 ? "upcoming" : "popular";
    if (index > 0) {
      getMovies(movieType);
    }
  };

  const displayMovies = (data) => setMovieData(data);

  return (
    <>
      <nav className="navbar">
        <button
          id={0}
          className={`nav-btn ${selectedTab(0)}`}
          onClick={() => handleClick(0)}
        >
          Search
        </button>
        <button
          id={1}
          className={`nav-btn ${selectedTab(1)}`}
          onClick={() => handleClick(1)}
        >
          Upcoming Movies
        </button>
        <button
          id={2}
          className={`nav-btn ${selectedTab(2)}`}
          onClick={() => handleClick(2)}
        >
          Popular Movies
        </button>
      </nav>

      {navIndex === 0 && <MovieSearch displayMovies={displayMovies} />}

      <ul className="movie-section">
        {movieData &&
          movieData.map((movie, key) => {
            return (
              <Card
                id={movie.id}
                title={movie.title}
                rating={movie.vote_average}
                overview={movie.overview}
                poster={movie.poster_path}
                key={key}
              />
            );
          })}
      </ul>
    </>
  );
}

export default Homepage;
