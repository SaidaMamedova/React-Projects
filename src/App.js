import { useState, useEffect } from "react";
import './app.css'
import SearchIcon from './search.svg'
import MovieCard from "./MovieCard";


function App() {
  // 1252fc2e
  const [movies, setMovies] = useState([])
  const [inputSearch, setInputSearch] = useState('')

  const URL = 'http://www.omdbapi.com?apikey=1252fc2e';
  const searchFilm = async (searchValue) => {
    const response = await fetch(`${URL}&s=${searchValue}`);
    const data = await response.json()
    setMovies(data.Search)
  }


  return (
    <div className="app">
      <h1>FilmLand</h1>
      <div className="search">
        <input
          placeholder="search for a movie"
          value={inputSearch}
          onChange={(e) => {
            setInputSearch(e.target.value)
          }} />
        <img src={SearchIcon} alt="search" onClick={()=>{
          searchFilm(inputSearch)
        }}
        />
      </div>
      {
        movies?.length > 0
          ? (
            <div className="container">
              {movies.map((movie) => {
                return <MovieCard key={movie.imdbID} movie={movie} />
              })}
            </div>)
          : (
            <div className='empty'>
              <h2>No movies found</h2>
            </div>
          )
      }
    </div>
  );
}

export default App;
