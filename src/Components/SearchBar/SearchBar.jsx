import React, { useState } from 'react'
import './SearchBar.css'
import Card from '../Card/Card';
// import {FaSearch} from "react-icons/fa"

function SearchBar() {

    const apiKey = import.meta.env.VITE_API_KEY;

    const [input, SetInput] = useState("")
    const [movies, SetMovies] = useState([])
    // const [query, setQuery] = useState('');

    const fetchData = (value) => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`)
        .then(res => res.json())
        .then(data => {
            const filteredMovies = data.results.filter(movie =>
                value &&
                movie.title.toLowerCase().includes(value.toLowerCase())
              );
        
            SetMovies(filteredMovies);
            console.log(data)
            console.log(value);
        });
    }

    const handleChange = (value) => {
        SetInput(value)
        fetchData(value)
    }

    
  return (
    <>
    <div className='wrapper'>
        <div className="search-bar">
            <input type="text" placeholder='Enter Movie Name' value={input} onChange={(e) => handleChange(e.target.value)}/>
        </div>
        <div className="search-result">
        {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
            ))}
        </div>
    </div>
</>
  )
}

export default SearchBar