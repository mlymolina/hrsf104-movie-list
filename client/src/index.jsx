import React from 'react' 
import ReactDOM from 'react-dom';
import MovieList from './components/App.jsx';
import API_KEY from './config/themoviedb.js';

const movies = [
  {
  	id: 5,
    title: 'Mean Girls',
    year: 1995,
    imdbRating: 6.2,
    overview: "None",
    watched: true,
  },
  {
  	id: 2, 
    title: 'Hackers',
    year: 2010,
    imdbRating: 7.2,
    overview: "None",
    watched: false
  },
  {
  	id: 3, 
    title: 'The Grey',
    year: 200,
    imdbRating: 6.2,
    overview: "None",
    watched: true
  },
  {
  	id: 4, 
    title: 'Sunshine', 
    year: 2011,
    imdbRating: 6.2,
    overview: "None",
    watched: false
  },
  {
  	id: 1, 
    title: 'Ex Machina',
    year: 2005,
    imdbRating: 6.2,
    overview: "None",
    watched: false},
]

ReactDOM.render(<MovieList API_KEY={API_KEY} movies={movies} />, 
  document.querySelector("#app")
);