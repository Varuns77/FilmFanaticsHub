import React, { useEffect, useState } from "react";
import "./SearchBar.css";
import Card from "../Card/Card";
import Header from "../header/Header";
import useFetchApi from "../../hooks/useFetchApi";

function SearchBar() {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [input, SetInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedInput(input);
    }, 1000);

    return () => clearTimeout(handler);
  }, [input]);

  const { data } = useFetchApi(
    debouncedInput
    ? `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${debouncedInput}`
    : null
  );

  const movies = data?.results;

  const handleChange = (value) => {
    SetInput(value);
  };

  return (
    <>
      <Header />

      <div className="search-container">
        <div className="input-box">
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
        {movies?.length > 0
          ? movies.map((movie) => (
              <Card key={movie.id} movie={movie} className="searchlist-card" />
            ))
          : debouncedInput && <p>No results found for "{debouncedInput}"</p>}
      </div>
    </>
  );
}

export default SearchBar;
