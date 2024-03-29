import React, {useEffect, useState} from "react"
import "./Movie.css"
import { useParams } from "react-router-dom"
import Cast from "../../Components/Cast/Cast";
import YouTube from 'react-youtube';
import SimilarMovies from "../../Components/SimilarMovies/SimilarMovies";
import Loader from "../../Components/Loader/Loader";

const Movie = () => {

    const apiKey = import.meta.env.VITE_API_KEY;

    const [currentMovieDetail, setcurrenTMovieDetail] = useState()
    const [video, setVideo] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const { id } = useParams()
    // console.log(id)

    useEffect(() => {
        getData()
        fetchVideo()

        setTimeout(() => {
            setIsLoading(false);
        }, 1500);

        window.scrollTo(0,0)
    }, [id])

    const getData = async () => {
        const api = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
        const data = await api.json();
        setcurrenTMovieDetail(data)
        setIsLoading(true)
        // console.log(data);
    }

    const fetchVideo = async () => {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}&language=en-US`
        );
        const videodata = await data.json();
        const trailer = videodata.results.find(trail => trail.type === "Trailer");
        setVideo(trailer);
        console.log(trailer);
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
        {isLoading ? ( 
            <Loader />
        ): (
        <>
        <div className="movie">
            <div className="movie-intro">
                <img className="movie-backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie-detail">
                <div className="movie-detailLeft">
                    <div className="movie-posterBox">
                        <img className="movie-poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie-detailRight">
                    <div className="movie-detailRightTop">
                        <div className="movie-name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie-tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie-rating" style={{fontSize: "25px"}}>
                            {currentMovieDetail ? currentMovieDetail.vote_average.toFixed(1): ""} <i style={{color: "yellow"}} class="fas fa-star" />
                            <span className="movie-voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie-genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.slice(0,3).map(genre => (
                                    <><span className="movie-genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                    </div>
                    <div className="movie-detailRightBottom">
                        <div className="synopsisText">Overview</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>

            <div className="more-details">
                <div className="movie-details">
                    <div className="status">
                        <h2>Status</h2>
                        <p style={{textAlign: "center", marginTop: "5px"}}>{currentMovieDetail && currentMovieDetail.status}</p>
                    </div>

                    <div className="release-date">
                        <h2>Release Date</h2>
                        <p style={{textAlign: "center", marginTop: "5px"}}>{currentMovieDetail && currentMovieDetail.release_date.length !== 0 ? formatDate(currentMovieDetail.release_date) : ""}</p>
                    </div>

                    <div className="runtime">
                        <h2>Runtime</h2>
                        <p style={{textAlign: "center", marginTop: "5px"}}>{currentMovieDetail && currentMovieDetail.runtime} mins</p>
                    </div>
                    
                </div>            
            </div>

            <div className="video">
                <h1>Trailer</h1>
                <YouTube videoId={video.key} opts={{height: '500', width: '900'}} />
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