import React, {useEffect, useState} from "react"
import "./Movie.css"
import { useParams } from "react-router-dom"
import Cast from "../../Components/Cast/Cast";
import YouTube from 'react-youtube';
import SimilarMovies from "../../Components/SimilarMovies/SimilarMovies";
import Loader from "../../Components/Loader/Loader";
import Header from "../../Components/header/Header";
import useFetchApi from "../../hooks/useFetchApi";

const Movie = () => {

    const apiKey = import.meta.env.VITE_API_KEY;

    const [video, setVideo] = useState()

    const { id } = useParams()
    // console.log(id)

    useEffect(() => {

        fetchVideo()
        window.scrollTo(0,0)
    }, [id])

    const {data, loading}  = useFetchApi(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`);
    // console.log(data);

    const fetchVideo = async () => {
        setVideo()
        const data = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
            );
            const videodata = await data.json();
            const trailer = videodata.results.find(trail => trail.type === "Trailer");
            setVideo(trailer);
            // console.log(trailer);
    }   

    // Function to format date
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
        {loading ? ( 
            <Loader />
        ): (
        <>
        <Header />
        <div className="movie">
            <div className="movie-intro">
                <img className="movie-backdrop" src={`https://image.tmdb.org/t/p/original${data ? data.backdrop_path : ""}`} />
            </div>
            <div className="movie-detail">
                <div className="movie-detailLeft">
                    <div className="movie-posterBox">
                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${data ? data.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie-detailRight">
                    <div className="movie-detailRightTop">
                        <div className="movie-name">{data ? data.original_title : ""}</div>
                        <div className="movie-tagline">{data ? data.tagline : ""}</div>
                        <div className="movie-rating" >
                            {data ? data.vote_average.toFixed(1): ""} <i style={{color: "yellow"}} class="fas fa-star" />
                            <span className="movie-voteCount">{data ? "(" + data.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie-genres">
                            {
                                data && data.genres
                                ? 
                                data.genres.slice(0,3).map(genre => (
                                    <><span className="movie-genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie-detailRightBottom">
                        <div className="synopsisText">Overview</div>
                        <div className="synopsis"><p>{data ? data.overview : ""}</p></div>
                    </div>
                    
                </div>
            </div>

            <div className="more-details">
                <div className="movie-details">
                    <div className="status">
                        <h2>Status</h2>
                        <p style={{textAlign: "center", marginTop: "5px"}}>{data && data.status}</p>
                    </div>

                    <div className="release-date">
                        <h2>Release Date</h2>
                        <p style={{textAlign: "center", marginTop: "5px"}}>{data && data.release_date.length !== 0 ? formatDate(data.release_date) : ""}</p>
                    </div>

                    <div className="runtime">
                        <h2>Runtime</h2>
                        <p style={{textAlign: "center", marginTop: "5px"}}>{data && data.runtime} mins</p>
                    </div>
                    
                </div>            
            </div>

            <div className="video">
                <h1>Trailer</h1>
                {video && (
                <div className="video-wrapper">
                    <YouTube videoId={video.key} className="youtube-video" />
                </div>
                )}
            </div>

            <div className="cast-details">
                <h1>Top Cast</h1>
                <Cast />
            </div>
        
            <div className="similar-movies">
                <h1>You might also like</h1>
                <SimilarMovies />
            </div>
        </div>
        </>)
        }
        </>
    )
}

export default Movie
