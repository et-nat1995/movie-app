import React, { useState, useEffect } from "react";
import "./Homepage.css";
import Card from "./Card";

const TOKEN = process.env.REACT_APP_API_KEY;

function Homepage() {
  const [movieData, setMovieData] = useState();

  async function getMovies(type) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${TOKEN}`
    );
    const json = await response.json();
    const data = await json.results;
    await setMovieData(data);
  }

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

  return (
    <>
      {/* ternary with if state=correct key selected-nav-item else regular-nav-item */}
      {/* we will also display and setMovieData with this method -- think more about the search*/}
      <nav className="navbar">
        <button className="nav-btn">Search</button>
        <button className="nav-btn" onClick={()=>getMovies("upcoming")}>Upcoming Movies</button>
        <button className="nav-btn" onClick={()=>getMovies("popular")}>Popular Movies</button>
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
