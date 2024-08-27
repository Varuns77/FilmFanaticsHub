import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./Home.css";
import MovieList from "../Components/MovieList/MovieList";
import { ThreeDots } from "react-loader-spinner";
import Loader from "../Components/Loader/Loader";
import Header from "../Components/header/Header";
import useFetchApi from "../hooks/useFetchApi";

function Home() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const { data } = useFetchApi(
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
  );

  const popularMovies = data.results || [];
  // console.log(popularMovies);

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
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header />
          {/* Homepage Carousel */}
          <div className="poster">
            <Carousel
              showThumbs={false}
              showIndicators={false}
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
                        <i className="fas fa-star" />{" "}
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
          
          {/* Categories Section */}
          <div className="home-mov">
            <MovieList category={"popular"} />
            <MovieList category={"now_playing"} />
          </div>

          <footer className="footer-text">
            <p>&#128512; Developed By Varun Sharma</p>
            <p>&copy; 2024 Film Fanatics Hub</p>
            {/* <p>Made by Varun Sharma</p> */}
          </footer>
        </>
      )}
    </>
  );
}

export default Home;
