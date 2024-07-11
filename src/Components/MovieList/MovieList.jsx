import React, {useEffect, useState} from "react"
import "./MovieList.css"
import { useParams } from "react-router-dom"
import Card from "../Card/Card"
import Header from "../header/Header"
import Loader from "../Loader/Loader"


const MovieList = ({category}) => {
    
    const apiKey = import.meta.env.VITE_API_KEY;

    const [movieList, setMovieList] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const {type} = useParams()

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 1000);
    
        return () => clearTimeout(timer);
      }, []);

    // useEffect(() => {
    //     getData()
    // }, [])

    // if(type === undefined)
    //     console.log("YESSSS!!!");

    // // console.log(type);

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : category}?api_key=${apiKey}`)
        .then(res => res.json())
        .then(data => setMovieList(data.results))
    }

    const setMovies = () => {
        console.log("Movie List Component");
    }

    return (
        <>
        <div className="main">
            {type===undefined ? 
            <div className="movie-cards">
                <h2 className="type-title">{(type ? type : category).toUpperCase().replace(/_/g, " ")}</h2>
                <div className="movie-slider">
                    {
                        movieList.slice(0,10).map(movie => (
                            <Card key={movie.id} movie={movie} setMovies={setMovies}/>                        
                        ))
                    }
                </div>
            </div> : 
            <>
            <Header />
            <div className="movie-list">
                <h2 className="list-title">{(type ? type : category).toUpperCase().replace(/_/g, " ")}</h2>
                {isLoading ? <Loader /> : <>
                <div className="list-cards">
                {
                    movieList.map(movie => (
                        <Card key={movie.id} movie={movie} setMovies={setMovies}/>                        
                    ))
                    }
                </div>
                </>}
            </div>
            </>}
        </div>
        
        </>
    )
}

export default MovieList