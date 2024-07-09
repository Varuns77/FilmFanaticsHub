import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Card.css";
import { doc, updateDoc, getDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db, auth } from "../Firebase/firebase";
import toast, { Toaster } from 'react-hot-toast';

function Card({ movie, removeFromWatchlist }) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [genres, setGenres] = useState([]);
  const [clickedWatchlist, setClickedWatchlist] = useState(false);

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

  console.log(removeFromWatchlist);

  useEffect(() => {
    const checkWatchlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "Users", user.uid);
        try {
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            if (data.watchlist && data.watchlist.includes(movie.id)) {
              setClickedWatchlist(true);
            }
          }
        } catch (error) {
          console.error("Error fetching watchlist: ", error);
        }
      }
    };

    checkWatchlist();
  }, [movie.id])

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObject);
    return formattedDate;
  };

  const AddedMov = () => toast.success('Movie added');
  const RemoveMov = () => toast.success('Movie removed');

  const toggleWatchlist = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(db, "Users", user.uid);

      try {
        if (clickedWatchlist) {
          console.log("Movie removed from watchlist");
          console.log(movie.id);
          removeFromWatchlist(movie.id);
          console.log(removeFromWatchlist(movie.id));
          RemoveMov();
        } else {
          // Add to watchlist
          await updateDoc(userRef, {
            watchlist: arrayUnion(movie.id),
          });
          console.log("Movie added to watchlist");
          AddedMov();
        }
        
        setClickedWatchlist(!clickedWatchlist);
      } catch (error) {
        console.error("Error updating watchlist: ", error);
      }
    } else {
      console.error("No user is logged in");
    }
  };

  return (
    <>
    <Toaster />
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

        <span className="checklist-icon" onClick={toggleWatchlist}>
          <i class={`fa-${clickedWatchlist ? "solid" : "regular"} fa-bookmark`}></i>
        </span>

          <div className="card-content">
            <h3 className="movie-title">{movie ? movie.original_title : ""}</h3>
            {
              <p className="card-movie-genres">
                {genres.map((genre) => genre.name).join(", ")}
              </p>
            }

            <div className="card-movie-details">
              <p>
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
