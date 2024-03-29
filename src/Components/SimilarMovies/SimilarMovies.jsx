import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Card from '../Card/Card';
import './SimilarMovies.css'

function SimilarMovies() {

    const apiKey = import.meta.env.VITE_API_KEY;

    const [similarMov, setSimilarMov] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchSimilarMovies()
    }, [id])

    const fetchSimilarMovies = async () => {
        const api = await fetch(
            `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}`
        );
        const data = await api.json();
        setSimilarMov(data.results.slice(0,10));
        // console.log(data.results);
    }

  return (
    <div className="similar-mov-container">
        {
                    similarMov.map(movie => (
                        <Card key={movie.id} movie={movie} />                        
                    ))
                }
    </div>
  )
}

export default SimilarMovies