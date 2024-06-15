import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./Home.css";
import MovieList from "../Components/MovieList/MovieList";
import { ThreeDots } from 'react-loader-spinner'
import Loader from "../Components/Loader/Loader";
import Header from "../Components/header/Header";

function Home() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
    );
    const data = await api.json();
    setPopularMovies(data.results);
    // console.log(data.results);
  };

  // Function to format date
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObject);
    return formattedDate;
  };

  return (
    <>{isLoading ? (
      <Loader />
      ) : (
    <>
      <Header />
      <div className="poster">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.map((movie) => (
            <Link
              style={{ textDecoration: "none", color: "white" }}
              to={`/movie/${movie.id}`}
            >
              <div className="posterImage">
                <img
                  src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                />
              </div>
              <div className="posterImage-overlay">
                <div className="posterImage-title">
                  {movie?.original_title}
                </div>
                <div className="posterImage-runtime">
                  {movie?.release_date.length !== 0
                    ? formatDate(movie.release_date)
                    : ""}
                  <span className="posterImage-rating">
                    {movie?.vote_average.toFixed(1)} 
                    <i
                      className="fas fa-star"
                    />{" "}
                  </span>
                </div>
                <div className="posterImage-description">
                  {movie?.overview}
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>

      <div className="home-mov">
        <MovieList category={"popular"} />
        <MovieList category={"now_playing"} />
      </div>
    </>
  )}
  </>
  );
}

export default Home;
