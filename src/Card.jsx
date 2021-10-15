import React, { useState, useEffect } from "react";
import "./Card.css";
import { FaStar, FaStopwatch } from "react-icons/fa";
import MovieDetails from "./MovieDetails";

const TOKEN = process.env.REACT_APP_API_KEY;

function Card({ id, title, rating, poster }) {
  const [runtime, setRuntime] = useState(0);
  const [clicked, setClicked] = useState(false);

  const link = `https://image.tmdb.org/t/p/w200/${poster}`;

  useEffect(() => {
    async function getRuntime() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TOKEN}&append_to_response=runtime`
      );
      const json = await response.json();
      const runtime = await json.runtime;
      await setRuntime(runtime);
    }
    getRuntime();
  }, [id]);

  const handleClick = () => setClicked(!clicked);

  const moviePoster = poster ? (
    <img src={link} alt={title} />
  ) : (
    <div className="poster-image">
      <h3>{title}</h3>
      <footer className="footer">No image available</footer>
    </div>
  );

  return (
    <li className="movie">
      <div className="movie-poster" onClick={handleClick}>
        <header className="poster-icons">
          <span className="poster-info">
            <FaStar color="yellow" /> {rating}
          </span>
          <span className="poster-info">
            <FaStopwatch /> {runtime} min
          </span>
        </header>
        {moviePoster}
      </div>
      {clicked && (
        <MovieDetails
          id={id}
          poster={poster}
          close={handleClick}
          link={link}
          title={title}
        />
      )}
    </li>
  );
}

export default Card;
