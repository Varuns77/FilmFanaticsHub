import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import "./Home.css";
import MovieList from "../Components/MovieList/MovieList";
import Loader from "../Components/Loader/Loader";

function Home2() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US`
        );
        const data = await api.json();
        setPopularMovies(data.results);
      } catch (error) {
        console.error("Failed to fetch popular movies", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(dateObject);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
                  key={movie.id}
                  className="text-white no-underline"
                  to={`/movie/${movie.id}`}
                >
                  <div className="relative h-[600px]">
                    <img
                      className="m-auto block w-full"
                      src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                      alt={movie?.original_title}
                    />
                    <div className="absolute bottom-0 w-full flex flex-col justify-end items-start p-20 bg-gradient-to-t from-black via-transparent to-transparent duration-300 opacity-100 hover:opacity-100">
                      <div className="font-black text-6xl mb-1 text-left">
                        {movie?.original_title}
                      </div>
                      <div className="text-4xl mb-4">
                        {movie?.release_date ? formatDate(movie.release_date) : ""}
                        <span className="ml-12">
                          {movie?.vote_average.toFixed(1)}
                          <i className="fas fa-star text-yellow-500 ml-1" />
                        </span>
                      </div>
                      <div className="italic text-base mb-1 flex text-left w-1/2 ">
                        {movie?.overview}
                      </div>
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

export default Home2;
