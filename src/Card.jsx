import React from "react";
import './Card.css'

function Card({ id, title, rating, overview, poster }) {
  const link = `https://image.tmdb.org/t/p/w200/${poster}`;

  return (
    <li className="movie-poster">
      <img src={link} alt="" />
    </li>
  );
}

export default Card;
