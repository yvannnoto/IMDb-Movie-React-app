import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import MovieList from './components/movieList';
import MovieListHeading from './components/movieListHeading';
import SearchBox from './components/searchBox';
import AddFavorite from './components/addFavorites';
import RemoveFavorites from './components/removeFavorites';


const App = () => {

  const [movies, setMovies] = useState([]);

  const [favorite, SetFavorite] = useState([]);

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

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorite'));
    SetFavorite(movieFavorites);
  }, [])

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorite', JSON.stringify(items));
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorite, movie];
    SetFavorite(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorite.filter((favorite) => favorite.imdbID !== movie.imdbID );
    SetFavorite(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  }  

  return (
    <div className="container movie-app">
      <div className="row d-flex align-items-center py-4">
        <MovieListHeading heading = "Movies"/> 
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div> 
      <div className="row">
        <MovieList movies = {movies} handleFavoriteClick = {addFavoriteMovie}  favoriteComponent = {AddFavorite} />
      </div>
      <div className="row d-flex align-items-center py-4">
        <MovieListHeading heading = "Favorites"/> 
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div> 
      <div className="row">
        <MovieList movies = {favorite} handleFavoriteClick = {removeFavoriteMovie}  favoriteComponent = {RemoveFavorites} />
      </div>
    </div>
  );

};

export default App;
