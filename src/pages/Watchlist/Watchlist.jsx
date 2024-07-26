import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../Components/Firebase/firebase";
import Header from "../../Components/header/Header";
import Card from "../../Components/Card/Card";
import Loader from "../../Components/Loader/Loader";
import toast, { Toaster } from 'react-hot-toast';

export const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchWatchlist(user.uid);
      } else {
        console.error("No user is logged in");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const fetchWatchlist = async (uid) => {
    const userRef = doc(db, "Users", uid);

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        console.log(data);
        setWatchlist(data.watchlist || []);
      }
    } catch (error) {
      console.error("Error fetching watchlist: " + error.message);
    }
  };

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      const movieDetails = await Promise.all(
        watchlist.map(async (movieId) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
          );
          console.log(movieId);
          return response.json();
        })
      );
      setMovies(movieDetails);
    };

    if (watchlist.length > 0) {
      fetchWatchlistMovies();
    }
    else {
      setMovies([]);
    }
  }, [watchlist]);
  
  return (
    <>
    <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="movie-list">
            <h2 className="list-title">Watchlist</h2>
            <Toaster />
            {movies.length !== 0 ? <>
              <div className="list-cards">
              {movies.map((movie) => (
                <Card key={movie.id} movieId={movie.id} movie={movie} setMovies={setMovies} className="watchlist-card"/>
              ))}
            </div>
            </> : <h2 style={{textAlign: "center"}}>Add your favourite movies here</h2>}  
          </div>
        </>
      )}
    </>
  );
};
