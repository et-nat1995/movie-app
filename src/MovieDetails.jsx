import React, { useEffect, useState } from "react";
import "./MovieDetails.css";
import { GrClose } from "react-icons/gr";

const TOKEN = process.env.REACT_APP_API_KEY;

function MovieDetails({ id, poster, title, close }) {
  const [cast, setCast] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const link = `https://image.tmdb.org/t/p/w200/${poster}`;

  useEffect(() => {
    async function getDetails() {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${TOKEN}&append_to_response=credits,videos`
      );
      const json = await response.json();
      await setCast(json.credits.cast);
      await setTrailers(json.videos.results);
    }
    getDetails();
  }, [id]);

  let castList = [];
  cast.forEach((castmember, key) => {
    if (key <= 10) {
      castList.push(castmember.name);
    }
  });

  const moviePoster = poster ? (
    <div className="movie-poster">
      <img src={link} alt={title} height="98%" width="250px" />
    </div>
  ) : (
    <div className="poster-image">
      <h1>{title}</h1>
      <footer className="footer">No image available</footer>
    </div>
  );

  const videos = trailers.map((data, key) => {
    if (data.type === "Trailer") {
      return (
        <span className="trailer">
          <iframe
            width="275"
            height="175"
            src={`https://www.youtube.com/embed/${data.key}`}
            frameBorder="0"
            title="Embedded youtube"
            key={key}
          />
        </span>
      );
    }
  });

  return (
    <div className="overlay" onClick={close}>
      <dialog className="modal">
        <div className="movie-poster">{moviePoster}</div>
        <div className="movie-info">
          <header className="modal-header">
            <h1 className="movie-title">{title}</h1>
            <GrClose onClick={close} className="close" />
          </header>
            <div className="cast-member-list">
              <h1 className="cast-title">Cast</h1>
              <p className="castmembers">{castList.join(", ")}</p>
            </div>
            <div className="videos">{videos}</div>
        </div>
      </dialog>
    </div>
  );
}

export default MovieDetails;
