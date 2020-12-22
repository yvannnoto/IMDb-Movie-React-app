import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/movieList';
import MovieListHeading from './components/movieListHeading';
import SearchBox from './components/searchBox';


const App = () => {

  const [movies, setMovies] = useState([]);

  const [searchValue, setSearchValue] = useState('');

  const getMovieRequest = async () => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=358dc04a`;
    
    const response = await fetch(url);
    
    const responseJson = await response.json();
    if(responseJson.Search){
      setMovies(responseJson.Search);
    }
  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  return (
    <div className="container movie-app">
      <div className="row d-flex align-items-center py-4">
        <MovieListHeading heading = "Movies"/> 
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div> 
      <div className="row">
        <MovieList movies = {movies} />
      </div>
    </div>
  );

};

export default App;
