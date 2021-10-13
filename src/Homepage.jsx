import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Card from "./Card";

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

  async function getMovies(index) {
    const moviesType = index == 1 ? "upcoming" : "popular";
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${moviesType}?api_key=${TOKEN}`
    );
    const json = await response.json();
    const data = await json.results;
    await setMovieData(data);
    await setNavIndex(index);
  }

  async function searchMovies() {
    setNavIndex(0);
    // searching will be done here remember to use onBlur () =>
    return;
  }

  const selectedTab = (index) => {
    return navIndex === index ? "selected" : "";
  };

  return (
    <>
      <nav className="navbar">
        <button
          id={0}
          className={`nav-btn ${selectedTab(0)}`}
          onClick={() => searchMovies()}
        >
          Search
        </button>
        <button
          id={1}
          className={`nav-btn ${selectedTab(1)}`}
          onClick={() => getMovies(1)}
        >
          Upcoming Movies
        </button>
        <button
          id={2}
          className={`nav-btn ${selectedTab(2)}`}
          onClick={() => getMovies(2)}
        >
          Popular Movies
        </button>
      </nav>

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
        {movieData && console.log(movieData)}
      </ul>
    </>
  );
}

export default Homepage;
