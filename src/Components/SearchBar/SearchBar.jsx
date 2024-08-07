import React, { useState } from "react";
import "./SearchBar.css";
import Card from "../Card/Card";
import Header from "../header/Header";
import useFetchApi from "../../hooks/useFetchApi";

function SearchBar() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [input, SetInput] = useState("");

  const { data } = useFetchApi(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${input}`)

  const movies = data?.results?.filter(
    (movie) =>
      input && movie.title.toLowerCase().includes(input.toLowerCase())
  );

  const handleChange = (value) => {
    SetInput(value);
  };

  return (
    <>
      <Header />

      <div className="search-container">
        <div class="input-box">
          <i className="fa-solid fa-magnifying-glass search-icon"></i>
          <input
            type="text"
            placeholder="Enter Movie Name"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
        </div>
      </div>

      <div className="search-result">
        {movies?.map((movie) => (
          <Card key={movie.id} movie={movie} className="searchlist-card"/>
        ))}
      </div>
    </>
  );
}

export default SearchBar;
