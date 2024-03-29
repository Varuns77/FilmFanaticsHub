import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";

function Card({ movie }) {

  const apiKey = import.meta.env.VITE_API_KEY;

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`);
        const Data = await response.json();
        setGenres(Data?.genres?.slice(0,3));

      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    fetchMovieData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(dateObject);
    return formattedDate;
  };

  return (
    <>
        <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <div className="res-card">
            <img
              className="res-logo"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
            />

            <div className="card-content">
                <h3 style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden", padding: "5px"}} >{movie ? movie.original_title : ""}</h3>
                {
                                <p style={{fontSize: ".8rem",  padding: "5px"}}>{genres.map((genre) => genre.name).join(', ')}</p>
                }
                
                <div className="movie-details">
                  <p style={{fontSize: ".8rem"}}>{movie.release_date.length !== 0 ? formatDate(movie.release_date) : ""}</p>    
                    <span style={{fontSize: ".8rem"}} className="card__rating">
                  {movie ? movie.vote_average.toFixed(1) : ""}
                  <i style={{paddingLeft: "2px", color: "yellow"}} className="fas fa-star" />
                </span>
                </div>
            </div>
          </div>
        </Link>
    </>
  );
}

export default Card;
