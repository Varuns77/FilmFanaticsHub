import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db, auth } from "../Firebase/firebase";

function Card({ movie }) {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${apiKey}`
        );
        const Data = await response.json();
        setGenres(Data?.genres?.slice(0, 3));
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObject);
    return formattedDate;
  };

  const addMovieToWatchlist = async (e) => {
    e.preventDefault();

    // console.log(e.target);
    // console.log("Added");
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "Users", user.uid);

      try {
        await updateDoc(userRef, {
          watchlist: arrayUnion(movie.id)
        });
        console.log("Movie added to watchlist");
      } catch (error) {
        console.error("Error adding movie to watchlist: ", error);
      }
    } else {
      console.error("No user is logged in");
    }
  };

  return (
    <>
    <Link
          to={`/movie/${movie.id}`}
          style={{ textDecoration: "none", color: "white" }}
        >
      <div className="res-card">
        {/* <div className="xyz">
          
        </div> */}
        <img
          className="res-logo"
          src={`https://image.tmdb.org/t/p/original${
            movie ? movie.poster_path : ""
          }`}
        />

        <span className="checklist-icon" onClick={addMovieToWatchlist}>
          <i class="fa-regular fa-bookmark"></i>
        </span>

          <div className="card-content">
            <h3 className="movie-title">{movie ? movie.original_title : ""}</h3>
            {
              <p className="card-movie-genres">
                {genres.map((genre) => genre.name).join(", ")}
              </p>
            }

            <div className="card-movie-details">
              <p style={{ fontSize: ".8rem" }}>
                {movie.release_date.length !== 0
                  ? formatDate(movie.release_date)
                  : ""}
              </p>
              <span className="card__rating">
                {movie ? movie.vote_average.toFixed(1) : ""}
                <i
                  style={{ paddingLeft: "2px", color: "yellow" }}
                  className="fas fa-star"
                />
              </span>
            </div>
          </div>
      </div>
        </Link>
    </>
  );
}

export default Card;
