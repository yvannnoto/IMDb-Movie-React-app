import React from 'react';


const MovieList = (props) => {
   const FavoriteComponent = props.favoriteComponent;
   return (
      <>
         {props.movies.map((movie, index) => (
            <div className="m-3">
               <div onClick={() => props.handleFavoriteClick(movie)}>
                  <FavoriteComponent/>
               </div>
               <img src={movie.Poster} alt={movie.Title}></img>
            </div>
         ))}
      </>
   )
}

export default MovieList;